import React from 'react';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getManagedRestaurant } from '@/api/getManagedRestaurant';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from '@/api/updateProfile';
import { toast } from 'sonner';

const storeProfileSchema = z.object({
 name: z.string().min(1),
 description: z .string().nullable(),
})

type IStoreProfileSchema = z.infer<typeof storeProfileSchema>;

const StoreProfileDialog = () => {
  const queryClient = useQueryClient();
  
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
    })

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<IStoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    }
    })

  const updateManagedRestaurantCache = ({ description, name }: IStoreProfileSchema) => {
    const cached = queryClient.getQueryData(["managed-restaurant"])
      if(cached){
        queryClient.setQueryData(["managed-restaurant"], {
          ...cached,
          description,
          name
        })
      }

      return { cached };
  } 

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ description , name }) {
      const { cached } = updateManagedRestaurantCache({ description, name })
      return { previousProfile: cached };
    },
    onError(error, variables, context) {
      if(context?.previousProfile){
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  const handleUpdateProfile = async(data: IStoreProfileSchema) => {
    try{
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success("Perfil atualizado com sucesso!")
    }catch(err){
      toast.error("Falha ao atualizar o perfil, tente novamente!")
    }
  }

  return (
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Perfil da loja</DialogTitle>
     <DialogDescription>
      Atualize as informações do seu estabelecimento visíveis ao seu cliente
     </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit(handleUpdateProfile)}>
     <div className="space-y-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
       <Label className="text-right" htmlFor="name">Nome</Label>
       <Input className="col-span-3" id="name" {...register('name')}/>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
       <Label className="text-right" htmlFor="description">Descrição</Label>
       <Textarea className="col-span-3" id="description" {...register('description')}/>
      </div>
     </div>

     <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="ghost">
        Cancelar
        </Button>
      </DialogClose>  

      <Button type="submit" variant="success" disabled={isSubmitting}>
       Salvar
      </Button>
     </DialogFooter>
    </form>
   </DialogContent>
  );
}

export default StoreProfileDialog;
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerRestaurant } from '@/api/registerRestaurant';

const SignUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof SignUpForm>;

const SignUp = () => {
 const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpForm)
  });

  const { mutateAsync: registerRestaurantsFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  const handleSignUp = async(data: SignUpForm) => {
    await registerRestaurantsFn({ 
      restaurantName: data.restaurantName,
      managerName: data.managerName,
      email: data.email,
      phone: data.phone,
     })

    try{
      toast.success('Restaurante cadastrado com sucesso.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`)
        }
      })
    }catch(err){

    }
  }
  return (
  <>  
    <Helmet title="Login"/>
    <div className="p-8">
     <Button variant="secondary" asChild className="absolute right-8 top-8">
        <Link to="/sign-in">
          Fazer login
        </Link>
      </Button>  

      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome do estabelecimento</Label>
            <Input id="restaurantName" type="text" {...register('restaurantName')}/>
          </div>

          <div className="space-y-2">
            <Label>Seu nome</Label>
            <Input id="managerName" type="text" {...register('managerName')}/>
          </div>

          <div className="space-y-2">
            <Label>Seu celular</Label>
            <Input id="phone" type="number" {...register('phone')}/>
          </div>

          <div className="space-y-2">
            <Label>Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')}/>
          </div>

          <Button disabled={isSubmitting} className="w-full" type='submit'>
            Finalizar cadastro
          </Button>

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
           Ao continuar, você concorda com nossos 
           <a href=""className="underline underline-offset-4">
            Termos de serviço
           </a> 
            {' '}e {' '}
           <a href="" className="underline underline-offset-4">politícas de privacidade</a>.
          </p>
        </form>
      </div>
    </div>
  </>  
  );
}

export default SignUp;
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>;

const SignIn = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
    resolver: zodResolver(signInForm)
  });

  const handleSignIn = (data: SignInForm) => {
    toast.success('Enviamos u link de autenticação para seu e-mail.', {
      action: {
        label: 'Reenviar',
        onClick: () => handleSignIn(data)
      }
    })
  }
  return (
  <>  
    <Helmet title="Login"/>
    <div className="p-8">
      <Button variant="secondary" asChild className="absolute right-8 top-8">
        <Link to="/sign-up">
          Novo estabelecimento
        </Link>
      </Button>   

      <div className="w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label>Seu e-mail</Label>
            <Input id="email" type="email" {...register('email')}/>
          </div>

          <Button disabled={isSubmitting} className="w-full" type='submit'>
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  </>  
  );
}

export default SignIn;
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthAPI } from '@/lib/api';
import { auth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const schema = z.object({ email: z.string().email(), password: z.string().min(4) });

export default function AdminLogin(){
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    try{
      const { access_token } = await AuthAPI.login(email, password);
      auth.setToken(access_token);
      toast.success('Logged in');
      nav('/admin');
    }catch(e){
      toast.error('Invalid credentials');
    }
  };

  return (
    <main className="min-h-[60vh] grid place-items-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm p-6 rounded-xl border bg-white/70 backdrop-blur space-y-4" data-testid="admin-login-form">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" {...register('email')} data-testid="admin-login-email" />
          {errors.email && <p className="text-sm text-red-600" data-testid="admin-login-email-error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <Input type="password" {...register('password')} data-testid="admin-login-password" />
          {errors.password && <p className="text-sm text-red-600" data-testid="admin-login-password-error">{errors.password.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full" data-testid="admin-login-submit">{isSubmitting? 'Logging in...' : 'Login'}</Button>
      </form>
    </main>
  );
}

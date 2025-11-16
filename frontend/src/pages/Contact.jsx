import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PublicAPI } from '@/lib/api';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(2),
  budget: z.string().optional(),
  message: z.string().min(10),
});

export default function Contact(){
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    await PublicAPI.contact(values);
    toast.success('Thanks! We will get back to you.');
    reset();
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12" id="contact">
      <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
      <p className="text-slate-600 mt-2">Tell us about your project.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" data-testid="contact-form">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input {...register('name')} data-testid="contact-name" />
          {errors.name && <p className="text-sm text-red-600" data-testid="contact-name-error">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" {...register('email')} data-testid="contact-email" />
          {errors.email && <p className="text-sm text-red-600" data-testid="contact-email-error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Company</label>
          <Input {...register('company')} data-testid="contact-company" />
        </div>
        <div>
          <label className="text-sm font-medium">Service needed</label>
          <Input placeholder="e.g. Web Development" {...register('service')} data-testid="contact-service" />
          {errors.service && <p className="text-sm text-red-600" data-testid="contact-service-error">{errors.service.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Budget</label>
          <Input placeholder="$5k - $15k" {...register('budget')} data-testid="contact-budget" />
        </div>
        <div>
          <label className="text-sm font-medium">Message</label>
          <Textarea rows={5} {...register('message')} data-testid="contact-message" />
          {errors.message && <p className="text-sm text-red-600" data-testid="contact-message-error">{errors.message.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting} data-testid="contact-submit">{isSubmitting? 'Sending...' : "Send"}</Button>
      </form>
    </main>
  );
}

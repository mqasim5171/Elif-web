import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
    <main className="lux-container py-16" id="contact">
      <h1 className="text-5xl font-bold tracking-tight" style={{fontFamily:'Playfair Display, serif'}}>Contact</h1>
      <p className="text-[var(--brand-soft)] mt-3">Tell us about your project.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5 max-w-2xl" data-testid="contact-form">
        <div>
          <label className="text-sm text-[var(--brand-soft)] font-medium">Name</label>
          <input className="lux-input w-full" {...register('name')} data-testid="contact-name" />
          {errors.name && <p className="text-sm text-red-400" data-testid="contact-name-error">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm text-[var(--brand-soft)] font-medium">Email</label>
          <input type="email" className="lux-input w-full" {...register('email')} data-testid="contact-email" />
          {errors.email && <p className="text-sm text-red-400" data-testid="contact-email-error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm text-[var(--brand-soft)] font-medium">Company</label>
          <input className="lux-input w-full" {...register('company')} data-testid="contact-company" />
        </div>
        <div>
          <label className="text-sm text-[var(--brand-soft)] font-medium">Service needed</label>
          <input placeholder="e.g. Web Development" className="lux-input w-full" {...register('service')} data-testid="contact-service" />
          {errors.service && <p className="text-sm text-red-400" data-testid="contact-service-error">{errors.service.message}</p>}
        </div>
        <div>
          <label className="text-sm text-[var(--brand-soft)] font-medium">Budget</label>
          <input placeholder="$5k - $15k" className="lux-input w-full" {...register('budget')} data-testid="contact-budget" />
        </div>
        <div>
          <label className="text-sm text-[var(--brand-soft)] font-medium">Message</label>
          <textarea rows={5} className="lux-input w-full" {...register('message')} data-testid="contact-message" />
          {errors.message && <p className="text-sm text-red-400" data-testid="contact-message-error">{errors.message.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="lux-btn-primary" data-testid="contact-submit">{isSubmitting? 'Sending...' : 'Send'}</button>
      </form>
    </main>
  );
}

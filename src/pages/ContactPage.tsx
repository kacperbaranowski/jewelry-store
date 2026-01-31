import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (_data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-center mb-4 text-text">
            Kontakt
          </h1>
          <p className="text-text-muted text-center mb-12">
            Masz pytania? Chętnie pomożemy. Skontaktuj się z nami używając
            poniższego formularza lub bezpośrednio.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-xl font-semibold mb-6 text-text">
                Informacje kontaktowe
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-text">Adres</p>
                    <p className="text-sm text-text-muted">
                      ul. Złota 15
                      <br />
                      00-019 Warszawa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-text">Telefon</p>
                    <a
                      href="tel:+48223334455"
                      className="text-sm text-text-muted hover:text-accent"
                    >
                      +48 22 333 44 55
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-text">Email</p>
                    <a
                      href="mailto:kontakt@aurelius.pl"
                      className="text-sm text-text-muted hover:text-accent"
                    >
                      kontakt@aurelius.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-text">Godziny otwarcia</p>
                    <p className="text-sm text-text-muted">
                      Pn-Pt: 10:00 - 19:00
                      <br />
                      Sob: 10:00 - 16:00
                      <br />
                      Nd: Zamknięte
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-xl font-semibold mb-6 text-text">
                Napisz do nas
              </h2>

              {isSuccess ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="m9 12 2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <p className="font-medium text-green-800 mb-2">
                    Wiadomość wysłana!
                  </p>
                  <p className="text-sm text-green-700">
                    Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 text-sm text-green-700 hover:text-green-800 underline"
                  >
                    Wyślij kolejną wiadomość
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    label="Imię i nazwisko"
                    {...register('name', { required: 'Pole wymagane' })}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Email"
                    type="email"
                    {...register('email', {
                      required: 'Email jest wymagany',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Nieprawidłowy adres email',
                      },
                    })}
                    error={errors.email?.message}
                  />
                  <Input
                    label="Temat"
                    {...register('subject', { required: 'Pole wymagane' })}
                    error={errors.subject?.message}
                  />
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text mb-1.5"
                    >
                      Wiadomość
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message', { required: 'Pole wymagane' })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                      aria-invalid={errors.message ? 'true' : 'false'}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

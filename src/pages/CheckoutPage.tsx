import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCartStore } from '../stores/cartStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { formatPrice } from '../utils/formatPrice';
import type { OrderFormData } from '../types';
import { cn } from '../utils/cn';

export function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OrderFormData>({
    defaultValues: {
      deliveryMethod: 'courier',
      paymentMethod: 'card',
    },
  });

  const deliveryMethod = watch('deliveryMethod');
  const paymentMethod = watch('paymentMethod');
  const subtotal = getTotalPrice();

  const onSubmit = async (_data: OrderFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(newOrderId);
    setOrderSuccess(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold mb-4 text-text">
            Koszyk jest pusty
          </h1>
          <p className="text-text-muted mb-8">
            Dodaj produkty do koszyka, aby złożyć zamówienie.
          </p>
          <Link to="/katalog">
            <Button variant="secondary" size="lg">
              Przeglądaj produkty
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="py-16 lg:py-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
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
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold mb-4 text-text">
            Zamówienie złożone!
          </h1>
          <p className="text-text-muted mb-2">
            Dziękujemy za złożenie zamówienia.
          </p>
          <p className="text-text font-medium mb-8">
            Numer zamówienia: <span className="text-accent">{orderId}</span>
          </p>
          <p className="text-sm text-text-muted mb-8">
            Potwierdzenie zamówienia zostało wysłane na podany adres email.
            Skontaktujemy się z Tobą w celu potwierdzenia szczegółów dostawy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline">Strona główna</Button>
            </Link>
            <Link to="/katalog">
              <Button variant="secondary">Kontynuuj zakupy</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl lg:text-3xl font-semibold mb-8 text-text">
          Zamówienie
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Info */}
              <section>
                <h2 className="font-heading text-lg font-semibold mb-4 text-text">
                  Dane osobowe
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Imię"
                    {...register('firstName', { required: 'Imię jest wymagane' })}
                    error={errors.firstName?.message}
                  />
                  <Input
                    label="Nazwisko"
                    {...register('lastName', { required: 'Nazwisko jest wymagane' })}
                    error={errors.lastName?.message}
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
                    label="Telefon"
                    type="tel"
                    {...register('phone', {
                      required: 'Telefon jest wymagany',
                      pattern: {
                        value: /^[0-9]{9,}$/,
                        message: 'Nieprawidłowy numer telefonu',
                      },
                    })}
                    error={errors.phone?.message}
                  />
                </div>
              </section>

              {/* Delivery Address */}
              <section>
                <h2 className="font-heading text-lg font-semibold mb-4 text-text">
                  Adres dostawy
                </h2>
                <div className="grid gap-4">
                  <Input
                    label="Ulica i numer"
                    {...register('address', { required: 'Adres jest wymagany' })}
                    error={errors.address?.message}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Miasto"
                      {...register('city', { required: 'Miasto jest wymagane' })}
                      error={errors.city?.message}
                    />
                    <Input
                      label="Kod pocztowy"
                      {...register('postalCode', {
                        required: 'Kod pocztowy jest wymagany',
                        pattern: {
                          value: /^[0-9]{2}-[0-9]{3}$/,
                          message: 'Format: XX-XXX',
                        },
                      })}
                      error={errors.postalCode?.message}
                      placeholder="00-000"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery Method */}
              <section>
                <h2 className="font-heading text-lg font-semibold mb-4 text-text">
                  Sposób dostawy
                </h2>
                <div className="space-y-3">
                  {[
                    { value: 'courier', label: 'Kurier', price: 'Gratis', desc: 'Dostawa 1-2 dni robocze' },
                    { value: 'parcel-locker', label: 'Paczkomat InPost', price: 'Gratis', desc: 'Dostawa 1-2 dni robocze' },
                    { value: 'pickup', label: 'Odbiór osobisty', price: 'Gratis', desc: 'ul. Złota 15, Warszawa' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        'flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors',
                        deliveryMethod === option.value
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent/50'
                      )}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register('deliveryMethod')}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-text">{option.label}</p>
                        <p className="text-sm text-text-muted">{option.desc}</p>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {option.price}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Payment Method */}
              <section>
                <h2 className="font-heading text-lg font-semibold mb-4 text-text">
                  Metoda płatności
                </h2>
                <div className="space-y-3">
                  {[
                    { value: 'card', label: 'Karta płatnicza', desc: 'Visa, Mastercard, American Express' },
                    { value: 'blik', label: 'BLIK', desc: 'Szybka płatność kodem BLIK' },
                    { value: 'transfer', label: 'Przelew bankowy', desc: 'Tradycyjny przelew na konto' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        'flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors',
                        paymentMethod === option.value
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent/50'
                      )}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register('paymentMethod')}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-text">{option.label}</p>
                        <p className="text-sm text-text-muted">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {/* Notes */}
              <section>
                <h2 className="font-heading text-lg font-semibold mb-4 text-text">
                  Uwagi do zamówienia
                </h2>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  placeholder="Dodatkowe informacje (opcjonalnie)"
                />
              </section>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-surface border border-border rounded-lg p-6">
                <h2 className="font-heading text-lg font-semibold mb-4 text-text">
                  Podsumowanie
                </h2>

                {/* Items */}
                <div className="space-y-3 pb-4 border-b border-border">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-text-muted">
                          Ilość: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-text">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="py-4 space-y-2 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Produkty</span>
                    <span className="text-text">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Dostawa</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between mb-6">
                    <span className="font-medium text-text">Razem</span>
                    <span className="font-heading text-xl font-semibold text-text">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Przetwarzanie...' : 'Złóż zamówienie'}
                  </Button>

                  <p className="mt-4 text-xs text-text-muted text-center">
                    Składając zamówienie akceptujesz regulamin sklepu oraz
                    politykę prywatności.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

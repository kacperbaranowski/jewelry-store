import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-heading text-xl font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
                aria-hidden="true"
              >
                <path d="M6 3h12l4 6-10 13L2 9l4-6z" />
                <path d="M11 3l1 10 1-10" />
                <path d="M2 9h20" />
              </svg>
              <span>Aurelius</span>
            </Link>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Ekskluzywna biżuteria dla wyjątkowych chwil. Od 1998 roku tworzymy
              niepowtarzalne dzieła jubilerskie.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4">Szybkie linki</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/katalog" className="text-sm text-white/70 hover:text-accent">
                  Katalog
                </Link>
              </li>
              <li>
                <Link to="/katalog?kategoria=rings" className="text-sm text-white/70 hover:text-accent">
                  Pierścionki
                </Link>
              </li>
              <li>
                <Link to="/katalog?kategoria=wedding" className="text-sm text-white/70 hover:text-accent">
                  Obrączki Ślubne
                </Link>
              </li>
              <li>
                <Link to="/ulubione" className="text-sm text-white/70 hover:text-accent">
                  Ulubione
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-medium mb-4">Obsługa Klienta</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kontakt" className="text-sm text-white/70 hover:text-accent">
                  Kontakt
                </Link>
              </li>
              <li>
                <span className="text-sm text-white/70">Dostawa i zwroty</span>
              </li>
              <li>
                <span className="text-sm text-white/70">FAQ</span>
              </li>
              <li>
                <span className="text-sm text-white/70">Gwarancja</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>ul. Złota 15, 00-019 Warszawa</li>
              <li>
                <a href="tel:+48223334455" className="hover:text-accent">
                  +48 22 333 44 55
                </a>
              </li>
              <li>
                <a href="mailto:kontakt@aurelius.pl" className="hover:text-accent">
                  kontakt@aurelius.pl
                </a>
              </li>
              <li className="pt-2">Pn-Pt: 10:00 - 19:00</li>
              <li>Sob: 10:00 - 16:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Aurelius. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-sm text-white/50">
            Design & Development by{' '}
            <a
              href="https://kacperbaranowski.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-white transition-colors"
            >
              kacperbaranowski.dev
            </a>
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/50 hover:text-accent"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-accent"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-accent"
              aria-label="Pinterest"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.81-2.425.853 0 1.265.641 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281.082.1.094.187.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.582-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

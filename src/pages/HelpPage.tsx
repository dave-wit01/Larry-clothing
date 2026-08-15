import { Clock3, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { MenuDrawer } from '../components/MenuDrawer';
import { ServicesDrawer } from '../components/ServicesDrawer';
import FullFooter from './Footer.jsx';

type HelpPageProps = {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onGoHome?: () => void;
  onNavigateCasual?: () => void;
  onNavigateSuit?: () => void;
  onNavigateOffice?: () => void;
  onNavigateStreet?: () => void;
  onNavigateTraditional?: () => void;
  onNavigateUnderwear?: () => void;
  onNavigateSocks?: () => void;
  onNavigateAbout?: () => void;
  onNavigateHelp?: () => void;
};

export default function HelpPage({
  onOpenLogin,
  onOpenRegister,
  onGoHome,
  onNavigateCasual,
  onNavigateSuit,
  onNavigateOffice,
  onNavigateStreet,
  onNavigateTraditional,
  onNavigateUnderwear,
  onNavigateSocks,
  onNavigateAbout,
  onNavigateHelp,
}: HelpPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '');
  const configuredEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim();
  const contactEmail = configuredEmail?.endsWith('@example.com') ? undefined : configuredEmail;
  const serviceArea = import.meta.env.VITE_SERVICE_AREA?.trim() || 'Accra, Ghana';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    ...(whatsappNumber
      ? [
          {
            icon: MessageCircle,
            title: 'WHATSAPP',
            description: 'Message us for order, delivery, and product support.',
            action: 'Start a conversation',
            href: `https://wa.me/${whatsappNumber}`,
          },
        ]
      : []),
    ...(contactEmail
      ? [
          {
            icon: Mail,
            title: 'EMAIL',
            description: 'Send us a message and we will get back to you.',
            action: contactEmail,
            href: `mailto:${contactEmail}`,
          },
        ]
      : []),
    { icon: MapPin, title: 'SERVICE AREA', description: `Serving customers in ${serviceArea}.` },
    {
      icon: Clock3,
      title: 'RESPONSE TIME',
      description: 'Our team responds within one business day.',
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        isScrolled={isScrolled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        onGoHome={onGoHome}
      />
      <MenuDrawer
        isOpen={isMenuOpen}
        isVisible={false}
        onClose={() => setIsMenuOpen(false)}
        onGoHome={onGoHome}
        onNavigate={(link) => {
          if (link === 'Casual wear') onNavigateCasual?.();
          if (link === 'Suit wear') onNavigateSuit?.();
          if (link === 'Office wear') onNavigateOffice?.();
          if (link === 'Street wear') onNavigateStreet?.();
          if (link === 'Traditional Outfit') onNavigateTraditional?.();
          if (link === 'Underwear') onNavigateUnderwear?.();
          if (link === 'Socks') onNavigateSocks?.();
          if (link === 'About CosLaary') onNavigateAbout?.();
        }}
      />
      <ServicesDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateHome={onGoHome}
        onNavigateCasual={onNavigateCasual}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      <main className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <section className="rounded-3xl border border-line bg-parchment px-6 py-12 sm:px-12">
          <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-emerald">
            Customer care
          </p>
          <h1 className="mt-4 text-center font-display text-4xl font-medium sm:text-5xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-ink/70 sm:text-base">
            Whether you need help with sizing, delivery, returns, or an existing order, our team is
            here to help.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <Icon className="mx-auto h-6 w-6 text-emerald" strokeWidth={1.5} />
                  <h2 className="mt-4 text-sm font-semibold tracking-wide">{card.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{card.description}</p>
                  {card.action && (
                    <span className="mt-5 inline-block text-sm font-medium underline underline-offset-4">
                      {card.action}
                    </span>
                  )}
                </>
              );

              return card.href ? (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith('https://') ? '_blank' : undefined}
                  rel={card.href.startsWith('https://') ? 'noreferrer' : undefined}
                  className="rounded-2xl border border-line bg-white p-7 text-center transition hover:-translate-y-0.5 hover:border-emerald"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={card.title}
                  className="rounded-2xl border border-line bg-white p-7 text-center"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <FullFooter
        onNavigateAbout={onNavigateAbout}
        onNavigateHelp={onNavigateHelp}
        onOpenServices={() => setIsMenuOpen(true)}
        onOpenRegister={onOpenRegister}
      />
    </div>
  );
}

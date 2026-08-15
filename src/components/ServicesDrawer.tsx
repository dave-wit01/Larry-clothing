import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { menuLinks } from '../data/navigation';
import { useNavigation } from '../context/NavigationContext';

type ServicesDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome?: () => void;
  onNavigateCasual?: () => void;
  onOpenMenu?: () => void;
};

const topItems = ['HOME'];
const bottomItems = ['CONTACT US', 'ABOUT COSLAARY'];

const menTargets = {
  'Casual wear': 'casual',
  'Office wear': 'office',
  'Suit wear': 'suit',
  'Street wear': 'street',
  'Traditional Outfit': 'traditional',
  Underwear: 'underwear',
  Socks: 'socks',
  'About CosLaary': 'about',
} as const;

export function ServicesDrawer({
  isOpen,
  onClose,
  onNavigateHome,
  onNavigateCasual,
}: ServicesDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenOpen, setIsMenOpen] = useState(false);
  const navigate = useNavigation();

  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (item: string) => {
    if (item === 'HOME' && onNavigateHome) {
      onNavigateHome();
    }
    if (item === 'CASUAL WEAR' && onNavigateCasual) {
      onNavigateCasual();
    }
    if (item === 'ABOUT COSLAARY' && navigate) {
      navigate('about');
    }
    if (item === 'CONTACT US' && navigate) {
      navigate('help');
    }
    onClose();
  };

  const handleMenNavigation = (link: keyof typeof menTargets) => {
    if (navigate) {
      navigate(menTargets[link]);
    } else if (link === 'Casual wear') {
      onNavigateCasual?.();
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Services menu"
    >
      <button
        type="button"
        aria-label="Close services menu"
        className="flex-1 bg-black/30"
        onClick={onClose}
      />
      <div className="flex h-full w-full max-w-sm flex-col bg-white text-ink shadow-xl sm:max-w-md">
        <div className="flex justify-end px-4 pt-4">
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded border border-ink/20 transition-colors hover:bg-ink/5"
            onClick={onClose}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="mt-4 flex flex-1 flex-col overflow-y-auto" aria-label="Services navigation">
          <ul>
            {topItems.map((item) => (
              <li key={item} className="border-b border-ink/10">
                <button
                  type="button"
                  className="block w-full px-6 py-5 text-left text-base font-semibold uppercase tracking-wide transition-colors hover:bg-ink/5"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <div className="border-b border-ink/10">
            <button
              type="button"
              className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-semibold uppercase tracking-wide transition-colors hover:bg-ink/5"
              aria-expanded={isMenOpen}
              aria-controls="services-men-collection"
              onClick={() => setIsMenOpen((open) => !open)}
            >
              Men
              <span aria-hidden="true">{isMenOpen ? '−' : '+'}</span>
            </button>
            {isMenOpen && (
              <ul
                id="services-men-collection"
                className="border-t border-ink/10 bg-ink/[0.03] py-2"
              >
                {menuLinks.Men.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="block w-full px-10 py-3 text-left text-sm font-medium transition-colors hover:bg-ink/5"
                      onClick={() => handleMenNavigation(link as keyof typeof menTargets)}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="h-6" />

          <ul>
            {bottomItems.map((item) => (
              <li key={item} className="border-b border-ink/10">
                <button
                  type="button"
                  className="block w-full px-6 py-5 text-left text-base font-semibold uppercase tracking-wide text-emerald transition-colors hover:bg-ink/5"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

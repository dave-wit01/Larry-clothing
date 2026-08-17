import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { menuLinks } from '../data/navigation';

type CreationsMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (category: string) => void;
};

export function CreationsMenu({ isOpen, onClose, onNavigate }: CreationsMenuProps) {
  const [isMenOpen, setIsMenOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Men collections"
    >
      <div className="w-full max-w-md bg-white text-ink shadow-xl">
        <button
          type="button"
          className="flex w-full items-center justify-between border-y-2 border-amber-500 px-6 py-5 text-left text-base font-semibold uppercase transition-colors hover:bg-ink/5"
          aria-expanded={isMenOpen}
          aria-controls="creations-men-collection"
          onClick={() => setIsMenOpen((open) => !open)}
        >
          Men
          {isMenOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
        {isMenOpen && (
          <nav id="creations-men-collection" aria-label="Men collections">
            <ul className="py-2">
              {menuLinks.Men.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className="block w-full px-10 py-3 text-left text-sm font-medium transition-colors hover:bg-ink/5"
                    onClick={() => onNavigate(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <button
        type="button"
        className="flex-1 bg-black/30"
        aria-label="Close men collections"
        onClick={onClose}
      />
    </div>
  );
}

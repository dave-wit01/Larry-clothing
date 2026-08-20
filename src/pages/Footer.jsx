import { useEffect, useState } from 'react';
import FooterBrand from '../components/footer/FooterBrand';
import FooterHistory from '../components/footer/FooterHistory';
import FooterLinks from '../components/footer/FooterLinks';
import FooterMeta from '../components/footer/FooterMeta';

export default function Footer({
  onNavigateAbout,
  onNavigateHelp,
  onOpenServices,
  onOpenRegister,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    let unsubscribe;
    let idleCallback;
    let timeout;

    const checkSession = () => {
      void import('../lib/supabase').then(({ supabase }) => {
        if (!supabase || !isCurrent) return;

        supabase.auth.getSession().then(({ data }) => {
          if (isCurrent) setIsLoggedIn(Boolean(data.session));
        });
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
          if (isCurrent) setIsLoggedIn(Boolean(session));
        });
        unsubscribe = () => listener.subscription.unsubscribe();
      });
    };

    if ('requestIdleCallback' in window) {
      idleCallback = window.requestIdleCallback(checkSession, { timeout: 2000 });
    } else {
      timeout = window.setTimeout(checkSession, 1200);
    }

    return () => {
      isCurrent = false;
      if (idleCallback) window.cancelIdleCallback(idleCallback);
      if (timeout) window.clearTimeout(timeout);
      unsubscribe?.();
    };
  }, []);

  return (
    <footer className="w-full flex-1 flex flex-col bg-white text-black">
      <FooterHistory />
      <div className="border-t border-gray-200" />
      <FooterBrand />
      <div className="border-t border-gray-200" />
      <FooterLinks
        onNavigateAbout={onNavigateAbout}
        onNavigateHelp={onNavigateHelp}
        onOpenServices={onOpenServices}
        onOpenRegister={onOpenRegister}
        showEmailSignup={!isLoggedIn}
      />
      <FooterMeta />
    </footer>
  );
}

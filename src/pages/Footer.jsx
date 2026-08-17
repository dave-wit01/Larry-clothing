import { useEffect, useState } from 'react';
import FooterBrand from '../components/footer/FooterBrand';
import FooterHistory from '../components/footer/FooterHistory';
import FooterLinks from '../components/footer/FooterLinks';
import FooterMeta from '../components/footer/FooterMeta';
import { supabase } from '../lib/supabase';

export default function Footer({ onNavigateAbout, onNavigateHelp, onOpenServices, onOpenRegister }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!supabase) return undefined;

    supabase.auth.getSession().then(({ data }) => setIsLoggedIn(Boolean(data.session)));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session));
    });

    return () => listener.subscription.unsubscribe();
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

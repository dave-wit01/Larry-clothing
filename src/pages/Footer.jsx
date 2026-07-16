import FooterBrand from '../components/footer/FooterBrand';
import FooterHistory from '../components/footer/FooterHistory';
import FooterLinks from '../components/footer/FooterLinks';
import FooterMeta from '../components/footer/FooterMeta';

export default function Footer() {
  return (
    <footer className="w-full flex-1 flex flex-col bg-white text-black">
      <FooterHistory />
      <div className="border-t border-gray-200" />
      <FooterBrand />
      <div className="border-t border-gray-200" />
      <FooterLinks />
      <FooterMeta />
    </footer>
  );
}

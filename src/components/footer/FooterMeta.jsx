import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom'

export default function FooterMeta() {
  return (
    <div className="max-w-3xl mx-auto mt-auto px-6 py-10 flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm md:text-base text-gray-800">
        <Link to="/sitemap" className="hover:text-gray-500 transition-colors">Sitemap</Link>
        <Link to="/legal" className="hover:text-gray-500 transition-colors">Legal &amp; privacy</Link>
        <Link to="/cookies" className="hover:text-gray-500 transition-colors">Cookies</Link>
      </div>
      <div className="flex items-center gap-2 text-sm md:text-base text-gray-800">
        <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center"><Globe className="w-4 h-4 text-white" /></span>
        <span>International (English)</span>
      </div>
    </div>
  );
}

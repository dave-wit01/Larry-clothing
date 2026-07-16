import { Globe } from 'lucide-react';

export default function FooterMeta() {
  return (
    <div className="max-w-3xl mx-auto mt-auto px-6 py-10 flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm md:text-base text-gray-800">
        <a href="#" className="hover:text-gray-500 transition-colors">Sitemap</a>
        <a href="#" className="hover:text-gray-500 transition-colors">Legal &amp; privacy</a>
        <a href="#" className="hover:text-gray-500 transition-colors">Cookies</a>
      </div>
      <div className="flex items-center gap-2 text-sm md:text-base text-gray-800">
        <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center"><Globe className="w-4 h-4 text-white" /></span>
        <span>International (English)</span>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Help', to: '/help' },
  { label: 'Services', to: '/services' },
  { label: 'About CosLarry', to: '/about' },
  { label: 'Email Sign-up', to: '/signup' },
]

export default function FooterLinks() {
  return (
    <nav className="w-full max-w-3xl mx-auto" aria-label="Footer navigation">
      {footerLinks.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="block px-6 py-5 text-base md:text-lg text-gray-900 border-b border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

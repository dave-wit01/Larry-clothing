const footerLinks = ['Help', 'Services', 'About Cos Larry', 'Email Sign-up'];

export default function FooterLinks() {
  return (
    <nav className="w-full max-w-3xl mx-auto" aria-label="Footer navigation">
      {footerLinks.map((item) => (
        <a
          key={item}
          href="#"
          className="block px-6 py-5 text-base md:text-lg text-gray-900 border-b border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {item}
        </a>
      ))}
    </nav>
  );
}

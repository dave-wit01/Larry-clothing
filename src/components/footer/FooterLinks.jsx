export default function FooterLinks({ onNavigateAbout, onNavigateHelp, onOpenServices, onOpenRegister }) {
  const footerLinks = [
    { label: 'Help', action: () => { if (onNavigateHelp) onNavigateHelp() } },
    { label: 'Services', action: () => { if (onOpenServices) onOpenServices() } },
    { label: 'About COSLARRY', action: () => { console.log('About clicked, onNavigateAbout is:', onNavigateAbout); if (onNavigateAbout) onNavigateAbout(); } },
    { label: 'Email Sign-up', action: () => { if (onOpenRegister) onOpenRegister() } },
  ]

  return (
    <nav className="w-full max-w-3xl mx-auto" aria-label="Footer navigation">
      {footerLinks.map((item) => (
        <button
          key={item.label}
          onClick={item.action || undefined}
          className="block w-full text-left px-6 py-5 text-base md:text-lg text-gray-900 border-b border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
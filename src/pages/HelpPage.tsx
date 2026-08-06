import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { MenuDrawer } from '../components/MenuDrawer'
import { ServicesDrawer } from '../components/ServicesDrawer'
import FullFooter from './Footer.jsx'

const colors = {
  navy: '#1a2238',
  cream: '#f7f5f0',
  line: '#e3e0d8',
  muted: '#5f6272',
}

const contactCards = [
  {
    icon: '📍',
    title: 'OUR MAIN OFFICE',
    lines: ['SoHo 94 Broadway St', 'New York, NY 1001'],
  },
  {
    icon: '📞',
    title: 'PHONE NUMBER',
    lines: ['234-9876-5400', '888-0123-4567 (Toll Free)'],
  },
  {
    icon: '🖨️',
    title: 'FAX',
    lines: ['1-234-567-8900'],
  },
  {
    icon: '✉️',
    title: 'EMAIL',
    lines: [],
    link: { text: 'hello@coslaary.com', href: 'mailto:hello@coslaary.com' },
  },
]

type HelpPageProps = {
  onOpenLogin?: () => void
  onOpenRegister?: () => void
  onGoHome?: () => void
  onNavigateCasual?: () => void
  onNavigateSuit?: () => void
  onNavigateOffice?: () => void
  onNavigateStreet?: () => void
  onNavigateTraditional?: () => void
  onNavigateUnderwear?: () => void
  onNavigateSocks?: () => void
  onNavigateAbout?: () => void
  onNavigateHelp?: () => void
}

export default function HelpPage({
  onOpenLogin,
  onOpenRegister,
  onGoHome,
  onNavigateCasual,
  onNavigateSuit,
  onNavigateOffice,
  onNavigateStreet,
  onNavigateTraditional,
  onNavigateUnderwear,
  onNavigateSocks,
  onNavigateAbout,
  onNavigateHelp,
}: HelpPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        isScrolled={isScrolled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
      />

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onGoHome={onGoHome}
        onNavigate={(link) => {
          if (link === 'Casual wear' && onNavigateCasual) onNavigateCasual()
          if (link === 'Suit wear' && onNavigateSuit) onNavigateSuit()
          if (link === 'Office wear' && onNavigateOffice) onNavigateOffice()
          if (link === 'Street wear' && onNavigateStreet) onNavigateStreet()
          if (link === 'Traditional Outfit' && onNavigateTraditional) onNavigateTraditional()
          if (link === 'Underwear' && onNavigateUnderwear) onNavigateUnderwear()
          if (link === 'Socks' && onNavigateSocks) onNavigateSocks()
          if (link === 'About CosLaary' && onNavigateAbout) onNavigateAbout()
        }}
      />

      <ServicesDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateHome={onGoHome}
        onNavigateCasual={onNavigateCasual}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div
          style={{
            background: colors.cream,
            color: colors.navy,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            minHeight: '100vh',
            borderRadius: 12,
            padding: '36px 28px',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: '0.02em',
              margin: '0 0 18px',
            }}
          >
            How can we help you?
          </h1>

          <p
            style={{
              textAlign: 'center',
              color: colors.muted,
              fontSize: 15,
              lineHeight: 1.8,
              marginBottom: 34,
              maxWidth: 680,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <strong style={{ color: colors.navy, fontWeight: 600 }}>
              We're here for anything you need, before or after your order.
            </strong>{' '}
            Reach out about sizing, shipping, returns, or anything else on your
            mind — our team responds within one business day.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 18,
            }}
          >
            {contactCards.map((card) => (
              <div
                key={card.title}
                style={{
                  background: '#fff',
                  border: `1px solid ${colors.line}`,
                  borderRadius: 10,
                  padding: '26px 18px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{card.icon}</div>
                <h3
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </h3>
                {card.lines.map((line) => (
                  <p
                    key={line}
                    style={{ fontSize: 13, color: colors.muted, lineHeight: 1.6 }}
                  >
                    {line}
                  </p>
                ))}
                {card.link && (
                  <p style={{ fontSize: 13, lineHeight: 1.6 }}>
                    <a
                      href={card.link.href}
                      style={{ color: colors.navy, textDecoration: 'underline' }}
                    >
                      {card.link.text}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <FullFooter
        onNavigateAbout={onNavigateAbout}
        onNavigateHelp={onNavigateHelp}
        onOpenServices={() => setIsMenuOpen(true)}
        onOpenRegister={onOpenRegister}
      />
    </div>
  )
}

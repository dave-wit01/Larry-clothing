import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { MenuDrawer } from '../components/MenuDrawer'
import { ServicesDrawer } from '../components/ServicesDrawer'
import FullFooter from './Footer.jsx'

const ABOUT_META_DESCRIPTION =
  'COSLAARY is a Ghanaian fashion brand from Accra, blending contemporary streetwear with distinctive design. Wear your identity.'

const featuredClassName = 'py-2 text-base font-semibold tracking-widest text-ink'

type AboutPageProps = {
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
  onNavigateHelp?: () => void
}

export function AboutPage({
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
  onNavigateHelp,
}: AboutPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const created = !meta
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    const previous = meta.content
    meta.content = ABOUT_META_DESCRIPTION

    return () => {
      if (created) meta.remove()
      else meta.content = previous
    }
  }, [])

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        isScrolled={isScrolled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        onGoHome={onGoHome}
      />
      <MenuDrawer
        isOpen={isMenuOpen}
        isVisible={false}
        onClose={() => setIsMenuOpen(false)}
        onGoHome={onGoHome}
        onNavigate={(link) => {
          if (link === 'Casual wear' && onNavigateCasual) {
            onNavigateCasual()
          }
          if (link === 'Suit wear' && onNavigateSuit) {
            onNavigateSuit()
          }
          if (link === 'Office wear' && onNavigateOffice) {
            onNavigateOffice()
          }
          if (link === 'Street wear' && onNavigateStreet) {
            onNavigateStreet()
          }
          if (link === 'Traditional Outfit' && onNavigateTraditional) {
            onNavigateTraditional()
          }
          if (link === 'Underwear' && onNavigateUnderwear) {
            onNavigateUnderwear()
          }
          if (link === 'Socks' && onNavigateSocks) {
            onNavigateSocks()
          }
        }}
      />

      <ServicesDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateHome={onGoHome}
        onNavigateCasual={onNavigateCasual}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      <main className="flex flex-col items-center px-6 py-10 text-center">
        <section className="max-w-md mb-12">
          <h2 className="text-sm font-medium tracking-widest uppercase mb-6">The Story of COSLAARY</h2>
          <div className="space-y-4 text-sm leading-relaxed text-ink/80">
            <p>
              COSLAARY was born from a simple belief: you don't have to follow the world's definition of style—you can create your own.
            </p>
            <p>
              Built from passion, creativity, and the desire to stand apart, COSLAARY represents a new generation of fashion—one that values individuality, confidence, and authentic self-expression.
            </p>
            <p>
              From the streets of Accra, Ghana, COSLAARY is more than a clothing brand. It is a statement. Every piece is created with the intention of making the person wearing it feel different, confident, and unforgettable.
            </p>
            <p>
              The journey began with a love for fashion and the craft of creating. What started as an idea grew into a vision: to build a Ghanaian fashion brand with a global identity.
            </p>
            <p>
              COSLAARY blends contemporary streetwear with clean, distinctive design. We believe fashion should not simply cover you—it should tell people who you are without you having to say a word.
            </p>
            <p>Every stitch, silhouette, detail, and logo represents the same philosophy:</p>
            <p className={featuredClassName}>BE DIFFERENT. BE CONFIDENT. BE ICONIC.</p>
            <p>
              COSLAARY is for those who refuse to blend into the crowd. For the dreamers, creators, leaders, and individuals who understand that style is personal.
            </p>
            <p>We are building more than clothes.</p>
            <p>We are building a culture.</p>
            <p>From Accra to the world, this is COSLAARY.</p>
            <p className={featuredClassName}>
              WEAR YOUR IDENTITY.
              <br />
              MAKE YOUR MARK.
              <br />
              BECOME ICONIC.
            </p>
          </div>
        </section>

        <section className="max-w-md mb-12">
          <h2 className="text-sm font-medium tracking-widest uppercase mb-6">The Founder's Story</h2>
          <div className="space-y-4 text-sm leading-relaxed text-ink/80">
            <p>
              My name is Nforjoe, and COSLAARY is more than a clothing brand. It is a dream I chose to believe in.
            </p>
            <p>
              I started with a love for fashion and the desire to create something that represented who I am. As a tailor and fashion designer, I discovered that clothing could be more than fabric and stitches. It could carry emotion. It could carry identity. It could tell a story.
            </p>
            <p>That story became COSLAARY.</p>
            <p>
              Building this brand has not always been easy. There have been moments of uncertainty, limited resources, setbacks, and times when the dream seemed far away. But every challenge taught me something. Every mistake made me better. Every piece I created reminded me why I started.
            </p>
            <p>I kept going because I believe that great things can come from small beginnings.</p>
            <p>COSLAARY was born in Accra, Ghana—but I never envisioned it staying in one place.</p>
            <p>
              I envision COSLAARY becoming a global Ghanaian fashion house—a brand that carries the creativity, ambition, craftsmanship, and spirit of Ghana to every corner of the world.
            </p>
            <p>
              I want someone in Accra, London, New York, Paris, Lagos, Dubai, or anywhere else to wear COSLAARY and immediately recognize that they are wearing something with a story.
            </p>
            <p>A story that started in Ghana.</p>
            <p>
              My vision is to build a fashion house that represents more than clothing. I want COSLAARY to grow into a complete lifestyle—bringing together fashion, footwear, accessories, creative art, culture, and experiences.
            </p>
            <p>
              I want to create opportunities for other young Ghanaian creatives, collaborate with talented artists and designers, develop world-class products, and prove that a brand born in Ghana can compete confidently on the international stage.
            </p>
            <p>I don't want COSLAARY to simply follow global fashion. I want COSLAARY to help shape it.</p>
            <p>
              The journey from a small idea to a global fashion house will take time. It will require discipline, sacrifice, creativity, patience, and faith.
            </p>
            <p>But I'm willing to build it one piece at a time.</p>
            <p>Because I believe the future belongs to those who are brave enough to create it.</p>
            <p>COSLAARY is my journey.</p>
            <p>It is my expression.</p>
            <p>It is my belief that where you come from does not determine how far your vision can go.</p>
            <p className={featuredClassName}>
              Born in Ghana.
              <br />
              Built through passion.
              <br />
              Driven by vision.
              <br />
              Created for the world.
            </p>
            <p>This is COSLAARY.</p>
            <p className={featuredClassName}>FROM ACCRA TO THE WORLD.</p>
          </div>

          <div className="mt-10 border-t border-ink/15 pt-6">
            <p className="text-base font-semibold tracking-[0.3em] text-ink">NFORJOE</p>
            <p className="mt-2 text-xs tracking-wide text-ink/70">
              Founder &amp; Creative Director, of the COSLAARY brand!
            </p>
          </div>
        </section>
      </main>

      <FullFooter onNavigateHelp={onNavigateHelp} onOpenServices={() => setIsMenuOpen(true)} onOpenRegister={onOpenRegister} />
    </div>
  )
}

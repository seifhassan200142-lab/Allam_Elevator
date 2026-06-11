import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpDown,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Crown,
  DoorOpen,
  ExternalLink,
  Gem,
  Globe2,
  Home,
  Hospital,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Siren,
  Truck,
  UsersRound,
  Wrench,
  X,
} from 'lucide-react'
import { content, FACEBOOK_URL, WHATSAPP_NUMBER } from './content'
import './App.css'

const PUBLIC_ASSET_BASE = import.meta.env.BASE_URL
const publicAsset = (path) => `${PUBLIC_ASSET_BASE}${path.replace(/^\/+/, '')}`

const serviceIcons = [Home, Building2, BriefcaseBusiness, Layers3, Hospital, Truck, Wrench]
const safetyIcons = [ShieldCheck, DoorOpen, Siren, ClipboardCheck, CalendarCheck, UsersRound]
const materialClasses = ['bronze', 'steel', 'marble', 'wood', 'glass', 'mirror']
const sectionMotion = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: 'easeOut' },
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14 8.9h2.35V5.18c-.4-.06-1.8-.18-3.43-.18-3.4 0-5.72 2.07-5.72 5.88v3.32H3.36v4.16H7.2V24h4.72v-5.64h3.69l.59-4.16h-4.28v-2.91c0-1.2.34-2.39 2.08-2.39Z"
      />
    </svg>
  )
}

function getStoredLanguage() {
  if (typeof window === 'undefined') return 'en'
  return localStorage.getItem('allam-language') === 'ar' ? 'ar' : 'en'
}

function makeWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function Logo({ lang, compact = false }) {
  const t = content[lang]
  const [hasLogo, setHasLogo] = useState(true)

  return (
    <a href="#home" className={`brand ${compact ? 'brand--compact' : ''}`} aria-label={t.brand}>
      <span className="brand__mark" aria-hidden="true">
        {hasLogo ? (
          <picture>
            <source srcSet={publicAsset('images/logo.webp')} type="image/webp" />
            <img src={publicAsset('images/logo.png')} alt="" width="256" height="256" decoding="async" onError={() => setHasLogo(false)} />
          </picture>
        ) : (
          <Crown size={22} />
        )}
      </span>
      <span className="brand__copy">
        <strong>{t.brand}</strong>
        {!compact && <small>{t.brandSecondary}</small>}
      </span>
    </a>
  )
}

function SectionHeader({ data, center = false }) {
  return (
    <div className={`section-header ${center ? 'section-header--center' : ''}`}>
      <span className="eyebrow">{data.eyebrow}</span>
      <h2>{data.title}</h2>
      <p>{data.text}</p>
    </div>
  )
}

function MagneticButton({ href, children, variant = 'primary', icon: Icon = ArrowRight, external = false, directional = Icon === ArrowRight }) {
  return (
    <a
      className={`btn btn--${variant} ${directional ? 'btn--directional' : ''}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <span>{children}</span>
      <Icon size={18} />
    </a>
  )
}

function Navbar({ lang, setLang, nav, whatsappLink }) {
  const [open, setOpen] = useState(false)
  const navItems = [
    ['home', nav.home],
    ['solutions', nav.solutions],
    ['design', nav.design],
    ['safety', nav.safety],
    ['projects', nav.projects],
    ['contact', nav.contact],
  ]

  const changeLanguage = (nextLang) => {
    setLang(nextLang)
    setOpen(false)
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <Logo lang={lang} />

        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? nav.closeMenu : nav.openMenu}
          aria-expanded={open}
          aria-controls="primary-navigation-panel"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div id="primary-navigation-panel" className={`nav-panel ${open ? 'is-open' : ''}`}>
          <div className="nav-links">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <div className="language-switcher" aria-label="Language switcher">
              <Globe2 size={16} />
              <button
                type="button"
                className={lang === 'en' ? 'active' : ''}
                onClick={() => changeLanguage('en')}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
              <span>/</span>
              <button
                type="button"
                className={lang === 'ar' ? 'active' : ''}
                onClick={() => changeLanguage('ar')}
                aria-pressed={lang === 'ar'}
              >
                AR
              </button>
            </div>
            <a className="icon-link" href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a className="icon-link icon-link--whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

function FloorIndicator({ floors }) {
  return (
    <aside className="floor-indicator" aria-label="Elevator journey navigation">
      <div className="floor-indicator__rail" aria-hidden="true" />
      {floors.map(([floor, label, id]) => (
        <a key={`${floor}-${id}`} href={`#${id}`} className="floor-indicator__item">
          <span>{floor}</span>
          <small>{label}</small>
        </a>
      ))}
    </aside>
  )
}

function ImageFrame({ alt }) {
  const [imageReady, setImageReady] = useState(true)

  return (
    <div className="hero-visual" aria-label={alt}>
      <div className="hero-visual__halo" />
      <div className="hero-visual__panel">
        {imageReady ? (
          <picture>
            <source srcSet={publicAsset('images/hero-elevator.webp')} type="image/webp" />
            <img
              src={publicAsset('images/hero-elevator.png')}
              alt={alt}
              width="900"
              height="720"
              decoding="async"
              fetchPriority="high"
              onError={() => setImageReady(false)}
            />
          </picture>
        ) : (
          <div className="hero-placeholder" role="img" aria-label={alt}>
            <ArrowUpDown size={54} />
            <span>Allam Elevators</span>
          </div>
        )}
      </div>
      <div className="hero-visual__badge">
        <ArrowUpDown size={18} />
        <span>G</span>
        <i />
        <span>5</span>
      </div>
    </div>
  )
}

function Hero({ lang, t, quoteLink, whatsappLink }) {
  return (
    <section id="home" className="hero-section section-shell">
      <div className="hero-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1>{t.hero.headline}</h1>
          <h2>{t.hero.subheadline}</h2>
          <p>{t.hero.text}</p>
          <div className="hero-actions">
            <MagneticButton href={quoteLink} external>{t.hero.quote}</MagneticButton>
            <MagneticButton href={whatsappLink} variant="ghost" icon={MessageCircle} external>{t.hero.whatsapp}</MagneticButton>
          </div>
          <div className="trust-bar" aria-label="Trust highlights">
            {t.hero.trust.map((item) => (
              <span key={item}>
                <CheckCircle2 size={16} />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, delay: 0.12 }}>
          <ImageFrame alt={t.hero.imageAlt} lang={lang} />
        </motion.div>
      </div>
    </section>
  )
}

function Solutions({ t }) {
  return (
    <motion.section id="solutions" className="section-shell" {...sectionMotion}>
      <SectionHeader data={t.sections.solutions} />
      <div className="solutions-grid">
        {t.solutions.map(([title, text], index) => {
          const Icon = serviceIcons[index % serviceIcons.length]
          return (
            <article className="solution-card glass-card" key={title}>
              <div className="card-icon"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          )
        })}
      </div>
    </motion.section>
  )
}

function DesignStudio({ t }) {
  return (
    <motion.section id="design" className="section-shell design-section" {...sectionMotion}>
      <SectionHeader data={t.sections.design} center />
      <div className="materials-grid">
        {t.materials.map(([title, text], index) => (
          <article className={`material-card material-card--${materialClasses[index]}`} key={title}>
            <div className="material-card__swatch" />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  )
}

function SafetyEngineering({ t }) {
  return (
    <motion.section id="safety" className="section-shell safety-section" {...sectionMotion}>
      <div className="split-layout">
        <SectionHeader data={t.sections.safety} />
        <div className="engineering-panel">
          <div className="engineering-panel__rings" aria-hidden="true" />
          <ShieldCheck size={46} />
          <h3>{t.sections.safety.eyebrow}</h3>
          <p>{t.sections.safety.text}</p>
        </div>
      </div>
      <div className="focus-grid">
        {t.safety.map(([title, text], index) => {
          const Icon = safetyIcons[index % safetyIcons.length]
          return (
            <article className="focus-card" key={title}>
              <Icon size={21} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          )
        })}
      </div>
    </motion.section>
  )
}

function ProcessTimeline({ t }) {
  return (
    <motion.section className="section-shell process-section" {...sectionMotion}>
      <SectionHeader data={t.sections.process} center />
      <div className="timeline">
        {t.process.map(([title, text], index) => (
          <article className="timeline-step" key={title}>
            <span className="timeline-step__number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </motion.section>
  )
}

function ProjectsGallery({ t }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = t.filters[activeIndex] || t.filters[0]
  const cards = activeIndex === 0 ? t.projectCards : t.projectCards.filter((card) => card[1] === active)

  return (
    <motion.section id="projects" className="section-shell projects-section" {...sectionMotion}>
      <SectionHeader data={t.sections.projects} />
      <div className="filter-row" aria-label="Project filters">
        {t.filters.map((filter, index) => (
          <button key={filter} type="button" className={activeIndex === index ? 'active' : ''} onClick={() => setActiveIndex(index)}>
            {filter}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {cards.map(([title, category, text], index) => (
          <article className="project-card" key={title}>
            <div className="project-card__visual">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Gem size={30} />
            </div>
            <div className="project-card__body">
              <small>{category}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  )
}

function MaintenancePlans({ t, whatsappLink }) {
  return (
    <motion.section id="maintenance" className="section-shell maintenance-section" {...sectionMotion}>
      <SectionHeader data={t.sections.maintenance} center />
      <div className="plans-grid">
        {t.plans.map((plan, index) => (
          <article className={`plan-card ${index === 1 ? 'plan-card--featured' : ''}`} key={plan.name}>
            <span className="plan-card__tag">{plan.tag}</span>
            <h3>{plan.name}</h3>
            <p>{plan.text}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckCircle2 size={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <MagneticButton href={whatsappLink} variant={index === 1 ? 'primary' : 'ghost'} icon={MessageCircle} external>
              {t.hero.whatsapp}
            </MagneticButton>
          </article>
        ))}
      </div>
    </motion.section>
  )
}

function ContactSection({ lang, t }) {
  const initialForm = useMemo(
    () => ({ name: '', phone: '', buildingType: '', floors: '', city: '', message: '' }),
    [],
  )
  const [form, setForm] = useState(initialForm)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submitForm = (event) => {
    event.preventDefault()
    const labels = t.contact
    const message =
      lang === 'ar'
        ? `مرحبًا مصاعد علام، أريد طلب عرض سعر.\n\n${labels.name}: ${form.name || '-'}\n${labels.phone}: ${form.phone || '-'}\n${labels.buildingType}: ${form.buildingType || '-'}\n${labels.floors}: ${form.floors || '-'}\n${labels.city}: ${form.city || '-'}\n${labels.message}: ${form.message || '-'}`
        : `Hello Allam Elevators, I would like to request a quote.\n\n${labels.name}: ${form.name || '-'}\n${labels.phone}: ${form.phone || '-'}\n${labels.buildingType}: ${form.buildingType || '-'}\n${labels.floors}: ${form.floors || '-'}\n${labels.city}: ${form.city || '-'}\n${labels.message}: ${form.message || '-'}`

    const whatsappWindow = window.open(makeWhatsAppLink(message), '_blank', 'noopener,noreferrer')
    if (whatsappWindow) whatsappWindow.opener = null
  }

  return (
    <motion.section id="contact" className="section-shell contact-section" {...sectionMotion}>
      <SectionHeader data={t.sections.contact} />
      <div className="contact-grid">
        <form className="quote-form" onSubmit={submitForm}>
          <h3>{t.contact.formTitle}</h3>
          <label>
            <span>{t.contact.name}</span>
            <input name="name" value={form.name} onChange={updateField} autoComplete="name" />
          </label>
          <label>
            <span>{t.contact.phone}</span>
            <input name="phone" value={form.phone} onChange={updateField} autoComplete="tel" inputMode="tel" />
          </label>
          <label>
            <span>{t.contact.buildingType}</span>
            <select name="buildingType" value={form.buildingType} onChange={updateField}>
              <option value="">{t.contact.selectPlaceholder}</option>
              {t.contact.buildingTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            <span>{t.contact.floors}</span>
            <input name="floors" value={form.floors} onChange={updateField} inputMode="numeric" />
          </label>
          <label>
            <span>{t.contact.city}</span>
            <input name="city" value={form.city} onChange={updateField} autoComplete="address-level2" />
          </label>
          <label className="full-field">
            <span>{t.contact.message}</span>
            <textarea name="message" value={form.message} onChange={updateField} rows="5" />
          </label>
          <button type="submit" className="btn btn--primary form-submit">
            <span>{t.contact.submit}</span>
            <MessageCircle size={18} />
          </button>
        </form>

        <aside className="contact-card">
          <div className="contact-card__top">
            <span className="contact-card__icon"><Phone size={24} /></span>
            <div>
              <h3>{t.contact.infoTitle}</h3>
              <p>{t.sections.contact.text}</p>
            </div>
          </div>
          <ul className="contact-list">
            <li><Phone size={18} /><span>{t.contact.phonePlaceholder}</span></li>
            <li><MapPin size={18} /><span>{t.contact.cityPlaceholder}</span></li>
            <li><Mail size={18} /><span>{t.contact.emailPlaceholder}</span></li>
            <li><Clock size={18} /><span>{t.contact.hoursPlaceholder}</span></li>
          </ul>
          <div className="contact-actions">
            <MagneticButton href={FACEBOOK_URL} variant="ghost" icon={FacebookIcon} external>{t.contact.facebook}</MagneticButton>
            <MagneticButton href={makeWhatsAppLink(t.contact.defaultMessage)} variant="primary" icon={MessageCircle} external>{t.contact.whatsapp}</MagneticButton>
          </div>
        </aside>
      </div>
    </motion.section>
  )
}

function Footer({ lang, t, whatsappLink }) {
  const footerLinks = [
    ['home', t.nav.home],
    ['solutions', t.nav.solutions],
    ['design', t.nav.design],
    ['safety', t.nav.safety],
    ['projects', t.nav.projects],
    ['contact', t.nav.contact],
  ]

  return (
    <footer className="site-footer">
      <div className="footer-grid section-shell">
        <div className="footer-brand">
          <Logo lang={lang} />
          <p>{t.footer.description}</p>
          <div className="footer-socials">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
          </div>
        </div>
        <div>
          <h3>{t.footer.quickLinks}</h3>
          <ul>
            {footerLinks.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
          </ul>
        </div>
        <div>
          <h3>{t.footer.services}</h3>
          <ul>
            {t.solutions.slice(0, 6).map(([title]) => <li key={title}><a href="#solutions">{title}</a></li>)}
          </ul>
        </div>
        <div>
          <h3>{t.footer.contact}</h3>
          <ul>
            <li><a href={whatsappLink} target="_blank" rel="noreferrer">{t.contact.phonePlaceholder}</a></li>
            <li><a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook <ExternalLink size={13} /></a></li>
            <li><span>{t.contact.cityPlaceholder}</span></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <span>© {new Date().getFullYear()} {t.brand}.</span>
        <span>{t.footer.copyright}</span>
      </div>
    </footer>
  )
}

function App() {
  const [lang, setLang] = useState(getStoredLanguage)
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('allam-language', lang)
  }, [lang])

  const defaultWhatsappMessage = t.contact.defaultMessage
  const whatsappLink = makeWhatsAppLink(defaultWhatsappMessage)
  const quoteLink = makeWhatsAppLink(
    lang === 'ar'
      ? 'مرحبًا مصاعد علام، أريد طلب عرض سعر لمشروع مصعد.'
      : 'Hello Allam Elevators, I would like to request a quote for an elevator project.',
  )

  return (
    <div className="app-shell">
      <a className="skip-link" href="#home">{t.nav.skipToContent}</a>
      <Navbar lang={lang} setLang={setLang} nav={t.nav} whatsappLink={whatsappLink} />
      <FloorIndicator floors={t.floors} />
      <main>
        <Hero lang={lang} t={t} quoteLink={quoteLink} whatsappLink={whatsappLink} />
        <Solutions t={t} />
        <DesignStudio t={t} />
        <SafetyEngineering t={t} />
        <ProcessTimeline t={t} />
        <ProjectsGallery t={t} />
        <MaintenancePlans t={t} whatsappLink={whatsappLink} />
        <ContactSection lang={lang} t={t} />
      </main>
      <Footer lang={lang} t={t} whatsappLink={whatsappLink} />
      <a className="floating-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label={t.hero.whatsapp}>
        <MessageCircle size={23} />
      </a>
    </div>
  )
}

export default App

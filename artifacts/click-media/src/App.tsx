import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Instagram, Linkedin, MoveUpRight, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import heroVideo from '@assets/فيديو_جرش_بصري_بدون_كتابة_1789598163383.mp4';
import heroPoster from '@assets/jerash-poster.jpg';
import clickLogo from '@assets/image_1789598199751.png';
import alMawjoodat from '@assets/photo_2_2026-09-17_01-33-31_1789598031304.jpg';
import arabicLogo from '@assets/photo_1_2026-09-17_01-33-31_1789598055631.jpg';
import luca from '@assets/photo_7_2026-09-17_01-33-31_1789598069398.jpg';
import sakib from '@assets/photo_3_2026-09-17_01-33-31_1789598084245.jpg';
import xfit from '@assets/photo_4_2026-09-17_01-33-31_1789598106677.jpg';
import shawarma from '@assets/photo_5_2026-09-17_01-33-31_1789598120401.jpg';
import goldChalets from '@assets/image_1789598575588.png';

const queryClient = new QueryClient();
const instagramUrl = 'https://www.instagram.com/cli.ckjo?stkn=MTlqeHYwbmw4aG5oOA%3D%3D&utm_source=qr';
const phoneNumber = '0778957212';

type WorkItem = {
  title: string;
  category: string;
  type: string;
  image: string;
  accent: string;
  description: string;
};

const work: WorkItem[] = [
  { title: 'Al Mawjoodat', category: 'Brand systems', type: 'identity', image: alMawjoodat, accent: '#ef3740', description: 'A clear visual language for light and electric.' },
  { title: 'Luca Café', category: 'Identity & content', type: 'identity', image: luca, accent: '#d8cfbe', description: 'A warm, editorial identity with a late-night pulse.' },
  { title: 'Sakib Sports Academy', category: 'Brand identity', type: 'identity', image: sakib, accent: '#d7a839', description: 'Competitive energy built into every mark.' },
  { title: 'X Fit Gym', category: 'Campaign direction', type: 'campaigns', image: xfit, accent: '#f31831', description: 'A bold visual system for an active community.' },
  { title: 'Shawarma Al-Shami', category: 'Visual identity', type: 'identity', image: shawarma, accent: '#ff8f25', description: 'A character-led mark made for hungry audiences.' },
  { title: 'Arabic form, new frame', category: 'Logo design', type: 'identity', image: arabicLogo, accent: '#c7dcff', description: 'A considered Arabic wordmark with a tactile edge.' },
  { title: 'Gold Chalets & Real Estate', category: 'Real estate campaign', type: 'campaigns', image: goldChalets, accent: '#d9a45f', description: 'A warm visual direction for spaces designed to stay with you.' },
];

type Service = {
  number: string;
  title: string;
  arabicTitle: string;
  description: string;
  image?: string;
  video?: string;
  imageAlt: string;
  link?: string;
};

const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Brand systems',
    arabicTitle: 'أنظمة العلامة التجارية',
    description: 'Names, identities, guidelines and the visual grammar that makes a business unmistakable.',
    image: alMawjoodat,
    imageAlt: 'Al Mawjoodat light and electric identity',
    link: '#work',
  },
  {
    number: '02',
    title: 'Moving images',
    arabicTitle: 'الصورة المتحركة',
    description: 'Films, social content, photography and the right frame for the story you need to tell.',
    video: heroVideo,
    imageAlt: 'Cinematic footage from Jerash',
    link: '#work',
  },
  {
    number: '03',
    title: 'Digital experiences',
    arabicTitle: 'التجارب الرقمية',
    description: 'Websites and campaigns that turn attention into an experience people remember.',
    image: goldChalets,
    imageAlt: 'Gold Chalets and Real Estate campaign artwork',
    link: '#work',
  },
];

function AppLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5" data-testid="brand-click-media">
      <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden border border-[#27d5e8]/70 bg-[#10151f]">
        <img src={clickLogo} alt="" className="h-full w-full object-cover opacity-90 mix-blend-screen" />
      </span>
      {!compact && <span className="display-font text-[1.05rem] font-semibold tracking-[.04em] text-[#f2f4f5]">CLICK<span className="text-[#27d5e8]">.</span></span>}
    </span>
  );
}

function SectionKicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`mono-font mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[.26em] ${light ? 'text-[#27d5e8]' : 'text-[#27d5e8]'}`}><span className="inline-block h-px w-8 bg-[#27d5e8]" />{children}</p>;
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090d]/80 px-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="contact-heading" data-testid="dialog-contact">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-auto border border-white/15 bg-[#121821] p-7 shadow-2xl md:p-10">
        <button onClick={onClose} className="absolute right-5 top-5 text-[#a2acb9] transition-colors hover:text-[#27d5e8]" aria-label="Close contact form" data-testid="button-close-contact"><X size={20} /></button>
        {!sent ? (
          <>
            <SectionKicker>Start a conversation</SectionKicker>
            <h2 id="contact-heading" className="display-font max-w-md text-4xl leading-[.98] text-[#f3f5f6] md:text-5xl">Tell us what you want the world to see.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#a2acb9]">Give us the loose version. We will bring the questions, the structure and a point of view.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#d9e0e5]">
              <a href={`tel:+962${phoneNumber.slice(1)}`} className="transition-colors hover:text-[#27d5e8]" data-testid="link-contact-phone">{phoneNumber}</a>
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#27d5e8]" data-testid="link-contact-instagram">@cli.ckjo on Instagram</a>
            </div>
            <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block"><span className="mono-font mb-2 block text-[10px] uppercase tracking-[.2em] text-[#748090]">Your name</span><input required type="text" placeholder="Name" className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-[#f3f5f6] outline-none transition-colors placeholder:text-[#637080] focus:border-[#27d5e8]" data-testid="input-contact-name" /></label>
                <label className="block"><span className="mono-font mb-2 block text-[10px] uppercase tracking-[.2em] text-[#748090]">Email</span><input required type="email" placeholder="you@company.com" className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-[#f3f5f6] outline-none transition-colors placeholder:text-[#637080] focus:border-[#27d5e8]" data-testid="input-contact-email" /></label>
              </div>
              <label className="block"><span className="mono-font mb-2 block text-[10px] uppercase tracking-[.2em] text-[#748090]">What are we making?</span><textarea required rows={3} placeholder="A film, a new identity, a digital experience..." className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-[#f3f5f6] outline-none transition-colors placeholder:text-[#637080] focus:border-[#27d5e8]" data-testid="input-contact-message" /></label>
              <button type="submit" className="group flex w-full items-center justify-between bg-[#27d5e8] px-5 py-4 text-left text-sm font-bold text-[#10151f] transition-colors hover:bg-[#f3f5f6]" data-testid="button-submit-contact"><span>Send enquiry</span><ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
            </form>
          </>
        ) : (
          <div className="flex min-h-[360px] flex-col justify-center">
            <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#27d5e8] text-[#10151f]"><Check size={22} /></span>
            <h2 className="display-font text-5xl leading-none text-[#f3f5f6]">Received.</h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#a2acb9]">Your note is in. We will get back to you with a useful first thought, not an automated reply.</p>
            <button onClick={onClose} className="mt-8 flex w-fit items-center gap-3 border border-white/20 px-5 py-3 text-sm text-[#f3f5f6] transition-colors hover:border-[#27d5e8] hover:text-[#27d5e8]" data-testid="button-finish-contact">Back to the work <ArrowUpRight size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const filters = [{ label: 'All work', value: 'all' }, { label: 'Identity', value: 'identity' }, { label: 'Campaigns', value: 'campaigns' }];
  const visibleWork = filter === 'all' ? work : work.filter((item) => item.type === filter);
  return (
    <section id="work" className="section-pad bg-[#f0eee9] text-[#10151f]" data-testid="section-work">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionKicker>Selected work</SectionKicker>
            <h2 className="display-font max-w-2xl text-5xl leading-[.95] tracking-[-.04em] md:text-7xl">Proof, in full colour.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#5f6873]">A growing reel of identities, campaigns and visual worlds made with ambitious people in Jordan and beyond.</p>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-[#10151f]/15 pb-4">
          {filters.map((item) => <button key={item.value} onClick={() => setFilter(item.value)} className={`mr-5 pb-2 text-xs font-bold uppercase tracking-[.14em] transition-colors ${filter === item.value ? 'border-b-2 border-[#ef3740] text-[#10151f]' : 'text-[#7f8790] hover:text-[#10151f]'}`} data-testid={`button-filter-${item.value}`}>{item.label}</button>)}
          <span className="mono-font ml-auto text-[10px] text-[#7f8790]" data-testid="text-work-count">{String(visibleWork.length).padStart(2, '0')} PROJECTS</span>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visibleWork.map((item, index) => (
            <button key={item.title} onClick={() => setSelected(item)} className={`portfolio-card group relative block w-full overflow-hidden text-left ${index === 1 || index === 4 ? 'md:mt-16' : ''}`} data-testid={`card-project-${item.title.toLowerCase().replaceAll(' ', '-')}`}>
              <div className="relative aspect-[1.28/1] overflow-hidden bg-[#dedbd4]">
                <img src={item.image} alt={`${item.title} project artwork`} className="h-full w-full object-cover" />
                <div className="card-overlay absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-[#0b0e13]/85 via-transparent to-[#0b0e13]/15 p-5 opacity-80 md:p-7">
                  <span className="flex justify-end"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0eee9] text-[#10151f]"><MoveUpRight size={17} /></span></span>
                  <span><span className="mono-font mb-2 block text-[10px] uppercase tracking-[.18em]" style={{ color: item.accent }}>{item.category}</span><span className="display-font block text-3xl text-[#f3f5f6] md:text-4xl">{item.title}</span></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#07090d]/90 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="dialog-project"><button className="absolute inset-0 cursor-default" onClick={() => setSelected(null)} aria-label="Close project detail" data-testid="button-close-project" /><div className="relative grid max-h-[90vh] w-full max-w-4xl overflow-auto bg-[#151b24] md:grid-cols-[1.1fr_.9fr]"><img src={selected.image} alt={`${selected.title} project artwork enlarged`} className="h-full min-h-[300px] w-full object-cover" /><div className="flex flex-col justify-between p-7 md:p-10"><div><button onClick={() => setSelected(null)} className="float-right text-[#a2acb9] hover:text-[#27d5e8]" aria-label="Close project detail" data-testid="button-close-project-inner"><X size={20} /></button><SectionKicker>{selected.category}</SectionKicker><h3 className="display-font max-w-sm text-5xl leading-none text-[#f3f5f6]">{selected.title}</h3><p className="mt-6 max-w-xs text-sm leading-6 text-[#a2acb9]">{selected.description}</p></div><span className="mono-font mt-12 text-[10px] uppercase tracking-[.18em] text-[#27d5e8]">Click Media / Selected work</span></div></div></div>}
    </section>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const goTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <div className="noise min-h-[100dvh] bg-[#0d1016] text-[#f3f5f6]">
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#0d1016]/35 px-5 py-5 backdrop-blur-md md:px-10" data-testid="site-header">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top" data-testid="button-scroll-top"><AppLogo /></button>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <button onClick={() => goTo('about')} className="text-xs uppercase tracking-[.16em] text-[#c8d0d8] transition-colors hover:text-[#27d5e8]" data-testid="link-about">About</button>
            <button onClick={() => goTo('work')} className="text-xs uppercase tracking-[.16em] text-[#c8d0d8] transition-colors hover:text-[#27d5e8]" data-testid="link-work">Work</button>
            <button onClick={() => goTo('services')} className="text-xs uppercase tracking-[.16em] text-[#c8d0d8] transition-colors hover:text-[#27d5e8]" data-testid="link-services">Services</button>
          </nav>
          <button onClick={() => setContactOpen(true)} className="hidden items-center gap-2 border border-white/30 px-4 py-2.5 text-xs font-bold uppercase tracking-[.12em] transition-colors hover:border-[#27d5e8] hover:text-[#27d5e8] md:flex" data-testid="button-header-contact">Let&apos;s talk <ArrowUpRight size={15} /></button>
          <button onClick={() => setMenuOpen(!menuOpen)} className={`relative flex h-10 w-10 flex-col items-center justify-center gap-[3px] border border-white/20 md:hidden ${menuOpen ? 'open' : ''}`} aria-label={menuOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu"><span className="menu-line h-px w-4 bg-[#f3f5f6]" /><span className="menu-line h-px w-4 bg-[#f3f5f6]" /><span className="menu-line h-px w-4 bg-[#f3f5f6]" /></button>
        </div>
        {menuOpen && <div className="absolute left-0 right-0 top-full border-b border-white/10 bg-[#111720]/95 p-5 backdrop-blur-xl md:hidden"><div className="flex flex-col gap-5"><button onClick={() => goTo('about')} className="text-left text-sm uppercase tracking-[.16em] text-[#d9e0e5]" data-testid="mobile-link-about">About</button><button onClick={() => goTo('work')} className="text-left text-sm uppercase tracking-[.16em] text-[#d9e0e5]" data-testid="mobile-link-work">Work</button><button onClick={() => goTo('services')} className="text-left text-sm uppercase tracking-[.16em] text-[#d9e0e5]" data-testid="mobile-link-services">Services</button><button onClick={() => { setMenuOpen(false); setContactOpen(true); }} className="flex items-center gap-2 text-left text-sm uppercase tracking-[.16em] text-[#27d5e8]" data-testid="mobile-button-contact">Let&apos;s talk <ArrowUpRight size={16} /></button></div></div>}
      </header>

      <main>
        <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden" data-testid="section-hero">
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={heroPoster} aria-label="Cinematic footage from Jerash" data-testid="video-hero"><source src={heroVideo} type="video/mp4" /></video>
          <div className="absolute inset-0 bg-[#080b10]/60" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgba(8,11,16,.18)_40%,rgba(8,11,16,.78)_100%)]" />
          <div className="relative z-10 w-full px-6 text-center md:px-10">
            <p className="mono-font reveal text-[10px] uppercase tracking-[.45em] text-[#27d5e8] md:text-xs">Welcome to</p>
            <h1 className="display-font reveal delay-1 mt-5 text-[17vw] leading-[.76] tracking-[-.085em] text-[#f3f5f6] md:text-[12vw]">Click<span className="text-[#27d5e8]">.</span></h1>
            <p className="reveal delay-2 mx-auto mt-8 max-w-xl text-base leading-7 text-[#d9e0e5] md:text-xl">A Jordanian production house for brands with something to say.</p>
            <button onClick={() => goTo('work')} className="reveal delay-3 group mx-auto mt-10 flex items-center gap-4 text-xs uppercase tracking-[.18em] text-[#f3f5f6]" data-testid="button-hero-work"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#27d5e8] text-[#27d5e8] transition-colors group-hover:bg-[#27d5e8] group-hover:text-[#10151f]"><ArrowDownRight size={17} /></span>See what we make</button>
          </div>
          <div className="absolute bottom-7 left-5 right-5 flex items-end justify-between md:bottom-10 md:left-10 md:right-10"><span className="mono-font text-[9px] uppercase tracking-[.2em] text-white/50">Amman / Jordan<br />&amp; everywhere</span><span className="hero-line hidden h-px w-28 bg-[#27d5e8] md:block" /><span className="mono-font text-[9px] uppercase tracking-[.2em] text-white/50">Scroll to explore<br /><ChevronDown className="mt-1 inline-block" size={12} /></span></div>
        </section>

        <section id="about" className="section-pad relative overflow-hidden bg-[#0d1016]" data-testid="section-about">
          <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div><SectionKicker>What we believe</SectionKicker><h2 className="display-font max-w-xl text-5xl leading-[.96] tracking-[-.04em] md:text-7xl">Make it felt.<br /><span className="text-[#27d5e8]">Make it last.</span></h2></div>
            <div className="max-w-2xl md:pb-1"><p className="text-xl leading-8 text-[#d9e0e5] md:text-2xl md:leading-9">Click Media brings brand, film and digital into the same room. We find the sharpest version of your story — then build the world around it.</p><p className="mt-7 max-w-lg text-sm leading-7 text-[#8f9aa8]">From a first mark to the final frame, we work with teams who care about the details and want the work to travel further than the brief.</p><p className="mt-6 text-right text-sm text-[#d9a45f]" lang="ar" dir="rtl">من الفكرة إلى الصورة — نصنع ما يبقى.</p></div>
          </div>
          <div className="mx-auto mt-24 grid max-w-[1440px] grid-cols-2 border-t border-white/15 pt-6 md:grid-cols-4"><div><span className="display-font text-4xl text-[#f3f5f6]">01</span><p className="mono-font mt-3 text-[9px] uppercase tracking-[.18em] text-[#748090]">One point of view</p></div><div><span className="display-font text-4xl text-[#f3f5f6]">02</span><p className="mono-font mt-3 text-[9px] uppercase tracking-[.18em] text-[#748090]">Many ways to move</p></div><div className="mt-8 md:mt-0"><span className="display-font text-4xl text-[#f3f5f6]">03</span><p className="mono-font mt-3 text-[9px] uppercase tracking-[.18em] text-[#748090]">Local roots, open lens</p></div><div className="mt-8 md:mt-0"><span className="display-font text-4xl text-[#f3f5f6]">04</span><p className="mono-font mt-3 text-[9px] uppercase tracking-[.18em] text-[#748090]">Details do the talking</p></div></div>
        </section>

        <Portfolio />

        <section id="services" className="section-pad bg-[#121821]" data-testid="section-services">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
              <div>
                <SectionKicker>What we do</SectionKicker>
                <h2 className="display-font max-w-md text-5xl leading-[.94] tracking-[-.04em] md:text-7xl">A full crew for the big idea.</h2>
                <p className="mt-5 text-right text-sm text-[#d9a45f]" lang="ar" dir="rtl">خدماتنا</p>
              </div>
              <p className="max-w-lg self-end text-base leading-7 text-[#a2acb9]">Not a menu. A point of view, shaped around the problem. We assemble the right mix of strategy, art and production to get the work over the line.</p>
            </div>
            <div className="mt-20 space-y-5">
              {SERVICES.map((service) => (
                <article key={service.number} className="group grid overflow-hidden border-y border-white/15 bg-[#0d1016] transition-colors hover:border-[#d9a45f]/60 md:min-h-[330px] md:grid-cols-[110px_1fr_1.15fr]">
                  <div className="flex items-start justify-between p-5 md:flex-col md:justify-between md:border-r md:border-white/10 md:p-7">
                    <span className="mono-font text-xs tracking-[.2em] text-[#d9a45f]">{service.number}</span>
                    <span className="mono-font text-[9px] uppercase tracking-[.2em] text-[#748090] md:[writing-mode:vertical-rl]">Click Media / {service.number}</span>
                  </div>
                  <div className="flex flex-col justify-between p-6 md:p-10">
                    <div>
                      <p className="mono-font text-[10px] uppercase tracking-[.2em] text-[#748090]">{service.arabicTitle}</p>
                      <h3 className="display-font mt-4 max-w-xl text-5xl leading-[.92] tracking-[-.04em] text-[#f3f5f6] transition-colors group-hover:text-[#d9a45f] md:text-7xl">{service.title}</h3>
                      <p className="mt-6 max-w-md text-sm leading-7 text-[#a2acb9]">{service.description}</p>
                    </div>
                    {service.link && <a href={service.link} className="mt-10 flex w-fit items-center gap-3 text-xs uppercase tracking-[.16em] text-[#f3f5f6] transition-colors hover:text-[#d9a45f]">See selected work <ArrowUpRight size={15} /></a>}
                  </div>
                  <div className="relative min-h-[250px] overflow-hidden bg-[#171e28] md:min-h-0">
                    {service.video ? <video src={service.video} className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" autoPlay muted loop playsInline preload="metadata" aria-label={service.imageAlt} /> : <img src={service.image} alt={service.imageAlt} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0d1016]/70 via-transparent to-transparent" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#ef3740] text-[#10151f]" data-testid="section-process">
          <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-[.9fr_1.1fr] md:items-end"><div><SectionKicker>How we work</SectionKicker><h2 className="display-font max-w-xl text-5xl leading-[.92] tracking-[-.045em] md:text-8xl">Good work<br />has a rhythm.</h2></div><div className="grid gap-8 sm:grid-cols-2"><div className="border-t border-[#10151f]/30 pt-4"><span className="mono-font text-[10px] uppercase tracking-[.2em]">01 / Listen</span><p className="mt-4 text-sm leading-6 text-[#10151f]/75">We get close to the real problem before we reach for the camera.</p></div><div className="border-t border-[#10151f]/30 pt-4"><span className="mono-font text-[10px] uppercase tracking-[.2em]">02 / Make</span><p className="mt-4 text-sm leading-6 text-[#10151f]/75">We turn the thinking into work with a pulse, a shape and a reason to exist.</p></div><div className="border-t border-[#10151f]/30 pt-4"><span className="mono-font text-[10px] uppercase tracking-[.2em]">03 / Refine</span><p className="mt-4 text-sm leading-6 text-[#10151f]/75">The last 10% is where a good idea becomes recognisably yours.</p></div><div className="border-t border-[#10151f]/30 pt-4"><span className="mono-font text-[10px] uppercase tracking-[.2em]">04 / Release</span><p className="mt-4 text-sm leading-6 text-[#10151f]/75">Built for the real world: launch, learn, and keep the momentum going.</p></div></div></div>
        </section>

        <section className="relative overflow-hidden bg-[#0d1016] px-5 py-24 md:px-10 md:py-36" data-testid="section-cta"><div className="mx-auto max-w-[1440px] border-y border-white/15 py-14 md:py-20"><div className="flex flex-col justify-between gap-10 md:flex-row md:items-end"><div><SectionKicker>Have a good one?</SectionKicker><h2 className="display-font max-w-3xl text-6xl leading-[.87] tracking-[-.05em] md:text-[9vw]">Let&apos;s make<br /><span className="text-[#27d5e8]">some noise.</span></h2></div><button onClick={() => setContactOpen(true)} className="group flex w-fit items-center gap-4 border border-[#27d5e8] px-5 py-4 text-sm font-semibold text-[#f3f5f6] transition-colors hover:bg-[#27d5e8] hover:text-[#10151f]" data-testid="button-cta-contact">Start a project <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button></div></div></section>
      </main>

      <footer className="border-t border-white/10 bg-[#0a0d12] px-5 py-10 md:px-10" data-testid="site-footer"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-10 md:flex-row"><div><AppLogo /><p className="mt-5 max-w-[220px] text-sm leading-6 text-[#748090]">Creative production, from first thought to final frame.</p></div><div className="flex flex-wrap gap-12 md:gap-16"><div><p className="mono-font mb-4 text-[9px] uppercase tracking-[.2em] text-[#748090]">Find us</p><p className="text-sm text-[#d9e0e5]">Amman, Jordan</p><a href={`tel:+962${phoneNumber.slice(1)}`} className="mt-1 block text-sm text-[#d9e0e5] transition-colors hover:text-[#27d5e8]" data-testid="link-footer-phone">{phoneNumber}</a></div><div><p className="mono-font mb-4 text-[9px] uppercase tracking-[.2em] text-[#748090]">Follow</p><div className="flex gap-3"><a href={instagramUrl} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center border border-white/15 text-[#d9e0e5] transition-colors hover:border-[#27d5e8] hover:text-[#27d5e8]" aria-label="Instagram" data-testid="link-instagram"><Instagram size={16} /></a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center border border-white/15 text-[#d9e0e5] transition-colors hover:border-[#27d5e8] hover:text-[#27d5e8]" aria-label="LinkedIn" data-testid="link-linkedin"><Linkedin size={16} /></a></div><a href={instagramUrl} target="_blank" rel="noreferrer" className="mt-3 block text-sm text-[#a2acb9] transition-colors hover:text-[#27d5e8]">@cli.ckjo</a></div></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.14em] text-[#596473] md:flex-row"><span>© 2025 Click Media</span><span>Built for the curious</span></div></div></footer>
      {showTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#27d5e8] text-[#10151f] shadow-lg transition-transform hover:-translate-y-1 md:right-10" aria-label="Back to top" data-testid="button-back-to-top"><ChevronDown className="rotate-180" size={18} /></button>}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
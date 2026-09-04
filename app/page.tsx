'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const page = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = page.current;
    if (!root) return;
    let frame = 0;
    const pointer = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--x', `${event.clientX / innerWidth - .5}`);
        root.style.setProperty('--y', `${event.clientY / innerHeight - .5}`);
      });
    };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }), { threshold: .15 });
    root.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    window.addEventListener('mousemove', pointer, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('mousemove', pointer); cancelAnimationFrame(frame); };
  }, []);

  const moveParticles = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.querySelectorAll<HTMLElement>('.particle').forEach(dot => {
      const rect = dot.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - event.clientX;
      const dy = rect.top + rect.height / 2 - event.clientY;
      const distance = Math.hypot(dx, dy);
      if (distance < 150) {
        const force = (150 - distance) / 150;
        dot.style.setProperty('--push-x', `${(dx / Math.max(distance, 1)) * force * 85}px`);
        dot.style.setProperty('--push-y', `${(dy / Math.max(distance, 1)) * force * 85}px`);
      } else {
        dot.style.setProperty('--push-x', '0px');
        dot.style.setProperty('--push-y', '0px');
      }
    });
  };

  const resetParticles = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.querySelectorAll<HTMLElement>('.particle').forEach(dot => {
      dot.style.setProperty('--push-x', '0px');
      dot.style.setProperty('--push-y', '0px');
    });
  };

  return <main ref={page}>
    <header>
      <a href="#top" className="signature">emre<span>.</span></a>
      <nav aria-label="Ana menü"><a href="#hakkimda">Hakkımda</a><a href="#bave">Bave</a><a href="#projeler">Projeler</a></nav>
      <a className="hello-link" href="#iletisim"><span>Merhaba de</span><ArrowUpRight size={16}/></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Yazılım geliştirici · İstanbul</p>
        <h1>Merhaba,<br/>ben <em>Emre.</em></h1>
        <p className="lead">Fikirleri araştırmayı, tasarlamayı ve gerçek bir ürüne dönüştürmeyi seviyorum. Web teknolojileriyle çalışıyor, kendi projelerimi geliştirmeye devam ediyorum.</p>
        <a className="discover" href="#hakkimda"><ArrowDown size={18}/> Devamı</a>
      </div>
      <div className="hero-object" aria-hidden="true"><div className="core">E</div><span className="orbit one"/><span className="orbit two"/><span className="orbit three"/></div>
      <p className="side-note">Küçük fikirler<br/>iyi ürünlere dönüşebilir.</p>
    </section>

    <section className="about" id="hakkimda">
      <p className="section-no reveal">01 — Hakkımda</p>
      <div className="about-grid">
        <h2 className="reveal">Bir şeyleri sadece kullanmak değil, nasıl çalıştığını anlamak istiyorum.</h2>
        <div className="about-copy reveal"><p>Yazılım geliştirirken hem kullanıcının gördüğü arayüzle hem de arka plandaki sistemle ilgileniyorum. Temiz, anlaşılır ve gerçekten işe yarayan ürünler ortaya çıkarmak benim için en keyifli kısım.</p><p>Henüz yolun başında sayılırım. Bu yüzden bu site bitmiş işlerin arşivi kadar, öğrendiklerimin ve zaman içinde geliştirdiklerimin de kaydı.</p></div>
      </div>
      <div className="currently reveal"><span>Şu sıralar</span><p>Ürün geliştirme, web teknolojileri ve iyi arayüzlerin nasıl kurulduğu üzerine çalışıyorum.</p><i>Devam ediyor</i></div>
    </section>

    <section className="bave" id="bave" onPointerMove={moveParticles} onPointerLeave={resetParticles}>
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 30 }, (_, index) => <span className="particle" key={index} style={{ '--px': `${(index * 37) % 96}%`, '--py': `${(index * 61) % 94}%`, '--size': `${4 + (index % 4) * 2}px`, '--delay': `${-(index % 9)}s` } as CSSProperties}/>)}
      </div>
      <div className="bave-mark reveal">
        <img src="/bave-logo.png" alt="Bave Software logosu" />
        <i/><i/><i/>
      </div>
      <div className="bave-copy">
        <p className="section-no reveal">02 — Organizasyon</p>
        <h2 className="reveal">Bave Software</h2>
        <p className="reveal">Projelerimi tek bir isim altında geliştirmek, farklı fikirleri denemek ve zamanla daha kapsamlı ürünlere dönüştürmek için oluşturduğum bağımsız bir yazılım organizasyonu.</p>
        <div className="bave-meta reveal"><span>Kurucu / Geliştirici</span><span>2026 — Bugün</span></div>
        <a className="bave-link reveal" href="https://bavesoftware.com" target="_blank" rel="noreferrer">Bave Software’e git <ArrowUpRight size={20}/></a>
      </div>
    </section>

    <section className="projects" id="projeler">
      <div className="projects-head reveal"><p className="section-no">03 — Projeler</p><h2>Geliştirdiğim<br/>bazı şeyler.</h2></div>
      <article className="project reveal">
        <div className="project-index">001</div>
        <div className="project-title"><p>Bave Software altında</p><h3>Martı Pet</h3></div>
        <p className="project-description">Veteriner kliniğinin hizmetlerini, ekibini ve iletişim bilgilerini yalın bir dijital deneyimde bir araya getiren web projesi.</p>
        <div className="project-status"><span>Web geliştirme</span><span className="active-dot">Geliştiriliyor</span></div>
        <ArrowUpRight className="project-arrow"/>
      </article>
      <article className="project muted-project reveal">
        <div className="project-index">002</div>
        <div className="project-title"><p>Sırada ne var?</p><h3>Yeni fikirler</h3></div>
        <p className="project-description">Araştırdığım, prototiplediğim ve zamanla bu listeye ekleyeceğim yeni ürünler.</p>
        <div className="project-status"><span>Deneyler</span><span>Devam ediyor</span></div>
        <ArrowUpRight className="project-arrow"/>
      </article>
    </section>

    <footer id="iletisim">
      <p className="section-no reveal">04 — İletişim</p>
      <h2 className="reveal">Bir fikrin varsa<br/><em>konuşabiliriz.</em></h2>
      <a className="email reveal" href="mailto:hello@furkanemrecorduk.com">hello@furkanemrecorduk.com <ArrowUpRight/></a>
      <div className="footer-bottom"><span>Furkan Emre Çördük · {new Date().getFullYear()}</span><a href="https://github.com/cordukfurkanemre" target="_blank" rel="noreferrer">GitHub ↗</a><a href="#top">Yukarı ↑</a></div>
    </footer>
  </main>;
}

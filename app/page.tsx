'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { ArrowDown, ArrowUpRight, Languages } from 'lucide-react';

export default function Home() {
  const page = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const en = language === 'en';

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
      <nav aria-label={en ? 'Main menu' : 'Ana menü'}><a href="#hakkimda">{en ? 'About' : 'Hakkımda'}</a><a href="#bave">Bave</a><a href="#projeler">{en ? 'Projects' : 'Projeler'}</a></nav>
      <div className="header-actions">
        <a className="social-link github-link" href="https://github.com/cordukfurkanemre" target="_blank" rel="noreferrer" aria-label={en ? 'My GitHub profile' : 'GitHub profilim'}><img src="/github.svg" alt="" /></a>
        <a className="social-link linkedin-link" href="https://www.linkedin.com/in/cordukfurkanemre/" target="_blank" rel="noreferrer" aria-label={en ? 'My LinkedIn profile' : 'LinkedIn profilim'}><img src="/linkedin.svg" alt="" /></a>
        <button className="lang-toggle" type="button" onClick={() => setLanguage(en ? 'tr' : 'en')} aria-label={en ? 'Türkçeye geç' : 'Switch to English'}><Languages size={15}/><span>{en ? 'Türkçe' : 'English'}</span></button>
        <a className="hello-link" href="#iletisim"><span>{en ? 'Say hello' : 'Merhaba de'}</span><ArrowUpRight size={16}/></a>
      </div>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{en ? 'Software developer · Istanbul' : 'Yazılım geliştirici · İstanbul'}</p>
        <h1>{en ? <>Hello,<br/>I’m <em>Emre.</em></> : <>Merhaba,<br/>ben <em>Emre.</em></>}</h1>
        <p className="lead">{en ? 'I enjoy exploring ideas, designing them and turning them into working products. I work with web technologies and continue building my own projects.' : 'Fikirleri araştırmayı, tasarlamayı ve gerçek bir ürüne dönüştürmeyi seviyorum. Web teknolojileriyle çalışıyor, kendi projelerimi geliştirmeye devam ediyorum.'}</p>
        <a className="discover" href="#hakkimda"><ArrowDown size={18}/> {en ? 'Discover more' : 'Devamı'}</a>
      </div>
      <div className="hero-object" aria-hidden="true"><div className="core">E</div><span className="orbit one"/><span className="orbit two"/><span className="orbit three"/></div>
      <p className="side-note">{en ? <>Small ideas can become<br/>meaningful products.</> : <>Küçük fikirler<br/>iyi ürünlere dönüşebilir.</>}</p>
    </section>

    <section className="about" id="hakkimda">
      <p className="section-no reveal">01 — {en ? 'About' : 'Hakkımda'}</p>
      <div className="about-grid">
        <h2 className="reveal">{en ? 'I grew up with computers and found my path in software.' : 'Bilgisayarlarla büyüdüm, yolumu yazılımda buldum.'}</h2>
        <div className="about-copy reveal">{en ? <><p>I have been surrounded by computers since childhood. Spending time with them, taking things apart and learning something new always felt natural to me. Choosing software was not a sudden decision; it became the natural continuation of what I had always wanted to do.</p><p>My time at SellerRunning placed me inside a real team and product process. What I learned there still shapes how I approach my own projects today.</p><p>I still consider myself at the beginning of the journey. That is why this site is both an archive of completed work and a record of what I learn and build over time.</p></> : <><p>Küçüklüğümden beri bilgisayarların içinde büyüdüm. Onlarla uzun süre vakit geçirmek, kurcalamak ve yeni şeyler öğrenmek hayatımın doğal bir parçasıydı. Bu yüzden kendime bir meslek seçerken yazılım benim için sonradan verilmiş bir karar değil, her zaman yapmak istediğim şeyin doğal devamı oldu.</p><p>SellerRunning’de çalıştığım dönem, gerçek bir ekibin ve ürün sürecinin içinde yer almamı sağladı. Orada edindiğim deneyim bugün kendi projelerime yaklaşımımı da şekillendiriyor.</p><p>Henüz yolun başında sayılırım. Bu yüzden bu site bitmiş işlerin arşivi kadar, öğrendiklerimin ve zaman içinde geliştirdiklerimin de kaydı.</p></>}</div>
      </div>
      <div className="currently reveal"><span>{en ? 'Currently' : 'Şu sıralar'}</span><p>{en ? 'I’m working on product development, web technologies and how thoughtful interfaces are built.' : 'Ürün geliştirme, web teknolojileri ve iyi arayüzlerin nasıl kurulduğu üzerine çalışıyorum.'}</p><i>{en ? 'In progress' : 'Devam ediyor'}</i></div>
    </section>

    <section className="bave" id="bave" onPointerMove={moveParticles} onPointerLeave={resetParticles}>
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 30 }, (_, index) => <span className="particle" key={index} style={{ '--px': `${(index * 37) % 96}%`, '--py': `${(index * 61) % 94}%`, '--size': `${4 + (index % 4) * 2}px`, '--delay': `${-(index % 9)}s` } as CSSProperties}/>)}
      </div>
      <div className="bave-mark reveal">
        <img src="/bave-logo.png" alt={en ? 'Bave Software logo' : 'Bave Software logosu'} />
        <i/><i/><i/>
      </div>
      <div className="bave-copy">
        <p className="section-no reveal">02 — {en ? 'Organization' : 'Organizasyon'}</p>
        <h2 className="reveal">Bave Software</h2>
        <p className="reveal">{en ? 'Bave Software is the independent software organization I founded so the ideas in my mind would not remain experiments. It is where I build my own projects and apply what I learn to real products.' : 'Bave Software, aklımdaki fikirleri yalnızca birer deneme olarak bırakmamak için kurduğum bağımsız yazılım organizasyonu. Burada kendi projelerimi geliştiriyor, öğrendiklerimi gerçek ürünler üzerinde uyguluyorum.'}</p>
        <div className="bave-vision reveal">
          <div><span>{en ? 'Purpose' : 'Amaç'}</span><p>{en ? 'To create simple digital products that have a place in everyday life and are genuinely used.' : 'Günlük hayatta karşılığı olan, sade ve gerçekten kullanılan dijital ürünler geliştirmek.'}</p></div>
          <div><span>{en ? 'Goal' : 'Hedef'}</span><p>{en ? 'To turn small beginnings into sustainable products and a strong software ecosystem over time.' : 'Küçük başlayan projeleri zamanla sürdürülebilir ürünlere ve güçlü bir yazılım ekosistemine dönüştürmek.'}</p></div>
        </div>
        <div className="bave-meta reveal"><span>{en ? 'Founder / Developer' : 'Kurucu / Geliştirici'}</span><span>2026 — {en ? 'Present' : 'Bugün'}</span></div>
        <a className="bave-link reveal" href="https://bavesoftware.com" target="_blank" rel="noreferrer">{en ? 'Visit Bave Software' : 'Bave Software’e git'} <ArrowUpRight size={20}/></a>
      </div>
    </section>

    <section className="projects" id="projeler">
      <div className="projects-head reveal"><p className="section-no">03 — {en ? 'Projects' : 'Projeler'}</p><h2>{en ? <>A few things<br/>I’ve built.</> : <>Geliştirdiğim<br/>bazı şeyler.</>}</h2></div>
      <a className="project reveal" href="https://bavesoftware.com" target="_blank" rel="noreferrer">
        <div className="project-index">001</div>
        <div className="project-title"><p>{en ? 'Independent software organization' : 'Bağımsız yazılım organizasyonu'}</p><h3>Bave Software</h3></div>
        <p className="project-description">{en ? 'The structure where I develop ideas under one roof, experiment with new products and work toward a lasting culture of building.' : 'Fikirlerimi tek çatı altında geliştirdiğim; yeni ürünler denediğim ve uzun vadeli bir üretim kültürü kurmaya çalıştığım yapı.'}</p>
        <div className="project-status"><span>{en ? 'Founder / Developer' : 'Kurucu / Geliştirici'}</span><span className="bave-status">{en ? 'Active' : 'Aktif'}</span></div>
        <ArrowUpRight className="project-arrow"/>
      </a>
      <article className="project reveal">
        <div className="project-index">002</div>
        <div className="project-title"><p>{en ? 'Under Bave Software' : 'Bave Software altında'}</p><h3>Martı Pet</h3></div>
        <p className="project-description">{en ? 'A web project that brings a veterinary clinic’s services, team and contact details together in a clear digital experience.' : 'Veteriner kliniğinin hizmetlerini, ekibini ve iletişim bilgilerini yalın bir dijital deneyimde bir araya getiren web projesi.'}</p>
        <div className="project-status"><span>{en ? 'Web development' : 'Web geliştirme'}</span><span className="active-dot">{en ? 'In development' : 'Geliştiriliyor'}</span></div>
        <ArrowUpRight className="project-arrow"/>
      </article>
      <article className="project muted-project reveal">
        <div className="project-index">003</div>
        <div className="project-title"><p>{en ? 'What’s next?' : 'Sırada ne var?'}</p><h3>{en ? 'New ideas' : 'Yeni fikirler'}</h3></div>
        <p className="project-description">{en ? 'New products I’m researching, prototyping and will add to this list over time.' : 'Araştırdığım, prototiplediğim ve zamanla bu listeye ekleyeceğim yeni ürünler.'}</p>
        <div className="project-status"><span>{en ? 'Experiments' : 'Deneyler'}</span><span>{en ? 'Ongoing' : 'Devam ediyor'}</span></div>
        <ArrowUpRight className="project-arrow"/>
      </article>
    </section>

    <footer id="iletisim">
      <p className="section-no reveal">04 — {en ? 'Contact' : 'İletişim'}</p>
      <h2 className="reveal">{en ? <>Have an idea?<br/><em>Let’s talk.</em></> : <>Bir fikrin varsa<br/><em>konuşabiliriz.</em></>}</h2>
      <a className="email reveal" href="mailto:hello@furkanemrecorduk.com">hello@furkanemrecorduk.com <ArrowUpRight/></a>
      <div className="footer-bottom"><span>Furkan Emre Çördük · {new Date().getFullYear()}</span><a href="#top">{en ? 'Back to top' : 'Yukarı'} ↑</a></div>
    </footer>
  </main>;
}

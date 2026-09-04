'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const projects = [
  { year: '2026', title: 'Martı Pet', type: 'Dijital deneyim', note: 'Veteriner kliniği için sakin, güven veren ve kolay kullanılan bir web deneyimi.' },
  { year: '2026', title: 'Bave', type: 'Ürün geliştirme', note: 'İşletme operasyonlarını tek merkezde birleştiren ölçeklenebilir platform.' },
];

export default function Home() {
  const page = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = page.current;
    if (!root) return;
    let frame = 0;
    const update = (event?: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event ? event.clientX / window.innerWidth - .5 : 0;
        const y = event ? event.clientY / window.innerHeight - .5 : 0;
        root.style.setProperty('--mx', `${x}`);
        root.style.setProperty('--my', `${y}`);
        root.style.setProperty('--scroll', `${window.scrollY}`);
      });
    };
    const reveal = new IntersectionObserver((entries) => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: .14 });
    root.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
    window.addEventListener('mousemove', update, { passive: true });
    window.addEventListener('scroll', () => update(), { passive: true });
    update();
    return () => { reveal.disconnect(); window.removeEventListener('mousemove', update); cancelAnimationFrame(frame); };
  }, []);

  return <main ref={page}>
    <header>
      <a className="logo" href="#top">FÇE<span>.</span></a>
      <nav><a href="#ben">Ben</a><a href="#projeler">Projeler</a><a href="#iletisim">Selam ver ↗</a></nav>
    </header>

    <section className="intro" id="top">
      <div className="intro-meta"><span>İstanbul, TR</span><span className="available"><i/> Yeni fikirlere açık</span></div>
      <h1><span className="line">FURKAN</span><span className="line offset">EMRE</span><span className="line outline">ÇÖRDÜK</span></h1>
      <p className="intro-copy">Kod yazıyorum, arayüzler tasarlıyorum ve aklıma takılan fikirleri <em>çalışan şeylere</em> dönüştürüyorum.</p>
      <a className="down" href="#ben" aria-label="Aşağı kaydır"><ArrowDown/></a>
      <div className="orb orb-a"/><div className="orb orb-b"/><div className="cursor-ring"/>
    </section>

    <div className="marquee" aria-hidden="true"><div>GELİŞTİRİCİ • TASARIM MERAKLISI • PROBLEM ÇÖZÜCÜ • FİKİR ÜRETİCİ • GELİŞTİRİCİ • TASARIM MERAKLISI •&nbsp;</div></div>

    <section className="bio" id="ben">
      <p className="label reveal">01 / Ben kimim?</p>
      <div className="bio-grid">
        <h2 className="reveal">Ekranın iki tarafını da seviyorum.</h2>
        <div className="bio-text reveal"><p>Ben Furkan. Bir ürünün nasıl göründüğü kadar, nasıl hissettirdiği ve arka planda nasıl çalıştığıyla da ilgileniyorum.</p><p>Merakım genellikle küçük bir “ya şöyle olsaydı?” sorusuyla başlıyor. Sonra araştırma, taslaklar ve bolca kod geliyor.</p></div>
      </div>
      <div className="principles">
        <article className="reveal"><span>01</span><h3>Az ama öz</h3><p>Gereksiz olanı atıp esas fikri görünür kılmak.</p></article>
        <article className="reveal"><span>02</span><h3>Detaylara takıl</h3><p>Küçük bir geçişin bile deneyimi değiştirdiğine inanmak.</p></article>
        <article className="reveal"><span>03</span><h3>Gerçekten çalışsın</h3><p>Güzel görünen kadar sağlam ve sürdürülebilir sistemler kurmak.</p></article>
      </div>
    </section>

    <section className="statement">
      <div className="spin-text" aria-hidden="true"><span>MERAK • ÜRETİM • DENEY • </span><b>+</b></div>
      <p className="reveal">Teknoloji benim için sadece araç.<br/><strong>Asıl mesele iz bırakan bir şey üretmek.</strong></p>
    </section>

    <section className="work" id="projeler">
      <div className="work-head reveal"><p className="label">02 / Seçili projeler</p><p>Yaptıklarım da benim bir parçam.</p></div>
      {projects.map((project, index) => <article className="work-row reveal" key={project.title}>
        <span>{project.year}</span><div><h3>{project.title}</h3><p>{project.note}</p></div><span>{project.type}</span><ArrowUpRight/>
        <i aria-hidden="true">0{index + 1}</i>
      </article>)}
    </section>

    <footer id="iletisim">
      <p className="label reveal">03 / Tanışalım</p>
      <h2 className="reveal">Bir kahve,<br/>bir fikir?</h2>
      <a className="mail reveal" href="mailto:hello@furkanemrecorduk.com">hello@furkanemrecorduk.com <ArrowUpRight/></a>
      <div className="footer-line"><span>© {new Date().getFullYear()} Furkan Emre Çördük</span><a href="https://github.com/cordukfurkanemre" target="_blank" rel="noreferrer">GitHub ↗</a><a href="#top">Yukarı ↑</a></div>
    </footer>
  </main>;
}

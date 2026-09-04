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
      <a className="logo" href="#top">PORTFOLIO<span>/26</span></a>
      <nav><a href="#ben">Yaklaşım</a><a href="#projeler">Projeler</a><a href="#iletisim">İletişim ↗</a></nav>
    </header>

    <section className="intro" id="top">
      <div className="intro-meta"><span>İstanbul, TR</span><span className="available"><i/> Yeni fikirlere açık</span></div>
      <h1><span className="line">FİKİRDEN</span><span className="line offset">ÇALIŞAN</span><span className="line outline">ÜRÜNLERE.</span></h1>
      <p className="intro-copy">Dijital ürünleri fikir, arayüz ve mühendislik arasında bir bütün olarak ele alıyorum. <em>Sade, kullanışlı ve uzun ömürlü</em> deneyimler üretmeye çalışıyorum.</p>
      <a className="down" href="#ben" aria-label="Aşağı kaydır"><ArrowDown/></a>
      <div className="orb orb-a"/><div className="orb orb-b"/><div className="cursor-ring"/>
    </section>

    <div className="marquee" aria-hidden="true"><div>TASARIM • MÜHENDİSLİK • ÜRÜN • DENEYİM • TASARIM • MÜHENDİSLİK • ÜRÜN • DENEYİM •&nbsp;</div></div>

    <section className="bio" id="ben">
      <p className="label reveal">01 / Yaklaşım</p>
      <div className="bio-grid">
        <h2 className="reveal">Doğru sorudan, sade bir sisteme.</h2>
        <div className="bio-text reveal"><p>Bir ürünün nasıl göründüğü kadar, nasıl hissettirdiği ve arka planda nasıl çalıştığıyla da ilgileniyorum.</p><p>Süreç genellikle küçük bir “ya şöyle olsaydı?” sorusuyla başlıyor. Araştırma, taslaklar ve kodla; kullanılabilir bir sonuca dönüşüyor.</p></div>
      </div>
      <div className="principles">
        <article className="reveal"><span>01</span><h3>Az ama öz</h3><p>Gereksiz olanı atıp esas fikri görünür kılmak.</p></article>
        <article className="reveal"><span>02</span><h3>Detaylara takıl</h3><p>Küçük bir geçişin bile deneyimi değiştirdiğine inanmak.</p></article>
        <article className="reveal"><span>03</span><h3>Gerçekten çalışsın</h3><p>Güzel görünen kadar sağlam ve sürdürülebilir sistemler kurmak.</p></article>
      </div>
    </section>

    <section className="statement">
      <div className="spin-text" aria-hidden="true"><span>MERAK • ÜRETİM • DENEY • </span><b>+</b></div>
      <p className="reveal">Teknoloji yalnızca araç.<br/><strong>Değer, çözdüğü problemde.</strong></p>
    </section>

    <section className="work" id="projeler">
      <div className="work-head reveal"><p className="label">02 / Seçili projeler</p><p>Farklı ihtiyaçlar için tasarlanan, gerçek kullanıma odaklı işler.</p></div>
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

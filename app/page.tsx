import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react';

const projects = [
  { index: '01', title: 'Martı Pet', description: 'Veteriner klinikleri için güven veren dijital deneyim; hizmetler, ekip ve iletişimi yalın bir akışta buluşturuyor.', tags: ['Web deneyimi', 'UI/UX', 'Frontend'], tone: 'project-lime' },
  { index: '02', title: 'Bave', description: 'İşletme operasyonlarını, destek taleplerini ve yönetim akışlarını tek merkezde toplayan ölçeklenebilir platform.', tags: ['.NET', 'Backend', 'Ürün geliştirme'], tone: 'project-violet' },
  { index: '03', title: 'Yeni fikirler', description: 'Gerçek bir ihtiyaçtan başlayan, hızlı prototiplenen ve uzun ömürlü koda dönüşen yeni dijital ürünler.', tags: ['Prototipleme', 'Full-stack', 'Deney'], tone: 'project-coral' },
];
const stack = ['TypeScript', 'React', 'Next.js', '.NET', 'C#', 'SQL', 'Cloudflare'];

export default function Home() {
  return <main>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Ana sayfa">F<span>Ç</span>E</a>
      <nav aria-label="Ana menü">
        <a href="#projeler">Projeler</a><a href="#hakkimda">Hakkımda</a>
        <a className="nav-contact" href="#iletisim">İletişim <ArrowUpRight size={16}/></a>
      </nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-kicker"><span className="status-dot"/>Yeni projelere açık</div>
      <h1>Fikirleri dijital<span className="outline-word"> deneyimlere</span><br/> dönüştürüyorum.</h1>
      <div className="hero-bottom">
        <p>Merhaba, ben <strong>Furkan Emre Çördük.</strong> İnsanların kullanmaktan keyif aldığı, işletmelerin güvenle büyütebildiği dijital ürünler tasarlıyor ve geliştiriyorum.</p>
        <a className="scroll-link" href="#projeler">Çalışmaları keşfet <ArrowDownRight size={20}/></a>
      </div>
      <div className="hero-mark" aria-hidden="true">&lt;/&gt;</div>
    </section>

    <section className="projects" id="projeler">
      <div className="section-heading"><p>Seçili çalışmalar</p><h2>Problemi anlayan,<br/>sonucu hissettiren işler.</h2></div>
      <div className="project-grid">
        {projects.map((project) => <article className={`project-card ${project.tone}`} key={project.title}>
          <div className="card-top"><span>{project.index}</span><ArrowUpRight size={22}/></div>
          <div className="project-glyph" aria-hidden="true">{project.index === '01' ? '✳' : project.index === '02' ? '◎' : '↗'}</div>
          <div><h3>{project.title}</h3><p>{project.description}</p><ul aria-label={`${project.title} teknolojileri`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
        </article>)}
      </div>
    </section>

    <section className="about" id="hakkimda">
      <div><p className="eyebrow">Yaklaşımım</p><h2>Sade görünenin arkasında sağlam bir sistem.</h2></div>
      <div className="about-copy"><p>Tasarım ve mühendisliği birbirinden ayırmıyorum. Her projede doğru problemi tanımlamaya, gereksiz karmaşayı azaltmaya ve bakımı kolay bir temel kurmaya odaklanıyorum.</p><div className="stack-list" aria-label="Kullandığım teknolojiler">{stack.map(item => <span key={item}>{item}</span>)}</div></div>
    </section>

    <footer id="iletisim">
      <p className="eyebrow">Birlikte çalışalım</p>
      <div className="footer-main"><h2>Aklında bir fikir mi var?</h2><a href="mailto:hello@furkanemrecorduk.com">Konuşalım <ArrowUpRight size={30}/></a></div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Furkan Emre Çördük</p><div><a href="https://github.com/cordukfurkanemre" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:hello@furkanemrecorduk.com"><Mail size={17}/> E-posta</a></div></div>
    </footer>
  </main>;
}

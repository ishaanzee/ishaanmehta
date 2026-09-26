import ProjectMedia from "../components/ProjectMedia";

export default function Home() {
  return (
    <main className="page">
      <header>
        <h1>Ishaan Mehta</h1>
        <p>computer engineering student at uwaterloo</p>
        <nav>
          <a href="mailto:i4mehta@uwaterloo.ca">waterloo email</a>
          <a href="mailto:ishaanmehta2000@gmail.com">personal email</a>
          <a href="https://github.com/ishaanzee">github</a>
          <a href="https://linkedin.com/in/ishaan-mehta-962b3a351">linkedin</a>
          <a href="/resume" target="_blank">resume.pdf</a>
        </nav>
      </header>

      <section><p>Hi, I&apos;m Ishaan. I like building and software that is actually useful, robots, and computer vision stuff. Anything that makes the world more efficient or safer. Right now I&apos;m studying Computer Engineering at Waterloo.</p></section>

      <section>
        <h2>education</h2>
        <div className="education">
          <p><strong>University of Waterloo</strong></p>
          <p>BASc in Computer Engineering, Co-op</p>
          <p>First year · September 2026 – May 2031 (expected)</p>
        </div>
      </section>

      <section>
        <h2>things i&apos;ve made</h2>
        <a className="project-link" href="/projects/ballform"><article className="project">
          <div className="project-text"><h3>ballform</h3><p>Looks at your shooting form and gives feedback. It can also rate shots in any game from 1v1 to 5v5 by analyzing separation. I optimized the GPU kernel and video pipeline to cut processing time by 88% on a test clip.</p><small>python / pose estimation / ml</small></div>
          <ProjectMedia project="ballform" variant="ballform" />
        </article></a>
        <a className="project-link" href="/projects/lamp"><article className="project">
          <div className="project-text"><h3>lamp robot simulation</h3><p>A 5-DOF character lamp that uses a person&apos;s arm movement to control the simulated joints.</p><small>python / computer vision / simulation</small></div>
          <ProjectMedia project="lamp" variant="lamp" />
        </article></a>
        <a className="project-link" href="https://autofillpdf.com" target="_blank" rel="noreferrer"><article className="text-project"><h3>AutoFillPDF ↗</h3><p>A tool for filling out annoying PDFs. I trained a D-FINE object detection model on CommonForms to find fields in flattened forms and built the rest of the pipeline around it. Typescript / React / Node.js / Python / ML</p></article></a>
        <article className="text-project"><h3>FRC Team 2404</h3><p>Electrical and programming for our 30+ person robotics team. One project was a targeting algorithm that let the robot line up a shot while it was moving. We won the 2026 CA District Glendale event.</p></article>
        <article className="text-project"><h3>electric bikes</h3><p>Built a few mid-drive and hub-drive e-bike conversions. Made wiring harnesses, integrated the electronics, and spent a lot of time debugging battery problems.</p></article>
      </section>

      <section>
        <h2>work</h2>
        <div className="job"><p><strong>SoCal Rehab</strong> — ML Engineer</p><p>Automated clinical paperwork with Vertex AI and Apps Script. Cut a roughly 5 hour process down to about 15 minutes per patient.</p></div>
        <div className="job"><p><strong>AutoFillPDF</strong> — Founder / Engineer</p><p>Built the product, ML pipeline, and everything else.</p></div>
      </section>

      <section><h2>some tools i use</h2><p>Python, TypeScript, Java, PyTorch, Arduino, Raspberry Pi, Linux, PostgreSQL, GCP</p></section>
      <footer><p>ishaan mehta · 2026 · <a href="mailto:i4mehta@uwaterloo.ca">waterloo</a> / <a href="mailto:ishaanmehta2000@gmail.com">personal</a></p></footer>
    </main>
  );
}

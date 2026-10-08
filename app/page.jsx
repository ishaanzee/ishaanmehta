import ProjectMedia from "../components/ProjectMedia";

export default function Home() {
  return (
    <main className="page">
      <header>
        <h1>Ishaan Mehta</h1>
        <p>computer engineering student at uwaterloo · first year, graduating may 2031</p>
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
        <h2>things i&apos;ve made</h2>
        <a className="project-link" href="/projects/ballform"><article className="project">
          <div className="project-text"><h3>ballform</h3><p>Looks at your shooting form and gives feedback. It can also rate shots in any game from 1v1 to 5v5 by analyzing separation. I optimized the GPU kernel and video pipeline to cut processing time by 88% on a test clip.</p><small>python / pose estimation / ml</small></div>
          <ProjectMedia project="ballform" variant="ballform" />
        </article></a>
        <a className="project-link" href="/projects/kernelopt"><article className="project">
          <div className="project-text"><h3>kernelopt</h3><p>Rewrote ballform&apos;s ball detector in MLX with custom Metal kernels. It&apos;s 1.8× faster than ONNX Runtime + Core ML on an M3 Pro with the same detections, and preprocessing went from 4.7 ms on the CPU to 0.42 ms on the GPU.</p><small>python / metal / mlx / gpu</small></div>
          <ProjectMedia project="kernelopt" variant="kernelopt" />
        </article></a>
        <a className="project-link" href="/projects/lamp"><article className="project">
          <div className="project-text"><h3>lamp robot simulation</h3><p>A 5-DOF character lamp that uses a person&apos;s arm movement to control the simulated joints.</p><small>python / computer vision / simulation</small></div>
          <ProjectMedia project="lamp" variant="lamp" />
        </article></a>
        <a className="project-link" href="/projects/claude-widget"><article className="project">
          <div className="project-text"><h3>claude usage widget</h3><p>An iPhone widget that shows my Claude session and weekly usage, so I always know how much I have left. A menu bar plugin on my Mac syncs the numbers through iCloud every 5 minutes.</p><small>javascript / scriptable / swiftbar</small></div>
          <ProjectMedia project="claude-widget" variant="widget" />
        </article></a>
        <a className="project-link" href="/projects/rdr2-mac"><article className="project">
          <div className="project-text"><h3>red dead redemption 2 on mac</h3><p>Got RDR2 running on my Apple Silicon Mac, which it has no official support for. I put together a CrossOver Wine and Apple D3DMetal setup, patched Wine to fix crashes in Rockstar&apos;s launcher, and wrote the scripts that start it.</p><small>c / python / wine / metal</small></div>
          <ProjectMedia project="rdr2-mac" variant="rdr2" />
        </article></a>
        <a className="project-link" href="https://autofillpdf.com" target="_blank" rel="noreferrer"><article className="text-project"><h3>AutoFillPDF ↗</h3><p>A tool for filling out annoying PDFs, now used by 70+ people a month. I trained a D&#8209;FINE object detector on 13K+ annotated forms to find fields in flattened PDFs, then built the pipeline that pairs it with language models to fill them in.</p><small>typescript / react / python / pytorch / postgresql</small></article></a>
        <article className="text-project"><h3>FRC Team 2404</h3><p>Electrical and programming for our 30+ person robotics team. One project was a targeting algorithm that let the robot line up a shot while it was moving. We won the 2026 CA District Glendale event.</p></article>
        <article className="text-project"><h3>electric bikes</h3><p>Built a few mid-drive and hub-drive e-bike conversions. Made wiring harnesses, integrated the electronics, and spent a lot of time debugging battery problems.</p></article>
      </section>

      <section>
        <h2>open source</h2>
        <article className="text-project">
          <h3><a href="https://github.com/Blaizzy/mlx-vlm/pulls?q=author:ishaanzee" target="_blank" rel="noreferrer">MLX-VLM ↗</a></h3>
          <p>Vision and language models on Apple Silicon (5.5K+ GitHub stars). I sped up and fixed its RF-DETR object detector, checking every change against the original PyTorch model.</p>
          <ul className="pr-list">
            <li><a href="https://github.com/Blaizzy/mlx-vlm/pull/2443" target="_blank" rel="noreferrer">#2443</a>Switched the backbone to MLX&apos;s fused attention, making detection 21% faster.<span className="pr-status pr-merged">merged</span></li>
            <li><a href="https://github.com/Blaizzy/mlx-vlm/pull/2450" target="_blank" rel="noreferrer">#2450</a>Fixed an off-by-one in the backbone layers it read, which shifted boxes by up to 11.7&nbsp;px.<span className="pr-status pr-merged">merged</span></li>
            <li><a href="https://github.com/Blaizzy/mlx-vlm/pull/2452" target="_blank" rel="noreferrer">#2452</a>Made weight conversion idempotent, so converted and quantized checkpoints load instead of crashing.<span className="pr-status pr-merged">merged</span></li>
            <li><a href="https://github.com/Blaizzy/mlx-vlm/pull/2453" target="_blank" rel="noreferrer">#2453</a>Fixed the small model&apos;s config so it loads and matches the PyTorch reference.<span className="pr-status pr-merged">merged</span></li>
            <li><a href="https://github.com/Blaizzy/mlx-vlm/pull/2454" target="_blank" rel="noreferrer">#2454</a>Fixed a Metal sampling kernel that didn&apos;t compile in bf16 and lost precision in fp16.<span className="pr-status pr-merged">merged</span></li>
            <li><a href="https://github.com/Blaizzy/mlx-vlm/pull/2468" target="_blank" rel="noreferrer">#2468</a>Moved the segmentation upsample to an existing GPU kernel, making segmentation 7–9% faster.<span className="pr-status">in review</span></li>
            <li><a href="https://github.com/Blaizzy/mlx-vlm/pull/2469" target="_blank" rel="noreferrer">#2469</a>Got the large model loading by adding its multi-scale projector and multi-level deformable attention.<span className="pr-status">in review</span></li>
          </ul>
        </article>
        <article className="text-project">
          <h3><a href="https://github.com/ml-explore/mlx/pulls?q=author:ishaanzee" target="_blank" rel="noreferrer">MLX ↗</a></h3>
          <p>Apple&apos;s array framework for machine learning (28K+ GitHub stars). I found that conv2d gave different results for the same image depending on batch size, because a faster but less precise algorithm kicks in from a batch of 3.</p>
          <ul className="pr-list">
            <li><a href="https://github.com/ml-explore/mlx/pull/4639" target="_blank" rel="noreferrer">#4639</a>Added a documented switch to turn that algorithm off, so results stay the same at any batch size.<span className="pr-status">in review</span></li>
          </ul>
        </article>
      </section>

      <section>
        <h2>work</h2>
        <div className="job"><p><strong>SoCal Rehab</strong> — ML Engineer</p><p>Automated clinical paperwork with Vertex AI and Apps Script. Cut processing for a 100+ patient batch from about 5 hours to 15 minutes.</p></div>
        <div className="job"><p><strong>AutoFillPDF</strong> — Founder / Engineer</p><p>Built and launched a document automation platform with 70+ monthly users. Did the product, the ML pipeline, and everything else.</p></div>
      </section>

      <section><h2>some tools i use</h2><p>Python, TypeScript, C++, Java, SQL · PyTorch, MLX, Core ML, ONNX Runtime, OpenCV, MediaPipe · Metal, FastAPI, Next.js, PostgreSQL, Vertex AI, Linux, Arduino, Raspberry Pi</p></section>
      <footer><p>ishaan mehta · 2026 · <a href="mailto:i4mehta@uwaterloo.ca">waterloo</a> / <a href="mailto:ishaanmehta2000@gmail.com">personal</a></p></footer>
    </main>
  );
}

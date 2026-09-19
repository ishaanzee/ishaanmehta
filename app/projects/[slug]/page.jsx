import { notFound } from "next/navigation";
import { projects, getProject } from "../../../data/projects";
import VideoWipe from "../../../components/VideoWipe";
import { existsSync } from "node:fs";
import path from "node:path";

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: `${project.title} - Ishaan Mehta` } : {};
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="project-page">
      <a className="back" href="/">← back</a>
      <h1>{project.title}</h1>
      <p className="project-summary">{project.summary}</p>

      {project.github && <p><a href={project.github} target="_blank" rel="noreferrer">github repo ↗</a></p>}

      <div className="gallery">
        {project.media.length ? project.media.map((item, index) => {
          const source = typeof item === "string" ? item : item.src;
          const caption = typeof item === "string" ? "" : item.caption;
          const youtubeId = typeof item === "object" ? item.youtube : "";
          const comparison = typeof item === "object" ? item.comparison : null;
          const isVideo = /\.(mp4|webm|mov)$/i.test(source);
          const comparisonReady = comparison && [comparison.before, comparison.after].every((file) => existsSync(path.join(process.cwd(), "public", file)));
          return (
            <figure key={youtubeId || source || comparison?.before}>
              {comparison ? (comparisonReady ? <VideoWipe before={comparison.before} after={comparison.after} /> : <div className="empty-gallery"><p>add before-2.mp4 and vision-2.mp4 to public/projects/basketball/ for this comparison</p></div>) : youtubeId ? (
                <div className="youtube"><iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}?controls=0&modestbranding=1&rel=0&iv_load_policy=3`} title={caption || `${project.title} video ${index + 1}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
              ) : isVideo ? <video src={source} controls playsInline /> : <img src={source} alt={caption || `${project.title} image ${index + 1}`} />}
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          );
        }) : (
          <div className="empty-gallery">
            <p>photos and videos will go here</p>
            <small>see public/projects/{project.slug}/README.txt</small>
          </div>
        )}
      </div>

      <p className="project-notes">{project.notes}</p>
    </main>
  );
}

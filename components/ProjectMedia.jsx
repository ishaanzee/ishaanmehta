import { getProject } from "../data/projects";

export default function ProjectMedia({ project, variant }) {
  const path = getProject(project)?.cover;
  const isVideo = path && /\.(mp4|webm|mov)$/i.test(path);

  return (
    <div className="media-placeholder" data-media={project}>
      {path ? (
        isVideo ? (
          <video className="project-media" src={path} autoPlay loop muted playsInline aria-label={`${project} project demo`} />
        ) : (
          // A regular img avoids remote image configuration and works for user-provided media.
          <img className="project-media" src={path} alt={`${project} project demo`} />
        )
      ) : (
        <>
          {variant === "lamp" ? <div className="placeholder-mark" aria-hidden="true"><span /></div> : <div className="court" aria-hidden="true"><span /></div>}
          <p>Demo coming soon</p>
        </>
      )}
    </div>
  );
}

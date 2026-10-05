import { getProject } from "../data/projects";

export default function ProjectMedia({ project, variant }) {
  const path = getProject(project)?.cover;
  const isVideo = path && /\.(mp4|webm|mov)$/i.test(path);

  if (variant === "kernelopt") {
    return (
      <div className="media-placeholder kernel-cover" data-media={project} role="img" aria-label="Latency per 1080p frame: 50.9 ms with ONNX Runtime + Core ML, 28.2 ms with MLX + Metal">
        <strong>1.8×</strong>
        <div className="kernel-cover-row"><span>onnx + core ml</span><span>50.9ms</span><i><b style={{ width: "100%" }} /></i></div>
        <div className="kernel-cover-row kernel-cover-fast"><span>mlx + metal</span><span>28.2ms</span><i><b style={{ width: `${(28.2 / 50.9) * 100}%` }} /></i></div>
      </div>
    );
  }

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

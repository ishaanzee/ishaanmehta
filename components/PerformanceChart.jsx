import performance from "../docs/portfolio-performance.json";
import latest from "../docs/performance-2026-09-25.json";

function Bars({ chart, unit, decimals = 2, highlight, scaleMax }) {
  const max = scaleMax ?? Math.max(...chart.points.map((point) => point.value));

  return (
    <div className="performance-bars" role="img" aria-label={`${chart.title}: ${chart.points.map((point) => `${point.label} ${point.value.toFixed(decimals)} ${unit}`).join(", ")}`}>
      {chart.points.map((point) => (
        <div className="performance-row" key={point.run}>
          <span className="performance-label">{point.label}</span>
          <div className="performance-track" aria-hidden="true">
            <span className={`performance-bar${point.run === highlight ? " performance-bar-highlight" : ""}`} style={{ width: `${(point.value / max) * 100}%` }} />
          </div>
          <span className="performance-value">{point.value.toFixed(decimals)}{unit === "milliseconds" ? "ms" : "s"}</span>
        </div>
      ))}
    </div>
  );
}

function EarlierPerformance() {
  const { benchmark, charts, comparisons } = performance;
  const total = charts.find((chart) => chart.id === "end_to_end_time");
  const detector = charts.find((chart) => chart.id === "ball_detector_latency");
  const pose = charts.find((chart) => chart.id === "pose_latency");
  const reduction = comparisons.cpu_serial_to_neural_engine_pose.end_to_end_time_reduction_percent;
  const sameDay = comparisons.same_day_coreml_overlap_rerun_to_neural_engine_pose;

  return (
    <details className="performance-breakdown">
      <summary>earlier optimizations · September 22–24</summary>
      <p className="performance-detail performance-history-intro">These earlier runs used the ONNX / Core ML ball detector. The final setup in this batch took {reduction.toFixed(1)}% less time than the original CPU run.</p>

      <figure className="performance-chart">
        <figcaption>
          <strong>{total.title}</strong>
          <span>seconds · lower is better</span>
        </figcaption>
        <Bars chart={total} unit="seconds" highlight="neural_engine_pose" />
        <p className="performance-detail">The last two steps keep the models loaded, then switch pose to fp16 Core ML with the Neural Engine requested.</p>
        <p className="performance-detail">The original overlapped run took 83.50s. A rerun on September 24 took {sameDay.rerun_end_to_end_seconds.toFixed(2)}s; the final setup in this batch cut that by {sameDay.end_to_end_time_reduction_percent.toFixed(1)}%.</p>
      </figure>

      <details className="performance-breakdown">
        <summary>detector and pose timings</summary>
        <figure className="performance-chart">
          <figcaption>
            <strong>{detector.title}</strong>
            <span>median milliseconds · lower is better</span>
          </figcaption>
          <Bars chart={detector} unit="milliseconds" decimals={1} highlight="detector_gpu" />
        </figure>
        <figure className="performance-chart">
          <figcaption>
            <strong>{pose.title}</strong>
            <span>median milliseconds · lower is better</span>
          </figcaption>
          <Bars chart={pose} unit="milliseconds" decimals={1} highlight="pose_neural_engine" />
        </figure>
        <p className="performance-detail">Measured with each model warmed up and running on its own. Includes preprocessing, inference, and readback. Pose uses one full frame and two crops. Core ML settings request compute units; they don't confirm where every operation runs.</p>
      </details>

      <div className="performance-method">
        <p>One {benchmark.decoded_frames_processed}-frame, {benchmark.resolution} clip on an {benchmark.hardware}. One run per configuration, measured across two days. These are full analysis times; models were preloaded for the last two runs.</p>
        <p>The later runs used a rim marked on frame 0, shifting the detected make from frame 243 to 245. The shot score was 97.9 with PyTorch pose and 97.4 with fp16 pose, which changed measured separation by 0.7%.</p>
      </div>
    </details>
  );
}

export default function PerformanceChart() {
  const comparison = latest.charts.find((chart) => chart.id === "per_clip_end_to_end");
  const original = performance.charts.find((chart) => chart.id === "end_to_end_time");
  const reference = latest.clips.find((clip) => clip.clip === latest.headline.reference_clip);
  const baseline = original.points[0].value;
  const current = reference.after.elapsed_s;
  const totalReduction = (1 - current / baseline) * 100;
  const progress = {
    title: "From the first version to now",
    points: [
      ...original.points,
      { run: "mlx_metal", label: "MLX + Metal, automatic rim", value: reference.before.elapsed_s },
      { run: "latest", label: "+ single-pass video & GPU side pose", value: current },
    ],
  };
  const steps = latest.charts.find((chart) => chart.id === "reference_clip_steps");
  const stepChart = {
    title: "Reference clip, step by step",
    points: steps.points.map((point) => ({ ...point, value: point.elapsed_s })),
  };
  const scaleMax = Math.max(...comparison.series.flatMap((series) => series.values));

  return (
    <section className="performance" aria-labelledby="performance-heading">
      <div className="performance-heading">
        <div>
          <p className="performance-eyebrow">ballform / <time dateTime={latest.measured_on}>September 25</time></p>
          <h2 id="performance-heading">Faster video analysis</h2>
        </div>
        <p className="performance-callout"><strong>{totalReduction.toFixed(1)}%</strong><span>less total time</span><span>vs. original CPU run</span></p>
      </div>

      <p className="performance-detail performance-intro">The same {reference.analyzed_frames}-frame clip went from {baseline.toFixed(2)}s to {current.toFixed(2)}s — {(baseline / current).toFixed(2)}× faster overall.</p>

      <figure className="performance-chart">
        <figcaption>
          <strong>{progress.title}</strong>
          <span>seconds · lower is better</span>
        </figcaption>
        <Bars chart={progress} unit="seconds" highlight="latest" />
        <p className="performance-detail">Measured on the same M3 Pro across September 22–25. The detector backend, model loading, and rim setup changed along the way. The last two runs use an automatically detected rim; marking it manually adds about 4 seconds in the latest tests. These are individual runs showing the total measured improvement across versions.</p>
      </figure>

      <details className="performance-breakdown">
        <summary>latest changes across four clips · {latest.headline.mean_reduction_across_clips_percent.toFixed(1)}% less time on average</summary>
        <p className="performance-detail performance-history-intro">The review video now gets drawn and encoded in one pass. When the GPU is free from side-crop ball detection, it also handles the right crop's pose.</p>
      <figure className="performance-chart">
        <figcaption>
          <strong>{comparison.title}</strong>
          <span>seconds · lower is better</span>
        </figcaption>
        <div className="performance-groups">
          {comparison.categories.map((clip, index) => {
            const group = {
              title: `Clip ${clip}`,
              points: comparison.series.map((series) => ({ run: series.id, label: series.label, value: series.values[index] })),
            };
            const clipData = latest.clips.find((item) => item.clip === clip);
            return (
              <div className="performance-group" key={clip}>
                <p className="performance-group-heading"><span>clip {clip} · {clipData.analyzed_frames} frames</span><span>{clipData.elapsed_reduction_percent.toFixed(1)}% less time</span></p>
                <Bars chart={group} unit="seconds" highlight="after" scaleMax={scaleMax} />
              </div>
            );
          })}
        </div>
        <p className="performance-detail">Before and after the two latest changes. Each clip was run once per configuration with the rim detected automatically. The {latest.headline.mean_reduction_across_clips_percent.toFixed(1)}% average here covers this update only.</p>
      </figure>
      </details>

      <details className="performance-breakdown">
        <summary>what each change saved</summary>
        <figure className="performance-chart">
          <figcaption>
            <strong>{stepChart.title}</strong>
            <span>seconds · mean of 2 runs</span>
          </figcaption>
          <Bars chart={stepChart} unit="seconds" highlight="after" />
          <p className="performance-detail">Each row adds to the one above. These tests used a rim marked on frame 0, adding about 4 seconds of tracking to every run. That makes them slower than the automatic-rim tests above.</p>
        </figure>
        <p className="performance-detail">On clip {latest.headline.reference_clip} with the rim detected automatically, review-video time fell from {latest.headline.review_video_before_s.toFixed(2)}s to {latest.headline.review_video_after_s.toFixed(2)}s. Most of that saving came from removing two extra encodes and overlapping encoding with drawing.</p>
      </details>

      <EarlierPerformance />

      <div className="performance-method">
        <p>Measured on {latest.measured_on} on an {latest.hardware}, with models preloaded. Ball detection uses MLX + Metal; pose uses fp16 Core ML.</p>
        <p>Release times, make frames, shooters, defenders, and outcomes stayed the same across all four clips. Clip 2fcb's score changed from 91.3 to 89.8 with the GPU pose keypoints; the other scores stayed the same.</p>
      </div>
    </section>
  );
}

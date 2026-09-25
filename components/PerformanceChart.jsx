import performance from "../docs/portfolio-performance.json";

function Bars({ chart, unit, decimals = 2, highlight }) {
  const max = Math.max(...chart.points.map((point) => point.value));

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

export default function PerformanceChart() {
  const { benchmark, charts, comparisons } = performance;
  const total = charts.find((chart) => chart.id === "end_to_end_time");
  const detector = charts.find((chart) => chart.id === "ball_detector_latency");
  const pose = charts.find((chart) => chart.id === "pose_latency");
  const reduction = comparisons.cpu_serial_to_neural_engine_pose.end_to_end_time_reduction_percent;
  const sameDay = comparisons.same_day_coreml_overlap_rerun_to_neural_engine_pose;

  return (
    <section className="performance" aria-labelledby="performance-heading">
      <div className="performance-heading">
        <div>
          <p className="performance-eyebrow">performance / ballform</p>
          <h2 id="performance-heading">Faster video analysis</h2>
        </div>
        <p className="performance-callout"><strong>{reduction.toFixed(1)}%</strong><span>less total time</span><span>vs. original CPU run</span></p>
      </div>

      <figure className="performance-chart">
        <figcaption>
          <strong>{total.title}</strong>
          <span>seconds · lower is better</span>
        </figcaption>
        <Bars chart={total} unit="seconds" highlight="neural_engine_pose" />
        <p className="performance-detail">The last two steps keep the models loaded, then switch pose to fp16 Core ML with the Neural Engine requested.</p>
        <p className="performance-detail">The original overlapped run took 83.50s. A rerun on the day of the new measurements took {sameDay.rerun_end_to_end_seconds.toFixed(2)}s; the latest setup cut that by {sameDay.end_to_end_time_reduction_percent.toFixed(1)}%.</p>
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
    </section>
  );
}

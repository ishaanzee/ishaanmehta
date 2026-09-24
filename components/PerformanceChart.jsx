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
          <span className="performance-value">{point.value.toFixed(decimals)}s</span>
        </div>
      ))}
    </div>
  );
}

export default function PerformanceChart() {
  const { benchmark, charts, comparisons } = performance;
  const total = charts.find((chart) => chart.id === "end_to_end_time");
  const detector = charts.find((chart) => chart.id === "ball_detection_work");
  const reduction = comparisons.cpu_serial_to_coreml_overlap.end_to_end_time_reduction_percent;
  const detectorSpeedup = comparisons.cpu_serial_to_coreml_serial.ball_detection_work_speedup;

  return (
    <section className="performance" aria-labelledby="performance-heading">
      <div className="performance-heading">
        <div>
          <p className="performance-eyebrow">performance / ballform</p>
          <h2 id="performance-heading">Faster video analysis</h2>
        </div>
        <p className="performance-callout"><strong>{reduction.toFixed(1)}%</strong><span>less total time</span></p>
      </div>

      <figure className="performance-chart">
        <figcaption>
          <strong>{total.title}</strong>
          <span>seconds · lower is better</span>
        </figcaption>
        <Bars chart={total} unit="seconds" highlight="coreml_overlap" />
      </figure>

      <figure className="performance-chart performance-chart-secondary">
        <figcaption>
          <strong>Ball detection work</strong>
          <span>420 detector calls · lower is better</span>
        </figcaption>
        <Bars chart={detector} unit="seconds" highlight="coreml_serial" />
        <p className="performance-detail">Core ML reduced cumulative detector work by {detectorSpeedup.toFixed(2)}× in the serial runs.</p>
      </figure>

      <p className="performance-method">One {benchmark.decoded_frames_processed}-frame, {benchmark.resolution} clip on an {benchmark.hardware}. Each configuration was run once. Total time includes the full analysis; detector work includes preprocessing, inference, decoding, and readback. All runs produced the same shot result.</p>
    </section>
  );
}

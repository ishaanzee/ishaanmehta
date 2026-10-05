import data from "../docs/kernelopt-2026-09-24.json";
import { Bars } from "./PerformanceChart";

export default function KerneloptChart() {
  const chart = (id) => data.charts.find((item) => item.id === id);
  const frame = chart("end_to_end_frame");
  const steps = chart("model_steps");
  const preprocess = chart("preprocess");
  const { headline } = data;

  return (
    <section className="performance" aria-labelledby="kernelopt-heading">
      <div className="performance-heading">
        <div>
          <p className="performance-eyebrow">kernelopt / <time dateTime={data.measured_on}>September 24</time></p>
          <h2 id="kernelopt-heading">Faster ball detection</h2>
        </div>
        <p className="performance-callout"><strong>{headline.speedup.toFixed(1)}×</strong><span>faster per frame</span><span>same detections</span></p>
      </div>

      <figure className="performance-chart">
        <figcaption>
          <strong>{frame.title}</strong>
          <span>{frame.note} · lower is better</span>
        </figcaption>
        <Bars chart={frame} unit="milliseconds" decimals={1} highlight="mlx_fp32" />
        <p className="performance-detail">fp32 passes all {headline.accuracy_checks_total} reference detection checks on {headline.accuracy_images} images. fp16 is faster but fails 3 of them, so it&apos;s opt-in.</p>
      </figure>

      <details className="performance-breakdown">
        <summary>what each change saved</summary>
        <figure className="performance-chart">
          <figcaption>
            <strong>{steps.title}</strong>
            <span>{steps.note}</span>
          </figcaption>
          <Bars chart={steps} unit="milliseconds" decimals={1} highlight="gemm" />
          <p className="performance-detail">Each row adds to the one above. The deformable attention row is approximate (about 30 ms).</p>
        </figure>
      </details>

      <details className="performance-breakdown">
        <summary>preprocessing · 4.7ms to 0.42ms</summary>
        <figure className="performance-chart">
          <figcaption>
            <strong>{preprocess.title}</strong>
            <span>{preprocess.note}</span>
          </figcaption>
          <Bars chart={preprocess} unit="milliseconds" decimals={2} highlight="gpu" />
          <p className="performance-detail">The Mac build of OpenCV hands these resizes to Arm&apos;s KleidiCV library, which rounds differently from OpenCV&apos;s own code. The kernel reproduces both exactly, because even a one-bit change in the input can reorder which objects the detector keeps.</p>
        </figure>
      </details>

      <div className="performance-method">
        <p>Measured on {data.measured_on} on an otherwise idle {data.hardware}. Medians of 60 warm calls, from a uint8 frame in to boxes and scores out.</p>
        <p>Two detectors on two threads went from {headline.threaded_calls_per_s_before} to {headline.threaded_calls_per_s_after.toFixed(1)} calls per second, with all 600 concurrent calls matching single-threaded output exactly.</p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoWipe({ before, after }) {
  const frame = useRef(null);
  const beforeVideo = useRef(null);
  const afterVideo = useRef(null);
  const [position, setPosition] = useState(50);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);

  useEffect(() => {
    const first = beforeVideo.current;
    const second = afterVideo.current;
    const element = frame.current;
    if (!first || !second || !element) return;

    const sync = () => {
      if (Math.abs(second.currentTime - first.currentTime) > 0.08) {
        second.currentTime = first.currentTime;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.3 });
    observer.observe(element);
    first.addEventListener("timeupdate", sync);
    first.addEventListener("seeked", sync);
    return () => {
      observer.disconnect();
      first.removeEventListener("timeupdate", sync);
      first.removeEventListener("seeked", sync);
    };
  }, []);

  useEffect(() => {
    const first = beforeVideo.current;
    const second = afterVideo.current;
    if (!first || !second) return;
    if (visible && !manuallyPaused) {
      second.currentTime = first.currentTime;
      Promise.allSettled([first.play(), second.play()]).then((results) => {
        setPlaying(results.every((result) => result.status === "fulfilled"));
      });
    } else {
      first.pause();
      second.pause();
      setPlaying(false);
    }
  }, [visible, manuallyPaused]);

  const togglePlayback = () => {
    setManuallyPaused(playing);
  };

  return (
    <div className="video-wipe">
      <div className="video-wipe-frame" ref={frame}>
        <video ref={beforeVideo} src={before} muted loop playsInline />
        <div className="video-wipe-after" style={{ width: `${position}%` }}>
          <video ref={afterVideo} src={after} style={{ width: `${position ? 10000 / position : 100}%` }} muted loop playsInline />
        </div>
        <span className="video-wipe-label video-wipe-vision-label">computer vision</span>
        <span className="video-wipe-label video-wipe-original-label">original</span>
        <span className="video-wipe-divider" style={{ left: `${position}%` }} aria-hidden="true"><span>↔</span></span>
        <button className="video-wipe-play" type="button" onClick={togglePlayback} aria-label={playing ? "Pause videos" : "Play videos"}>
          {playing ? "pause" : "play"}
        </button>
      </div>
      <input
        className="video-wipe-slider"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(event.target.value)}
        aria-label="Reveal computer vision video"
      />
      <div className="video-wipe-key"><span>← computer vision</span><span>original →</span></div>
    </div>
  );
}

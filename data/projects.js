export const projects = {
  basketball: {
    slug: "basketball",
    title: "basketball shot analyzer",
    summary: "A computer vision project that looks at shooting form, gives feedback, and rates shots in a real 1-on-1 or 5 on 5 game.",
    notes: "intended to run on apple silicon with 16gb ram (only tested on 36gb).",
    github: "https://github.com/ishaanzee/formball",
    cover: "/projects/basketball/formballcover.png",
    media: [
      {
        comparison: {
          before: "/projects/basketball/before.mp4",
          after: "/projects/basketball/vision.mp4",
        },
        caption: "Ex1: drag the slider to compare the original and computer vision video",
      },
      {
        src: "/projects/basketball/Screenshot 2026-09-18 at 8.20.05 PM.png",
        caption: "simple summary"
      },
      {
        src: "/projects/basketball/Screenshot 2026-09-18 at 8.20.15 PM.png",
        caption: "advanced metrics"
      },
      {
        comparison: {
          before: "/projects/basketball/before-2.mp4",
          after: "/projects/basketball/vision-2.mp4",
        },
        caption: "Ex2: drag the slider to compare the original and computer vision video",
      },
      {
        src: "/projects/basketball/simplemetrics.png",
        caption: "simple summary"
      },
      {
        src: "/projects/basketball/advancedmetrics.png",
        caption: "advanced metrics"
      }

    ],
  },
  lamp: {
    slug: "lamp",
    title: "lamp robot simulation",
    summary: "A 5-DOF URDF lamp controlled by a person's arm movement. MediaPipe tracks the shoulder, elbow, and wrist, then maps those angles to the lamp's base, shoulder, and middle joint.",
    notes: "rf detr nano x openCV x mediapip x pytorch. as arm moves, lamp follows. open hand turns the light on and closing hand turns it off.",
    github: "https://github.com/ishaanzee/LCRobot",
    cover: "projects/lamp/coverlcr.png",
    media: [{
      youtube: "g2LXclfwVDU",
      caption: "Lamp robot demo",
    },
    ],
  },
};

export function getProject(slug) {
  return projects[slug];
}

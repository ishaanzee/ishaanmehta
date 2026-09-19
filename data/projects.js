export const projects = {
  basketball: {
    slug: "basketball",
    title: "basketball shot analyzer",
    summary: "A computer vision project that looks at shooting form, gives feedback, and rates shots in a 1-on-1.",
    notes: "intended to run on apple silicon with 16gb ram minimum (24 recommended).",
    github: "https://github.com/ishaanzee/formball",
    cover: "/projects/basketball/formballcover.png",
    media: [
      {
        youtube: "6gkVcpQtEcA",
        caption: "Ex1: before comp vision"
      },
      {
        youtube: "uuiYnWBlgpQ",
        caption: "Ex1: processed video"
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
        youtube: "2D-dZsQ6Rtc",
        caption: "Ex2: before comp vision"
      },
      {
        youtube: "ZF1sE-wZctk",
        caption: "Ex2: processed video"
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

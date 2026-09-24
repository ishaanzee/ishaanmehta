export const projects = {
  ballform: {
    slug: "ballform",
    title: "ballform",
    summary: "A computer vision project that looks at shooting form, gives feedback, and rates shots in a real 1-on-1 or 5 on 5 game.",
    notes: "intended to run on apple silicon with 16gb ram (only tested on 36gb).",
    github: "https://github.com/ishaanzee/formball",
    cover: "/projects/ballform/cover.png",
    media: [
      {
        comparison: {
          before: "/projects/ballform/before.mp4",
          after: "/projects/ballform/vision.mp4",
        },
        caption: "first clip: drag the slider to see what ballform tracks.",
      },
      {
        src: "/projects/ballform/Screenshot 2026-09-18 at 8.20.05 PM.png",
        caption: "ballform found one release and marked it as made or likely made."
      },
      {
        src: "/projects/ballform/Screenshot 2026-09-18 at 8.20.15 PM.png",
        caption: "the shot scored 88/100 for space. below it are the defender spacing and hand clearance measurements."
      },
      {
        comparison: {
          before: "/projects/ballform/before-2.mp4",
          after: "/projects/ballform/vision-2.mp4",
        },
        caption: "second clip: drag the slider to compare the original footage with ballform's tracking.",
      },
      {
        src: "/projects/ballform/simplemetrics.png",
        caption: "one release found in the second clip, also marked as made or likely made."
      },
      {
        src: "/projects/ballform/advancedmetrics.png",
        caption: "this shot scored 66.9/100 for space. ballform couldn't measure the change in separation before release."
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

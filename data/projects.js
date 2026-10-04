export const projects = {
  ballform: {
    slug: "ballform",
    title: "ballform",
    summary: "A computer vision project that looks at shooting form, gives feedback, and rates shots in a real 1-on-1 or 5 on 5 game. I optimized the GPU kernel and video pipeline to cut processing time by 88% on a test clip.",
    notes: "intended to run on apple silicon with 16gb ram (only tested on 36gb). Ball detection uses an optimized MLX + Metal kernel, with fp16 Core ML pose work split between the Neural Engine and GPU.",
    github: "https://github.com/ishaanzee/formball",
    cover: "/projects/ballform/cover.jpg",
    media: [
      {
        comparison: {
          before: "/projects/ballform/before.mp4",
          after: "/projects/ballform/vision.mp4",
        },
        caption: "first clip: drag the slider to see what ballform tracks.",
      },
      {
        src: "/projects/ballform/metrics1.png",
        caption: "court calibration estimates this shot at 24.3 ft from the basket, with 10.1 ft of floor separation between the shooter and defender."
      },
      {
        comparison: {
          before: "/projects/ballform/before-2.mp4",
          after: "/projects/ballform/vision-2.mp4",
        },
        caption: "second clip: drag the slider to compare the original footage with ballform's tracking.",
      },
      {
        src: "/projects/ballform/metrics2.png",
        caption: "pose estimation measures the shooter–defender gap in torso lengths: 2.98 at release here, after narrowing by 0.98 before the shot."
      }

    ],
  },
  lamp: {
    slug: "lamp",
    title: "lamp robot simulation",
    summary: "A 5-DOF URDF lamp controlled by a person's arm movement. MediaPipe tracks the shoulder, elbow, and wrist, then maps those angles to the lamp's base, shoulder, and middle joint.",
    notes: "rf detr nano x openCV x mediapip x pytorch. as arm moves, lamp follows. open hand turns the light on and closing hand turns it off.",
    github: "https://github.com/ishaanzee/LCRobot",
    cover: "/projects/lamp/coverlcr.jpg",
    media: [{
      youtube: "g2LXclfwVDU",
      caption: "Lamp robot demo",
    },
    ],
  },
  "claude-widget": {
    slug: "claude-widget",
    title: "claude usage widget",
    summary: "An iPhone widget that shows how much of my Claude session (5h) and weekly limits I've used, so I can check without opening anything.",
    notes: "a swiftbar plugin on my mac writes the usage to a json file in icloud drive every 5 minutes, and a scriptable widget on my phone reads it. bars turn amber at 70% and red at 90%, it remembers the last reading if the mac or icloud is offline, shows when it last updated, and warns you if that's over 30 minutes old. comes in small, medium, and lock screen sizes.",
    github: "https://github.com/ishaanzee/claude-usage-widget",
    cover: "/projects/claude-widget/widget.png",
    media: [
      {
        src: "/projects/claude-widget/widget.png",
        caption: "the medium widget on my home screen: the 5 hour session just reset to 0%, 16% of the weekly limit used, plus the per-model weekly number and last updated time at the bottom.",
      },
    ],
  },
  "rdr2-mac": {
    slug: "rdr2-mac",
    title: "red dead redemption 2 on mac",
    summary: "Red Dead Redemption 2 has no Mac version, so I built a setup that runs the Windows game on my Apple Silicon Mac. It launches from Heroic, signs in to Rockstar on its own, and is playable.",
    notes: "the engine is wine 9.0 built from crossover 24 sources, with apple's d3dmetal 3.0 translating directx 12 to metal. rockstar's launcher is a chromium app that kept crashing under wine, so i patched wine's user32 and d2d1 and wrote a small c wrapper that starts the social club helper with the right chromium flags. you need your own copy of the game from epic. none of the game or apple's files are in the repo, just the patches and scripts.",
    github: "https://github.com/ishaanzee/rdr2-mac-engine",
    cover: "/projects/rdr2-mac/cover.jpg",
    media: [
      {
        src: "/projects/rdr2-mac/gameplay.jpg",
        caption: "red dead redemption 2 running on my M3 Pro MacBook through the custom wine + d3dmetal setup.",
      },
      {
        src: "/projects/rdr2-mac/menu.jpg",
        caption: "the in-game pause menu.",
      },
    ],
  },
};

export function getProject(slug) {
  return projects[slug];
}

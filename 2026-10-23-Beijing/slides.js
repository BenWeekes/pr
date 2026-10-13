/*
 * Edit the deck here. All assets are local; there is no build step.
 * These eight slides are starter layouts, not an agreed talk outline.
 * The event date and location come from RTE2026.pptx, slide 3.
 * For a video, set src to e.g. "media/demo-01.mp4". Do not autoplay audio.
 */
window.DECK = {
  speaker: "Ben Weekes",
  role: "Chief Architect",
  company: "Agora",
  event: "iRTE 2026",
  date: "23 OCT 2026",
  location: "BEIJING / 北京",
  slides: [
    {
      id: "title", type: "title", label: "Title",
      kicker: "KEYNOTE / 主题演讲",
      title: "Presentation title",
      subtitle: "演讲主题待定",
      notes: "Opening slide. Replace the title and subtitle with the final talk title. Ben Weekes — Chief Architect, Agora. The date (23 October 2026) and Beijing location are taken from the supplied conference template; update them here if your session differs."
    },
    {
      id: "outline", type: "agenda", label: "Outline",
      kicker: "OUTLINE / 演讲概览",
      title: "The story at a glance.",
      subtitle: "Talk structure to be added.",
      items: [
        { title: "First section", detail: "Introduce your opening idea." },
        { title: "Second section", detail: "Develop your main argument." },
        { title: "Demos & discussion", detail: "Show the videos and open the conversation." }
      ],
      notes: "A sample three-part outline. Replace these sections when the talk structure is supplied. You can add, remove, or reorder objects in slides.js."
    },
    {
      id: "section", type: "section", label: "Section divider",
      number: "01", title: "Section title",
      subtitle: "A short introduction to this part of the talk.",
      notes: "Reusable section divider, based on slide 4 of the PowerPoint. Change the number, heading, and introductory line for each chapter."
    },
    {
      id: "content", type: "content", label: "Content & visual",
      kicker: "SECTION 01 / 内容",
      title: "Your key idea goes here.",
      heading: "Supporting detail",
      body: "Add the explanation that supports the main idea. Keep this slide focused on one point.",
      bullets: ["First talking point", "Second talking point", "Third talking point"],
      image: "", imageAlt: "", visualLabel: "Image or diagram",
      notes: "Two-column content layout, based on slide 5 of the template. Add an image path and descriptive imageAlt, or leave the visual placeholder until the artwork is ready."
    },
    {
      id: "key-points", type: "columns", label: "Three key points",
      kicker: "KEY POINTS / 核心观点",
      title: "Three ideas to remember.",
      items: [
        { title: "First idea", body: "Add a concise explanation of your first point." },
        { title: "Second idea", body: "Add a concise explanation of your second point." },
        { title: "Third idea", body: "Add a concise explanation of your third point." }
      ],
      notes: "Three-column layout inspired by slides 6 and 7 of the template. These are placeholders, with no product claims or sample statistics."
    },
    {
      id: "video", type: "video", label: "Video demo",
      kicker: "DEMO / 视频演示", title: "See it in action.",
      caption: "Demo video", src: "", poster: "", captions: "", captionsLanguage: "en",
      notes: "Video placeholder. Put the supplied video in media/ and set this slide's src in slides.js. Prefer MP4 with H.264 video and AAC audio for broad browser support. A relative media path keeps playback independent of third-party video services. Optional poster and WebVTT captions are supported. Duplicate this slide for additional videos. Videos pause when you change slides; K toggles playback."
    },
    {
      id: "questions", type: "qa", label: "Questions",
      title: "Q&A", subtitle: "Let’s continue the conversation.",
      chinese: "一起交流，继续探索。",
      notes: "Questions and discussion."
    },
    {
      id: "thanks", type: "thanks", label: "Thank you",
      title: "Thanks", subtitle: "谢谢参与",
      notes: "Closing slide. A contact link or QR code can be added once you provide the destination."
    }
  ]
};

/*
 * Fifteen-minute demo reel: opening, seven video demos, closing.
 * Introduce each clip briefly; playback is manual.
 * Five videos are awaiting delivery. Keep each supplied clip at 2 minutes or less.
 * Edit this file to change content, media paths, and speaker notes.
 */
window.DECK = {
  "speaker": "Ben Weekes",
  "role": "Chief Architect",
  "company": "Agora",
  "event": "iRTE 2026",
  "date": "23 OCT 2026",
  "location": "BEIJING / 北京",
  "talkTitle": "What's New This Year in RTE and Conversational AI - Global Market",
  "durationMinutes": 15,
  "slides": [
    {
      "id": "title",
      "type": "title",
      "label": "Opening",
      "kicker": "2026 / GLOBAL MARKET",
      "title": "What's New This Year\nin RTE and\nConversational AI",
      "subtitle": "Global Market / 全球市场",
      "notes": "OPENING — 20 seconds.\n\nSuggested introduction: I'm Ben Weekes, Chief Architect at Agora. Here is a quick look at what's new this year in real-time engagement and conversational AI in the global market, through seven short demos.\n\nFormat: introduce each demo in about 15 seconds, then play it. K plays/pauses; arrows change slides. Clips are two minutes or less. No automatic playback or advance."
    },
    {
      "id": "mrbeast-whatnot",
      "type": "video",
      "label": "MrBeast on Whatnot",
      "kicker": "DEMO 01 / 07 · LIVE SHOPPING",
      "title": "MrBeast on Whatnot",
      "caption": "MrBeast × Whatnot × Agora",
      "src": "media/mrbeast-whatnot.mp4",
      "poster": "media/mrbeast-whatnot-poster.jpg",
      "durationSeconds": 12.566667,
      "portrait": true,
      "heroNumber": "583K+",
      "heroLabel": "peak concurrent viewers",
      "context": "Record-setting U.S. live shopping.\nPowered by Agora.",
      "sourceLabel": "Source: Whatnot Engineering ↗",
      "sourceUrl": "https://medium.com/whatnot-engineering/scaling-whatnot-behind-the-largest-live-shopping-stream-in-us-history-040a458f538c",
      "notes": "INTRO — about 15 seconds. VIDEO — 13 seconds.\n\nSuggested introduction: First, scale. This is MrBeast on Whatnot, powered by Agora. Whatnot reported 583K peak concurrent viewers for its record U.S. live-shopping event. Listen to his reaction to the delay.\n\nThe supplied clip is a short latency reaction, not a recording of the peak-viewer moment. Public source: https://medium.com/whatnot-engineering/scaling-whatnot-behind-the-largest-live-shopping-stream-in-us-history-040a458f538c\n\nBen's initial outline used 584K and 'world record'. Published Whatnot material reports 583K peak viewers and a U.S. record; use that wording until the alternative figure and global claim are confirmed."
    },
    {
      "id": "avatar-comparison",
      "type": "video",
      "label": "Avatars & vendor comparison",
      "kicker": "DEMO 02 / 07 · AVATARS",
      "title": "Avatars & vendor comparison",
      "caption": "Avatars & vendor comparison",
      "src": "",
      "poster": "",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 15 seconds. VIDEO — up to 2 minutes; to be supplied.\n\nSuggested introduction: Next, avatars. Different vendors make different trade-offs. In this comparison, look at the appearance, motion, voice and responsiveness, and how they fit the experience you want to create.\n\nAdd the comparison video when Ben shares it. Confirm the vendor names and comparison conditions from that video; no vendor rankings are asserted in this draft."
    },
    {
      "id": "avatar-gaming",
      "type": "video",
      "label": "Avatar-assisted gaming",
      "kicker": "DEMO 03 / 07 · GAMING",
      "title": "Avatar-assisted gaming",
      "caption": "Avatar-assisted gaming",
      "src": "",
      "poster": "",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 15 seconds. VIDEO — up to 2 minutes; to be supplied.\n\nSuggested introduction: Avatars can do more than present. Here is an example of avatar-assisted gaming. Watch how the avatar participates in the experience and how the interaction fits around the game.\n\nAdd the gaming video when supplied."
    },
    {
      "id": "avatar-tv-lottery",
      "type": "video",
      "label": "Avatars presenting a TV lottery",
      "kicker": "DEMO 04 / 07 · BROADCAST",
      "title": "Avatars presenting a TV lottery",
      "caption": "Avatar TV lottery presenter",
      "src": "",
      "poster": "",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 15 seconds. VIDEO — up to 2 minutes; to be supplied.\n\nSuggested introduction: The same idea reaches broadcast. Here is an avatar presenting a TV lottery. Look at the delivery, timing and continuity of its on-screen performance.\n\nAdd the TV lottery video when supplied. Confirm the broadcaster and any deployment claims from the supplied material."
    },
    {
      "id": "gpt-live-delegation",
      "type": "video",
      "label": "GPT-Live & delegation",
      "kicker": "DEMO 05 / 07 · CONVERSATIONAL AI",
      "title": "GPT-Live: full duplex & delegation",
      "caption": "GPT-Live with delegation",
      "src": "media/gpt-live-delegation.mp4",
      "poster": "media/gpt-live-delegation-poster.jpg",
      "durationSeconds": 120,
      "notes": "INTRO — about 15 seconds. VIDEO — 2 minutes.\n\nSuggested introduction: This is GPT-Live in a full-duplex conversation. We ask for a weekend trip, and it delegates the task while keeping the conversation flowing. Watch the result appear at the bottom.\n\nIn the supplied demo, Ben asks for a rainy weekend near London and mentions seafood. The conversation delegates the task, suggests Dublin, and saves the trip plan. The terminal displays the saved result. Describe this as saving a plan, not booking a flight.\n\nThe clip is kept at 2 minutes and encoded for local H.264/AAC playback. The original is preserved separately."
    },
    {
      "id": "card-dealing-avatars",
      "type": "video",
      "label": "Card-dealing avatars · WIP",
      "kicker": "DEMO 06 / 07 · WORK IN PROGRESS",
      "title": "Card-dealing avatars",
      "caption": "Card-dealing avatars",
      "src": "",
      "poster": "",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 15 seconds. VIDEO — up to 2 minutes; to be supplied.\n\nSuggested introduction: Now two experiments we are still working on. First, card-dealing avatars. Speech, visible actions and the game state all have to stay in sync.\n\nAdd the card-dealing video when supplied. Keep the work-in-progress label; do not imply production readiness."
    },
    {
      "id": "ai-commentary",
      "type": "video",
      "label": "AI commentary · WIP",
      "kicker": "DEMO 07 / 07 · WORK IN PROGRESS",
      "title": "AI commentary",
      "caption": "AI commentary",
      "src": "",
      "poster": "",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 15 seconds. VIDEO — up to 2 minutes; to be supplied.\n\nSuggested introduction: Second, AI commentary: turning a live stream of events into timely narration. We are exploring how to keep the commentary relevant and naturally paced.\n\nAdd the AI commentary video when supplied. Keep this explicitly framed as work in progress."
    },
    {
      "id": "thanks",
      "type": "thanks",
      "label": "Closing",
      "title": "Thanks",
      "subtitle": "谢谢参与",
      "notes": "CLOSING — 20 seconds.\n\nSuggested close: That is our snapshot of the global market: real-time video at scale, avatars in action, and conversations that can delegate work. The next step is making these experiences work together naturally. Thank you.\n\nPacing: the two supplied clips total about 2 minutes 13 seconds. If each of the five remaining clips is 2 minutes, video time is about 12 minutes 13 seconds. Add 20 seconds to open, seven 15-second introductions and 20 seconds to close: about 14 minutes 38 seconds, leaving 22 seconds for transitions. Shorter future clips provide more speaking time."
    }
  ]
};

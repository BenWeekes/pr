/*
 * Fifteen-minute talk: seven demos, with short early-access and avatar-protocol explanations.
 * Model names and early-access experience are supplied by Ben Weekes.
 * Three videos are awaiting delivery; clips stay at two minutes or less.
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
      "notes": "OPENING — 20 seconds.\n\nSuggested introduction: I'm Ben Weekes, Chief Architect at Agora. Here is what's new this year in real-time engagement and conversational AI in the global market: live streaming at scale, early-access model integrations, and new avatar experiences.\n\nJourney: MrBeast → early access programs → GPT-Live → Generic Avatar Protocol → avatar demos → work in progress. Introduce each video in about 10 seconds; keep each new explanation slide to 20 seconds."
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
      "notes": "INTRO — about 10 seconds. VIDEO — 13 seconds.\n\nSuggested introduction: We powered MrBeast's record-setting Whatnot livestream. Listen to his reaction to the latency.\n\nThe supplied clip is a short latency reaction, not a recording of the peak-viewer moment. Public source: https://medium.com/whatnot-engineering/scaling-whatnot-behind-the-largest-live-shopping-stream-in-us-history-040a458f538c\n\nBen's initial outline used 584K and 'world record'. Published Whatnot material reports 583K peak viewers and a U.S. record; use that wording until the alternative figure and global claim are confirmed."
    },
    {
      "id": "convoai-early-access",
      "type": "table",
      "label": "ConvoAI early access programs",
      "kicker": "CONVERSATIONAL AI / EARLY ACCESS",
      "title": "ConvoAI Early Access Programs",
      "subtitle": "I built extensions for these models before public release.",
      "headers": [
        "Vendor",
        "Type",
        "Model"
      ],
      "rows": [
        [
          "Google",
          "MLLM",
          "gemini-3.8-live"
        ],
        [
          "Google",
          "MLLM",
          "gemini-3.8-live-extended-thinking"
        ],
        [
          "Google",
          "TTS",
          "gemini-3.8-flash-tts"
        ],
        [
          "Google",
          "TTS",
          "gemini-3.8-flash-lite-tts"
        ],
        [
          "Google",
          "ASR",
          "gemini-3.5-transcribe-live"
        ],
        [
          "OpenAI",
          "MLLM",
          "gpt-live-1"
        ]
      ],
      "legend": "MLLM: multimodal large language model    ·    TTS: text to speech    ·    ASR: automatic speech recognition",
      "notes": "EARLY ACCESS — about 20 seconds.\n\nSuggested introduction: I built ConvoAI extensions through Google and OpenAI early access programs, before these models were released publicly. They span live multimodal models, text to speech and speech recognition. Let me show you the GPT-Live integration.\n\nThe six model identifiers and the early-access integration claim are Ben's supplied account. Keep the identifiers exactly as given; this slide does not state present-day availability or release dates."
    },
    {
      "id": "gpt-live-delegation",
      "type": "video",
      "label": "GPT-Live & delegation",
      "kicker": "DEMO 02 / 07 · CONVERSATIONAL AI",
      "title": "GPT-Live: full duplex & delegation",
      "caption": "GPT-Live with delegation",
      "src": "media/gpt-live-delegation.mp4",
      "poster": "media/gpt-live-delegation-poster.jpg",
      "durationSeconds": 120,
      "notes": "INTRO — about 10 seconds. VIDEO — 2 minutes.\n\nSuggested introduction: One of those early-access integrations was GPT-Live. Watch the full-duplex conversation delegate a task and save its result.\n\nIn the supplied demo, Ben asks for a rainy weekend near London and mentions seafood. The conversation delegates the task, suggests Dublin, and saves the trip plan. The terminal displays the saved result. Describe this as saving a plan, not booking a flight.\n\nThe clip is kept at 2 minutes and encoded for local H.264/AAC playback. The original is preserved separately."
    },
    {
      "id": "generic-avatar-protocol",
      "type": "protocol",
      "label": "Generic Avatar Protocol",
      "kicker": "AVATARS / OPEN INTEGRATION PROTOCOL",
      "title": "Generic Avatar Protocol",
      "subtitle": "A common interface for AI video and avatar providers.",
      "nodes": [
        {
          "label": "AGENT",
          "title": "ConvoAI",
          "detail": "Agent speech + controls"
        },
        {
          "label": "PROVIDER",
          "title": "Avatar / video\nprovider",
          "detail": "Generates video from speech"
        },
        {
          "label": "DELIVERY",
          "title": "Agora channel",
          "detail": "Audio + video to viewers"
        }
      ],
      "takeaway": "Vendors implement the interface. Agora distributes the audio + video.",
      "notes": "GENERIC AVATAR PROTOCOL — about 20 seconds.\n\nSuggested introduction: ConvoAI sends speech and controls over WebSocket to the avatar provider. The provider generates video and publishes audio and video into an Agora channel. A common session API and reference publisher give vendors an integration path.\n\nIntegration detail: Agora calls the provider's POST /session/start endpoint; the provider returns a WebSocket address and session token. The provider also implements DELETE /session/stop and the WebSocket receiver, then feeds its video and the agent audio to a publisher. The repo supplies a Go publisher to use or adapt.\n\nProtocol controls include speech-end and interruption messages. Optional gesture actions are documented as in development; provider action handling is required, and the sample receiver covers audio and controls.\n\nSources:\nhttps://github.com/AgoraIO-Solutions/convoai_to_video\nhttps://github.com/AgoraIO-Solutions/convoai_to_video/blob/master/websocket-receive-audio/README.md\nReviewed revision: 44bf4124e8111ec77e9a0e50c2dec2bb5e23365d.",
      "sessionNote": "Session setup: REST API → WebSocket address + session token",
      "links": [
        {
          "label": "WebSocket",
          "detail": "speech +\ncontrols"
        },
        {
          "label": "Publish",
          "detail": "audio +\nvideo"
        }
      ],
      "diagramDescription": "REST establishes a provider session. ConvoAI streams speech and control messages to the avatar provider over WebSocket. The provider generates video and publishes audio plus video into an Agora channel for viewers.",
      "sourceUrl": "https://github.com/AgoraIO-Solutions/convoai_to_video",
      "sourceLabel": "Source & reference implementation: AgoraIO-Solutions/convoai_to_video ↗",
      "referenceCommit": "44bf4124e8111ec77e9a0e50c2dec2bb5e23365d"
    },
    {
      "id": "avatar-comparison",
      "type": "video",
      "label": "Avatars & vendor comparison",
      "kicker": "DEMO 03 / 07 · AVATARS",
      "title": "Avatars & vendor comparison",
      "caption": "Avatars & vendor comparison",
      "src": "",
      "poster": "",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 10 seconds. VIDEO — up to 2 minutes; to be supplied.\n\nSuggested introduction: The protocol opens up vendor choice. This comparison looks at avatar appearance, motion, voice and responsiveness.\n\nAdd the comparison video when Ben shares it. Confirm the vendor names and comparison conditions from that video; no vendor rankings are asserted in this draft."
    },
    {
      "id": "avatar-gaming",
      "type": "video",
      "label": "Avatar-assisted gaming",
      "kicker": "DEMO 04 / 07 · GAMING",
      "title": "Avatar-assisted gaming",
      "caption": "Avatar-assisted gaming",
      "src": "media/avatar-gaming.mp4",
      "poster": "media/avatar-gaming-poster.jpg",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 10 seconds. VIDEO — about 2 minutes.\n\nSuggested introduction: This is an interactive game controlled by voice and hosted by an avatar, running on Agora's Conversational AI platform.\n\nThe supplied Wheel of Quizzing demo shows the avatar hosting the game, the wheel choosing categories, and the player score progressing.\n\nPresentation excerpt: 00:19.35 to the end of the 2:19 original, beginning in a speech pause. This keeps the interaction and final score while meeting the two-minute clip limit. The full original is preserved separately.",
      "durationSeconds": 119.785,
      "subtitle": "An interactive game controlled by voice and hosted by an avatar · Agora ConvoAI"
    },
    {
      "id": "avatar-tv-lottery",
      "type": "video",
      "label": "Avatars presenting a TV lottery",
      "kicker": "DEMO 05 / 07 · BROADCAST",
      "title": "Avatars presenting a TV lottery",
      "caption": "Avatar TV lottery presenter",
      "src": "media/avatar-tv-lottery.mp4",
      "poster": "media/avatar-tv-lottery-poster.jpg",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 10 seconds. VIDEO — about 1 minute 58 seconds.\n\nSuggested introduction: Here is an avatar presenting a TV lottery. Watch the delivery, timing and continuity of its on-screen performance.\n\nPresentation excerpt: 00:36.80 to the end of the 2:35 original, beginning in a speech pause. It skips part of the opening countdown and keeps the draw and displayed results. The full original is preserved separately.",
      "durationSeconds": 117.781
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
      "notes": "INTRO — about 10 seconds. VIDEO — up to 2 minutes; to be supplied.\n\nSuggested introduction: Finally, two projects in progress. First, card-dealing avatars: keeping speech, visible actions and the game state in sync.\n\nAdd the card-dealing video when supplied. Keep the work-in-progress label; do not imply production readiness."
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
      "notes": "INTRO — about 10 seconds. VIDEO — up to 2 minutes; to be supplied.\n\nSuggested introduction: Second, AI commentary: exploring how to turn live events into relevant, naturally paced narration.\n\nAdd the AI commentary video when supplied. Keep this explicitly framed as work in progress."
    },
    {
      "id": "thanks",
      "type": "thanks",
      "label": "Closing",
      "title": "Thanks",
      "subtitle": "谢谢参与",
      "notes": "CLOSING — 20 seconds.\n\nSuggested close: That is our snapshot of the global market: real-time video at scale, early-access conversational AI, and a common path to avatar vendors. The next step is bringing these experiences together naturally. Thank you.\n\nPacing: the four supplied clips total about 6 minutes 10 seconds. With three remaining clips at two minutes each, videos total about 12 minutes 10 seconds. Opening and closing take 40 seconds, the two explanation slides take 40 seconds, and seven 10-second video introductions take 70 seconds. Total: about 14 minutes 40 seconds, leaving 20 seconds for transitions. Shorter future clips provide more speaking time."
    }
  ]
};

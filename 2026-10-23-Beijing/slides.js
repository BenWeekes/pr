/*
 * Fifteen-minute talk: nine demos, with short early-access and avatar-protocol explanations.
 * Model names and early-access experience are supplied by Ben Weekes.
 * All nine demo videos are included; the running order and final timings remain flexible.
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
      "kicker": "DEMO 01 / 09 · LIVE SHOPPING",
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
      "kicker": "DEMO 02 / 09 · CONVERSATIONAL AI",
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
      "id": "avatar-comparison-chinese",
      "type": "video",
      "label": "Avatar comparison: Chinese",
      "kicker": "DEMO 03 / 09 · AVATAR COMPARISON · CHINESE",
      "title": "Avatar comparison: Chinese",
      "caption": "Six avatar vendors: Chinese",
      "src": "media/avatar-comparison-chinese.mp4",
      "poster": "media/avatar-comparison-chinese-poster.jpg",
      "durationSeconds": 26.644,
      "notes": "INTRO — about 10 seconds. VIDEO — about 27 seconds.\n\nSuggested introduction: First, here are six avatar vendors side by side in Chinese. Watch the lip sync, expression and motion.\n\nThe full h2a_grid_zh_v3.mp4 recording is included, without cropping or trimming. All six panels and their vendor-number labels remain visible. Original H.264 video and AAC audio are preserved without re-encoding, with identical audio/video packet timestamps and fast-start metadata. The original recording is preserved separately.\n\nPress Space to play or pause. The next slide is the English TTS comparison; use Right to advance. No vendor rankings or measured latency claims are added."
    },
    {
      "id": "avatar-comparison-english",
      "type": "video",
      "label": "Avatar comparison: English TTS",
      "kicker": "DEMO 04 / 09 · AVATAR COMPARISON · ENGLISH TTS",
      "title": "Avatar comparison: English TTS",
      "caption": "Six avatar vendors: English TTS",
      "src": "media/avatar-comparison-english.mp4",
      "poster": "media/avatar-comparison-english-poster.jpg",
      "durationSeconds": 15.0,
      "notes": "INTRO — about 10 seconds. VIDEO — 15 seconds.\n\nSuggested introduction: Now the English TTS comparison, with the six avatar vendors side by side. Watch the lip sync, expression and motion.\n\nThis retains the existing English source excerpt: 00:01.20–00:16.20 from en-mux.mp4. The full vendor grid and Vendor 1–6 labels remain visible. A 60 ms audio fade smooths the excerpt end. The full original is preserved separately.\n\nPress Space to play or pause; Left/Right change slides. This is a separate English-only clip, immediately after the Chinese comparison. No vendor rankings or measured latency claims are added."
    },
    {
      "id": "avatar-gaming",
      "type": "video",
      "label": "Avatar-assisted gaming",
      "kicker": "DEMO 05 / 09 · GAMING",
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
      "id": "rte-meets-avatars",
      "type": "video",
      "label": "Human Driven Avatars for Live Broadcast",
      "kicker": "DEMO 06 / 09 · HUMAN DRIVEN AVATARS",
      "title": "Human Driven Avatars for Live Broadcast",
      "caption": "Human Driven Avatars for Live Broadcast",
      "src": "media/benh2a.mp4",
      "poster": "media/benh2a-poster.jpg",
      "notes": "INTRO — about 10 seconds. VIDEO — about 40 seconds.\n\nSuggested introduction: Human-driven avatars for live broadcast. Watch how the human performance carries through to realistic and animated avatars across the grid.\n\nThe full benh2a.mp4 recording is included. All six panels stay visible, without cropping or trimming. Original H.264 video and AAC audio are preserved without re-encoding, with identical audio/video packet timestamps and fast-start metadata for browser playback. The original recording is preserved separately.\n\nPress Space to play or pause; Left/Right change slides. The final running order and timings remain flexible.",
      "durationSeconds": 39.615
    },
    {
      "id": "card-dealing-avatars",
      "type": "video",
      "label": "AI card-dealing avatar · WIP",
      "kicker": "DEMO 07 / 09 · WORK IN PROGRESS",
      "title": "AI card-dealing avatar",
      "caption": "AI card-dealing avatar",
      "src": "media/card-dealing-avatars.mp4",
      "poster": "media/card-dealing-avatars-poster.jpg",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 10 seconds. VIDEO — 31 seconds.\n\nSuggested introduction: Next, two projects in progress. First, an AI card-dealing avatar. Watch the deal and the game result.\n\nRequested source excerpt: 00:31–01:02 from bac.mov. The clip keeps the full avatar, card table, player/banker interface and balance visible. It shows the card handling and the game result updating. The original recording is preserved separately.\n\nKeep this framed as work in progress. Press Space to play; use G to jump to another section. The final running order and timings remain flexible.",
      "durationSeconds": 31.0
    },
    {
      "id": "ai-commentary",
      "type": "video",
      "label": "AI commentary · WIP",
      "kicker": "DEMO 08 / 09 · WORK IN PROGRESS · ENGLISH → CHINESE",
      "title": "AI commentary",
      "caption": "AI football commentary: English then Chinese",
      "src": "media/ai-commentary.mp4",
      "poster": "media/ai-commentary-poster.jpg",
      "maxDurationSeconds": 120,
      "notes": "INTRO — about 10 seconds. VIDEO — 30 seconds, one continuous clip.\n\nSuggested introduction: Here is AI football commentary, first in English and then in Chinese. This is still work in progress.\n\nPress Space once: 15 seconds of English switches directly to 15 seconds of Chinese. The language label changes at the switch; the football footage and score graphics are preserved.\n\nExact requested source cuts: English 01:33–01:48, then Chinese 01:48–02:03. The picture follows the football sequence continuously across the language switch. A 60 ms audio fade smooths each excerpt end. Full five-minute originals are preserved separately.\n\nKeep this framed as work in progress. The final running order and timings remain flexible; use G to jump to another section.",
      "durationSeconds": 30.0
    },
    {
      "id": "signing-avatar",
      "type": "video",
      "label": "Signing Avatar",
      "kicker": "DEMO 09 / 09 · SIGNING AVATAR",
      "title": "Signing Avatar",
      "caption": "Signing Avatar",
      "src": "media/al_asl.mp4",
      "poster": "media/al_asl-poster.jpg",
      "durationSeconds": 174.451519,
      "notes": "INTRO — about 10 seconds. VIDEO — about 2 minutes 54 seconds.\n\nSuggested introduction: Here is a signing avatar alongside broadcast footage. Watch the signing in the lower-right inset.\n\nThe full al_asl.mp4 recording is included, without cropping or trimming. The broadcast picture, captions and signing inset remain visible. Original H.264 video at 25 fps and AAC audio are preserved without re-encoding, with identical audio/video packet timestamps and fast-start metadata for browser playback. The original recording is preserved separately.\n\nPress Space to play or pause; Left/Right change slides. The final running order and timings remain flexible."
    },
    {
      "id": "thanks",
      "type": "thanks",
      "label": "Closing",
      "title": "Thanks",
      "subtitle": "谢谢参与",
      "notes": "CLOSING — 20 seconds.\n\nSuggested close: That is our snapshot of the global market: real-time video at scale, early-access conversational AI, and a common path to avatar vendors. The next step is bringing these experiences together naturally. Thank you.\n\nPacing: all nine demo clips are ready. Treat the sequence and timings as a working draft. Review the visuals and demo flow first; the final slide selection can change later. Videos total about 9 minutes 29 seconds. With the current short introductions and explanation slides, the sequence is about 12 minutes 19 seconds. There is room for more context and transitions within the 15-minute target. Use G to jump past any section during the presentation.\n\nCONTACT: the on-screen QR code opens my LinkedIn profile. Leave this slide up for the audience to scan; the URL is also clickable."
    }
  ],
  "speakerPhoto": "assets/ben-weekes-profile.png",
  "linkedinUrl": "https://www.linkedin.com/in/benjamin-weekes/",
  "linkedinQr": "assets/ben-weekes-linkedin-qr.svg"
};

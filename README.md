# 🎥 ZoomRec Bot - Autonomous Zoom Meeting Recorder via WhatsApp 🤖

> 🧠 Designed in 2022. 

---

## 🔍 TL;DR

ZoomRec is a fully autonomous, WhatsApp-controlled bot that:
- Joins Zoom meetings in headless mode
- Records video + audio via browser stream
- Encodes to high-efficiency MKV format
- Uploads to pre-defined Google Drive folders
- Operates based on simple WhatsApp messages

Built using:
- `whatsapp-web.js` for message interface
- `puppeteer-stream` for real-time browser capture
- `ffmpeg` for high-efficiency compression
- `google-drive-ocamlfuse` for Linux GDrive mount
- `Xvfb` for virtual display rendering (headless environments)

---

## 🧭 Use Cases

- **Remote lecture capture**
- **Zoom class archiving**
- **Non-intrusive meeting surveillance**
- **Hands-free scheduling and automation**

---

## 🛠 Features

| Feature | Description |
|--------|-------------|
| 🎬 Autonomous Zoom Recording | Joins via Zoom Web Client using Puppeteer |
| 🧠 WhatsApp Integration | Send `.start`, `.stop`, `.sh`, `.show`, etc. to control it |
| 🗂 Dynamic File Naming | Organized by subject and timestamp |
| ☁️ Google Drive Upload | Mounts and uploads to appropriate folders |
| 🧹 Self-Cleans | Detects meeting end, kills browser, encodes, uploads |


---

## 🖼 Architecture Overview

```plaintext
       ┌─────────────┐
       │ WhatsApp    │  <-- User control interface
       └────┬────────┘
            │
            ▼
   ┌────────────────────┐
   │ zoomrec.js         │
   │ - Starts Puppeteer │
   │ - Launches Zoom    │
   │ - Records Stream   │
   └────────┬───────────┘
            ▼
   ┌────────────────────┐
   │ Stream Recorder     │
   │ puppeteer-stream    │
   └────────┬───────────┘
            ▼
   ┌────────────────────┐
   │ Post-Processing     │
   │ ffmpeg + mkv + GDrive|
   └────────────────────┘

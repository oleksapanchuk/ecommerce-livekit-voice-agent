# 🛒 Voice Commerce AI Agent

A real-time **voice-powered e-commerce assistant** built with [Next.js](https://nextjs.org/) and [LiveKit](https://livekit.io/). This application demonstrates conversational commerce by allowing users to interact with an AI agent using voice commands to browse products, add items to cart, and complete orders.

## ✨ Features

- **Voice Interaction** — Talk directly with the AI agent using your microphone
- **Real-time Chat** — Text-based communication with the agent as an alternative
- **Shopping Cart** — Add, remove, and view items via voice or chat commands
- **Menu Display** — Browse available products in a visual interface
- **Screen Sharing** — Share your screen with the agent for enhanced assistance
- **Video Support** — Enable camera for face-to-face interaction
- **Modern UI** — Beautiful, responsive interface with dark mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Voice/Video**: LiveKit SDK
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **UI Components**: Radix UI primitives

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager
- LiveKit Cloud account or self-hosted LiveKit server
- A running LiveKit Agent (backend)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ecommerce-livekit-voice-agent
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your LiveKit credentials:

```env
LIVEKIT_API_KEY=<your_api_key>
LIVEKIT_API_SECRET=<your_api_secret>
LIVEKIT_URL=wss://<project-subdomain>.livekit.cloud
```

> 💡 Get your credentials from [LiveKit Cloud](https://cloud.livekit.io/)

### 4. Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run the Agent Backend

You'll need a LiveKit Agent running to handle the AI responses. Follow the [LiveKit Voice AI Quickstart](https://docs.livekit.io/agents/start/voice-ai) to set up your agent.

## 📖 How It Works

1. **Click "Start demo"** — Initiates a voice session with the AI agent
2. **Speak or type** — Communicate with the agent to browse products
3. **Add to cart** — The agent understands shopping commands and updates your cart in real-time
4. **Complete order** — Finalize your purchase through voice interaction

### Agent Communication

The app uses LiveKit's Data Channels to receive cart updates:

- `cart:update` — Syncs cart state from the agent
- `order` — Signals order completion

## 📁 Project Structure

```
pizza-agent/
├── app/                    # Next.js app router
│   ├── (app)/             # Main app pages
│   ├── api/               # API routes (connection details)
│   └── layout.tsx         # Root layout
├── components/
│   ├── cart/              # Shopping cart components
│   ├── chat/              # Chat interface
│   ├── menu/              # Product menu display
│   ├── livekit/           # LiveKit-related components
│   ├── ui/                # Reusable UI components
│   └── app.tsx            # Main application component
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and types
└── app-config.ts          # Application configuration
```

## ⚙️ Configuration

Edit `app-config.ts` to customize the application:

```typescript
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'DarkWings',
  pageTitle: 'Voice/Conversational commerce demo | DarkWings',
  supportsChatInput: true, // Enable text chat
  supportsVideoInput: true, // Enable camera
  supportsScreenShare: true, // Enable screen sharing
  startButtonText: 'Start demo',
  // ...
};
```

## 📜 Available Scripts

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Start development server with Turbopack |
| `pnpm build`        | Build for production                    |
| `pnpm start`        | Start production server                 |
| `pnpm lint`         | Run ESLint                              |
| `pnpm format`       | Format code with Prettier               |
| `pnpm format:check` | Check code formatting                   |

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

This project is private. All rights reserved.

---

Built with ❤️ by Oleksandr Panchuk

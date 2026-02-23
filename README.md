# GitHub Stats Studio

> A beautiful visual editor for creating stunning GitHub statistics cards with real-time preview and customization options.

![GitHub Stats Studio](/public/cover/screenshot.png)


[![Nuxt](https://img.shields.io/badge/Nuxt-4.1.3-00DC82?logo=nuxt.js&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3.5.28-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.0-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## ✨ Features

- 🎨 **Visual Editor** - Intuitive interface for customizing GitHub stats cards
- 👁️ **Real-time Preview** - See your changes instantly with live preview
- 🖼️ **Multiple Templates** - Choose from various pre-designed templates
- ⚡ **Customizable Options** - Fine-tune every aspect of your stats card
- 🔍 **Zoom Controls** - Zoom in/out and pan for detailed preview
- 📋 **One-click Copy** - Copy generated URLs with a single click
- 🎉 **Delightful UX** - Smooth animations and confetti celebrations
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, pnpm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pphatdev/studio.git
cd studio
```

2. Install dependencies:
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏗️ Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 📁 Project Structure

```
studio.stats.pphat.top/
├── app/
│   ├── assets/
│   │   └── css/           # Global styles
│   ├── components/
│   │   ├── icons/         # Icon components
│   │   ├── sidebar/       # Sidebar components
│   │   └── studio/        # Studio preview components
│   ├── composables/
│   │   └── useStats.ts    # Stats management composable
│   ├── pages/
│   │   └── index.vue      # Main studio page
│   └── utils/
│       ├── data.json      # Configuration and templates
│       ├── themes.ts      # Theme definitions
│       └── utils.ts       # Utility functions
├── public/                # Static assets
├── nuxt.config.ts         # Nuxt configuration
└── package.json           # Project dependencies
```

## 🛠️ Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/) - The Intuitive Vue Framework
- **UI Library:** [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Language:** [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- **Effects:** [canvas-confetti](https://www.kirilv.com/canvas-confetti/) - Confetti celebrations

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run prettier` - Format code with Prettier

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/pphatdev/studio/issues).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Sophat LEAT (pphatdev)**

- Website: [pphat.top](https://pphat.top)
- GitHub: [@pphatdev](https://github.com/pphatdev)
- Stats API: [stats.pphat.top](https://stats.pphat.top)

## 🙏 Acknowledgments

- Built with Vue and Nuxt
- Styled with Tailwind CSS
- Icons and UI components custom-designed


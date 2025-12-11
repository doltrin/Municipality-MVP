<div align="center">

# 🏛️ Municipality MVP

### A Modern Digital Services Platform for Smart Cities

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge&logo=netlify)](https://municipality-mvp.netlify.app)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

<p align="center">
  <strong>Empowering citizens with seamless access to municipal services</strong>
</p>

[Live Demo](https://municipality-mvp.netlify.app) · [Report Bug](https://github.com/doltrin/Municipality-MVP/issues) · [Request Feature](https://github.com/doltrin/Municipality-MVP/issues)

</div>

---

## 📱 Overview

Municipality MVP is a comprehensive mobile-first web application designed to digitize and streamline municipal services for citizens. Built with modern web technologies, it provides an intuitive interface for accessing city services, submitting requests, tracking issues, and staying informed about local news and events.

<div align="center">
  <img src="https://via.placeholder.com/800x400/0F172A/FFFFFF?text=Municipality+MVP+Screenshot" alt="App Screenshot" width="100%">
</div>

## ✨ Features

### 🏠 **Citizen Services**
- **Service Catalog** - Browse and access 50+ municipal services organized by category
- **Request Submission** - Report issues with photo evidence and GPS location
- **Request Tracking** - Real-time status updates on submitted requests
- **Digital Wallet** - Manage payments, points, and rewards

### 📰 **Information Hub**
- **News & Announcements** - Stay updated with local news and events
- **Notifications** - Push notifications for request updates and alerts
- **Event Calendar** - Discover upcoming community events

### 🚗 **Smart City Features**
- **Smart Parking** - Find and pay for parking spots
- **Bus Tracker** - Real-time public transport tracking
- **Waste Management** - Collection schedules and recycling info
- **Pay-As-You-Throw** - Smart waste billing system

### 👤 **User Experience**
- **Profile Management** - Update personal information and preferences
- **Dark Mode** - Full dark theme support
- **Accessibility** - WCAG compliant with proper ARIA labels
- **AI Chatbot** - 24/7 virtual assistant for quick help

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18.3 with TypeScript |
| **Styling** | Tailwind CSS 3.4 |
| **Build Tool** | Vite 6.0 |
| **Routing** | React Router 7 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Netlify |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/doltrin/Municipality-MVP.git

# Navigate to project directory
cd Municipality-MVP

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Municipality-MVP/
├── docs/
│   └── workflows/          # Service workflow documentation
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Chatbot.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ...
│   ├── data/              # Static data and mock APIs
│   ├── layout/            # Layout components
│   │   └── MobileLayout.tsx
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Profile.tsx
│   │   ├── News.tsx
│   │   ├── waste/         # Waste management pages
│   │   ├── mobility/      # Transportation pages
│   │   ├── community/     # Community services
│   │   └── ...
│   ├── App.tsx            # Main app component
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 🎨 Design System

The app follows the **Solid Citizen Design System** with these principles:

- **Utility over Decoration** - Clean, functional interfaces
- **High-Contrast Cards** - Clear visual hierarchy with defined borders
- **Accessible Colors** - WCAG AA compliant color contrast
- **Touch-Friendly** - Minimum 44px touch targets
- **Responsive** - Mobile-first, works on all screen sizes

### Color Palette

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| Primary | `#4F46E5` | `#6366F1` | Brand, headers |
| Accent | `#0EA5E9` | `#38BDF8` | Actions, links |
| Background | `#F4F4F5` | `#09090B` | Page background |
| Surface | `#FFFFFF` | `#18181B` | Cards, modals |

## 📋 Available Services

<details>
<summary><strong>View all 18 service categories</strong></summary>

1. **Waste Route Optimization** - Smart collection scheduling
2. **Pay-As-You-Throw** - Usage-based waste billing
3. **Exchange & Reuse Platform** - Community item sharing
4. **Bulky & Green Waste Booking** - Special pickup scheduling
5. **Stray Animal Management** - Report and adopt strays
6. **Smart Parking** - Find and pay for parking
7. **Citizen Request System** - Report issues
8. **Municipal Transportation** - Bus routes and schedules
9. **Urban Planning & Permits** - Building permits
10. **Business Licensing** - Commercial permits
11. **Reports & Complaints** - General feedback
12. **Electronic Payments** - Pay bills online
13. **Social Services** - Welfare programs
14. **Volunteer Registry** - Community volunteering
15. **Citizen Card & Loyalty** - Rewards program
16. **Youth Card** - Youth benefits
17. **Civil Registry** - Birth/marriage certificates
18. **Participatory Budget** - Vote on city projects

</details>

## 🧪 Development

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Code Style

- TypeScript strict mode enabled
- ESLint with React rules
- Prettier for formatting (recommended)

## 🌐 Deployment

The app is configured for easy deployment to Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

Or use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev) - Beautiful open-source icons
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Router](https://reactrouter.com) - Client-side routing

---

<div align="center">

**Built with ❤️ for smarter cities**

[⬆ Back to Top](#-municipality-mvp)

</div>

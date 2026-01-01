# Portfolio Modernization Project

A fully modernized, responsive portfolio website built with a split architecture: **Vite + TypeScript** for the frontend and **Express + TypeScript** for the backend.

## ✨ Features

- **Modern UI/UX**: Dark theme with glassmorphism, glowing badges, and smooth CSS transitions.
- **Merged Portfolio View**: Combined Home and About sections for a seamless landing experience.
- **Dynamic Content**: Projects, Skills, Certifications, and Activities are dynamically rendered from JSON data via a dedicated API.
- **Responsive Design**: Mobile-first approach featuring a slide-out hamburger menu and adaptive grid layouts.
- **OAuth2 Email System**: Secure contact form powered by Gmail OAuth2 and Nodemailer.
- **Interactive Modals**: Enhanced modal dialogues with zoom functionality for viewing certificates and activities.
- **Clean Architecture**: Clear separation of concerns between client and server codebases.

## 🛠️ Technologies

### Frontend

- **Framework**: Vite
- **Language**: TypeScript
- **Styling**: SCSS (Sass) / CSS Grid / Flexbox
- **Assets**: Handled via Vite's optimized build pipeline

### Backend

- **Framework**: Express.js
- **Language**: TypeScript
- **Email**: Nodemailer + Google OAuth2 (`googleapis`)
- **Config**: Environment variables with `dotenv`

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/goyal-Dushi/CV.git
   cd portfolio_website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the project root with the following keys:
   ```env
   PORT=8080
   EMAIL=your-gmail@gmail.com
   GMAIL_CLIENT_ID=your-client-id
   GMAIL_CLIENT_SECRET=your-client-secret
   GMAIL_REFRESH_TOKEN=your-refresh-token
   GMAIL_REDIRECT_URI=https://developers.google.com/oauthplayground
   ```

### Development

Run both the frontend and backend in development mode:

```bash
npm run dev
```

### Production Build

Build and start the project for production:

```bash
npm run build
npm start
```

## 📂 Project Structure

- `client/`: Frontend source code (TypeScript, SCSS, HTML).
- `client/public/`: Static assets and JSON data files.
- `src/`: Backend source code (Express routes, services, and config).
- `dist/`: Compiled production build (generated).

## 🤝 Contribution

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

**Please don't just fork the repo, do leave a star ⭐**

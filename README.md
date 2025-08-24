# 🔗 URL Shortener Frontend

A simple and responsive frontend for the **URL Shortener** application.  
This client allows users to shorten long URLs and access/manage their generated short links through a clean UI.

---

## 🚀 Tech Stack
- **React / Next.js / Vite** (choose based on your setup)
- **TailwindCSS** for styling
- **Axios / Fetch API** for backend communication

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/     # UI components
│   ├── pages/          # Routes / Screens
│   ├── api.js          # API utilities
│   └── App.jsx         # App entry point
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/url-shortener-frontend.git
   cd url-shortener-frontend
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Configure environment variables**
    Create a .env file in the root:
    ```bash
    VITE_API_BASE_URL=https://url-shortener-backend-livid.vercel.app/
    ```
4. **Run development server**
    ```bash
    npm run dev
    ```

---

## 📌 Features

- Paste long URL to generate a short link
- Copy-to-clipboard functionality
- History of shortened links (if backend supports it)
- Responsive design with TailwindCSS
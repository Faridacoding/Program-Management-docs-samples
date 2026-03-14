# AI-Powered Meeting Insights & Newsletter Generator

An intelligent workflow automation tool that transforms unstructured meeting notes into structured project insights and professional stakeholder newsletters using the Google Gemini API.

## 🚀 Overview

This application demonstrates a full-stack AI integration designed to automate the bridge between raw meeting data and professional communication. It leverages Large Language Models (LLMs) to perform cognitive tasks that typically take project managers significant time.

### Key Features
- **Intelligent Analysis**: Extracts project status, progress percentages, and high-priority items from messy text.
- **Structured Output**: Converts unstructured notes into a clean, actionable dashboard.
- **Automated Communication**: Generates a draft stakeholder newsletter based on the analyzed data.
- **Modern Tech Stack**: Built with React, TypeScript, Express, and Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Node.js, Express.
- **AI Engine**: Google Gemini 3 Flash (`gemini-3-flash-preview`).
- **Language**: TypeScript (End-to-End).

## 📋 Prerequisites
- Node.js (v18 or higher)
- A Google Gemini API Key. You can get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey).

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-directory>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration (CRITICAL)
The application requires an API key to communicate with the Gemini AI.

1.  Locate the `.env.example` file in the root directory.
2.  Create a new file named `.env` (this file is ignored by Git for security).
3.  Copy the contents of `.env.example` into `.env`.
4.  Replace `MY-API-KEY` with your actual Gemini API key.

**Example `.env` file:**
```env
GEMINI_API_KEY1=AIzaSy...your_actual_key_here...
```

### 4. Run the application
```bash
# Start the backend and frontend in development mode
npm run dev
```
The app will be available at `http://localhost:3000`.

## 🔒 Security Note
This project is configured to keep your API keys secure:
- The `.env` file is listed in `.gitignore` to prevent it from being pushed to public repositories.
- The backend acts as a proxy, ensuring your API key is never exposed to the client-side browser.
- **Never** commit your real API key to `.env.example` or any other tracked file.

## 📝 License
MIT

---
*Created as an example of AI Workflow Automation.*

# 🏆 DevGauge (Codeforces for Tech Recruitment)

![DevGauge Banner](https://img.shields.io/badge/Status-Live%20on%20Render%20%26%20Vercel-success)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![AI](https://img.shields.io/badge/AI-Skill%20Extraction-purple)

DevGauge is a next-generation Job Portal built for the modern tech industry. Instead of relying on static, outdated PDF resumes that are often filled with exaggerated keywords, **DevGauge evaluates developers like competitive programmers.**

We extract, analyze, and quantify a candidate's actual technical depth and assign them a *Codeforces-style Global Rank* (e.g., *Pupil, Expert, Grandmaster*). 

Recruiters and HR teams can then instantly filter through thousands of candidates using a **live heatmap** of verified skills, ensuring they only spend time interviewing top-tier, proven talent.

---

## 🚀 How It Works (For Laymen)

### 1. The Problem with Normal Job Portals (LinkedIn, Indeed)
When a recruiter posts a job for a "Senior React Developer," they get 5,000 resumes. 4,000 of them simply wrote the word "React" somewhere on their page, even if they only watched a 10-minute YouTube video about it. Recruiters have to manually read through all of them, which is impossible.

### 2. The DevGauge Solution
**For Candidates:** When a developer signs up, they paste in descriptions of the actual software projects they have built. We use **Artificial Intelligence** to blindly read their project architecture. The AI determines how complex the project was, extracts the exact skills used, and rewards the developer with a fluctuating "Rating Score." 

**For HR / Recruiters:** HR gets a dashboard resembling a video game leaderboard. They use a slider to say, *"I only want to see candidates who have an AI-verified skill score of 2000+ (Grandmasters)."* Instantly, all the fake resumes disappear, leaving only the profoundly skilled engineers.

---

## 🛠️ The Tech Stack (Under the Hood)

DevGauge is a full-stack web application split into two distinct parts: a blazing-fast React frontend and a powerful Node.js API backend.

### Frontend (User Interface)
- **Next.js (React):** The framework powering our dynamic web pages.
- **Tailwind CSS:** Used for writing the sleek, glassmorphic, and responsive dark-mode styling.
- **Vercel:** Our cloud hosting provider that serves the website to the global internet on the edge.

### Backend (The Brains & API)
- **Node.js & Express:** The core server that handles user authentication, calculations, and traffic routing.
- **Prisma ORM:** The bridge that connects our Node.js server to our database safely and efficiently.
- **PostgreSQL (Supabase Pooler):** The highly scalable relational database where all user, skill, and project data is permanently stored.
- **Render:** The cloud environment running our backend infrastructure 24/7.
- **OpenAI:** Used to algorithmically evaluate the complexity of uploaded candidate projects and extract hidden skills (Mocked locally for deployment ease).
- **JWT (JSON Web Tokens):** For secure, stateless user logins.

---

## 🌍 Try it out locally!

If you want to run this application on your own computer:

### 1. Clone the repository
```bash
git clone https://github.com/Akp2636/DevGauge.git
cd DevGauge
```

### 2. Start the Backend API
```bash
cd backend
npm install
```
*Create a `.env` file in the backend folder and add your Database URL!*
```bash
npm run dev
```

### 3. Start the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser!

#  GitHub User Profile Analyzer

A responsive web app that analyzes any GitHub user's public profile and displays key insights like their top repositories, stars, forks, and recent activity — built with React, TypeScript, and ShadCN

##  Demo

[ Live Demo](https://github-analyzer-plum.vercel.app/)  


##  Tech Stack

- **Frontend Framework:** React + TypeScript + Vite  
- **UI Components:** ShadCN (Radix UI + TailwindCSS)  
- **Data Visualization:** Recharts  
- **Routing:** react-router-dom  
- **API Handling:** Axios  
- **State Management:** React Hooks (useState, useEffect)  
- **Features:** Skeleton Loaders, Error Handling


##  Features

-  Search any public GitHub username
-  Display public repositories with stars, forks, and links
-  Visualize commit activity with a Recharts line chart
-  Skeleton loaders while data is fetched
-  Graceful error handling for invalid usernames


##  Getting Started

To run the app locally on your machine:

```bash
# Clone the repository
git clone https://github.com/Shyam-SS/Github_Profile_Analyzer

# Move into the project directory
cd github-profile-analyzer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`


##  Deployment Instructions

You can deploy this project on **Vercel** in two ways:

###  Option 1: Using Vercel Web Interface

1. Push your code to a GitHub repository  
2. Go to [Vercel](https://vercel.com) and log in  
3. Click on **"Add New Project"** and import your GitHub repository  
4. Set the framework preset to **Vite** (auto-detect works too)  
5. Click **Deploy** — you're live in seconds!

###  Option 2: Deploy via Terminal (Bash)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run this in your project directory
dcd github-profile-analyzer

# Deploy the project
vercel
```

- You'll be prompted to log in and link your project.
- Accept the defaults or customize if needed.
- Vercel will build and deploy your app, then give you a live URL.

To redeploy after changes:
```bash
vercel --prod
```

##  About Me

**Shyam Sunder Singh**  
Frontend & AI-ML Intern  
 [LinkedIn](https://www.linkedin.com/in/shyam-sunder-singh)  
 [GitHub](https://github.com/Shyam-SS)


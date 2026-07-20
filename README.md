# NewsApp

NewsApp is a React-based news application that displays the latest headlines from multiple categories such as business, entertainment, health, science, sports, and technology. The app uses the News API and includes category-based navigation, article cards, and infinite scrolling for a smoother browsing experience.

## Features

- Browse top headlines for India by default
- Switch between categories using the navigation bar
- View article cards with title, description, image, author, and publish date
- Load more articles automatically with infinite scrolling
- Built with React Router for category-based routes

## Tech Stack

- React
- React Router DOM
- Infinite Scroll Component
- News API
- Create React App

## Getting Started

### Prerequisites

- Node.js and npm installed
- A valid News API key

### Installation

1. Clone the repository
2. Install dependencies:
   `ash
   npm install
   `
3. Create a .env file in the project root and add your API key:
   `ash
   REACT_APP_NEWS_API=your_news_api_key_here
   `
4. Start the development server:
   `ash
   npm start
   `

The app will open at http://localhost:3000.

## Available Scripts

- 
pm start — runs the app in development mode
- 
pm run build — builds the app for production
- 
pm test — launches the test runner

## Project Structure

- src/components/ — reusable UI components such as Navbar, News, Newsitem, and Spinner
- src/App.js — main application routes and category setup
- public/ — static assets and HTML template

## Notes

The app depends on a valid News API key. Without it, the news feed will not load correctly.

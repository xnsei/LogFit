# LogFit

Welcome to LogFit! This app helps you log and monitor your wokrouts to achieve your fitness goals efficiently.

## Features

 - **User-Friendly Interface:** Easily record your workouts with an intuitive user interface.
 - **Workout Log:** Keep a detailed log of your exercises, sets, reps and weights
 - **Progress Tracking:** Track your progress over time with statistics.
 - **Weight Tracking:** Track your weight over time with charts and statistics, no matter you're cutting, gaining or maintaining.
 - **Custom Workouts:** Create and save custom workout routines tailored to your goals.

## Usage
1. Sign up for an account or log in if you already have one.
2. Create a new workout or select an existing one.
3. Add exercises, sets, reps, and weights to your workout.
4. Save and track your workout progress.

## Setting up Locally
1. Clone this repository to your local machine:
```bash
git clone https://github.com/xnsei/LogFit.git
```
2. Install MongoDB locally if you haven't already. Here's a quick guide to [install MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/).

3. Navigate to server directory, and install all the necessary dependencies:
```bash
cd LogFit/server
npm install
```
4. Start the server:
```bash
npm run dev
```
5. Navigate to client directory and follow similar steps to install the dependencies:
```bash
cd ../client
npm install
```
6. Start client:
```bash
npm run dev
```
7. Open your browser and visit:
```
http://localhost:5173/
```

# Bookstore Events Platform
A website created for a (hypothetical) Bookstore, where users can view upcoming events and add them to Google Calendar, and staff can add new events. 
- The backend is made using PostgreSQL and express.js, and is hosted here: https://event-platform-jbo3.onrender.com/api
- The frontend is made using Vite & React.js hosted here: https://bookstore-events-platform.netlify.app

## Prerequisites
Before getting started you need to make sure you have the following:
- Node.js and npm installed
- PostgreSQL installed and database set up
- A Google Cloud project with OAuth 2.0 credentials and Client ID set up - make sure to add any test users you will be using

## Setting up the Backend
1. Clone the repository and navigate to the backend folder
```
git clone https://github.com/j3llybean42/Event-Platform.git 
cd backend
```
2. Install dependencies
```
npm install
```
3. Create a .env file for development called ".env.development" and add "PGDATABASE=database_name"
4. Add any .env files to the .gitignore file
5. Add any users you would like to be Staff into the staff.js data file
### Commands for running the backend locally:
```
# Create the databases:
npm run setup-dbs

# Running:
npm run seed
npm run start

# Open in your browser:
open http://localhost:5050
```

## Setting up the Frontend
1. Navigate to the my-react-app folder
```
# If in the root directory:
cd frontend/my-react-app

#If in the backend folder:
cd ../frontend/my-react-app
```
2. Install the dependencies
```
npm install
```
### Commands for running the frontend locally:
```
# Running:
npm run dev

# Open in your browser:
open http://localhost:5173
```
## Usage
- Users and staff can sign in with their Google accounts
- Staff can add new events from the Events page
- Staff and users can add events to their Google Calendars

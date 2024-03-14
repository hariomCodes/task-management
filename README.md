# Task Manager
## Setup
This project uses python3.10.12 and node 18.19.1 version
Clone this repo and open the root directory in terminal.

### Backend
1. Enter the ./backend directory.
2. Create virtual environment and activate
    `python3 -m venv venv`
    `source ./venv/bin/activate`
3. Install using pip from requirements.txt 
    `pip install -r ./requirements.txt`
4. Go back to the root directory
5. Run the dev server
    `uvicorn backend.main:app --reload`
    The backend should be running now.

### Frontend
Do not exit the backend terminal. Create a new terminal and do the following
1. Go to the root and enter the frontend directory
2. Install npm packages
    `npm install`
3. Run the dev server
    `npm run dev`
The url should be available on the terminal. Paste it on a browser and you can access the frontend.
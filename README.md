
# OpenShelf

<div align="center">
  
   ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
   ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
   ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
   ![Django](https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white)
   ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

   **A community-driven digital lending library for books, tools, and games.**
</div>


## Features

1. **Homepage & Navigation** – Browse categories (books, tools, games) with featured items.
2. **Authentication** – Sign up/login via email or Google OAuth, with account verification.
3. **Browse & Search** – View item cards with title, image, and availability.
4. **Item Management** – Add items with photos/details, manage availability & lending terms.
5. **Borrowing System** – Request items, confirm terms, track requests & loan history.
6. **Lending Management** – Review/approve requests, track items on loan, confirm returns.
7. **Notifications** – Updates on requests & due date reminders.



## Getting Started

To get started with OpenShelf, follow these steps:

1. **Clone the repository**
   Make sure you have the proper access to the repository and your SSH keys are set up correctly.
   ```bash
   git clone git@github.com:freeCodeCamp-2025-Summer-Hackathon/OpenShelf.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd OpenShelf
   ```

3. **Set up the database**
   - Ensure you have PostgreSQL installed and running.
   - Create a new database named `openshelf`. Change the `PGPASSWORD` if your PostgreSQL user has a different password.
   ```bash
   PGPASSWORD=postgres psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE openshelf;" 2>/dev/null
   ```
   - Check if the database is properly created:
   ```bash
   PGPASSWORD=postgres psql -h localhost -p 5432 -U postgres -d openshelf
   ```
   - Update the database settings in `backend/backend/settings.py` with your PostgreSQL credentials.

4. **Install dependencies**
   - For the backend:
     ```bash
     cd backend
     # Create virtual environment (not necessary for Windows)
     python -m venv venv
     source venv/bin/activate # Activate virtual environment
     # Install dependencies
     pip install -r requirements.txt
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

5. **Run migrations**
   ```bash
   cd backend
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Run the development server**
   - For the backend:
     ```bash
     cd backend
     python manage.py runserver
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm run dev
     ```

7. **Access the application**
   - Open your web browser and go to [http://localhost:3000](http://localhost:3000) for the frontend.
   - The backend API will be available at [http://localhost:8000/api/](http://localhost:8000/api/). More at [OpenShelf API documentation](backend/README.md).

## Deployment

### Production Deployment on Render

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

**Quick Deploy:**
1. Fork this repository to your GitHub account
2. Connect to [Render](https://render.com) and create a new Blueprint
3. Select your forked repository - Render will auto-detect the `render.yaml` configuration
4. Configure environment variables as described in the deployment guide
5. Your app will be live at the provided Render URLs!

**Services:**
- Frontend: Static site serving the React application
- Backend: Web service running the Django API
- Database: PostgreSQL database (managed by Render)

---

<div align="center">
   This project is part of the <strong>freeCodeCamp 2025 Summer Hackathon</strong>, created by <strong>Team Lavender</strong>.
</div>

# BudgetMaster

BudgetMaster is a personal budget management application that allows users to track expenses and incomes, categorize them, and view analytical reports. It is built with Angular 17 for the frontend and Spring Boot 3 for the backend, with PostgreSQL as the database.

## 🌟 Screenshots  

### 🔹 **Dashboard**  
![Home Page](https://github.com/user-attachments/assets/73bdeea0-eb1e-4eaf-ba1d-1d200cc46c14)  

### 🔹 **Transaction Management**  
![Task Management](https://github.com/user-attachments/assets/021948fc-0f02-492c-8840-4fe7f8f78170)  


## Project Structure
```
BudgetMaster/
├── budgetmaster-backend/
│   ├── pom.xml
│   ├── src/main/java/com/example/budgetmaster/…
│   └── src/main/resources/
│       ├── application.properties
│       └── schema.sql
├── budgetmaster-frontend/
│   ├── package.json
│   ├── angular.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/app/…
├── docker-compose.yml
├── BudgetMaster.postman_collection.json
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Angular CLI](https://angular.io/cli)
- [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven](https://maven.apache.org/)
- [PostgreSQL](https://www.postgresql.org/) (if running locally without Docker)
- [Docker](https://www.docker.com/) (for containerized deployment)
- [Postman](https://www.postman.com/) (for API testing)

## Setup & Installation

### Backend Setup (Spring Boot)

1. **Database Setup:**
   - Using Docker: The `docker-compose.yml` file sets up PostgreSQL with the following credentials:
     - Database: `budgetmasterdb`
     - Username: `postgres`
     - Password: `postgres`
   - Or set up PostgreSQL locally with the above credentials and run the SQL script found in `budgetmaster-backend/src/main/resources/schema.sql`.

2. **Running the Backend Locally:**
   - Navigate to the `budgetmaster-backend` folder.
   - Run `mvn clean package` to build the project.
   - Start the application using:
     ```
     mvn spring-boot:run
     ```
   - The backend will be available at [http://localhost:8080](http://localhost:8080).

3. **JWT Tokens:**
   - Use the `/api/auth/login` endpoint to obtain a JWT token after logging in.
   - Include the token in the `Authorization` header for secured endpoints as `Bearer <token>`.

4. **Swagger Documentation:**
   - Access Swagger UI at [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/).

### Frontend Setup (Angular)

1. **Installation:**
   - Navigate to the `budgetmaster-frontend` folder.
   - Install dependencies:
     ```
     npm install
     ```

2. **Running the Frontend Locally:**
   - Start the Angular development server:
     ```
     ng serve --open
     ```
   - The application will open in your default browser at [http://localhost:4200](http://localhost:4200).

3. **Environment:**
   - The frontend expects the backend API at `http://localhost:8080`. Modify environment settings if needed.

### Docker Deployment

1. **Using Docker Compose:**
   - In the root directory of the project (where `docker-compose.yml` is located), run:
     ```
     docker-compose up --build
     ```
   - This command builds the backend image and starts PostgreSQL and the backend.
   - The backend will be available at [http://localhost:8080](http://localhost:8080).

2. **Frontend Deployment:**
   - The Angular frontend can be built using `ng build` and served using any static server or integrated into a container if desired.

## API Endpoints

| Method | Endpoint                      | Description                         |
| ------ | ----------------------------- | ----------------------------------- |
| POST   | /api/auth/register            | User registration                   |
| POST   | /api/auth/login               | User login and JWT token generation |
| GET    | /api/transactions             | Retrieve all user transactions      |
| POST   | /api/transactions             | Add a new transaction               |
| PUT    | /api/transactions/{id}        | Update an existing transaction      |
| DELETE | /api/transactions/{id}        | Delete a transaction                |
| GET    | /api/categories               | Retrieve all categories             |
| POST   | /api/categories               | Create a new category               |
| PUT    | /api/categories/{id}          | Update a category                   |
| DELETE | /api/categories/{id}          | Delete a category                   |

## Postman Collection

- Import `BudgetMaster.postman_collection.json` into Postman to test the API endpoints.

## Conclusion

BudgetMaster is a complete, full-stack personal budget management application ready for local development or deployment using Docker. Enjoy managing your budget with ease!

# Library Management System

The **Library Management System** is designed to manage library resources and user interactions efficiently. This project uses Docker to simplify the setup of a PostgreSQL database and pgAdmin for database management. The Docker setup includes:

-   **PostgreSQL**: A relational database to store and manage library data.
-   **pgAdmin**: A web-based interface for managing the PostgreSQL database, making it easier to perform administrative tasks and queries.

The system allows users to manage books, borrowers, and transactions within the library. By leveraging Docker, the setup process is streamlined, ensuring that the development environment is consistent and easily deployable across different machines.

# Technology Stack

The **Library Management System** uses **Docker** for containerization, **PostgreSQL** as the relational database, **pgAdmin** for database management, **Node.js** for server-side scripting, **Sequelize** as the ORM to interact with the database, **Postman** for API testing, and **Docker Compose** to manage multi-container setups.
## Prerequisites
-   Docker and Docker Compose installed on your machine.
-   Node.js installed on your machine.
## Running the Project

-   `git clone https://github.com/AhmedSamirAbdallah/Library-Management-System.git`
-  cd Library-Management-System`
- Start Docker Containers `docker-compose up -d`
- **Access pgAdmin** -   Open your web browser and navigate to [http://localhost:5433]
- Log in using the following credentials:  
    -   Email: `admin@admin.com`
    -   Password: `admin`
- Create the `library` database using a SQL script or directly through pgAdmin. Here’s a SQL script for creating the `library` database: `CREATE DATABASE library;`
- To run this script in pgAdmin:

	1.  Connect to the PostgreSQL server in pgAdmin.
	2.  Right-click on the server and select Query Tool.
	3.  Paste the SQL script into the Query Tool and execute it.
- Run the Node.js Application `node app.js`
## Troubleshooting
-   **Issue:** Unable to connect to pgAdmin or PostgreSQL.
    
    -   **Solution:** Ensure Docker is running and check the container status with `docker ps`. Verify that the ports and credentials are correct.
-   **Issue:** Cannot create the `library` database.
    
    -   **Solution:** Confirm that you are connected to the correct PostgreSQL instance in pgAdmin and that you have the necessary permissions.

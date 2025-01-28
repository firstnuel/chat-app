
# Chat App

A real-time chat application built using React, Node.js, PostgreSQL, and Docker. This app allows users to send and receive messages, manage user authentication, and handle chat functionalities in a simple and intuitive interface.

## Features

- **Real-time Messaging**: Send and receive messages instantly.
- **User Authentication**: Register, log in, and manage sessions securely.
- **PostgreSQL Database**: Store messages and user data.
- **Dockerized**: All services (frontend, backend, PostgreSQL, and Nginx) run in isolated Docker containers.
- **Responsive UI**: Built with React and optimized for desktop and mobile use.

## Architecture

The app is divided into several services:

- **Frontend**: React-based user interface, which communicates with the backend.
- **Backend**: Node.js server with Express for API routes, including authentication and messaging.
- **PostgreSQL**: A relational database for storing user data and chat messages.
- **Nginx**: Reverse proxy server to handle routing between the frontend and backend (optional in this setup).

## Technologies

- **Frontend**: React, Vite
- **Backend**: Node.js, Express, Prisma
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Prerequisites

Before running the app locally, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- A text editor (e.g., [VS Code](https://code.visualstudio.com/))
- [Node.js](https://nodejs.org/en/) (for local development)

## Getting Started

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/firstnuel/chat-app
cd chat-app
```

### 2. Set Up Environment Variables

Create a `.env` file in the `app-backend` directory with the following variables folling the [env.template](./app-backend/env.template)

Make sure to replace `your_db_user` and `your_db_password` with your desired credentials.

### 3. Build and Start the Containers

Use Docker Compose to build and start all the services.

```bash
docker-compose up --build
```

This will:

- Build the backend and frontend Docker images.
- Start the PostgreSQL container and configure the database.
- Start the backend server and frontend application.

### 4. Access the App

Once the containers are up and running, you can access the app:

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000/api/`

or centrally via the reverse proxy

- **Frontend**: `http://localhost:8080`
- **Backend**: `http://localhost:8080/api/`



## Usage

- **Register a New User**: Navigate to the frontend and sign up with your email and password.
- **Log In**: After registration, log in to access the chat features.
- **Send Messages**: Once logged in, you can send and receive messages in real-time.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# React-Todo

---

### Introduction

This documentation provides an overview of the implementation and usage of React Query in a To-Do List application with a backend built using Express.js, Node.js, MongoDB, and Mongoose. The application allows users to manage their to-do items by performing CRUD (Create, Read, Update, Delete) operations.

### Overview

The To-Do List application demonstrates how to use React Query for data fetching and state management in conjunction with a backend powered by Express.js, Node.js, MongoDB, and Mongoose. It includes features such as adding, updating, deleting, and toggling the status of to-do items.

### Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **React Query:** A data-fetching library for React applications.
- **Express.js:** A web application framework for Node.js.
- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **MongoDB:** A NoSQL database program, using JSON-like documents with optional schemas.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/react-todo.git
   ```
2. Navigate to the project directory:
   ```
   cd React-todo
   ```
3. Install dependencies for both frontend and backend:
   ```
   cd Frontend
   npm install
   cd Backend
   npm install
   ```

## Configuration

1. Create a `.env` file in the `backend` directory.
2. Define the following environment variables in the `.env` file:
 
   ```
   PORT=8080
   MONGO_MEMORY_SERVER_PORT=10000 # mongodb port for e2e testing
   MONGODB_URI= mongodb://localhost:27018 # `mongodb://localhost:27017` in case using local mongodb
   NODE_ENV=development # changing this will avoid stack traces in the error response
   EXPRESS_SESSION_SECRET=7fdOMCFRSLD9cv1k-5n3Dz5n3DmVmVHVIg9GG_OGTUkBfLNdgZAwKDNtoCJ0X0cyqaM0ogR80-zh9kx0Mkx # ok to change
   ACCESS_TOKEN_SECRET=LD9cv1kBfgRHVIg9GG_OGzh9TUkcyqgZAaM0o3DmVkx08MCFRSzMocyO3UtNdDNtoCJ0X0-5nLwK7fdO # ok to change
   ACCESS_TOKEN_EXPIRY=1d # 1 day. Formats: https://github.com/vercel/ms#examples
   REFRESH_TOKEN_SECRET=CMdDNtowK7fX0-5D9cv0oJ008MCFRSLHVTUkcyqgZAaIg9GG_OGzh9zMocyO3UtN1kBfLRn3DmVkxdO # ok to change
   REFRESH_TOKEN_EXPIRY=10d # 10 days. Formats: https://github.com/vercel/ms#examples

   ```

<!-- CORS_ORIGIN=http://localhost # add the frontend URL (more secure) -->


## Running the Application

1. Start the backend server:
```

cd Backend
npm start

```
2. Start the frontend development server:
```

cd Frontend
npm start

```
3. Open your browser and navigate to `http://localhost:3000` to view the application.


### Implementation Details

#### Backend (Express.js, Node.js, MongoDB, Mongoose)

- **Express.js:** Provides the web application framework for handling HTTP requests and routes.
- **Node.js:** Runs the JavaScript server code and provides access to the file system and other system-level functionalities.
- **MongoDB:** Stores the to-do items data in a NoSQL database.
- **Mongoose:** Provides an Object Data Modeling (ODM) layer for MongoDB, simplifying data validation and manipulation.

#### Frontend (React, React Query)

- **React:** Handles the UI components and user interactions.
- **React Query:** Manages data fetching, caching, and state synchronization with the backend.

#### API Endpoints

The backend server exposes RESTful API endpoints for performing CRUD operations on to-do items. These endpoints are consumed by the frontend application to interact with the database.

#### Data Fetching and State Management

React Query is used on the frontend to fetch data from the backend API endpoints and manage the state of the application. Data is automatically cached and updated in response to user interactions and changes in the database.

#### User Interface

The UI is built using React components and styled using CSS. Components are modular and reusable, facilitating a clean and maintainable codebase.

#### Error Handling

Error handling is implemented both on the frontend and backend to provide informative error messages and handle exceptions gracefully.

---

This documentation provides an overview of the To-Do List application implemented using React Query with Express.js, Node.js, MongoDB, and Mongoose. For more detailed information, refer to the source code and comments within the application files.
```

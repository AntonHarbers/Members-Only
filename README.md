# Members Only - The Odin Project

## Introduction

**Members-Only** is a sophisticated full-stack web application built using Express, MongoDB, JavaScript, and Passport. This project, designed as part of The Odin Project curriculum, offers a platform where users can share messages anonymously. Only after logging in can the members see who authored each message, bringing a unique twist to the traditional messaging app.

## Features

- **User Authentication**: Secure login/logout functionality, including password encryption.
- **Message Posting**: Members can post, view, and delete messages.
- **Admin Privileges**: Admin users can manage messages and user roles.
- **Responsive Design**: Crafted to provide a seamless experience across various devices.

## Live Demo

Check out the live version of the application [here](https://evening-ordinary-anatosaurus.glitch.me/).

## Getting Started

These instructions will help you set up a copy of the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AntonHarbers/Members-Only.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd Members-Only
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URL_DEV=<Your MongoDB Connection String>
   SESSION_SECRET=<Your Session Secret>
   ```
5. **Run the Application:**
   ```bash
   npm start
   ```

## Technologies Used

- **Node.js**: JavaScript runtime for the backend.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database to store user data and messages.
- **Passport.js**: Authentication middleware for

Node.js.

- **Bcrypt.js**: Library for hashing passwords.
- **Pug**: Templating engine for rendering HTML.

## Project Structure

- `/controllers`: Business logic for handling HTTP requests.
- `/models`: Schema definitions for MongoDB.
- `/views`: Pug templates for HTML structure.
- `/public`: Static files like CSS and JavaScript.
- `/routes`: Definitions of application routes.

Certainly! Here's the API documentation section for the Members-Only project:

---

## API Documentation

This section provides detailed documentation for the API routes used in the Members-Only application. Each route is designed to handle specific functionalities related to user interactions and message management.

### User Authentication Routes

####

1. **Sign Up**

   - **Endpoint**: `/sign-up`
   - **Method**: `GET`
   - **Description**: Renders the sign-up form for new users.
   - **Response**: HTML form for user registration.

   - **Method**: `POST`
   - **Description**: Processes user registration data.
   - **Request Body**:
     ```json
     {
       "username": "string",
       "password": "string",
       "firstName": "string",
       "lastName": "string"
     }
     ```
   - **Response**: Redirect to the home page upon successful registration.

2. **Log In**

   - **Endpoint**: `/log-in`
   - **Method**: `GET`
   - **Description**: Displays the login form.
   - **Response**: HTML form for user login.

   - **Method**: `POST`
   - **Description**: Authenticates the user.
   - **Request Body**:
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```
   - **Response**: Redirect to the home page upon successful login.

3. **Log Out**
   - **Endpoint**: `/log-out`
   - **Method**: `POST`
   - **Description**: Logs out the current user.
   - **Response**: Redirect to the home page.

### Message Management Routes

1. **Post a New Message**

   - **Endpoint**: `/messages/new`
   - **Method**: `GET`
   - **Description**: Renders the form to post a new message.
   - **Response**: HTML form for posting a new message.

   - **Method**: `POST`
   - **Description**: Submits a new message.
   - **Request Body**:
     ```json
     {
       "title": "string",
       "content": "string"
     }
     ```
   - **Response**: Redirect to the home page with the new message posted

.

2. **Delete a Message**
   - **Endpoint**: `/messages/delete`
   - **Method**: `POST`
   - **Description**: Deletes a specific message. Only accessible by admin users.
   - **Request Body**:
     ```json
     {
       "messageId": "string"
     }
     ```
   - **Response**: Redirect to the home page after deletion.

## Contributing

Please note that contributions to this project are not welcome as it is a personal portfolio piece. However, feel free to fork and experiment with the code for your learning and exploration.

## Authors

- **Anton Harbers** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Acknowledgments

- The Odin Project community for the inspiration and guidance.

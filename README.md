# Employee Product Assignment System

## Overview
The Employee Product Assignment System is a web application designed to manage the assignment of demo products to employees within an organization. This application allows administrators to efficiently manage users, products, and their assignments while maintaining a comprehensive activity log for auditing purposes. The system supports role-based access control (RBAC) to ensure that users have appropriate permissions based on their roles.

## Key Features
- **User  Management**: Admin users can create, update, and delete employee records.
- **Product Management**: Administrators can manage demo products, including adding, updating, and removing products.
- **Assignment Management**: The system allows for assigning demo products to employees and tracking these assignments.
- **Activity Logging**: All actions performed in the system are logged for auditing purposes.
- **Role-Based Access Control**: Different user roles (admin, regional, employee) ensure appropriate access to features.

## Technologies Used
- **Backend**: Node.js with TypeScript, Express.js for the RESTful API, and MongoDB for data storage.
- **Authentication**: JSON Web Tokens (JWT) for secure user authentication.
- **Development Tools**: TypeScript for type safety, Nodemon for automatic server restarts, and Mongoose for MongoDB object modeling.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dilipksahu/Employee-Product-Assignment-System-Nodejs
   cd employee-product-assignment-system-nodejs

2. **Install Dependencies:**;
    npm install
  
3. **Set Up TypeScript Configuration: Initialize TypeScript configuration:**;
    npx tsc --init

4. **Create Environment Variables:** Create a .env file in the root directory and add your environment variables (e.g., MongoDB connection string, JWT secret).

5. **Run the Development Server:** You can now run your server in development mode using:
    npm run dev

6. **Access the Application:** Open your browser and navigate to `http://localhost:3000` to access the Employee Product Assignment API.

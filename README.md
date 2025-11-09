# Cyber-Crime-Reporting-And-Management-Platform

## Live Demo
*   **Live Application:** https://cyberlens-cyber-crime-reporting-platform.vercel.app
*   **GitHub Repository:** https://github.com/PurusottamReddy/CyberLens-Cyber-Crime-Reporting-Platform

## Project Overview
This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed for reporting and managing cybercrimes. It provides a platform for users to report incidents, and for authorities/admins to track, investigate, and resolve these reports.

## Features

### User Features:
*   **User Authentication:** Secure registration and login for users.
*   **Crime Reporting:** Users can submit detailed cybercrime reports, including title, description, category, location, date, and related information.
*   **Anonymous Reporting:** Option to report crimes anonymously.
*   **Evidence Upload:** Ability to upload multiple image, video, or PDF files as evidence.
*   **View Own Reports:** Users can view a list of their submitted crime reports.
*   **Report Details:** Detailed view of individual crime reports.

### Authority/Admin Features:
*   **Admin Dashboard:** Overview of all crime reports.
*   **Report Management:** View, update status (Pending, Investigating, Resolved), and delete crime reports.
*   **Role-Based Access Control:** Different functionalities and views based on user roles (user, authority, admin).
*   **Report Filtering:** Filter reports by status (All, Pending, Investigating, Resolved).

## Technologies Used

### Frontend:
*   **React.js:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool for modern web projects.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **React Router DOM:** For declarative routing in React applications.
*   **Axios:** Promise-based HTTP client for making API requests.
*   **React Hot Toast:** For displaying toast notifications.

### Backend:
*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** A NoSQL document database.
*   **Mongoose:** MongoDB object data modeling (ODM) for Node.js.
*   **JSON Web Token (JWT):** For secure authentication.
*   **Bcrypt.js:** For hashing passwords.
*   **Cloudinary:** Cloud-based image and video management service for evidence storage.
*   **Multer:** Node.js middleware for handling `multipart/form-data`, primarily used for uploading files.
*   **Dotenv:** Loads environment variables from a `.env` file.

## Setup Instructions

### Prerequisites
*   Node.js (v14 or higher)
*   npm or yarn
*   MongoDB Atlas account (or local MongoDB instance)
*   Cloudinary account

### 1. Clone the repository
```bash
git clone <repository-url>
cd Cyber-Crime-Reporting-Platform
```

### 2. Backend Setup
Navigate to the `server` directory:
```bash
cd server
```
Install dependencies:
```bash
npm install
```
Create a `.env` file in the `server` directory (if it doesn't exist) and add the following environment variables:
```
PORT=<Your Preferred Port Number>
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
FRONTEND_URL=<Your Frontend URL>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
```

Run the backend server:
```bash
npm run server
```
The backend server will run on `http://localhost:<Your Preferred Port Number>`.

### 3. Frontend Setup
Open a new terminal and navigate to the `client` directory:
```bash
cd ../client
```
Install dependencies:
```bash
npm install
```
Create a `.env` file in the `client` directory (if it doesn't exist) and add the following environment variables:
```
VITE_BACKEND_URL=http://localhost:<Your Preferred Port Number>
```

Run the frontend development server:
```bash
npm run dev
```
The frontend application will run on `<Your Frontend URL>`.

## Usage
1.  **Register/Login:** Create a new user account or log in with existing credentials.
2.  **Report a Crime:** Navigate to the "Report Crime" section to submit a new report.
3.  **View Reports:** Check "All Reports" to see a list of all submitted reports (admin/authority) or your own reports (user).
4.  **Manage Reports:** Authorities/admins can update the status of reports and delete them.
5.  **Filter Reports:** Use the filter buttons on the "All Reports" page to view reports by status.

## Contributing
Feel free to fork the repository, create a new branch, and submit pull requests. Any contributions are welcome!

## License
This project is licensed under the MIT License.

---


Designed and Developed by T. Purusottam Reddy

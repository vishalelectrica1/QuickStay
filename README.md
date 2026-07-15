# 🏨 QuickStay

QuickStay is a modern, full-stack MERN (MongoDB, Express, React, Node.js) web application designed to help users seamlessly discover, list, and book rental properties worldwide. It offers a smooth, responsive, and secure experience for both property owners and travelers.

---

## ✨ Features

- **Authentication & Authorization**: Secure user registration, login, and profile management using JSON Web Tokens (JWT) stored in HTTP-only cookies.
- **Property Listings**: Browse, search, and view detailed property information. Property owners can easily add, update, and manage their rental properties.
- **Booking Management**: Users can instantly book their stays, view their booked trips, and cancel reservations if needed.
- **Image Uploading**: Integrated with **Cloudinary** for seamless and optimized image uploads for user profiles and property photos.
- **Responsive Design**: A sleek, fully responsive user interface built using React, Vite, and modern CSS practices to provide a native-like experience across all devices.

## 🛠 Tech Stack

### Frontend
- **React.js** (via Vite) - Fast, modern frontend framework
- **Tailwind CSS** - For beautiful, responsive, and utility-first styling
- **Context API** - For efficient global state management

### Backend
- **Node.js** & **Express.js** - Scalable backend RESTful APIs
- **MongoDB** & **Mongoose** - Flexible NoSQL database and object modeling
- **JSON Web Tokens (JWT)** - For robust and secure authentication
- **Multer** & **Cloudinary** - For managing multipart form data and hosting media assets

## 🚀 Getting Started

To run QuickStay locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/en/) installed on your machine
- A MongoDB cluster or local MongoDB instance
- A [Cloudinary](https://cloudinary.com/) account for image uploads

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vishalelectrica1/QuickStay.git
   cd QuickStay
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file inside the `backend` directory with the following variables:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Setup the Frontend:**
   Open a new terminal window/tab:
   ```bash
   cd frontend
   npm install
   ```
   Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173` and the backend will run on `http://localhost:8000`.

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! Feel free to check the issues page or submit a pull request if you'd like to improve QuickStay.

## 📝 License

This project is open-source and available for everyone to use and modify.

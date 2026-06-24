import {React,useContext} from 'react'
import { Routes, Route,Navigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ListingPage1 from "./pages/ListingPage1"
import ListingPage2 from "./pages/ListingPage2"
import ListingPage3 from "./pages/ListingPage3"
import MyListing from "./pages/MyListing"
import ViewCard from "./pages/ViewCard"
import { userDataContext } from './assets/context/UserContext'
import MyBooking from './pages/MyBooking'
import Booked from './pages/Booked'
import Footer from './components/Footer'
function App() {
  let { userData } = useContext(userDataContext)

  return (
    <div className="flex flex-col min-h-screen">
    <ToastContainer />
    <div className="flex-grow">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
            path="/listingpage1"
            element={userData != null ? <ListingPage1 /> : <Navigate to="/login" />}
          />

          <Route
            path="/listingpage2"
            element={userData != null ? <ListingPage2 /> : <Navigate to="/login" />}
          />

          <Route
            path="/listingpage3"
            element={userData != null ? <ListingPage3 /> : <Navigate to="/login" />}
          />

    

          <Route
          path="/mylisting"
          element={userData != null ? <MyListing /> : <Navigate to="/login" />}
        />

        <Route
          path="/viewcard"
          element={userData != null ? <ViewCard /> : <Navigate to="/login" />}
        />
        <Route
          path="/mybooking"
          element={userData != null ? <MyBooking /> : <Navigate to="/login" />}
        />

        <Route
          path="/booked"
          element={userData != null ? <Booked /> : <Navigate to="/"/>}
        />

        </Routes> 
        </div>
        <Footer />
    </div>
  )
}

export default App


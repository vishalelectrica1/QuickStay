
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from "./assets/context/AuthContext.jsx";
import UserContext from "./assets/context/UserContext.jsx";
import ListingContext from "./assets/context/ListingContext.jsx";
import BookingContext from "./assets/context/BookingContext.jsx";
// import Listing from '../../backend/model/listing.model.js';
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AuthContext>
      <ListingContext>
      <UserContext>
        <BookingContext>
        <App />
        </BookingContext>
      </UserContext>
      </ListingContext>
    </AuthContext>
    </BrowserRouter>
)

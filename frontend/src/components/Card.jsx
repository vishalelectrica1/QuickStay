import {React,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { userDataContext } from "../assets/context/UserContext";
import { listingDataContext } from "../assets/context/ListingContext.jsx";
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { useState } from 'react';
import { bookingDataContext } from '../assets/context/BookingContext.jsx';

function Card({ title, landmark, image1, image2, image3, rent, city, id,ratings,isBooked,host }) {

    let navigate = useNavigate();
    let {userData}=useContext(userDataContext);
    let {handleViewCard}=useContext(listingDataContext);
    let [popUp,setPopUp] = useState(false);
    let {cancelBooking} = useContext(bookingDataContext);
   const handleClick = ()=>{
    if(userData){
      handleViewCard(id);
    }
    else{
      navigate("/login");
    }
   } 


  return (
    <div
  className="w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg cursor-pointer relative z-[10]"
  onClick={ ()=>!isBooked?handleClick():null}
>
  
  {/* Booked Badge */}
 { isBooked && <div className="text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px]">
    <GiConfirmed className="w-[20px] h-[20px] text-[green]" />
    Booked
  </div>}

        {
          isBooked && host == userData?._id && (
            <div className="text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px]" onClick={() => setPopUp(prev => !prev)}
>
              <FcCancel className="w-[20px] h-[20px]" />
              Cancel Booking
            </div>
          )
        }
       {
  popUp && (
    <div className="w-[300px] h-[100px] bg-[#fffffffd] absolute top-[110px] left-[13px] rounded-lg">

      <div className="w-[100%] h-[50%] text-[#2e2d2d] flex items-start justify-center rounded-lg overflow-auto text-[20px] p-[10px]">
        Booking Cancel!
      </div>

      <div className="w-[100%] h-[50%] text-[18px] font-semibold flex items-start justify-center gap-[10px] text-[#986b6b]">
        Are you sure?
        <button className="px-[20px] bg-[red] text-[white] rounded-lg hover:bg-slate-600" onClick={()=>{cancelBooking(id);setPopUp(false)}}>
          Yes
        </button>
        <button className="px-[10px] bg-[red] text-[white] rounded-lg hover:bg-slate-600" onClick={() => setPopUp(prev => !prev)}>
          No
        </button>
      </div>

    </div>
  )
}



        


      <div className="w-[100%] h-[67%] rounded-lg overflow-x-auto flex no-scrollbar">
        <img src={image1} alt="" className="w-[100%] flex-shrink-0" />
        <img src={image2} alt="" className="w-[100%] flex-shrink-0" />
        <img src={image3} alt="" className="w-[100%] flex-shrink-0" />
      </div>



      <div className="w-full flex flex-col mt-[12px] px-[4px]">
        {/* 1. Title & Rating */}
        <div className="w-full flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 truncate pr-2 capitalize">
            {title}
          </h3>
          <span className="flex items-center gap-1 text-sm font-semibold text-gray-800 flex-shrink-0">
            <FaStar className="text-[#ef4444]" />
            {ratings}
          </span>
        </div>
        
        {/* 2. Price */}
        <div className="text-gray-900 font-semibold mt-1 text-[16px]">
          ₹{rent} <span className="font-normal text-gray-600 text-[14px]">per night</span>
        </div>
        
        {/* 3. Address */}
        <div className="text-gray-500 text-[15px] mt-1 truncate capitalize font-medium">
          {landmark}, {city}
        </div>
      </div>
    </div>
            
  )
}

export default Card

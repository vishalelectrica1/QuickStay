import React,{ useContext, useState,useEffect} from 'react'
import axios from "axios"
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { userDataContext } from '../assets/context/UserContext';
import { authDataContext } from '../assets/context/AuthContext';
import { bookingDataContext } from '../assets/context/BookingContext';
import { listingDataContext } from '../assets/context/ListingContext.jsx';
import { toast } from 'react-toastify';

function ViewCard() {
      let navigate = useNavigate();
      let {cardDetails} = useContext(listingDataContext);
      let [updatePopUp,setUpdatePopUp] = useState(false);
      let [bookingPopUp,setBookingPopUp] = useState(false);

      const [title, setTitle] = useState(cardDetails.title);
        const [description, setDescription] = useState(cardDetails.description);
      
        const [backEndImage1, setBackEndImage1] = useState(null);
        const [backEndImage2, setBackEndImage2] = useState(null);
        const [backEndImage3, setBackEndImage3] = useState(null);
      
        const [rent, setRent] = useState(cardDetails.rent);
        const [city, setCity] = useState(cardDetails.city);
        const [landmark, setLandmark] = useState(cardDetails.landmark);
        const [category, setCategory] = useState(cardDetails.category);
        let {updating, setUpdating} = useContext(listingDataContext);
        let {deleting, setDeleting} = useContext(listingDataContext);
        let {serverUrl} = useContext(authDataContext);
        let [minDate,setMinDate] = useState("");
        let {
              checkIn, setCheckIn,
              checkOut, setCheckOut,
              total, setTotal,
              night, setNight,handleBooking,
              booking,setBooking
            } = useContext(bookingDataContext)

            useEffect(() => {
              if (checkIn && checkOut) {
                let inDate = new Date(checkIn)
                let outDate = new Date(checkOut)

                let n = (outDate - inDate) / (24 * 60 * 60 * 1000)
                setNight(n)

                let quickStayCharge = cardDetails.rent * (7 / 100)
                let tax = cardDetails.rent * (7 / 100)

                if (n > 0) {
                  setTotal((cardDetails.rent * n) + quickStayCharge + tax)
                }
                else{
                  setTotal(0);
                }
              }
}, [checkIn, checkOut,cardDetails,rent,total])


     const handleUpdateListing = async () => {
      setUpdating(true);
  try {

    let formData = new FormData()

    formData.append("title", title)
    if(backEndImage1)
    formData.append("image1", backEndImage1)
   if(backEndImage2)
    formData.append("image2", backEndImage2)
   if(backEndImage3)
    formData.append("image3", backEndImage3)
    formData.append("description", description)
    formData.append("rent", rent)
    formData.append("city", city)
    formData.append("landmark", landmark)
    formData.append("category", category)

    let result = await axios.post(
      serverUrl + `/api/listing/update/${cardDetails._id}`,
      formData,
      { withCredentials: true }
    )
       setUpdating(false);
       toast.success("Updated Successfully")
    console.log(result)
    navigate("/")

    setTitle("")
    setDescription("")
    setBackEndImage1(null)
    setBackEndImage2(null)
    setBackEndImage3(null)
    setRent("")
    setCity("")
    setLandmark("")
    setCategory("")

  } catch (error) {
     setUpdating(false);
     toast.error(error.response.data.message)
    console.log(error)
  }
}


const handleDeleteListing = async () => {
  setDeleting(true)
  try {
    let result = await axios.delete(
      serverUrl + `/api/listing/delete/${cardDetails._id}`,
      { withCredentials: true }
    )
    setDeleting(false)
    navigate("/");
    toast.success("Deleted Successfully")
    console.log(result.data)
  } catch (error) {
    setDeleting(false)
     toast.error(error.response.data.message)
    console.log(error)
  }
}


   const handleImage1 = (e) => {
      let file = e.target.files[0]
      setBackEndImage1(file)
    }

    const handleImage2 = (e) => {
      let file = e.target.files[0]
      setBackEndImage2(file)
    }

    const handleImage3 = (e) => {
      let file = e.target.files[0]
      setBackEndImage3(file)
    }
       

      useEffect(() => {
  let today = new Date().toISOString().split("T")[0]
  setMinDate(today)
}, [])





      let {userData} = useContext(userDataContext);
  return (
     <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative">
          
          {/* Back Button */}
          <div
            className="w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-[3%] md:top-[5%] left-[20px] rounded-full flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            <FaArrowLeftLong className="w-[25px] h-[25px] text-white" />
          </div>
    
        <div className='w-[95%] md:w-[80%] flex items-start justify-start mb-[2px] mt-[60px] md:mt-[20px]'>
            <h1 className='font-poppins text-1xl md:text-2xl tracking-tight text-gray-800 capitalize px-[70px] md:px-[0]'>
               In {cardDetails.landmark}, {cardDetails.city}
            </h1>
        </div>
    
        <div className='w-[95%] md:w-[80%] flex flex-col md:flex-row gap-[10px] rounded-2xl overflow-hidden'>
          {/* Main Large Image */}
          <div className='w-full h-[300px] md:h-[400px] md:w-2/3 overflow-hidden'>
            <img src={cardDetails.image1} alt='' className='w-full h-full object-cover hover:scale-105 transition-transform duration-500' />
          </div>
    
          {/* Two Smaller Images */}
          <div className='w-full h-[150px] md:h-[400px] md:w-1/3 flex flex-row md:flex-col gap-[10px]'>
            <div className='flex-1 overflow-hidden h-full'>
              <img src={cardDetails.image2} alt='' className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'  />
            </div>
    
            <div className='flex-1 overflow-hidden h-full'>
              <img src={cardDetails.image3} alt='' className='w-full h-full object-cover hover:scale-105 transition-transform duration-500' />
            </div>
          </div>
        </div>
    
        <div className='w-[95%] md:w-[80%] mt-[10px] flex flex-col gap-[5px]'>
            <h2 className='font-montserrat text-1xl md:text-2xl font-black text-gray-900 capitalize'>
              {cardDetails.title}
            </h2>
              <p className='font-inter text-[17px] md:text-[20px] text-gray-700 font-medium leading-[1.8] max-w-[850px]'>
               {cardDetails.category}
            </p>
            <p className='font-inter text-[17px] md:text-[20px] text-gray-700 font-medium leading-[1.8] max-w-[850px]'>
              {cardDetails.description}
            </p>
    
            <div className='font-poppins text-xl md:text-2xl font-bold text-[#ef4444] mt-[5px]'>
              <span className="text-gray-900 text-lg md:text-xl font-semibold">₹{cardDetails.rent}</span> / night
            </div>
        </div>
    
    
    
    
    
          
          
    
          {/* Button */}
          <div className="w-[95%] md:w-[80%] mt-[20px] mb-[40px] flex-col md:flex-row items-center justify-start">
           {cardDetails.host == userData._id && <button className="px-[30px] py-[15px] bg-[#ef4444] hover:bg-[#d93838] transition-colors text-white font-bold text-[18px] rounded-full shadow-lg text-nowrap" onClick={() => setUpdatePopUp(prev => !prev)}>
              Edit Listing
            </button>}
        
           {cardDetails.host != userData._id &&  <button className="px-[40px] py-[15px] bg-[#ef4444] hover:bg-[#d93838] transition-colors text-white font-bold text-[18px] rounded-full shadow-lg text-nowrap mt-[10px] md:mt-[0px]" onClick={() => setBookingPopUp(prev => !prev)}>
              Book Now
            </button>}
          </div>


              {updatePopUp && (
              <div className="w-full h-full flex items-center justify-center bg-[#000000a9] fixed inset-0 z-[100] backdrop-blur-sm">
                <RxCross1 className="w-6 h-6 text-white cursor-pointer absolute top-[5%] right-[5%] hover:scale-110 transition-transform"
            onClick={() => setUpdatePopUp(false)}/>
                  
                        <form className="max-w-[800px] w-[90%] max-h-[85vh] bg-white text-gray-900 rounded-2xl shadow-2xl p-[30px] flex items-start justify-start flex-col gap-[15px] overflow-auto" onSubmit={(e)=>{e.preventDefault()}}>
                  
                          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b pb-2 w-full">Update Details</h2>
                  
                          {/* TITLE */}
                          <div className="w-[100%] flex items-start justify-start flex-col gap-2">
                            <label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</label>
                            <input
                              type="text"
                              id="title"
                              className="w-full h-[45px] border-[1px] border-gray-300 rounded-lg text-[16px] px-[15px] focus:outline-none focus:ring-2 focus:ring-[#ef4444]"
                            onChange={(e)=>setTitle(e.target.value)} value = {title}/>
                          </div>
                  
                          {/* DESCRIPTION */}
                          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                            <label htmlFor="des" className="text-[20px]">Description</label>
                            <textarea
                              id="des"
                              className="w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-black"
                            onChange={(e)=>setDescription(e.target.value)} value = {description}></textarea>
                          </div>
                  
                          {/* IMAGE 1 */}
                          <div className="w-[90%] flex items-start justify-center flex-col gap-[10px]">
                            <label htmlFor="img1" className="text-[20px]">Image1</label>
                            <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                              <input type="file" id="img1" className="w-[100%] text-[15px] px-[10px] "  onChange={handleImage1}/>
                            </div>
                          </div>
                  
                          {/* IMAGE 2 */}
                          <div className="w-[90%] flex items-start justify-center flex-col gap-[10px]">
                            <label htmlFor="img2" className="text-[20px]">Image2</label>
                            <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                              <input type="file" id="img2" className="w-[100%] text-[15px] px-[10px]"  onChange={handleImage2}/>
                            </div>
                          </div>
                  
                          {/* IMAGE 3 */}
                          <div className="w-[90%] flex items-start justify-center flex-col gap-[10px]">
                            <label htmlFor="img3" className="text-[20px]">Image3</label>
                            <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                              <input type="file" id="img3" className="w-[100%] text-[15px] px-[10px]"  onChange={handleImage3}/>
                            </div>
                          </div>
                  
                          {/* RENT */}
                          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                            <label htmlFor="rent" className="text-[20px]">Rent</label>
                            <input
                              type="number"
                              id="rent"
                              className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-black"
                            onChange={(e)=>setRent(e.target.value)} value = {rent}/>
                          </div>
                  
                          {/* CITY */}
                          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                            <label htmlFor="city" className="text-[20px]">City</label>
                            <input
                              type="text"
                              id="city"
                              className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-black"
                            onChange={(e)=>setCity(e.target.value)} value = {city}/>
                          </div>
                  
                          {/* LANDMARK */}
                          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                            <label htmlFor="landmark" className="text-[20px]">Landmark</label>
                            <input
                              type="text"
                              id="landmark"
                              className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-black"
                            onChange={(e)=>setLandmark(e.target.value)} value = {landmark}/>
                          </div>
                                          {/*  BUTTONS */}
                      <div className="w-[100%] flex flex-col md:flex-row items-center justify-end gap-[15px] mt-[10px] pt-[20px] border-t w-full">
                        <button className="w-full md:w-auto px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setUpdatePopUp(false)}>
                          Cancel
                        </button>
                        <button className="w-full md:w-auto px-6 py-3 bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200 transition-colors" onClick={handleDeleteListing} disabled={deleting}>
                          {deleting?"Deleting...":"Delete"}
                        </button>
                        <button
                          className="w-full md:w-auto px-8 py-3 bg-[#ef4444] text-white font-bold rounded-lg hover:bg-[#d93838] transition-colors"
                          onClick={handleUpdateListing}
                          disabled={updating}
                        >
                          {updating ? "Updating..." : "Save Changes"}
                        </button>
                      </div>
                  
                        </form>
              </div>
            )}
            
            {bookingPopUp && <div className="w-full h-full flex flex-col md:flex-row items-center justify-center bg-[#000000a9] gap-[40px] fixed inset-0 z-[100] backdrop-blur-sm p-4">
                
                <RxCross1 className="w-6 h-6 text-white cursor-pointer absolute top-[5%] right-[5%] hover:scale-110 transition-transform"
            onClick={() => setBookingPopUp(false)}/>
    
                <form className="max-w-[450px] w-[100%] max-h-[85vh] bg-white overflow-auto p-[30px] rounded-2xl flex items-center justify-start flex-col gap-[20px] shadow-2xl" onSubmit={(e)=>{e.preventDefault()}}>
                 <h2 className="w-[100%] text-3xl font-extrabold border-b pb-4 text-gray-900">
                Confirm & Book
              </h2>
              
              <div className="w-[100%] flex flex-col gap-6 w-full">

                <div className="w-[90%] flex items-center justify-start gap-[10px] mt-[20px] md:justify-center flex-col md:flex-row md:items-start">
                  <label htmlFor="checkin" className="text-[18px] md:text-[20px]">
                    CheckIn
                  </label>
                  <input
                    type="date"
                    id="checkIn" min={minDate}
                    className="border-[1px] border-gray-300 w-full md:w-[200px] h-[45px] rounded-lg bg-transparent px-[15px] text-[16px] focus:ring-2 focus:ring-[#ef4444] focus:outline-none" required

                    onChange={(e) => setCheckIn(e.target.value)}
                    value={checkIn}
                  />
                </div>

                <div className="w-[90%] flex items-center justify-start gap-[10px] mt-[40px] md:justify-center flex-col md:flex-row md:items-start">
                  <label htmlFor="checkOut" className="text-[15px] font-semibold text-gray-700">
                    CheckOut
                  </label>
                  <input
                    type="date"
                    id="checkOut" min={checkIn}
                    className="border-[1px] border-gray-300 w-full md:w-[200px] h-[45px] rounded-lg bg-transparent px-[15px] text-[16px] focus:ring-2 focus:ring-[#ef4444] focus:outline-none"
                    required 
                    onChange={(e) => setCheckOut(e.target.value)}
                    value={checkOut}
                  />
                </div>
                
                <div className="w-[100%] flex items-center justify-center mt-[10px]">
                  <button className="w-full py-[15px] bg-[#ef4444] hover:bg-[#d93838] transition-colors text-white font-bold text-[18px] rounded-full shadow-lg" onClick={()=>handleBooking(cardDetails._id)} disabled={booking}>
                    {booking?"Booking...":"Confirm & Pay"}
                  </button>
                </div>
              </div>
                </form>
                
                              <div className="max-w-[450px] w-[100%] max-h-[85vh] bg-white p-[30px] rounded-2xl flex items-center justify-start flex-col gap-[20px] shadow-2xl">
                <div className="w-[100%] flex justify-start items-center gap-[15px] pb-5 border-b border-gray-200">
                  <div className="w-[100px] h-[100px] flex items-center justify-center flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={cardDetails.image1}
                      alt=""
                    />
                  </div>
                  
                  <div className="flex flex-col gap-[2px]">
                    <h3 className="text-sm text-gray-500 font-medium capitalize">
                      {cardDetails.category}
                    </h3>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">
                      {cardDetails.title}
                    </h2>
                    <p className="text-sm text-gray-600 capitalize">
                      {cardDetails.landmark}, {cardDetails.city}
                    </p>
                    <div className="flex items-center justify-start gap-[5px] mt-1 text-sm font-semibold">
                      <FaStar className="text-[#ef4444]" />
                      {cardDetails.ratings}
                    </div>
                  </div>
                </div>
                <div className="w-[100%] flex justify-start items-start gap-[15px] flex-col pt-2">
               
                <h3 className="text-xl font-bold text-gray-900 mb-2">Price details</h3>
                
                        <div className="w-[100%] flex justify-between items-center text-gray-700">
                          <span className="font-medium">
                            ₹{cardDetails.rent} x {night} nights
                          </span>
                          <span className="font-medium">
                            ₹{cardDetails.rent * night}
                          </span>
                        </div>
                        
                        <div className="w-[100%] flex justify-between items-center text-gray-700">
                          <span className="font-medium underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-gray-900">
                            Taxes
                          </span>
                          <span className="font-medium">
                            ₹{cardDetails.rent * 7 / 100}
                          </span>
                        </div>
                        
                        <div className="w-[100%] flex justify-between items-center pb-[20px] border-b border-gray-200 text-gray-700">
                          <span className="font-medium underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-gray-900">
                            QuickStay service fee
                          </span>
                          <span className="font-medium">
                            ₹{cardDetails.rent * 7 / 100}
                          </span>
                        </div>
                        
                        <div className="w-[100%] flex justify-between items-center pt-[5px]">
                          <span className="font-extrabold text-gray-900">
                            Total (INR)
                          </span>
                          <span className="font-extrabold text-gray-900">
                            ₹{total}
                          </span>
                        </div>
                        
 </div>
</div>
              </div>
              }
              
        </div>
  )
}

export default ViewCard

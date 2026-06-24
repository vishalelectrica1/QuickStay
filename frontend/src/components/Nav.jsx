import React, { useState,useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdWhatshot } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { MdPool } from "react-icons/md";
import { MdOutlineHomeWork } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BsShopWindow } from "react-icons/bs";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
    import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../assets/context/AuthContext";
import { userDataContext } from "../assets/context/UserContext";
import { listingDataContext } from "../assets/context/ListingContext";
import { MdApartment } from "react-icons/md";
function Nav() {

    let [showpopup,setshowpopup] = useState(false);
    let navigate = useNavigate()
const { userData, setUserData } = useContext(userDataContext);
const { serverUrl } = useContext(authDataContext);
    let [cate,setCate] = useState();
    let { listingData, setListingData,newListData , setNewListData,searchData,setSearchData,handleSearch,handleViewCard } = useContext(listingDataContext);
    let [input,setInput] = useState("")

const handleLogOut = async () => {
  try {
    const result = await axios.post(
      serverUrl + "/api/auth/logout",
      { withCredentials: true }
      
    );
      setUserData(null)
      toast.success("LogOut Successfully");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};


const handleCategory = (category) => {
  setCate(category)
  if(category == "trending") setNewListData(listingData);
   else {
    setNewListData(listingData.filter((list) => list.category == category))
  }
}
const handleClick = (id) => {
  if (userData) {
    handleViewCard(id)
  } else {
    navigate("/login")
  }
}



useEffect(() => {
  handleSearch(input)
}, [input])



  return (
    <div className="fixed top-[0] bg-[white] z-[20]">
    <div className="w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[40px] flex relative items-center justify-between md:px-[60px] ">

      {/* Logo */}
      <div>
        <h1 className="font-montserrat text-2xl font-extrabold tracking-tighter cursor-pointer" onClick={() => navigate("/")}>
          <span className="text-[#ef4444]">Quick</span>
          <span className="text-black">Stay</span>
        </h1>
      </div>

      {/* Search */}
      <div className="w-[35%] relative hidden md:block ">
        <input
          type="text"
          placeholder="Any Where | Any Location | Any City"
          className="w-full px-[30px] py-[10px] border-[2px] border-[red] rounded-[30px] text-[17px] outline-none"onChange={(e) => setInput(e.target.value)} value = {input}
        />

        <button className="absolute right-[3%] top-[4px] p-[10px] rounded-[50%] bg-[red] text-white">
          <CiSearch className="w-[20px] h-[20px]" />
        </button>
      </div>

      {/* Right Section */}
            <div className="flex items-center justify-center gap-[10px] relative">
        <span className="text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[10px] py-[5px] hidden md:block" onClick={()=>navigate("/listingpage1")}>
            List your home
        </span>

        <button className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[red] rounded-[50px] hover:shadow-lg" onClick={()=>
            setshowpopup(prev=>!prev)
        }>
            <span>
              <GiHamburgerMenu className="w-[20px] h-[20px]" />
            </span>
           {userData == null &&  <span>
              <CgProfile className="w-[23px] h-[23px]" />
            </span>}
            {userData !== null && (
  <span className="w-[30px] h-[30px] bg-[red] text-white rounded-full flex items-center justify-center">
    {userData.name?.charAt(0).toUpperCase()}
  </span>
)}

        </button>

          {/* pop-Up */}   
            {showpopup && < div className="w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[5%] border-[1px] border-[#aaa9a9] z-10 rounded-lg md:right-[10%] ">
  <ul className="w-full h-full text-[17px] flex flex-col items-start justify-around px-[10px]">
    
   {!userData &&  <li className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer " onClick={()=>{ navigate("/login");setshowpopup(false)}
}>
      Login
    </li>}

   {userData && <li className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer" onClick={()=>{handleLogOut();setshowpopup(false)}}>
      Logout
    </li>}
               <div className="w-full h-[1px] bg-[#c1c0c0]"></div>

    <li className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer" onClick={()=>{navigate("/listingpage1");setshowpopup(false)}}>
      List your Home
    </li>

    <li className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer" onClick={()=>{setshowpopup(false);navigate("/mylisting")}}>
      My Listing
    </li>

    <li className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer" onClick={()=>{setshowpopup(false);navigate("/mybooking")}}>
      My Booking
    </li>

  </ul>
</div>}

        </div>
          {searchData?.length > 0 && (
        <div className="w-[100vw] h-[450px] flex flex-col gap-[20px] absolute top-[180%] md:top-[100%] overflow-auto left-[0] justify-start items-center">
          <div className="max-w-[700px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg border-[1px] border-[#a2a1a1] cursor-pointer">
            {searchData.map((search) => (
              <div className="border-b border-[black] p-[10px]" onClick={()=>handleClick(search._id)}>
                {search.title} in {search.landmark},{search.city}
              </div>
            ))}
          </div>
        </div>
      )}



        </div>
         
        {/* 2nd Navbar */}
 
                <div className="w-[100%] h-[60px] flex items-center justify-center pt-[5px] block md:hidden">
                  <div className="w-[50%] relative  ">
        <input
          type="text"
          placeholder="Any Where | Any Location | Any City"
          className="w-full px-[30px] py-[10px] border-[2px] border-[red] rounded-[30px] text-[17px] outline-none"onChange={(e) => setInput(e.target.value)} value = {input}
        />

        <button className="absolute right-[3%] top-[4px] p-[10px] rounded-[50%] bg-[red] text-white">
          <CiSearch className="w-[20px] h-[20px]" />
        </button>
      </div>
                </div>


            <div className="w-[100vw] h-[85px] bg-white flex items-center justify-start md:justify-center cursor-pointer gap-[15px] overflow-auto px-[10px]">
  <div className='flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]' onClick={()=>{handleCategory("trending");setCate("")}}>
    <MdWhatshot className="w-[30px] h-[30px] text-black" />
    <h3>Trending</h3>
  </div>

  <div className={'flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "villa"?"border-b-[1px] border-[#a6a5a5]":""}'} onClick={()=>handleCategory("Villa")}>
    <MdApartment className="w-[30px] h-[30px] text-black" />
    <h3>Villa</h3>
  </div>


  <div className={'flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "farmHouse"?"border-b-[1px] border-[#a6a5a5]":""}'} onClick={()=>handleCategory("FarmHouse")}>
    <FaTreeCity className="w-[30px] h-[30px] text-black" />
    <h3>Farm House</h3>
  </div>


  <div className={'flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "PoolHouse"?"border-b-[1px] border-[#a6a5a5]":""}'} onClick={()=>handleCategory("PoolHouse")}>
    <MdPool className="w-[30px] h-[30px] text-black" />
    <h3>Pool House</h3>
  </div>

  <div className={'flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "rooms"?"border-b-[1px] border-[#a6a5a5]":""}'} onClick={()=>handleCategory("Rooms")}>
    <MdBedroomParent className="w-[30px] h-[30px] text-black" />
    <h3>Rooms</h3>
  </div>

  <div className={'flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "flat"?"border-b-[1px] border-[#a6a5a5]":""}'} onClick={()=>handleCategory("Flat")}>
    <MdOutlineHomeWork className="w-[30px] h-[30px] text-black" />
    <h3>Flat</h3>
  </div>

      <div className={'flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "PG"?"border-b-[1px] border-[#a6a5a5]":""}'} onClick={()=>handleCategory("PG")}>
    <IoBedOutline className="w-[30px] h-[30px] text-black" />
        <h3>PG</h3>
        </div>

  <div className={'flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "cabin"?"border-b-[1px] border-[#a6a5a5]":""}'} onClick={()=>handleCategory("Cabin")}>
    <SiHomeassistantcommunitystore className="w-[30px] h-[30px] text-black" />
    <h3>Cabin</h3>
  </div>

  <div className={'flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${cate == "shops"?"border-b-[1px] border-[#a6a5a5]":""}'} onClick={()=>handleCategory("Shops")}>
    <BsShopWindow className="w-[30px] h-[30px] text-black" />
    <h3>Shops</h3>
  </div>
</div>
    </div>


   

  );
}

export default Nav;







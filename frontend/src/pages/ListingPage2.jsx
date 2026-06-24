import {React} from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GiFamilyHouse } from "react-icons/gi";
import {listingDataContext} from "../assets/context/ListingContext.jsx";
import { useContext } from "react";
function ListingPage2() {
  let navigate = useNavigate();
  let { category, setCategory } = useContext(listingDataContext);


  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto">
      
      {/* Back Button */}
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate("/listingpage1")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-white" />
      </div>

      {/* Set Category Button */}
      <div className="w-[200px] h-[50px] text-[20px] bg-[#ff4242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
        Set Your Category
      </div>

      {/* Main Content */}
      <div className="max-w-[900px] w-[100%] h-[550px] overflow-auto bg-white flex items-center justify-start flex-col gap-[40px] mt-[30px]">
        
        <h1 className="text-[18px] text-black md:text-[30px]">
          Which of these best describes your place?
        </h1>

        <div className="max-w-[900px] w-[100%] h-[100%] flex flex-wrap items-center justify-center gap-[15px] md:w-[70%]">
          
               <div
              className={`w-[180px] h-[100px] flex justify-center items-center flex-col
              cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${
                category === "villa" ? "border-3 border-[#8b8b8b]" : ""
              }`}
              onClick={() => setCategory("Villa")}
            >
              <GiFamilyHouse className="w-[30px] h-[30px] text-[black]" />
              <h3>Villa</h3>
            </div>

            <div
              className={`w-[180px] h-[100px] flex justify-center items-center flex-col
              cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${
                category === "FarmHouse" ? "border-3 border-[#8b8b8b]" : ""
              }`}
              onClick={() => setCategory("FarmHouse")}
            >
              <GiFamilyHouse className="w-[30px] h-[30px] text-[black]" />
              <h3>Farm House</h3>
            </div>

            <div
              className={`w-[180px] h-[100px] flex justify-center items-center flex-col
              cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${
                category === "PoolHouse" ? "border-3 border-[#8b8b8b]" : ""
              }`}
              onClick={() => setCategory("PoolHouse")}
            >
              <GiFamilyHouse className="w-[30px] h-[30px] text-[black]" />
              <h3>Pool House</h3>
            </div>

            <div
              className={`w-[180px] h-[100px] flex justify-center items-center flex-col
              cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${
                category === "Rooms" ? "border-3 border-[#8b8b8b]" : ""
              }`}
              onClick={() => setCategory("Rooms")}
            >
              <GiFamilyHouse className="w-[30px] h-[30px] text-[black]" />
              <h3>Rooms</h3>
            </div>

            <div
              className={`w-[180px] h-[100px] flex justify-center items-center flex-col
              cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${
                category === "Flat" ? "border-3 border-[#8b8b8b]" : ""
              }`}
              onClick={() => setCategory("Flat")}
            >
              <GiFamilyHouse className="w-[30px] h-[30px] text-[black]" />
              <h3>Flat</h3>
            </div>

            <div
              className={`w-[180px] h-[100px] flex justify-center items-center flex-col
              cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${
                category === "PG" ? "border-3 border-[#8b8b8b]" : ""
              }`}
              onClick={() => setCategory("PG")}
            >
              <GiFamilyHouse className="w-[30px] h-[30px] text-[black]" />
              <h3>PG</h3>
            </div>

            <div
              className={`w-[180px] h-[100px] flex justify-center items-center flex-col
              cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${
                category === "Cabin" ? "border-3 border-[#8b8b8b]" : ""
              }`}
              onClick={() => setCategory("Cabin")}
            >
              <GiFamilyHouse className="w-[30px] h-[30px] text-[black]" />
              <h3>Cabin</h3>
            </div>

            <div
              className={`w-[180px] h-[100px] flex justify-center items-center flex-col
              cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${
                category === "Shops" ? "border-3 border-[#8b8b8b]" : ""
              }`}
              onClick={() => setCategory("Shops")}
            >
              <GiFamilyHouse className="w-[30px] h-[30px] text-[black]" />
              <h3>Shops</h3>
              </div>

        </div>

        {/* Next Button */}
        <button className="px-[50px] py-[10px] bg-[red] text-white text-[18px] md:px-[100px] rounded-lg absolute right-[10%] bottom-[10%]" onClick={()=>navigate("/listingpage3")} disabled = {!category}>
          Next
        </button>

      </div>
    </div>
  );
}

export default ListingPage2;

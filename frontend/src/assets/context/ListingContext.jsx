import React, { createContext, useState, useContext,useEffect } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


export const listingDataContext = createContext();

function ListingContext({ children }) {
 let navigate = useNavigate();
  // ---------- Form States ----------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [frontEndImage1, setFrontEndImage1] = useState(null);
  const [frontEndImage2, setFrontEndImage2] = useState(null);
  const [frontEndImage3, setFrontEndImage3] = useState(null);

  const [backEndImage1, setBackEndImage1] = useState(null);
  const [backEndImage2, setBackEndImage2] = useState(null);
  const [backEndImage3, setBackEndImage3] = useState(null);

  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [category, setCategory] = useState("");
  const [listingData, setListingData] = useState([]);
  const [newListData, setNewListData] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
   const [cardDetails,setCardDetails] = useState(null);
    let [searchData,setSearchData] = useState([])
  // ---------- Server URL ----------
  const { serverUrl } = useContext(authDataContext);

  // ---------- Add Listing ----------
  const handleAddListing = async () => {
    setAdding(true);
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

                const result = await axios.post(
            `${serverUrl}/api/listing/add`,
            formData,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          setAdding(false);
          toast.success("Listing Added Successfully ")
      console.log(result);
      navigate("/");
      setTitle("")
      setDescription("")
      setFrontEndImage1(null)
      setFrontEndImage2(null)
      setFrontEndImage3(null)
      setBackEndImage1(null)
      setBackEndImage2(null)
      setBackEndImage3(null)
      setRent("")
      setCity("")
      setLandmark("")
      setCategory("")


    } catch (error) {
      setAdding(false);
      toast.error(error.response.data.message)
      console.log(error);
    }
  };


      const handleSearch = async (input) => {
      try {
        let result = await axios.get(
          serverUrl + `/api/listing/search?query=${input}`,{withCredentials: true,}
        )
        setSearchData(result.data)
      } catch (error) {
        setSearchData(null)
        console.log(error)
      }
    }






         const getListing = async () => {
        try {
          let result = await axios.get(
            serverUrl + "/api/listing/get",
            { withCredentials: true }
          );
          setListingData(result.data);
          setNewListData(result.data);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
      getListing();
    }, [adding,updating,deleting]);



      const handleViewCard = async (id) => {
        try {
    let result = await axios.get(
      serverUrl + `/api/listing/findlistingByid/${id}`,
      { withCredentials: true }
    )

    console.log(result)
    setCardDetails(result.data);
    navigate("/viewcard");
  } catch (error) {
    console.log(error)
  }
}






  // ---------- Context Value ----------
  const value = {
    title, setTitle,
    description, setDescription,

    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,

    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,

    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
      adding,setAdding,
    handleAddListing,
    listingData, setListingData,
    newListData,setNewListData,
    handleViewCard,
    cardDetails,setCardDetails,
    updating, setUpdating ,
    deleting, setDeleting,
    getListing,handleSearch,searchData,setSearchData
  };

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
}

export default ListingContext;

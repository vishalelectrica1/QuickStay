import React, { useState,useContext } from 'react'
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../assets/context/AuthContext";
import { userDataContext } from "../assets/context/UserContext";
import { toast } from 'react-toastify';

function SignUp() {
  let [show,setshow] = useState(false)
  let navigate = useNavigate()
const { userData, setUserData } = useContext(userDataContext);
    const { serverUrl } = useContext(authDataContext);
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useContext(authDataContext);

const handleSignUp= async (e) => {
  setLoading(true);
  try {
    e.preventDefault();

    let result = await axios.post(
      serverUrl + "/api/auth/signup",
      {
        name,
        email,
        password
      }, {withCredentials:true}
    );
    setLoading(false);
    toast.success("Signup Successfully")
    setUserData(result.data);
          navigate("/");
    console.log(result);
  } catch (error) {
    setLoading(false);
     toast.error("Signup Failed")
    console.log(error);
  }
};

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">
      <div
  className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center"
  onClick={() => navigate("/")}
>
  <FaLongArrowAltLeft className="w-[25px] h-[25px] text-[white]" />
</div>

      <form
        action=""
        className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]" onSubmit={handleSignUp}
      >
        <h1 className="text-[30px] text-[black]">
          Welcome to <span className="font-extrabold tracking-tighter"><span className="text-[#ef4444]">Quick</span><span className="text-black">Stay</span></span>
        </h1>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[10px]">
          <label htmlFor="name" className='text-[20px]'>UserName</label>
          <input type="text" id="name"className='w-[90%] h-[40px] border-[2px] border-[black] rounded-lg px-[7px] text-[18px]' required onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="email" className='text-[20px]'>Email</label>
          <input type="text" id="email" className='w-[90%] h-[40px] border-[2px] border-[black] rounded-lg px-[7px] text[18px]' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>
         
          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative">
          <label htmlFor="password" className='text-[20px]'>Password</label>
          <input type={show?"text":"password"} id="password" className='w-[90%] h-[40px] border-[2px] border-[black] rounded-lg px-[7px] text[18px]'required onChange={(e)=>setPassword(e.target.value)} value={password}/>
          {!show && <FiEye  className = 'w-[22px] h-[25px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=>setshow(prev=> !prev)}/>}
          {show && <IoMdEyeOff className = 'w-[22px] h-[25px] absolute right-[12%] bottom-[10px] cursor-pointer'  onClick={()=>setshow(prev=> !prev)}/>}
          </div>
              <button className='text-[30px] border-[3px] px-[10px] py-[10px] border-[white] bg-[red] text-[white] rounded-lg md:px-[100px] mt-[20px]' disabled = {loading}>{loading? "loading...":"Sign Up"}</button>
            <p className='text-[15px]'>Already have a account? <span className='text-[18px] cursor-pointer text-[red]' onClick={()=>navigate("/login")}>Login</span></p>
      </form>
    </div>
  )
}

export default SignUp


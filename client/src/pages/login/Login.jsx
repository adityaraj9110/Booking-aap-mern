import axios from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../components/hookes/useAuth";
// import { AuthContext } from "../../context/AuthContext";

import "./login.css";


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  // const dispatch=useDispatch();
  // const {loading , error} =useSelector((state)=>state.auth)
  const { loading, error, dispatch } = useAuth()

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    // dispatch(authAction.loginStart())
    try {
      const res = await axios.post("https://travel-made-easy.herokuapp.com/auth/login", credentials);
      const user=res.data.details
      
      if(user){
        dispatch({ type: "LOGIN_SUCCESS", payload: user })
        // localStorage.setItem("User", JSON.stringify(user))
        // dispatch(authAction.loginSuccess(user))
     
        console.log(user)
        navigate("/")
      }else{
        dispatch({ type: "LOGIN_FAILURE", payload: "username or password is incorrect !!" });
        // dispatch(authAction.loginFailure("username or password!"))
        
      }
    
    } catch (err) {
     console.log(err)
      
    }
  };


  


  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button  disabled={loading} onClick={handleClick} className="lButton">
        
          Login
        </button>
        {error || null && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
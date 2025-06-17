import axios from "axios";
import React,{ createContext, useContext, useState,useEffect, useCallback,useRef} from "react";


const AuthContext= createContext();
const API = axios.create({baseURL:import.meta.env.VITE_BACKEND_URL , withCredentials:true})

export const AuthProvider = ({children}) => {
 const [isAuthInitialized,setIsAuthInitialized]=useState(false);
 const [accessToken,setAccessToken]=useState(null)
 const [texts,setTexts]=useState([]);

  

 const accessTokenRef = useRef(accessToken);

 useEffect(() => {
     accessTokenRef.current = accessToken;
 }, [accessToken]);
 

 API.interceptors.request.use((req) => {
  const token = accessTokenRef.current; // Always gets the latest token
  if (token) {
      req.headers.Authorization = `Bearer ${token}`;
  } else {
      console.log("No Access Token");
  }
  return req;
});

API.interceptors.response.use(
    (res)=>res,
          async(error)=>{
            if(error.response.status===403 && error.config.url!=="/refresh-token" ){
                const { data } = await API.post("/refresh-token", {}, { withCredentials: true });
                setAccessToken(data.accessToken)
                if(accessToken){
                  error.config.headers.Authorization=`Bearer ${accessToken}`;
                }else{
                        console.log("access token is invalid");
                }

                return axios(error.config)
            }

            return Promise.reject(error)
          }
)

const signup=async(formData)=>{
     await API.post('/signup',formData)
     console.log("signed up successfully");
}

  useEffect(() => {
    const initialFetch = async () => {
          await fetchText()
    };

    initialFetch()
  }, [accessToken]);


  const login = async (formData) => {
    console.log(formData);
    console.log("start",accessToken);
    
    try {
      const { data } = await API.post("/login", formData);
       await setAccessToken(data.accessToken);

      console.log("end ",accessToken);
      
      setTexts([]); // ✅ Clear old data immediately
      console.log("Logged in successfully");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };



const logout = async () => {
    try {
      await API.post("/logout");
    } catch (error) {
      console.error("❌ Logout Failed", error);
    }
    setAccessToken(null);
    setIsAuthInitialized(false)
  };

  useEffect(() => {
    if (accessToken === null) {
      console.log("User has logged out, accessToken is null.");
      // You can also redirect or clear other states here
    }
  }, [accessToken]);


const fetchText= useCallback(async()=>{
if(!accessToken) return;


try {
    const {data} = await API.get('/gettext')
    setTexts(data.texts)
    
} catch (error) {
    console.log("error fetching texts",error);
    
}
},[accessToken])


const addText=async(text)=>{
   
   if(!accessToken) return 
   await API.post('/addText',{text})
   setTexts(prev=>[...prev,text]);
}


    const AuthInitialize = async () => {
      try {
        const { data } = await API.post("/refresh-token"); // Attempt to refresh token
        setAccessToken(data.accessToken);
        console.log("✅ Access token refreshed:", data.accessToken);
        setIsAuthInitialized(true);
      } catch (error) {
        console.error("⚠ No refresh token available, skipping refresh");
        setIsAuthInitialized(false); // Prevents unauthorized refresh attempts
      }
    };
  
 
  


  return (
<AuthContext.Provider value={{isAuthInitialized,AuthInitialize , signup , login , logout,fetchText,addText,texts,accessToken}} >
    {children}
</AuthContext.Provider>
  )

}
export const useAuth = () => useContext(AuthContext);

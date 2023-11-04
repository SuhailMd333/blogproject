import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import service from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import {Header,Footer} from "./components/index"
import { Outlet } from "react-router-dom"
const App = () => {

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  
console.log(service)
  useEffect(() => {
     
    service.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      
      } else{
        dispatch(logout())
      }
    })
    .catch((e) => console.log(e,"suhail"))
    .finally(() => {
      setLoading(false)
      console.log("finally")
    })
    

  },[])


  return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
  <div className='w-full block'>

<Header/>
<main>
  <Outlet/>
  Hello
</main>
<Footer/>

    </div>
    </div>
 ) : <div>Loading...</div>
  }
export default App

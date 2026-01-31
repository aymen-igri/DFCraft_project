import { useContext, useEffect } from "react"
import UrlContext from "../context/urlContext";
import { browserAPI } from "../utils/browserAPI";


const useSaveUrl =()=>{

      const { urlElements, setUrlElement } = useContext(UrlContext)
      useEffect(()=>{
           
            async function saveUrl(){
                await browserAPI.storage.local.set({ urls: urlElements });
            }
    
            saveUrl()
    
        },[urlElements])
      
    return { urlElements, setUrlElement }
}


export default  useSaveUrl
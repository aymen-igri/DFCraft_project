import { useContext, useEffect, useState } from "react"
import UrlContext from "../context/urlContext";
import { browserAPI } from "../utils/browserAPI";



const useSaveUrl =()=>{

      console.log("useSaveUrl")
      const { urlElements, setUrlElement } = useContext(UrlContext)
      useEffect(()=>{
           
            async function saveUrl(){
                console.log("urlElements", urlElements)
                const response = await browserAPI.storage.local.set({ urls: urlElements });
                console.log("response", response)
            }
    
            saveUrl()
    
        },[urlElements])
      
    return { urlElements, setUrlElement }
}


export default  useSaveUrl
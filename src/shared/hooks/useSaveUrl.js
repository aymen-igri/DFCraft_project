import { useContext, useEffect, useState } from "react"
import UrlContext from "../context/urlContext";
import { browserAPI } from "../utils/browserAPI";



async function testLocalStorage() {
  try {
     const  saved  =  await browserAPI.storage.local.get("urls");
     console.log('browserApi' , browserAPI)
     console.log("Saved", saved )
  } catch (error) {
    console.error("Error:", error); 
  }
}



const useSaveUrl =()=>{
        testLocalStorage();
      console.log("useSaveUrl")
      const { urlElements, setUrlElement } = useContext(UrlContext)
      useEffect(()=>{
           
            async function saveUrl(){
                console.log("urlElements", urlElements)
                if(!urlElements.length){
                  await browserAPI.storage.local.set({ urls: [] });
                  return 
                }
                await browserAPI.storage.local.set({ urls: urlElements });
            }
    
            saveUrl()

        },[urlElements])

      
    return { urlElements, setUrlElement }
}


export default  useSaveUrl
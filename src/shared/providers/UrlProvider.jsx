
    import UrlContext from "../context/urlContext";
    import { useState } from "react";
    import { browserAPI } from "../utils/browserAPI";


    export const UrlProvider = ({children})=>{
        
        const [urlElements, setUrlElement] = useState(async()=>{
            const saved = await browserAPI.storage.local.get("urls")   ;
            console.log("saved", saved)
            console.log("json" , saved ? JSON.parse(saved):[] )
            return saved ? JSON.parse(saved) :[]
        });




        return(
            <>
                <UrlContext.Provider value={{urlElements , setUrlElement}}>
                    {children}
                </UrlContext.Provider>
            </>
        )
    }
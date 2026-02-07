import { useState } from "react";
import InputAddUrl from "../../components/Input/InputAddUrl";
import UrlList from "../../components/List/UrlList";
import SelectUrlState from "../../components/MultiSelect/SelectUrlState";
import {Shield} from "lucide-react" ;  
import { X } from "lucide-react";
import useSaveUrl from "../../shared/hooks/useSaveUrl";

const DistractionBlockingPage = () => {
   const [showDialog, setShowDialog] = useState(false);
   const [showAddInput, setShowAddInput] = useState(false);

    const {urlElements , setUrlElement} = useSaveUrl()

  
    
    return (
        <div className="min-h-[100%]  relative overflow-hidden   dark:bg-dark  bg-light p-2 pl-4">
            <header className="flex justify-center  items-center p-4 ">
               <Shield size={70} className="dark:text-darkFontText text-lightFontText"  />  
            </header>
            <div className="flex flex-col   justify-center items-center">
                <h1 className="text-3xl text-lightFontText dark:text-darkFontText   ">
                    Web Distraction Blocking
                </h1>
                <div className="flex gap-1 items-center  w-[85%]  justify-center">
                    <div className="w-1/2 ">
                        <SelectUrlState setElements={setUrlElement} />
                    </div>
                </div>
                 
            </div>
            <section className="p-4  rounded-xl text-darkFontText dark:text-black mt-3 dark:text-lightFontTextmt-3 dark:bg-darkBar bg-[#7C3AED] z-10">
                <header 
                onClick={() => setShowAddInput(false)} 
                  className="w-full relative h-auto overflow-hidden">
                    <div className="w-full h-[45px] " >
                        <div className={`w-full absolute z-1 ${showAddInput ? "bottom-0" : "bottom-[-50px]"} transition-all duration-300 ease-in-out `}>
                            <InputAddUrl elements={urlElements} setElement={setUrlElement} setShowAddInput={setShowAddInput}/>
                        </div>
                        <span 
                        onClick={(e) =>{ 
                            e.stopPropagation(); 
                            setShowAddInput(true)
                        }} 
                        className="w-[30px] h-[30px] bg-[#A855F7] rounded-full flex items-center justify-center cursor-pointer ml-auto ">
                            <X size={20} />
                        </span>
                    </div>
                </header>


                <UrlList urlElements={urlElements} setUrlElements={setUrlElement} />
            </section>

            <div className="absolute h-[50%] w-[50%]  bottom-[-25%] left-[50%]  blur-[50px]     dark:bg-darkElements bg-[#A855F7] z-[-1]">
            </div>
        </div>
    );
};



export default DistractionBlockingPage;

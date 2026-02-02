import { CircleCheckBigIcon, Flag } from "lucide-react";
import List from "./List";
import { use, useState , useEffect } from "react";
import { ChevronDown } from "lucide-react";

const UrlList = ({ urlElements, setUrlElements }) => {
    if (urlElements.length === 0)
        return (<div className="text-center p-4">Aucun url est définie</div>);
    return (
        <div className="my-4">
            <List ItemComponent={UrlItem} items={urlElements} setItems={setUrlElements} />
        </div>
    );
};




function UrlItem({ element, setElements }) {

    const [selected, setSelected] = useState("");

    function handleChange (value ){
        setSelected(value);
    }
    useEffect(() => {
        if(selected === "sownd"){
            handleChangeSownd(element);
        }if(selected === "acces"){
            handleChangeBlocked(element);
        }if(selected === "both"){
             handleChangeBlocked(element);
             handleChangeSownd(element);
        }if(selected === "none"){
            handleChangeNone(element)
        }
    }, [selected])
    function handleChangeSownd(url) {
        setElements((prv) =>
            prv.map(item => item.url === url ? { ...item, sowndBlocked: true } : item)
        );
    }
    function handleChangeBlocked(url) {
        setElements((prv) =>
            prv.map(item => item.url === url ? { ...item, urlBlocked: true } : item)
        );
    }
    function handleChangeNone(url) {
        setElements((prv) =>
            prv.map(item => item.url === url ? { ...item, urlBlocked: false , sowndBlocked: false } : item)
        );
    }
    return (
        <div className="flex flex-col w-full justify-center items-center space-x-4 p-2  ">
             <div className="flex w-full items-center justify-between p-2 ">

            <div className="flex ">
                <span className="  dark:text-[#000000b3] text-[#ffffffcc]">Url : </span>
                <span className="flex-1">{element.url}</span>
            </div>
            

            <MultiSelect urlElement={element} setUrlElement={setElements}/>
        </div>
        <Separator />

        </div>
       
    );
}


function MultiSelect({urlElement, setUrlElement}){
    
    const [clicked , setClicked] = useState(false);
    const [selected, setSelected] = useState("none");

      function handleChangeSownd(url) {
        setUrlElement((prv) =>
            prv.map(item => item.url === url ? { ...item, sowndBlocked: true } : item)
        );
        setClicked(false)
    }
    function handleChangeBlocked(url) {
        setUrlElement((prv) =>
            prv.map(item => item.url === url ? { ...item, urlBlocked: true } : item)
        );
        setClicked(false)
    }

    function handleChangeNone(url) {
        setUrlElement((prv) =>
            prv.map(item => item.url === url ? { ...item, urlBlocked: false , sowndBlocked: false } : item)
        );
        setClicked(false)
    }

    useEffect(() => {
        if(selected === "sownd"){
            handleChangeSownd(urlElement.url);
        }if(selected === "acces"){
            handleChangeBlocked(urlElement.url);
        }if(selected === "both"){
             handleChangeBlocked(urlElement.url);
             handleChangeSownd(urlElement.url);
        }if(selected === "none"){
            handleChangeNone(urlElement.url)
        }
    }, [selected])

    
    const handleOnClick = ( ) =>{
        setClicked(!clicked);
    }
    return(
        <div className="relative flex justify-center items-center  text-black   ">
            {
                (urlElement.sowndBlocked || urlElement.urlBlocked) ?
                    (<span className={` transform ${clicked ? 'rotate-180' : 'rotate-0'} transition-transform p-[3px] rounded-lg dark:bg-darkElements bg-[#C282FF]  duration-300`}
                        onClick={handleOnClick}
                    >{(urlElement.sowndBlocked && urlElement.urlBlocked) ? "Both" : (urlElement.sowndBlocked ? "Sownd" : "Acces")}</span>)
                    :
                     <span className={` transform ${clicked ? 'rotate-180' : 'rotate-0'} transition-transform duration-300    rounded-xl `}
            onClick={handleOnClick}
                ><ChevronDown /></span>
                    
            }
           
            <div className={ `${clicked ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'} transition-all duration-300 ease-in-out origin-top flex  dark:bg-darkElements rounded-xl bg-[#C282FF]  p-2 flex-col top-0 left-0 z-10  w-[45px] justify-center items-center absolute`}>
                <div className={`w-full  flex justify-start items-center transform transition-transform duration-300 ${clicked ? 'rotate-180' : 'rotate-0'}`}
                onClick={handleOnClick} >
                    <ChevronDown />
                </div>
                <div 
                onClick={() => setSelected("sownd")}
                className="w-full">Sownd</div>
                <div className="w-full"
                onClick={() => setSelected("acces")}
                >Acces</div>
                <div  
                onClick={() => setSelected("both")}  
                 className="w-full">Both</div>
                <div 
                onClick={() => setSelected("none")}
                 className="w-full">None</div>
            </div>
        </div>
    )
}

function Separator() {
    return (
        <div className="w-[100%] my-2 bg-white  dark:bg-black h-[2px] rounded-sm ml-0 m-0 ">
            
        </div>
    );
}
export default UrlList;
import {  use, useEffect, useRef, useState } from "react";
import InputAdd from "./InputAdd";

const InputAddUrl = ({ elements, setElement , setShowAddInput , showAddInput }) => {
    const [value, setValue] = useState("");
    function addElement(value) {
        const existe = elements.some((el) => el.url === value);
        if (!existe) {
            setElement((prv) => [
                ...prv,
                {
                    url: value,
                    sowndBlocked: false,
                    urlBlocked: false
                }
            ]);
            setValue("");
        }
    }

    

    function handleBlur() {
        setShowAddInput(false);
    }

    return (
        <div className="my-4 w-[100%]">
            <input
                value={value}
                onClick={(e)=> e.stopPropagation()}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        console.log("Le key est Enter est presse");
                        addElement(value);
                    }
                }}
                onBlur={handleBlur}
                placeholder="Add url"
                className=" p-2 rounded-xl w-[100%] focus:outline-none border-[3px]  border-blue-300 dark:border-none  "
            />
        </div>
    );
};

export default InputAddUrl;
import { useEffect, useState } from "react";

const InputAdd = ({ value, setValue, addElement }) => {
    return (
        <input 
             value={value}
             onChange={(e) => setValue(e.target.value)}
             onKeyDown={(e) => {
                if(e.key === "Enter"){
                    console.log("Le key est Enter est presse");
                    addElement(value);
                }
             }}
             placeholder="Add url"
             className=" p-2 rounded-xl w-[100%] focus:outline-none border-[3px]  border-blue-300 dark:border-none  "
        />
    );
};

export default InputAdd;

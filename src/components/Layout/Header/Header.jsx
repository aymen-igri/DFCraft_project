import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { browserAPI } from "../../../shared/utils/browserAPI";

export default function Header({ setChoosenPage }) {
  const [showMenu, setShowMenu] = useState(false);
  const [urlLogo, setUrlLogo] = useState("");

  useEffect(() => {
    try {
      // utilisation sûre de browserAPI
      if (browserAPI && browserAPI.runtime && browserAPI.runtime.getURL) {
        setUrlLogo(browserAPI.runtime.getURL("icons/icon-16.png"));
        console.log("Extension API is available");
      } else {
        setUrlLogo("/icons/icon-16.png"); // fallback dev/local
      }
    } catch (error) {
      console.error("Extension API not available:", error);
      setUrlLogo("/icons/icon-16.png");
    }
  }, []);

  const toggleMenu = () => (
    showMenu && (
      <div className="absolute p-2 bg-gray-400 top-10 right-2 rounded-sm">
        <p onClick={() => setChoosenPage("home")}>Home</p>
        <p onClick={() => setChoosenPage("todo")}>Todo list</p>
        <p onClick={() => setChoosenPage("sounds")}>Sounds</p>
        <p onClick={() => setChoosenPage("tracking")}>Tracking</p>
        <p onClick={() => setChoosenPage("distractionBlocking")}>Distraction blocking</p>
        <p onClick={() => setChoosenPage("settings")}>Settings</p>
      </div>
    )
  );

  return (
    <header className="p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={urlLogo} alt="Logo" className="w-[15px] h-auto mr-1" />
          <h3>DFCraft</h3>
        </div>
        <Menu color="black" onClick={() => setShowMenu(!showMenu)} />
      </div>
      {toggleMenu()}
    </header>
  );
}

import { useEffect, useState } from "react";
import { CirclePlay, LoaderCircle, CirclePause } from "lucide-react";
import useBackgroundAudio from "../../shared/hooks/useBackgroundAudio";
import { useSettings } from "../../shared/context/SettingsContext";
import { useSoundData } from "../../shared/context/SoundDataContext";

export default function EasySoundPlayer() {
  const [sound, setSound] = useState(null);
  const { settings } = useSettings();
  const { currentSound, buffering, loading, isPlaying, play, pause } =
    useBackgroundAudio();
  const { sounds } = useSoundData();

  useEffect(() => {
    if (!sounds || sounds.length === 0) return;

    if (currentSound) {
      const normalizeUrl = (url) => {
        if (!url) return "";
        return url.split("/").pop() || url;
      };

      const currentFile = normalizeUrl(currentSound);
      const playingSound = sounds.find((s) => {
        const soundFile = normalizeUrl(s.file);
        return soundFile === currentFile;
      });

      if (playingSound) {
        setSound(playingSound);
      }
    }
  }, [currentSound, sounds]);

  const togglePlay = () => {
    if (isPlaying && currentSound && sound && sound.file === currentSound) {
      pause();
    } else {
      play(sound.file);
    }
  };

  const soundplayicon = () => {
    return loading || buffering ? (
      <LoaderCircle className="animate-spin w-10 h-10 text-light dark:text-dark" />
    ) : isPlaying ? (
      <CirclePause className="w-10 h-10 text-light dark:text-dark" />
    ) : (
      <CirclePlay className="w-10 h-10 text-light dark:text-dark" />
    );
  };

  if (!sound) return null;

  return (
    <div className="bg-lightElements dark:bg-darkElements px-6 py-3 my-5 mx-14 rounded-3xl transition-all duration-300 ease-in-out overflow-hidden">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center">
          <img
            src={sound?.coverImage}
            className={`w-10 h-10 rounded-lg ${settings.language === "ar" ? "ml-2" : "mr-2"}`}
          />
          <div className="mb-1">
            <div className="text-light dark:text-dark text-lg">
              {sound.title.length > 14
                ? sound.title.slice(0, 14) + "..."
                : sound.title}
            </div>
            <div className="text-gray-300 dark:text-gray-800 text-xs">
              {sound.author}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <button disabled={buffering} onClick={togglePlay}>
            {soundplayicon()}
          </button>
        </div>
      </div>
    </div>
  );
}

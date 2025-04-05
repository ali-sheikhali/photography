import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import music from "../../assets/music.mp3";
export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const audio = audioRef.current;
    if (!progressBar || !audio) return;

    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl px-5 py-3">
      {/* Audio Controls */}
      <div className="flex items-center flex-row-reverse gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-black"
        >
          {isPlaying ? (
            <Pause size={16} />
          ) : (
            <Play size={16} className="ml-0.5" />
          )}
        </button>

        {/* Current Time */}
        <div className="text-white text-sm min-w-[40px]">
          {formatTime(currentTime)}
        </div>

        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleProgressChange}
          className="relative flex-1 h-1 bg-[#FAFAFA80] rounded-full cursor-pointer overflow-hidden"
        >
          <div
            className="h-full bg-[#247D7B] rounded-full absolute left-0"
            style={{ right: `${100 - (currentTime / duration) * 100}%` }}
          />
        </div>
        {/* Duration */}
        <div className="text-white text-sm min-w-[40px] text-right">
          {formatTime(duration)}
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        autoPlay
        loop
        src={music}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}

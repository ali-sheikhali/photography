import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

import music0 from "../../assets/music/music1.mp3";
import music1 from "../../assets/music/music2.mp3";
import music2 from "../../assets/music/music3.mp3";
import music3 from "../../assets/music/music4.mp3";
import music4 from "../../assets/music/music5.mp3";

const playlist = [music0, music1, music2, music3, music4];

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
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
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
  
    const handleInteraction = () => {
      // اگر هنوز داره پخش می‌شه ولی mute هست، unmute کن
      if (!audio.paused && audio.muted) {
        audio.muted = false;
        setIsPlaying(true);
      }
  
      // اگر pause شده (و احتمالا مرورگر جلوشو گرفته)، دوباره play کن و unmute
      if (audio.paused) {
        audio.muted = false;
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn("Play failed:", err));
      }
  
      // فقط یک بار اجرا بشه
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  
    // تعاملاتی که تقریباً همیشه معتبر شناخته می‌شن
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("scroll", handleInteraction);
  
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, []);
  
 
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.warn("Play error:", err));
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

  const handleTrackEnd = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
    } else {
      setCurrentTrackIndex(0);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl px-5 py-3">
      <div className="flex items-center flex-row-reverse gap-3">
        <button
          onClick={togglePlayPause}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-black"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        <div className="text-white text-sm min-w-[40px]">
          {formatTime(currentTime)}
        </div>

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

        <div className="text-white text-sm min-w-[40px] text-right">
          {formatTime(duration)}
        </div>
      </div>

      <audio
        ref={audioRef}
        autoPlay
        muted
        src={playlist[currentTrackIndex]}
        onEnded={handleTrackEnd}
      />
    </div>
  );
}

'use client';

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, FastForward } from "lucide-react";
import videos from "./data/data";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(0.5);
  const [duration, setDuration] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);

  const currentVideo = videos[0];
 useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.volume = volume;
      setDuration(video.duration);

      video.ontimeupdate = () => {
        setCurrent(video.currentTime);
      };
    }
  }, []);

  const playPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  const mudarVolume = (value: number) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value;
    }
  };

  const mutar = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      mudarVolume(0);
    } else {
      mudarVolume(prevVolume);
    }
  };

  const configTime = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrent(value);
    }
  };

  const avanca10 = () => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  };

  const volta10 = () => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  };

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="bg-[#0f1316] flex items-center justify-center min-h-screen text-white p-4">
      <div className="bg-[#202830] w-full max-w-[500px] md:w-[40%] min-h-screen md:min-h-[600px] flex justify-center items-center">
        <div className="w-full px-4 flex flex-col items-center justify-center">

          <video
            ref={videoRef}
            src={currentVideo.url}
            preload="metadata"
            className="w-full"
          />

          <h1 className="text-white text-[16px] font-bold mt-4 text-center">
            {currentVideo.nome}
          </h1>

          <h3 className="text-gray-400 text-[12px] font-bold mt-1 text-center">
            {currentVideo.artista}
          </h3>

          <div className="w-full max-w-[350px] mt-4">
            <input
              type="range"
              min="0"
              max={duration}
              step="0.01"
              className="cursor-pointer w-full accent-[#ff302e]"
              value={current}
              onChange={(e) => configTime(Number(e.target.value))}
            />

            <div className="flex justify-between text-[12px] text-gray-400 mt-1">
              <span>{formatTime(current)}</span>
              <h3>{formatTime(duration)}</h3>
            </div>
          </div>

          <div className="flex items-center justify-between w-full max-w-[350px] mt-4">
            <button onClick={volta10}>
              <FastForward className="scale-x-[-1]" />
            </button>

            <button
              onClick={playPause}
              className="text-white w-[40px] h-[40px] rounded-full bg-[#ff302e] flex items-center justify-center"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>

            <button onClick={avanca10}>
              <FastForward />
            </button>
          </div>

          <div className="flex items-center justify-between w-full max-w-[350px] mt-4">
            <button onClick={mutar}>
              {volume === 0 ? <VolumeX /> : <Volume2 />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className="cursor-pointer w-[120px] accent-[#ff302e]"
              value={volume}
              onChange={(e) => mudarVolume(Number(e.target.value))}
            />

            <span className="text-gray-300">{Math.round(volume * 100)}%</span>
          </div>

        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '../ui/Button';

interface VideoCardProps {
  videos: string[];
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const VideoCard = ({ videos }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videos[currentVideo];
      if (isPlaying) {
        videoRef.current.play();
      }
    }
  }, [currentVideo]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const updateProgress = (timestamp: number) => {
    if (!videoRef.current || !isPlaying) return;

    if (timestamp - lastUpdateTimeRef.current >= 33) {
      const time = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;
      
      if (!isNaN(videoDuration) && videoDuration > 0) {
        setProgress((time / videoDuration) * 100);
        setCurrentTime(time);
      }
      
      lastUpdateTimeRef.current = timestamp;
    }

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [isPlaying]);

  const handleVideoEnd = () => {
    if (currentVideo < videos.length - 1) {
      setCurrentVideo(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const changeVideo = (index: number) => {
    setCurrentVideo(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      setCurrentTime(0);
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-[1200px] ml-20 relative flex-shrink-0 bg-white rounded-3xl overflow-hidden scrollbar-hide group">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          playsInline
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>
      </div>

      {/* Conteneur des contrôles avec animation */}
      <div className="absolute inset-0 flex items-end">
        <div 
          className=" w-full opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
        >
          <div className="flex gap-4 items-start w-full bg-gradient-to-t from-black/50 to-transparent p-8 rounded-lg">
            <div className="w-max">
              <Button
                onClick={togglePlay}
                className="rounded-full bg-white border-white hover:bg-white text-black h-10 flex items-center gap-2 px-3"
              >
                <span className="w-4 flex items-center justify-center">
                  {isPlaying ? 'II' : '▶'}
                </span>
                <span className="text-sm font-medium">
                  {formatTime(currentTime)}
                </span>
              </Button>
            </div>
            
            <div className="flex flex-col w-full gap-2 text-white/80">
              <span className="font-medium">Briefing Détails Video</span>
              <div className="flex w-full justify-between gap-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeVideo(index)}
                    className="relative h-2 flex-1 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10" />
                    <div
                      className="absolute inset-0 origin-left bg-white transition-all duration-300 ease-out"
                      style={{
                        transform: `scaleX(${
                          index === currentVideo
                            ? progress / 100
                            : index < currentVideo
                            ? 1
                            : 0
                        })`,
                        transition: index === currentVideo 
                          ? 'transform 100ms linear'
                          : 'transform 300ms ease-out'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VideoCarouselProps {
  videoGroups: string[][];
}

export const VideoCarousel = ({ videoGroups }: VideoCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className=" overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4"
      >
        {videoGroups.map((videos, index) => (
          <div key={index} className="snap-center">
            <VideoCard videos={videos} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCard;
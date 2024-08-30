import React, { useState, useEffect, useRef } from 'react';

function VideoPlayer({ videoSrc, onVideoUpload, subtitles, subtitleStyle }) {
  const videoRef = useRef(null);
  const [currentSubtitle, setCurrentSubtitle] = useState('');

  // Clean timing string to handle different line endings
  const cleanTiming = (timing) => {
    if (!timing) return '';
    return timing.trim().replace(/\r/g, ''); // Remove carriage return characters
  };

  // Convert time string to seconds
  const timeToSeconds = (time) => {
    if (!time || typeof time !== 'string') {
      console.error('Invalid time format:', time);
      return 0;
    }
    
    const [hours, minutes, secondsWithMs] = time.split(':');
    const [seconds, milliseconds] = secondsWithMs.split(',');
  
    return (
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseInt(seconds) +
      parseInt(milliseconds) / 1000
    );
  };
  

  useEffect(() => {
    const video = videoRef.current;
    console.log(subtitles);
  
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
  
      const activeSubtitle = subtitles.find((subtitle) => {
        const [start, end] = cleanTiming(subtitle.timing)
          .split(' --> ')
          .map(timeToSeconds);
  
        return currentTime >= start && currentTime <= end;
      });
  
      if (activeSubtitle) {
        setCurrentSubtitle(activeSubtitle.text.trim());
      } else {
        setCurrentSubtitle(''); // Clear subtitle when no match is found
      }
    };
  
    video.addEventListener('timeupdate', handleTimeUpdate);
  
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [subtitles]);
  

  return (
    <div className="relative w-full h-full">
      <video
        data-testid="video-element"
        id="videoPlayer"
        controls
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc || 'https://www.w3schools.com/html/mov_bbb.mp4'}
      >
        Your browser does not support the video tag.
      </video>
      {currentSubtitle && (
        <div
          className="absolute bottom-10 w-full text-center px-4"
          style={subtitleStyle}
        >
          {currentSubtitle}
        </div>
      )}
      <div className="absolute top-4 right-4">
        <input
          data-testid="video-upload"
          type="file"
          accept="video/*"
          onChange={onVideoUpload}
          className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    </div>
  );
}

export default VideoPlayer;

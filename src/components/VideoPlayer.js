// VideoPlayer component

import React, { useState, useEffect, useRef } from 'react';

function VideoPlayer({ videoSrc, onVideoUpload, subtitles, subtitleStyle }) {
  const videoRef = useRef(null);
  const [currentSubtitle, setCurrentSubtitle] = useState('');


  //call to set subtitle
  useEffect(() => {
    const video =  videoRef.current;

    // Handled parsed Subtitle 
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const activeSubtitle = subtitles.find((subtitle) => {
        const [start, end] = subtitle.timing.split(' --> ').map(timeToSeconds);
        return currentTime >= start && currentTime <= end;
      });

      setCurrentSubtitle(activeSubtitle ? activeSubtitle.text : '');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [subtitles]);

  const timeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
  };
 // ui fro video player
  return (
    <div className="relative w-full h-full">
      <video
        data-testid="video-element"
        id="videoPlayer"
        controls
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc || 'sample.mp4'} // Use uploaded video or fallback to sample video
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


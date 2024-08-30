import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import SubtitleControls from './components/SubtitleControls';
import SubtitleEditor from './components/SubtitleEditor';
import './index.css';

function App() {
  const [videoSrc, setVideoSrc] = useState(null); // State to hold video source
  const [subtitles, setSubtitles] = useState([]); // State to hold subtitle source
  const [subtitleStyle, setSubtitleStyle] = useState({
    fontSize: '2rem',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  });

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL);
    }
  };

  const handleSubtitleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
  
        // Split the content by double newlines to separate subtitle blocks
        const subtitleBlocks = content.split(/\r?\n\r?\n/);
  
        const parsedSubtitles = subtitleBlocks.map(block => {
          // Split each block into lines
          const lines = block.split(/\r?\n/).map(line => line.trim()).filter(line => line);
  
          // Ensure the block has at least 2 lines: index and timing
          if (lines.length >= 2) {
            const timing = lines[1];
            const text = lines.slice(2).join('\n');
  
            // Validate and clean timing
            if (isValidTiming(timing)) {
              return { timing: cleanTiming(timing), text };
            } else {
              console.error('Invalid timing format:', timing);
              return null;
            }
          } else {
            console.error('Invalid subtitle format:', block);
            return null;
          }
        }).filter(Boolean); // Remove invalid entries
  
        console.log('Parsed Subtitles:', parsedSubtitles);
        setSubtitles(parsedSubtitles);
      };
      reader.readAsText(file);
    }
  };
  
  // Function to validate timing format
  const isValidTiming = (timing) => {
    // Regex to match the format "HH:MM:SS,SSS --> HH:MM:SS,SSS"
    const timingRegex = /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/;
    return timingRegex.test(timing);
  };
  
  // Function to clean timing format
  const cleanTiming = (timing) => timing.trim();
  
  
  
  
  

  const handleSubtitleStyleChange = (newStyle) => {
    setSubtitleStyle(prevStyle => ({ ...prevStyle, ...newStyle }));
  };

  const handleSubtitleEdit = (index, newText) => {
    const updatedSubtitles = subtitles.map((subtitle, i) =>
      i === index ? { ...subtitle, text: newText } : subtitle
    );
    setSubtitles(updatedSubtitles);
  };

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      <div className="flex-grow flex">
        <div className="w-full lg:w-3/4 h-full">
          <VideoPlayer
            videoSrc={videoSrc}
            onVideoUpload={handleVideoUpload}
            subtitles={subtitles}
            subtitleStyle={subtitleStyle}
          />
        </div>
        <div className="w-full lg:w-1/4 h-full bg-gray-800 p-4">
          <SubtitleControls
            onStyleChange={handleSubtitleStyleChange}
            onSubtitleUpload={handleSubtitleUpload}
          />
          <SubtitleEditor
            subtitles={subtitles}
            onSubtitleEdit={handleSubtitleEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

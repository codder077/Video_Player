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

  // Handled Video upload by user
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL);
    }
  };

  // Hnadled Custom Subtitle uploads
  const handleSubtitleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const subtitleLines = content.split('\n\n').map(line => {
          const [index, timing, ...text] = line.split('\n');
          return { timing, text: text.join('\n') };
        });
        setSubtitles(subtitleLines);
      };
      reader.readAsText(file);
    }
  };

  // handled  style changes of subtitle
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

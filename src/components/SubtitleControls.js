// SubtitleControls component

import React from 'react';

function SubtitleControls({ onStyleChange, onSubtitleUpload }) {
  return (
    <div className="mb-4">
      <label className="block mb-2">
        <span className="text-sm">Font Size</span>
        <input
          type="number"
          className="bg-gray-700 text-white p-2 rounded w-full"
          onChange={(e) => onStyleChange({ fontSize: `${e.target.value}rem` })}
          defaultValue="2"
        />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Font Color</span>
        <input
          type="color"
          className="bg-gray-700 p-2 rounded w-full"
          onChange={(e) => onStyleChange({ color: e.target.value })}
          defaultValue="#ffffff"
        />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Background Color</span>
        <input
          type="color"
          className="bg-gray-700 p-2 rounded w-full"
          onChange={(e) =>
            onStyleChange({ backgroundColor: e.target.value })
          }
          defaultValue="rgba(0, 0, 0, 0.5)"
        />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Upload Subtitles</span>
        <input
          type="file"
          accept=".srt,.vtt"
          className="bg-gray-700 text-white p-2 rounded w-full"
          onChange={onSubtitleUpload}
        />
      </label>
    </div>
  );
}

export default SubtitleControls;

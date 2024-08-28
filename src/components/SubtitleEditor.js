
//Subtitle Edit component

import React from 'react';

function SubtitleEditor({ subtitles, onSubtitleEdit }) {
  return (
    <div className="mt-4 bg-gray-800 p-4 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Edit Subtitles</h2>
      {subtitles.map((subtitle, index) => (
        <div key={index} className="mb-2">
          <textarea
            value={subtitle.text}
            onChange={(e) => onSubtitleEdit(index, e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded"
          />
        </div>
      ))}
    </div>
  );
}

export default SubtitleEditor;

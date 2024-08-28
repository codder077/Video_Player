import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import SubtitleEditor from '../components/SubtitleEditor';

describe('SubtitleEditor Component', () => {
  test('edits subtitle text', () => {
    const subtitles = [
      { timing: '00:00:01,000 --> 00:00:02,000', text: 'Hello World' },
    ];
    const onSubtitleEdit = jest.fn();

    render(
      <SubtitleEditor
        subtitles={subtitles}
        onSubtitleEdit={onSubtitleEdit}
      />
    );

    const textArea = screen.getByDisplayValue('Hello World');
    fireEvent.change(textArea, { target: { value: 'Hello Universe' } });

    expect(onSubtitleEdit).toHaveBeenCalledWith(0, 'Hello Universe');
  });
});

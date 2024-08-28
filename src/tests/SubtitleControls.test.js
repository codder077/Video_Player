import '@testing-library/jest-dom';


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SubtitleControls from '../components/SubtitleControls';

describe('SubtitleControls Component', () => {
  test('changes subtitle font size', () => {
    const onStyleChange = jest.fn();
    render(<SubtitleControls onStyleChange={onStyleChange} />);

    const inputElement = screen.getByLabelText(/Font Size/i);
    fireEvent.change(inputElement, { target: { value: 'rem' } });
    expect(onStyleChange).toHaveBeenCalledWith({ fontSize: 'rem' });;
  });

  test('changes subtitle font color', () => {
    const onStyleChange = jest.fn();
    render(<SubtitleControls onStyleChange={onStyleChange} />);

    const inputElement = screen.getByLabelText(/Font Color/i);
    fireEvent.change(inputElement, { target: { value: '#ff0000' } });
    expect(onStyleChange).toHaveBeenCalledWith({ color: '#ff0000' });
  });

  test('changes subtitle background color', () => {
    const onStyleChange = jest.fn();
    render(<SubtitleControls onStyleChange={onStyleChange} />);

    const inputElement = screen.getByLabelText(/Background Color/i);
    fireEvent.change(inputElement, { target: { value: '#000000' } });

    expect(onStyleChange).toHaveBeenCalledWith({ backgroundColor: '#000000' });
  });
});

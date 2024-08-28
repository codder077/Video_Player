import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from '../components/VideoPlayer';

test('renders video element', () => {
  render(<VideoPlayer />);
  const videoElement = screen.getByTestId('video-element');
  expect(videoElement).toBeInTheDocument();
});

test('displays subtitle correctly', () => {
  const subtitles = [
    { timing: '00:00:01 --> 00:00:05', text: 'Hello World' }
  ];
  render(<VideoPlayer subtitles={subtitles} />);

  const videoElement = screen.getByTestId('video-element');

  fireEvent.timeUpdate(videoElement, { target: { currentTime: 4 } });

  const subtitleElement = screen.getByText(/Hello World/i);
  expect(subtitleElement).toBeInTheDocument();
});

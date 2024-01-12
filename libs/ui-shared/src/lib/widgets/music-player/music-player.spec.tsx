import { render } from '@testing-library/react';

import MusicPlayer from './music-player';

describe('MusicPlayer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MusicPlayer />);
    expect(baseElement).toBeTruthy();
  });
});

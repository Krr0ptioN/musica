import { render } from '@testing-library/react';

import { MusicPlayerCover } from '../music-player-cover/music-player-cover';

describe('MusicCover', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MusicPlayerCover src="" alt="" />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import MusicPlayerProgressBar from './music-player-progress-bar';

describe('MusicPlayerProgressBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MusicPlayerProgressBar handlerMusicSeek={() => { }} duration="3:30" />
    );
    expect(baseElement).toBeTruthy();
  });
});

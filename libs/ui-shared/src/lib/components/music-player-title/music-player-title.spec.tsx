import { render } from '@testing-library/react';

import MusicPlayerTitle from './music-player-title';

describe('MusicPlayerTitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MusicPlayerTitle name="" artists={['artist #1', 'co-artist #2']} />
    );
    expect(baseElement).toBeTruthy();
  });
});

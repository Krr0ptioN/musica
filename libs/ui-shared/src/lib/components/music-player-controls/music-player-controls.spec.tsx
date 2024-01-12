import { render } from '@testing-library/react';

import MusicPlayerControls from './music-player-controls';

describe('MusicPlayerControls', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MusicPlayerControls />);
    expect(baseElement).toBeTruthy();
  });
});

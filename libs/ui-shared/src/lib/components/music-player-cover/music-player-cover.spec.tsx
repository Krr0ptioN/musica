import { render } from '@testing-library/react';

import MusicCover from './music-cover';

describe('MusicCover', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MusicCover />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import MusicItem from './music-item';

describe('MusicItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MusicItem />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import MusicPlayerBtn from './music-player-btn';

describe('Btn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MusicPlayerBtn title="" handlerOnClick={() => ''} />
    );
    expect(baseElement).toBeTruthy();
  });
});

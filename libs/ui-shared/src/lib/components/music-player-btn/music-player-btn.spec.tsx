import { render } from '@testing-library/react';

import Btn from './btn';

describe('Btn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Btn />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { Provider } from 'react-redux';
import { store } from '@musica/store';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});

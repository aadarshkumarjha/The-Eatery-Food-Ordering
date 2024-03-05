import { render } from '@testing-library/react';
import Header from '../Header';
import { Provider } from 'react-redux';
import store from '../../utils/store';
import {StaticRouter} from 'react-router-dom/server';

test("Logo should load on rendering header", () => {
    // load header
    const header = render(
      <StaticRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </StaticRouter>
    )
    // console.log(header)
    const logo = header.getAllByTestId("logo");
    // console.log(logo);
    // check if logo is loaded
    expect(logo[0].src).toBe('http://localhost/dummy.png')
})
test("Online status should be green on rendering header", () => {
    // load header
    const header = render(
      <StaticRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </StaticRouter>
    )
    const onlineStatus = header.getByTestId("online-status");
    // check if status is green
    expect(onlineStatus.innerHTML).toBe('✅');
})
test("Cart should be empty on rendering header", () => {
    // load header
    const header = render(
      <StaticRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </StaticRouter>
    )
    const cart = header.getByTestId("cart");
    // check if status is green
    expect(cart.innerHTML).toBe('<a href="/Cart">Cart - 0 items</a>')
})
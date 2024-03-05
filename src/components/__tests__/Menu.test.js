import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Header from '../Header'
import { Provider } from 'react-redux'
import store from '../../utils/store'
import { StaticRouter } from 'react-router-dom/server'
import { MENU_DATA } from '../mocks/menuData'
import RestaurantMenu from '../RestaurantMenu'

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MENU_DATA)
    },
  })
})

test('Add Items to cart', async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
        <RestaurantMenu />
      </Provider>
    </StaticRouter>
  )

  await waitFor(() => expect(body.getByTestId('menu')))
  // ul serves as menu
  const menu = body.getByTestId('menu')
  //   console.log(menu.children.length)
  const addBtn = body.getAllByTestId('add-btn')
  fireEvent.click(addBtn[0])
  const cart = body.getByTestId('cart')
  expect(cart.innerHTML).toBe('<a href="/Cart">Cart - 1 items</a>')
})

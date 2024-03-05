import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Body from '../Body'
import { Provider } from 'react-redux'
import store from '../../utils/store'
import { StaticRouter } from 'react-router-dom/server'
import { RESTAURANT_DATA } from '../mocks/data'

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(RESTAURANT_DATA)
    },
  })
})

test('Shimmer should load on homepage', () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  )
  const shimmer = body.getByTestId('shimmer')
  //   console.log(shimmer);
  //   shimmer contains 2 divs for search container and restaurant cards
  expect(shimmer.children.length).toBe(2)
})
test('Shimmer cards for restaurants should load on homepage', () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  )
  const shimmerCard = body.getByTestId('shimmer-card')
  //   console.log(shimmer);
  //   shimmerCard for restaurants contains 10 divs for each dummmy restaurant cards
  expect(shimmerCard.children.length).toBe(10)
})

test('Check restaurants loading on homepage', async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  )
  await waitFor(() => expect(body.getByTestId('search-btn')))
  const resList = body.getAllByTestId('res-list')
  // 20 restaurant cards should be present
  expect(resList[0].children.length).toBe(20)
  // console.log(resList[0].children)
})
test('Search results for string(food) on homepage', async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  )
  await waitFor(() => expect(body.getByTestId('search-btn')))
  const input = body.getByTestId('input-box')
  fireEvent.change(input, {
    target: {
      value: 'food',
    },
  })
  const searchBtn = body.getByTestId('search-btn')
  fireEvent.click(searchBtn)
  const resList = body.getAllByTestId('res-list')
  expect(resList[0].children.length).toBe(1)
  // console.log(resList[0].innerHTML);
})

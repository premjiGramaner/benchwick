import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import saga from 'redux-saga'
import { expect, test } from '@jest/globals'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import EagleText from '@Components/eagle/EagleText'

const mockStore = configureStore([saga])

let reduxStore = mockStore({
  testReducer: {
    users: [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      },
    ],
  },
})

test('should render All data', () => {
  render(
    <Provider store={reduxStore}>
      <BrowserRouter>
        <EagleText />
      </BrowserRouter>
    </Provider>
  )
  const element = screen.getByTestId('content_body')
  fireEvent.click(element)
  expect(element).toBeTruthy()
})

describe('Add Text button', () => {
  test('Add Text button renders correctly', () => {
    render(
      <Provider store={reduxStore}>
        <BrowserRouter>
          <EagleText />
        </BrowserRouter>
      </Provider>
    )
    const AddTextButton = screen.getByRole('button', { name: 'Add Text' })
    fireEvent.click(AddTextButton)
    expect(AddTextButton).toBeTruthy()
  })
})

describe('getAllUser button', () => {
  test('Add Text button renders correctly', () => {
    render(
      <Provider store={reduxStore}>
        <BrowserRouter>
          <EagleText />
        </BrowserRouter>
      </Provider>
    )
    const AddTextButton = screen.getByRole('button', { name: 'Get Users' })
    fireEvent.click(AddTextButton)
    expect(AddTextButton).toBeTruthy()
  })
})

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

jest.mock('../../services/storage/LocalStorageAdapter')

describe('<App />', () => {
  it('Renders app without critical errors', () => {
    const { getByText } = render(<App />)
    const header = getByText(/Todo List/i)
    expect(header).toBeInTheDocument()
  })

  it('Renders three default todo items', () => {
    const { getByText } = render(<App />)
    expect(getByText('Buy coffee beans')).toBeInTheDocument()
    expect(getByText('Buy a milk')).toBeInTheDocument()
    expect(getByText('Make a coffee')).toBeInTheDocument()
  })

  it('Has search panel', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('search-panel')).toBeInTheDocument()
  })

  it('Has filter buttons', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('todo-filter')).toBeInTheDocument()
  })

  it('Has a form to add a new item', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('todo-item-add')).toBeInTheDocument()
  })
})


describe('Adding new items', () => {
  it('When the input is empty, prevent the item from being added', () => {
    const { getByText, getAllByTestId } = render(<App />)
    fireEvent.click(getByText(/Add\s+Item/))
    expect(getAllByTestId('todo-list-item').length).toBe(3)
  })

  it('When the input has only whitespace, prevent the item from being added', () => {
    const { getByText, getByTestId, getAllByTestId } = render(<App />)
    const input = getByTestId('todo-item-add-input')
    fireEvent.change(input, {
      target: { value: '    ' }
    })
    fireEvent.click(getByText(/Add\s+Item/))
    expect(getAllByTestId('todo-list-item').length).toBe(3)
  })

  it('Add a new item when', () => {
    const { getByText, getByTestId, getAllByTestId } = render(<App />)
    const input = getByTestId('todo-item-add-input')
    const title = (new Date()).toISOString()
    fireEvent.change(input, {
      target: { value: title }
    })

    fireEvent.click(getByText(/Add\s+Item/))
    expect(getAllByTestId('todo-list-item').length).toBe(4)
    expect(getByText(title)).toBeInTheDocument()
  })
})


describe('Deleting items', () => {
  it('When the delete button is pressed it removes the entire item', () => {
    const { getAllByTestId } = render(<App />)
    const deleteButtons = getAllByTestId('todo-list-delete')
    expect(deleteButtons.length).toBe(3)

    fireEvent.click(deleteButtons[0])
    const items = getAllByTestId('todo-list-item')
    expect(items.length).toBe(2)
    expect(items[0]).toHaveTextContent('Buy a milk')

  })
})


describe('Mark items', () => {
  it('When the item\'s title is clicked it is marked as completed', () => {
    const { getByText } = render(<App />)
    const itemTitleElement = getByText('Buy a milk')
    const itemElement = itemTitleElement.parentElement

    expect(itemElement).toBeInTheDocument()
    expect(itemElement).not.toHaveClass('completed')

    fireEvent.click(itemTitleElement)
    expect(itemElement).toHaveClass('completed')
  })

  it('When the button is clicked the items is marked as important', () => {
    const { getByText, getAllByTestId } = render(<App />)
    const itemElement = getByText('Buy a milk').parentElement
    const buttonElement = getAllByTestId('todo-list-mark-important')

    expect(itemElement).toBeInTheDocument()
    expect(itemElement).not.toHaveClass('important')

    fireEvent.click(buttonElement[1])
    expect(itemElement).toHaveClass('important')
  })
})


describe('Stats', () => {
  it('Shows number of completed and remaining items', () => {
    const { getByText } = render(<App />)
    expect(getByText(/2 more to do/i)).toBeInTheDocument()
    expect(getByText(/1 done/)).toBeInTheDocument()
  })

  it('Shows updated numbers', () => {
    const { getByText } = render(<App />)

    fireEvent.click(getByText('Buy a milk'))

    expect(getByText(/1 more to do/i)).toBeInTheDocument()
    expect(getByText(/2 done/)).toBeInTheDocument()
  })

  it ('Show different text when everything is completed', () => {
    const { getAllByTestId, getByText } = render(<App />)

    const items = getAllByTestId('todo-list-item')
    for (const item of items) {
      if (!item.classList.contains('completed')) {
        fireEvent.click(item.firstChild)
      }
    }

    expect(getByText(/Nothing to do/i)).toBeInTheDocument()
    expect(getByText(/3 done/)).toBeInTheDocument()
  })
})


describe('Searching and filtering', () => {

  it ('Searching', () => {
    const { getAllByTestId, getByPlaceholderText } = render(<App />)

    const input = getByPlaceholderText(/search/i)
    fireEvent.change(input, {
      target: { value: ' buy ' }
    })

    const items = getAllByTestId('todo-list-item')
    expect(items.length).toBe(2)
    expect(items[0]).toHaveTextContent('Buy coffee beans')
    expect(items[1]).toHaveTextContent('Buy a milk')
  })
  
  it('Filtering', () => {
    const { getAllByTestId, getByText } = render(<App />)
    const button = getByText('Done')
    fireEvent.click(button)

    const items = getAllByTestId('todo-list-item')
    expect(items.length).toBe(1)
    expect(items[0]).toHaveTextContent('Buy coffee beans')
  })

  it('Searching and filtering at the same time', () => {
    const { getAllByTestId, getByPlaceholderText, getByText } = render(<App />)

    const button = getByText(/active/i)
    fireEvent.click(button)
    const input = getByPlaceholderText(/search/i)
    fireEvent.change(input, {
      target: { value: 'Coffee' }
    })

    const items = getAllByTestId('todo-list-item')
    expect(items.length).toBe(1)
    expect(items[0]).toHaveTextContent('Make a coffee')
  })
})

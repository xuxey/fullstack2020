import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import Blog from "./Blog";

let component
const blogs = [
    {
        title: 'My Test Blog',
        author: 'xuxe',
        likes: 12,
        url: 'xuxe.org',
        user: {
            blogs: [],
            username: 'elonmusk69',
            name: 'Elon Musk',
            passwordHash: '$2b$10$ICjZr7y1oycsN2JCjBnPsuJxMhsgDnrwElaUy1b7bJTGIO2s2anRO',
            id: '5ee912ff04a06b8ab8b31e74'
        },
        id: '5ee9141185afce85d450b711'
    },
    {
        title: 'My Second Test Blog',
        author: 'xuxey',
        likes: 21,
        user: {
            blogs: [],
            username: 'elonmusk69',
            name: 'Elon Musk',
            passwordHash: '$2b$10$ICjZr7y1oycsN2JCjBnPsuJxMhsgDnrwElaUy1b7bJTGIO2s2anRO',
            id: '5ee912ff04a06b8ab8b31e74'
        },
        id: '5ee9141185afce85d450b711'
    }]
const handleDeleteClick = jest.fn()
const handleLikeClick = jest.fn()

beforeEach(() => {
    component = render(
        <Blog blog={blogs[0]} authorViewing={false} handleDeleteClick={handleDeleteClick}
              handleLikeClick={handleLikeClick}/>
    )
})
test('renders blog content', () => {
    const div = component.container.querySelector('.togglableChildren')
    expect(component.container).toHaveTextContent(blogs[0].title)
    expect(div).toHaveStyle('display: none')
})

test('After toggle url and number of likes are displayed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableChildren')
    expect(div).not.toHaveStyle('display: none')
})

test('Like handler gets called the correct number of times', () => {
    fireEvent.click(component.getByText('View'))

    fireEvent.click(component.getByText('Like'))
    fireEvent.click(component.getByText('Like'))

    expect(handleLikeClick.mock.calls).toHaveLength(2)
})

import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from "./BlogForm";

test('BlogForm updates parent state and calls onSubmit', () => {
    const onSubmit = jest.fn()
    const component = render(<BlogForm onSubmit={onSubmit}/>)

    const form = component.container.querySelector('form')
    const inputs = component.container.querySelectorAll('input')
    let i = 0
    inputs.forEach((input) => {
        fireEvent.change(input, {
            target: {value: `My blog test value ${i}`}
        })
        i++
    })
    fireEvent.submit(form)
    expect(onSubmit.mock.calls).toHaveLength(1)
    for (let i = 0; i < inputs.length; i++) {
        expect(onSubmit.mock.calls[0][i + 1]).toBe(`My blog test value ${i}`)
    }
})

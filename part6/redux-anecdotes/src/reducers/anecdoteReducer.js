import anecdoteService from "../services/anecdoteService";
import {notify} from "./notificationReducer";

export const voteFor = (anecdote) => {
  return async dispatch => {
    dispatch(notify('Liked anecdote', 5))
    console.log('Votes', anecdote.votes)
    anecdote.votes = anecdote.votes + 1
    const votedAnecdote = await anecdoteService.vote(anecdote)
    console.log('voted: ', votedAnecdote.votes)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: notes,
    })
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(a => a.id === action.data.id ? action.data : a)
    case 'NEW':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default reducer

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

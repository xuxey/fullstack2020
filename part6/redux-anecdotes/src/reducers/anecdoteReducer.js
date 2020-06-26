const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (content) => {
  return {
    content: content,
    id: getId(),
    votes: 0
  }
}

export const voteFor = (anecdoteId) => {
  return {
    type: 'VOTE',
    data: {id: anecdoteId}
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW',
    data: asObject(content)
  }
}
const increaseVote = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1
  }
}
const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(a => a.id === action.data.id ? increaseVote(a) : a)
    case 'NEW':
      return [...state, action.data]
    default:
      return state
  }
}

export default reducer
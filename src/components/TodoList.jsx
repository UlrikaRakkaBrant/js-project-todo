import styled from 'styled-components'
import { media } from '../styles/media.js'
import TodoItem from './TodoItem.jsx'

const List = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;

  ${media.desktop(`
    gap: 12px;
  `)}

  ${media.large(`
    gap: 14px;
  `)}
`

export default function TodoList({ tasks }) {
  return (
    <List>
      {tasks.map(t => <TodoItem key={t.id} task={t} />)}
    </List>
  )
}

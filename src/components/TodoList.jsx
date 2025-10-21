import styled from 'styled-components'
import TodoItem from './TodoItem.jsx'

const List = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0; padding: 0; list-style: none;
`

export default function TodoList({ tasks }) {
  return (
    <List>
      {tasks.map(t => <TodoItem key={t.id} task={t} />)}
    </List>
  )
}

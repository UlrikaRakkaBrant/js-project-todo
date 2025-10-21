import styled from 'styled-components'
import { useTodoStore } from '../store/useTodoStore.js'
import { format } from 'date-fns'

const Item = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid #2a3650;
  border-radius: 14px;
`

const Title = styled.span`
  word-break: break-word;
  opacity: ${({ $done }) => ($done ? 0.7 : 1)};
  text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
`

const RemoveBtn = styled.button`
  background: transparent;
  border: 1px solid #2a3650;
  color: var(--danger);
  border-radius: 10px;
  padding: 8px 10px;
`

export default function TodoItem({ task }) {
  const toggleTask = useTodoStore(s => s.toggleTask)
  const removeTask = useTodoStore(s => s.removeTask)

  return (
    <Item>
      <input
        id={`cb-${task.id}`}
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        aria-label={task.completed ? 'Mark as not completed' : 'Mark as completed'}
      />
      <label htmlFor={`cb-${task.id}`} style={{ cursor: 'pointer' }}>
        <Title $done={task.completed}>{task.title}</Title>
        <div>
          <time
            dateTime={task.createdAt}
            title={task.createdAt}
            style={{ color: 'var(--muted)', fontSize: 12 }}
          >
            {format(new Date(task.createdAt), 'MMM d, HH:mm')}
          </time>
        </div>
      </label>

      <RemoveBtn onClick={() => removeTask(task.id)} aria-label={`Delete "${task.title}"`}>
        Delete
      </RemoveBtn>
    </Item>
  )
}

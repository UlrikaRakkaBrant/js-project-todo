import styled from 'styled-components'
import { media } from '../styles/media.js'
import { useTodoStore } from '../store/useTodoStore.js'
import { format, isBefore, startOfDay, parseISO } from 'date-fns'

// add a badge
const Badge = styled.span`
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid #2a3650;
  color: ${({ $danger }) => ($danger ? 'white' : 'var(--text)')};
  background: ${({ $danger }) => ($danger ? 'var(--danger)' : 'transparent')};
`

const Item = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;   /* checkbox | text/date | delete */
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid #2a3650;
  border-radius: 14px;

  ${media.mobile(`
    padding: 12px 12px;
    gap: 10px;
  `)}
`

const Title = styled.span`
  word-break: break-word;
  opacity: ${({ $done }) => ($done ? 0.7 : 1)};
  text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};

  ${media.mobile(`
    font-size: 0.95rem;
  `)}
`

const RemoveBtn = styled.button`
  background: transparent;
  border: 1px solid #2a3650;
  color: var(--danger);
  border-radius: 10px;
  padding: 8px 10px;

  ${media.mobile(`
    padding: 8px 10px;
  `)}
`

export default function TodoItem({ task }) {
  const toggleTask = useTodoStore(s => s.toggleTask)
  const removeTask = useTodoStore(s => s.removeTask)

  const hasDue = !!task.dueDate
  const due = hasDue ? startOfDay(parseISO(task.dueDate)) : null
  const today = startOfDay(new Date())
  const isOverdue = hasDue && !task.completed && isBefore(due, today)

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

        {/* existing createdAt time */}
        <div>
          <time dateTime={task.createdAt} title={task.createdAt} style={{ color: 'var(--muted)', fontSize: 12 }}>
            {format(new Date(task.createdAt), 'MMM d, HH:mm')}
          </time>
        </div>

        {/* NEW: due/overdue badge */}
        {hasDue && (
          <Badge $danger={isOverdue} aria-label={isOverdue ? 'Overdue' : 'Due date'}>
            {isOverdue ? 'Overdue' : 'Due'} {format(due, 'MMM d')}
          </Badge>
        )}
      </label>

      <RemoveBtn onClick={() => removeTask(task.id)} aria-label={`Delete "${task.title}"`}>
        Delete
      </RemoveBtn>
    </Item>
  )
}
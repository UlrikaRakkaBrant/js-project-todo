import styled from 'styled-components'
import { media } from '../styles/media.js'
import { useTodoStore } from '../store/useTodoStore.js'

const Bar = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;

  ${media.mobile(`
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  `)}
`

const Muted = styled.span`
  color: var(--muted);

  ${media.mobile(`
    text-align: center;
  `)}
`

const SmallBtn = styled.button`
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #2a3650;
  background: transparent;
  color: var(--text);

  ${media.mobile(`
    padding: 10px 12px;    /* touch target */
    width: 100%;           /* full width buttons when stacked */
  `)}
`

export default function Footer({ total, remaining }) {
  const clearCompleted = useTodoStore(s => s.clearCompleted)
  const completeAll = useTodoStore(s => s.completeAll)

  return (
    <Bar>
      <Muted aria-live="polite">
        <strong>{remaining}</strong> uncompleted / <strong>{total}</strong> total
      </Muted>
      <div style={{ display: 'flex', gap: 8, width: '100%' }}>
        <SmallBtn onClick={completeAll} title="Mark all as completed">Complete all</SmallBtn>
        <SmallBtn onClick={clearCompleted} title="Remove all completed tasks">Clear completed</SmallBtn>
      </div>
    </Bar>
  )
}

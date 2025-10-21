import styled from 'styled-components'
import { useTodoStore } from '../store/useTodoStore.js'

const Bar = styled.div`
  display: flex; gap: 12px; align-items: center; justify-content: space-between;
  margin-top: 16px;
`
const Muted = styled.span` color: var(--muted); `
const SmallBtn = styled.button`
  padding: 8px 10px; border-radius: 10px; border: 1px solid #2a3650; background: transparent; color: var(--text);
`

export default function Footer({ total, remaining }) {
  const clearCompleted = useTodoStore(s => s.clearCompleted)
  const completeAll = useTodoStore(s => s.completeAll)

  return (
    <Bar>
      <Muted aria-live="polite">
        <strong>{remaining}</strong> uncompleted / <strong>{total}</strong> total
      </Muted>
      <div style={{ display: 'flex', gap: 8 }}>
        <SmallBtn onClick={completeAll} title="Mark all as completed">Complete all</SmallBtn>
        <SmallBtn onClick={clearCompleted} title="Remove all completed tasks">Clear completed</SmallBtn>
      </div>
    </Bar>
  )
}

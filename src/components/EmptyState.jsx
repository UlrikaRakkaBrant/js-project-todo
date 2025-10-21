import styled from 'styled-components'

const Wrap = styled.div`
  text-align: center;
  color: var(--muted);
  border: 2px dashed #2a3650;
  padding: 32px;
  border-radius: 16px;
`

export default function EmptyState() {
  return (
    <Wrap role="status" aria-live="polite">
      <p>Nothing here yet. Add your first task above 👆</p>
    </Wrap>
  )
}

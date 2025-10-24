import styled from 'styled-components'
import { media } from '../styles/media.js'

const Wrap = styled.div`
  text-align: center;
  color: var(--muted);
  border: 2px dashed #2a3650;
  padding: 32px;
  border-radius: 16px;

  ${media.mobile(`
    padding: 20px;
    border-radius: 12px;
    font-size: 0.95rem;
  `)}

  ${media.large(`
    padding: 40px;
  `)}
`

export default function EmptyState() {
  return (
    <Wrap role="status" aria-live="polite">
      <p>Nothing here yet. Add your first task above 👆</p>
    </Wrap>
  )
}

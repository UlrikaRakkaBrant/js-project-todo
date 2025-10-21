// src/App.jsx
import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles.js'
import { useTodoStore } from './store/useTodoStore.js'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import EmptyState from './components/EmptyState.jsx'
import Footer from './components/Footer.jsx'

const Shell = styled.main`
  max-width: 720px; margin: 0 auto; padding: 24px; min-height: 100dvh; display: grid; align-content: start; gap: 18px;
`
const H1 = styled.h1`
  margin: 8px 0 4px; font-size: clamp(28px, 3vw, 40px);
`
const Card = styled.section`
  display: grid; gap: 12px;
`

export const App = () => {
  const tasks = useTodoStore(s => s.tasks)
  const total = tasks.length
  const remaining = tasks.filter(t => !t.completed).length

  return (
    <>
      <GlobalStyles />
      <Shell>
        <header>
          <H1>Todos</H1>
          <p style={{ color: 'var(--muted)', margin: 0 }}>Powered by Zustand — no prop drilling 👋</p>
        </header>

        <TodoForm />

        <Card>
          {total === 0 ? <EmptyState /> : <TodoList tasks={tasks} />}
          <Footer total={total} remaining={remaining} />
        </Card>
      </Shell>
    </>
  )
}

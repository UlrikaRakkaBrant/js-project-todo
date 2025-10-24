// src/App.jsx
import { useState } from 'react'
import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles.js'
import { useTodoStore } from './store/useTodoStore.js'
import { useThemeStore } from './store/useThemeStore.js' // ⬅️ NEW
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import EmptyState from './components/EmptyState.jsx'
import Footer from './components/Footer.jsx'
import foxIcon from './assets/favicon.jpg'

const Shell = styled.main`
  max-width: 720px; margin: 0 auto; padding: 24px; min-height: 100dvh; display: grid; align-content: start; gap: 18px;
`
const H1 = styled.h1`
  margin: 8px 0 4px;
  font-size: clamp(28px, 3vw, 40px);
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20%;
    user-select: none;
  }
`

const Card = styled.section`
  display: grid; gap: 12px;
`

const TopBar = styled.header`
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
`

const ThemeBtn = styled.button`
  border: 1px solid #2a3650;
  background: transparent;
  color: var(--text);
  padding: 8px 12px;
  border-radius: 12px;
  font-weight: 600;
`

const FilterBar = styled.div`
  display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
`
const FilterButton = styled.button`
  border: 1px solid #2a3650;
  background: ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--text)')};
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: 600;
`

export default function App() {
  const tasks = useTodoStore(s => s.tasks)

  // THEME: light | dark | auto
  const { theme, setTheme } = useThemeStore()
  function toggleTheme() {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme('auto')
    else setTheme('dark')
  }

  // FILTERS
  const [filter, setFilter] = useState('all')
  const total = tasks.length
  const remaining = tasks.filter(t => !t.completed).length
  const filteredTasks = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  )

  return (
    <>
      <GlobalStyles />
      <Shell>
        <TopBar>
          <div>
            <H1>
              FocusDen
              <img src={foxIcon} alt="Fox logo" />
            </H1>

            <p style={{ color: 'var(--muted)', margin: 0, fontWeight: 600 }}>
              Let your hands create what your eyes fear to imagine.
            </p>
          </div>
          <ThemeBtn onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '🌙 Dark' : theme === 'light' ? '☀️ Light' : '💻 Auto'}
          </ThemeBtn>
        </TopBar>

        <TodoForm />

        {/* Filter controls */}
        <FilterBar role="group" aria-label="Filter tasks">
          <FilterButton
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
            $active={filter === 'all'}
          >All</FilterButton>

          <FilterButton
            onClick={() => setFilter('active')}
            aria-pressed={filter === 'active'}
            $active={filter === 'active'}
          >Active</FilterButton>

          <FilterButton
            onClick={() => setFilter('completed')}
            aria-pressed={filter === 'completed'}
            $active={filter === 'completed'}
          >Completed</FilterButton>

          <span style={{ color: 'var(--muted)', marginLeft: 8 }}>
            Showing <strong>{filteredTasks.length}</strong> of <strong>{total}</strong>
          </span>
        </FilterBar>

        <Card>
          {total === 0 ? <EmptyState /> : <TodoList tasks={filteredTasks} />}
          <Footer total={total} remaining={remaining} />
        </Card>
      </Shell>
    </>
  )
}

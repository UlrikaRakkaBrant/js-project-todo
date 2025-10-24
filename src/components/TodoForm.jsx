import { useState, useRef } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media.js'
import { useTodoStore } from '../store/useTodoStore.js'

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;  /* input+counter | button */
  gap: 12px;
  background: var(--surface);
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,.12);

  ${media.mobile(`
    grid-template-columns: 1fr;   /* stack on small phones */
    gap: 10px;
  `)}

  ${media.large(`
    padding: 20px;
    gap: 14px;
  `)}
`

const Label = styled.label`
  position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden;
`

const Input = styled.input`
  width: 100%;
  display: block;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #2a3650;
  background: transparent;
  color: var(--text);
  &::placeholder { color: var(--muted); }

  ${media.mobile(`
    padding: 12px 14px;
  `)}
`

const Button = styled.button`
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #2a3650;
  background: var(--primary);
  color: white;
  font-weight: 600;

  ${media.mobile(`
    padding: 12px 14px;
    width: 100%;         /* full-width when stacked */
  `)}
`

const Counter = styled.small`
  color: var(--muted);
  display: block;
  margin-top: 6px;
  font-size: 0.85rem;

  ${media.mobile(`
    font-size: 0.8rem;
    margin-top: 4px;
  `)}
`

export default function TodoForm() {
  const addTask = useTodoStore(s => s.addTask)
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  function onSubmit(e) {
    e.preventDefault()
    if (!value.trim()) return
    addTask(value)
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <Form onSubmit={onSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Label htmlFor="new-task">Add a new task</Label>
        <Input
          id="new-task"
          ref={inputRef}
          type="text"
          placeholder="Add a new task…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={120}
          aria-describedby="char-help"
        />
        <Counter id="char-help">
          {120 - value.length} characters left
        </Counter>
      </div>
      <Button type="submit" aria-label="Add task">Add</Button>
    </Form>
  )
}

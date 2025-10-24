import { useState, useRef } from 'react'
import styled from 'styled-components'
import { useTodoStore } from '../store/useTodoStore.js'

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  background: var(--surface);
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,.12);
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
`

const Button = styled.button`
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #2a3650;
  background: var(--primary);
  color: white;
  font-weight: 600;
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
        <small
          id="char-help"
          style={{ color: 'var(--muted)', display: 'block', marginTop: '6px' }}
        >
          {120 - value.length} characters left
        </small>

      </div>
      <Button type="submit" aria-label="Add task">Add</Button>
    </Form>
  )
}

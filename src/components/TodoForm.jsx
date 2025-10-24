// src/components/TodoForm.jsx
import { useState, useRef } from 'react'
import styled from 'styled-components'
import { useTodoStore } from '../store/useTodoStore.js'

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto; /* left: inputs | right: button */
  gap: 12px;
  background: var(--surface);
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,.12);

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* stack on small phones */
  }
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
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

const DateInput = styled.input`
  margin-top: 8px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #2a3650;
  background: transparent;
  color: var(--text);
`

const Counter = styled.small`
  color: var(--muted);
  display: block;
  margin-top: 6px;
  font-size: 0.85rem;
`

const Button = styled.button`
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #2a3650;
  background: var(--primary);
  color: white;
  font-weight: 600;

  @media (max-width: 480px) {
    width: 100%; /* full-width when stacked */
  }
`

export default function TodoForm() {
  const addTask = useTodoStore(s => s.addTask)
  const [value, setValue] = useState('')
  const [dueDate, setDueDate] = useState('')      // ← NEW
  const inputRef = useRef(null)

  // helper for date picker (prevents picking past dates)
  const today = new Date().toISOString().split('T')[0]

  function onSubmit(e) {
    e.preventDefault()
    if (!value.trim()) return
    addTask(value, dueDate || undefined)          // ← pass optional dueDate
    setValue('')
    setDueDate('')
    inputRef.current?.focus()
  }

  return (
    <Form onSubmit={onSubmit} noValidate>
      {/* Left column: text input + date + counter */}
      <Group>
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

        {/* Due date (optional) */}
        <Label htmlFor="due-date">Due date</Label>
        <DateInput
          id="due-date"
          name="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
          aria-label="Set due date (optional)"
        />

        {/* Character counter under the text field */}
        <Counter id="char-help">
          {120 - value.length} characters left
        </Counter>
      </Group>

      {/* Right column: submit button */}
      <Button type="submit" aria-label="Add task">Add</Button>
    </Form>
  )
}

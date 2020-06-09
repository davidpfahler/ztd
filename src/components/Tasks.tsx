import React, {useState, FC, useMemo, useRef} from 'react'
import {updateArray} from '../utils'

export type TaskType = 'inbox' | 'mits' | 'bigrocks'

type Task = {
  title: string,
  done: boolean,
  type: TaskType,
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const addTask = (task: Task): void => setTasks(tasks => [...tasks, task])
  const completeTask = (task: Task) => {
    return setTasks(updateArray<Task>(tasks, task, {...task, done: true}))
  }

  const mits = useMemo(() => tasks.filter(task => task.type === 'mits'), [tasks])
  const bigrocks = useMemo(() => tasks.filter(task => task.type === 'bigrocks'), [tasks])
  const inbox = useMemo(() => tasks.filter(task => task.type === 'inbox'), [tasks])
  return {
    mits, bigrocks, inbox, addTask, completeTask
  }
}

type TasksComponentProps = {
  current: TaskType
}

const TasksComponent: FC<TasksComponentProps> = ({current}) => {
  const {addTask, completeTask, ...rest} = useTasks();
  const tasks: Task[] = rest[current]
  const input = useRef<HTMLInputElement>(null);
  return <main>
    <div className="addItem"><form onSubmit={e => {
      if(!input.current) {
        throw new Error('ref fail');
      }
      e.preventDefault();
      addTask({title: input.current.value, done: false, type: current})
    }}><input ref={input} type="text" /><input type="submit" hidden /></form></div>
    {tasks.map((task, i) => {
      return <div className="task" key={i}>{task.title}</div>
    })}
  </main>
}

export default TasksComponent
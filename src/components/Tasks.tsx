import React, {useState, FC, useMemo, useRef} from 'react'
import {updateArray} from '../utils'

export enum TaskTypes {inbox, mits, bigrocks}
export const taskTitles = ['Inbox', 'MITs', 'Big Rocks']

type Task = {
  title: string,
  done: boolean,
  type: TaskTypes,
}
type TaskFunction = (task: Task) => void
type UseTasks = {
  addTask: TaskFunction,
  completeTask: TaskFunction,
  [TaskTypes.mits]: Task[],
  [TaskTypes.inbox]: Task[],
  [TaskTypes.bigrocks]: Task[],
}

const useTasks = (): UseTasks => {
  const [tasks, setTasks] = useState<Task[]>([])
  const addTask: TaskFunction = task => setTasks(tasks => [...tasks, task])
  const completeTask: TaskFunction = task => setTasks(updateArray(tasks, task, {...task, done: true}))
  const mits = useMemo(() => tasks.filter(task => task.type === TaskTypes.mits), [tasks])
  const bigrocks = useMemo(() => tasks.filter(task => task.type === TaskTypes.bigrocks), [tasks])
  const inbox = useMemo(() => tasks.filter(task => task.type === TaskTypes.inbox), [tasks])
  return {
    addTask,
    completeTask,
    [TaskTypes.mits]: mits,
    [TaskTypes.inbox]: inbox,
    [TaskTypes.bigrocks]: bigrocks,
  }
}

type TasksComponentProps = {
  current: TaskTypes
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
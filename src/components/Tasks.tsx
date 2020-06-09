import React, {useState, FC} from 'react'
import {updateArray} from '../utils'

type Task = { title: string, done: boolean }

const useTasks = () => {
  const [inbox, setInbox] = useState<Task[]>([])
  const [mits, setMits] = useState<Task[]>([])
  const [bigrocks, setBigrocks] = useState<Task[]>([])
  const addToInbox = (task: Task) => setInbox([...inbox, task])
  const addToMits = (task: Task) => setInbox([...mits, task])
  const addToBigrocks = (task: Task) => setInbox([...bigrocks, task])
  const completeTask = (task: Task) => {
    let i, arr, method
    if (inbox.includes(task)) {
      i = inbox.indexOf(task)
      arr = inbox
      method = setInbox
    }
    if (mits.includes(task)) {
      i = mits.indexOf(task)
      arr = mits
      method = setMits
    }
    if (bigrocks.includes(task)) {
      i = bigrocks.indexOf(task)
      arr = bigrocks
      method = setBigrocks
    }
    if (!method) {
      throw Error('Cannot completet task: Unkown task.')
    }
    return method(updateArray(arr, task, {...task, done: true}))
  }

  return {
    inbox, mits, bigrocks, addToInbox, addToMits, addToBigrocks, completeTask
  }
}

type TasksComponentProps = {
  current: string
}

const TasksComponent: FC<TasksComponentProps> = ({current}) => {
  const {addToInbox, addToMits, addToBigrocks, completeTask, ...rest} = useTasks();
  const tasks: Task[] = rest[current]
  return <main>
    <div className="addItem"><input type="text" /></div>
    {tasks.map(task => {
      return <div className="task">{task.title}</div>
    })}
  </main>
}

export default TasksComponent
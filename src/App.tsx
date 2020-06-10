import React, {useState} from 'react';
import './App.css';
import Tasks, { TaskTypes, taskTitles } from './components/Tasks';

export default function App () {
  const [current, setCurrent] = useState<TaskTypes>(TaskTypes.inbox);
  return (
    <div className="App">
      <header>{taskTitles[current]}</header>
      <Tasks current={current} />
      <nav>
        <button 
          className={current === TaskTypes.mits ? 'active' : ''}
          onClick={() => setCurrent(TaskTypes.mits)}>
            {taskTitles[TaskTypes.mits]}
        </button>
        <button
          className={current === TaskTypes.inbox ? 'active' : ''}
          onClick={() => setCurrent(TaskTypes.inbox)}>
            {taskTitles[TaskTypes.inbox]}
        </button>
        <button
          className={current === TaskTypes.bigrocks ? 'active' : ''}
          onClick={() => setCurrent(TaskTypes.bigrocks)}>
            {taskTitles[TaskTypes.bigrocks]}
        </button>
      </nav>
    </div>
  );
}

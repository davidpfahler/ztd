import React, {useState} from 'react';
import './App.css';
import Tasks, { TaskType } from './components/Tasks';

const titles = {
  inbox: 'Inbox',
  mits: 'MITs',
  bigrocks: 'Big Rocks',
}

export default function App () {
  const [current, setCurrent] = useState<TaskType>('inbox');
  return (
    <div className="App">
      <header>{titles.inbox}</header>
      <Tasks current={current} />
      <nav>
        <button 
          className={current === 'mits' ? 'active' : ''}
          onClick={() => setCurrent('mits')}>
            {titles.mits}
        </button>
        <button
          className={current === 'inbox' ? 'active' : ''}
          onClick={() => setCurrent('inbox')}>
            {titles.inbox}
        </button>
        <button
          className={current === 'bigrocks' ? 'active' : ''}
          onClick={() => setCurrent('bigrocks')}>
            {titles.bigrocks}
        </button>
      </nav>
    </div>
  );
}

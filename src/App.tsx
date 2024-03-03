import { useState, useEffect } from 'react';
import './App.css';
import ActiveTasks from './tasks/ActiveTasks';
import CompletedTasks from './tasks/CompletedTasks';

function App() {
  const [activeTab, setActiveTab] = useState('active');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [activeTasks,setActiveTasks]= useState<string[]>([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1500);
    return () => clearTimeout(timer); 
  }, [activeTab]); 

  const handleTabClick = (tab: 'active' | 'completed') => {
    setLoading(true);
    setActiveTab(tab);
  };
  const addTaskToActive =(task:string)=>{
    setActiveTasks([...activeTasks,task]);
  }
  const moveTaskToCompleted = (task: string) => {
    setCompletedTasks([...completedTasks, task]); 
  };
  
  const moveTaskToActive =(task: string) =>{
    setActiveTasks([...activeTasks,task]);
  }
  function removeTask(index: number, taskType: 'completed' | 'active') {
    if (taskType === 'completed') {
        const updatedItems = [...completedTasks];
        updatedItems.splice(index, 1);
        setCompletedTasks(updatedItems);
    } else if (taskType === 'active') {
        const updatedItems = [...activeTasks];
        updatedItems.splice(index, 1);
        setActiveTasks(updatedItems);
    }
}

  return (
    <>
   <div className='d-flex flex-column align-items-center justify-content-center container mt-3'>
      <h1 className="mb-4 text-white">Task Manager</h1>
      <p className="fw-bold text-white">Create and manage your tasks to keep track of your completed and active ones!</p>
    </div>
    <div className='container maindiv mt-5 border p-0'>
      <ul className="nav nav-tabs nav-justified">
        <li className="nav-item ">
        <a
            className={`nav-link fs-5 text-dark ${activeTab === 'active' ? 'active bg-grey' : ''}`}
            style={{ height: '100%' }}
            onClick={() => handleTabClick('active')}
          >
          Active</a> 
        </li>
        <li className="nav-item">
        <a
            className={`nav-link fs-5 text-dark ${activeTab === 'completed' ? 'active bg-grey' : ''}`}
            style={{ height: '100%' }}
            onClick={() => handleTabClick('completed')}
          >
          Completed </a> 
        </li>
      </ul>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
          <div className="spinner-border"></div>
        </div>
        ) : (
          activeTab === 'active' ? (
            <ActiveTasks
              moveTaskToCompleted={moveTaskToCompleted}
              addTaskToActive={addTaskToActive}
              removeTask={(index) => removeTask(index, 'active')}
              activeTasks={activeTasks}
            />
          ) : (
            <CompletedTasks
              moveTaskToActive={moveTaskToActive}
              completedTasks={completedTasks}
              removeTask={(index) => removeTask(index, 'completed')}
            />
          )
        )}
      </div>
    </>
  )
}

export default App

import { useState } from "react";

interface CompletedTasksProps {
  completedTasks: string[];
  removeTask: (index: number) => void;
  moveTaskToActive: (task: string) => void;
}

function CompletedTasks({ completedTasks, removeTask, moveTaskToActive }: CompletedTasksProps) {
   const [activeTasks, setActiveTasks] = useState<string[]>([]);

  function handleCheckboxChange(index: number) {
    const taskToMove = completedTasks[index];
    setActiveTasks([...activeTasks, taskToMove]); 
    removeTask(index);
    moveTaskToActive(taskToMove);
  }
  return (
    <div className="maindiv container p-4 my-2">
      {completedTasks.length === 0 ? (
          <p>No Completed Tasks</p>
        ) : ( 
          <ul className="list-unstyled">
        {completedTasks.map((task, index) => (
         
          <li key={index} className="d-flex align-items-center justify-content-between ml-5 border-bottom">
            <div className="d-flex align-items-center">
              <input 
              className="form-check-input me-2" 
              type="checkbox" 
              onChange={() => handleCheckboxChange(index)}
              checked={true}
              />
              <span key={index} className="text-white"style={{ fontWeight: 'bold' }}>{task}</span>
            </div>
            <button 
            className="removetask rounded-pill border-0 bg-danger mb-2 mt-2" 
            onClick={() => removeTask(index)}
            >
              Delete Task
            </button>
          </li>
         
        ))}
      </ul>
        )}
    </div>
  );
}

export default CompletedTasks;

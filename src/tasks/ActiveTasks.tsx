import { useState } from "react";

interface ActiveTasksProps {
  activeTasks: string[];
  removeTask: (index: number) => void;
  moveTaskToCompleted: (task: string) => void;
  addTaskToActive: (task: string) => void;
}

function ActiveTasks({ activeTasks, moveTaskToCompleted, addTaskToActive, removeTask }: ActiveTasksProps) {
 const [task, setTask] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    if (task.trim() !== "") {
      addTaskToActive(task);
      setTask(""); 
    }}
    function handleCheckboxChange(index: number) {
      const taskToMove = activeTasks[index];
      setCompletedTasks([...completedTasks, taskToMove]); 
      removeTask(index);
      moveTaskToCompleted(taskToMove);
    }
    return (
      <>
      <div className="maindiv container p-4 my-2">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="tasks"
          className="createinput"
          placeholder="Create a Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button 
        type="submit" 
        className="btn createbttn bg-danger"
        disabled={!task.trim()}
        >
          Create
        </button>
      </form>
      {activeTasks.length === 0 ? (
          <p>No Active Tasks</p>
        ) : (
      <ul  className="list-unstyled ">
          {activeTasks.map((listTask, index) => (
            <li key={index} className="d-flex align-items-center justify-content-between ml-5 border-bottom">
            <div className="d-flex align-items-center">
              <input 
              className="form-check-input me-2" 
              type="checkbox" 
              onChange={() => handleCheckboxChange(index)}
              />
              <span className="text-white"style={{ fontWeight: 'bold' }}>{listTask}</span>
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
       
      </>
    );
  
}
  export default ActiveTasks;
  
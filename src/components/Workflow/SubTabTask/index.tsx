import "./index.css";
import { useState } from "react";
import { useWorkflowStore } from "../../../state/workflow";
import { ReactComponent as TrashLogo } from "../../../design/WorkFlow/Icons/trashCan.svg";
import { ReactComponent as EditLogo } from "../../../design/WorkFlow/Icons/edit.svg";
import { Event_InfoDtoList } from "../../../types/workflow";
import LogicSelection from "../../../design/WorkFlow/LogicSelection";

function TaskItem({
  task,
  setAdd,
  setCurrentTask,
}: {
  task: {
    taskName: string;
    taskDesc: string;
  };

  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTask: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { taskName, taskDesc } = task;
  const { deleteTask } = useWorkflowStore((state) => state.utils);
  return (
    <div style={{ marginBottom: "18px", width: "90%" }}>
      <div style={{ fontSize: "24px" }}>
        {taskName}
        <span
          className="trash_button"
          style={{ float: "right", fontSize: "20px" }}
        >
          <span
            style={{ marginRight: "30px" }}
            onClick={() => {
              setAdd(false);
              setCurrentTask(task);
            }}
          >
            <EditLogo />
          </span>

          <span
            onClick={() => {
              deleteTask(taskName);
            }}
          >
            <TrashLogo />
          </span>
        </span>
      </div>
      <div style={{ fontSize: "18px" }}>{taskDesc}</div>
    </div>
  );
}

function TaskEdit({
  setAdd,
  task,
}: {
  setAdd: any;
  task: { taskName: string; taskDesc: string } | null;
}) {
  const { taskName, taskDesc } = task ? task : { taskName: "", taskDesc: "" };
  const [name, setName] = useState(taskName);
  const [taskDescription, setDescription] = useState(taskDesc);
  const { addTask, deleteTask } = useWorkflowStore((state) => state.utils);

  const [warning, setWarning] = useState(false);

  const tasks = useWorkflowStore((state) => state.currentEvent)().conditions.tasks
    .tasks;

  return (
    <div>
      <div>
        <label>Task Name</label>
        <input
          type="text"
          placeholder="Insert Task Name "
          className="inputs"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setWarning(false);
          }}
        />
        {warning ? <span>! Task with the same name already exists.</span> : ""}
      </div>
      <div style={{ marginTop: "18px" }}>
        <label>Descriptions</label>
        <textarea
          placeholder="Insert Event Name "
          className="inputs inputs_textArea"
          style={{ height: "120px" }}
          value={taskDescription}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div style={{ float: "right", marginTop: "80px" }}>
        <button
          className="details_button details_button--reverse"
          onClick={() => {
            setAdd(true);
          }}
        >
          Cancel
        </button>
        <button
          className={`details_button ${
            name && taskDescription ? "" : "details_button--disabled"
          }`}
          onClick={() => {
            if (name && taskDescription) {
              if (
                tasks.some(
                  (taskItem: { taskName: string }) =>
                    taskItem.taskName === name &&
                    taskItem.taskName !== task?.taskName
                )
              ) {
                setWarning(true);
              } else {
                if (task) deleteTask(taskName);
                addTask(name, taskDescription);
                setAdd(true);
              }
            }
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default function TaskTab() {
  const [add, setAdd] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);

  const currentEvent: Event_InfoDtoList = useWorkflowStore(
    (state) => state.currentEvent
  )();
  const task = currentEvent.conditions.tasks.tasks;
  const logicType = currentEvent.conditions.tasks.logicType;
  const editLogicType = useWorkflowStore((state) => state.utils.editTaskLogicType);

  return (
    <div
      className="details_container details_container_subTab"
      style={{ overflow: "visible" }}
    >
      {add ? (
        <div className="details_contents">
          {task.length > 1 ? (
            <LogicSelection logicType={logicType} select={editLogicType} />
          ) : (
            ""
          )}
          {task.map((task) => (
            <TaskItem
              key={task.taskName}
              task={task}
              setAdd={setAdd}
              setCurrentTask={setCurrentTask}
            />
          ))}
        </div>
      ) : (
        ""
      )}

      {add ? (
        <span
          onClick={() => {
            setCurrentTask(null);
            setAdd(false);
          }}
          className="details_addButton"
          style={{ position: "relative", top: "30px" }}
        >
          + Task Condition
        </span>
      ) : (
        <TaskEdit setAdd={setAdd} task={currentTask} />
      )}
    </div>
  );
}

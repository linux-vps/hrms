import React from 'react';
import { Button, Card , Checkbox } from '@/components/reactdash-ui';

function RecentTask(props) {
  // task list
  const task_list = [
    {label: "Add Navigation Bar", name: "task1", value: "1", checked: false},
    {label: "Fix bugs in dropdown", name: "task2", value: "1", checked: false},
    {label: "Change footer style", name: "task3", value: "1", checked: false},
    {label: "Add value in chart", name: "task4", value: "1", checked: true},
    {label: "Fix bugs in Collapse", name: "task5", value: "1", checked: true},
    {label: "Fix bugs in Add Cart", name: "task6", value: "1", checked: true},
    {label: "Fix bugs in Submenu", name: "task7", value: "1", checked: true},
    {label: "Create sidebar navigation", name: "task8", value: "1", checked: true}
  ]

  return (
    <Card>
      <div className="flex flex-row justify-between pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>
      <div className="relative">
        <form action="" method="get">
          <ul className="task-check h-60 overflow-y-auto scrollbars show mb-6">
            {/* task list  */}
            {task_list.map( (task, index) =>
            <li key={index} className="relative py-2">
              <Checkbox id={task.name} label={task.label} name={task.name} value={task.value} checked={task.checked} />
            </li>
            )}
          </ul>
          <div className="relative">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default RecentTask;
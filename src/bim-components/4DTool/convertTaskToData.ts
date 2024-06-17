import { IfcTask ,ScheduleData} from './IfcTask.ts';

interface ConvertedTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  parent: string | null;
}

function convertTasksToScheduleData(data:ScheduleData): ConvertedTask[] {
  const convertedTasks: ConvertedTask[] = [];

  function processTask(task: IfcTask, parentId: string | null): void {
    const baselineStart = Date.parse(task.Start);
    const baselineEnd = Date.parse(task.End);

    const convertedTask: ConvertedTask = {
      id: task.GlobalId,
      name: task.Name,
      start: new Date(baselineStart),
      end: new Date(baselineEnd),
      parent: parentId,
    };
    convertedTasks.push(convertedTask);

    task.Subtasks.forEach(subtask => {
      processTask(subtask, task.GlobalId);
    });
  }

  data.tasks.forEach(task => {
    processTask(task, null);
  });

  return convertedTasks;
}

export { convertTasksToScheduleData};




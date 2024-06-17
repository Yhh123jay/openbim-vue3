import { IfcTask } from '@/bim-components/4DTool/IfcTask.ts'

/**
 * 根据日期查找任务
 * @param tasks 任务列表
 * @param targetDate 目标日期
 * @returns 符合条件的任务列表
 */
function findTasks(tasks:IfcTask[], targetDate:Date) {
  let result:any[] = [];

  function traverseTasks(tasks:IfcTask[]) {
    tasks.forEach(task => {
      const endDate = new Date(task.End);
      if (endDate < targetDate) {
        let taskInfo = {
          GlobalId: task.GlobalId,
          RelatedObjects: task.RelatedObjects.map(obj => obj.ExpressId)
        };
        result.push(taskInfo);
      }
      if (task.Subtasks && task.Subtasks.length > 0) {
        traverseTasks(task.Subtasks);
      }
    });
  }

  traverseTasks(tasks);
  return result;
}
function extractRelatedObjects(tasks:IfcTask[]) {
  let relatedObjects:any[] = [];

  tasks.forEach(task => {
    relatedObjects = relatedObjects.concat(task.RelatedObjects);
  });

  return relatedObjects;
}
export {findTasks, extractRelatedObjects};
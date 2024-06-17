export interface IfcTask {
  GlobalId: string;
  Name: string;
  Description: string | null;
  Start: string;
  End: string;
  RelatedObjects: RelatedObject[];
  Subtasks: IfcTask[];
}
interface Relationship {
  From: string;
  To: string;
}
export interface ScheduleData {
  tasks: IfcTask[];
  relationships: Relationship[];
}
/**
 * 编写RelatedObject类，用于存储任务相关对象信息
 */
interface RelatedObject {
  GlobalId: string;
  ExpressId: number;
  Name: string;
  Type: string;
}

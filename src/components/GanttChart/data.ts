import { convertTasksToScheduleData } from '@/bim-components/4DTool/convertTaskToData.ts'
import { ScheduleData } from '@/bim-components/4DTool/IfcTask.ts'
import { useBimStore } from '@/store/modules/bimScene.ts'

//读取文件中的IfcTask数据，在public/assets/models/bridge/task.json下
const file = await fetch("/assets/models/bridge/task.json");
const data: ScheduleData = await file.json();
const bimStore = useBimStore()
bimStore.setScheduleData(data)
export const scheduleData = convertTasksToScheduleData(data);
// export const scheduleData1 = [
//   {
//     id: "1",
//     name: "Task 1",
//     // start: new Date(2022, 3, 1),
//     baselineStart: new Date(2022, 2, 20),
//     // end: new Date(2022, 3, 30),
//     baselineEnd: new Date(2022, 2, 15),
//     parent: null,
//   },
//   {
//     id: "2",
//     name: "Task 2",
//     // start: new Date(2022, 0, 12),
//     baselineStart: new Date(2022, 0, 6),
//     // end: new Date(2022, 1, 28),
//     baselineEnd: new Date(2022, 1, 20),
//     parent: "1",
//   },
//   {
//     id: "3",
//     name: "Task 3",
//     start: new Date(2022, 2, 1),
//     baselineStart: new Date(2022, 2, 1),
//     end: new Date(2022, 2, 15),
//     baselineEnd: new Date(2022, 2, 15),
//     parent: "1",
//   },
//   {
//     id: "4",
//     name: "Task 4",
//     start: new Date(2022, 0, 1),
//     baselineStart: new Date(2022, 0, 1),
//     end: new Date(2022, 0, 30),
//     baselineEnd: new Date(2022, 0, 30),
//     parent: "2",
//   },
//   {
//     id: "5",
//     name: "Task 5",
//     start: new Date(2022, 0, 12),
//     baselineStart: new Date(2022, 0, 12),
//     end: new Date(2022, 1, 28),
//     baselineEnd: new Date(2022, 1, 28),
//     parent: "2",
//   },
//   {
//     id: "6",
//     name: "Task 6",
//     start: new Date(2022, 2, 1),
//     baselineStart: new Date(2022, 2, 1),
//     end: new Date(2022, 2, 15),
//     baselineEnd: new Date(2022, 2, 15),
//     parent: 2,
//   },
//   {
//     id: "7",
//     name: "Task 7",
//     start: new Date(2022, 0, 15),
//     baselineStart: new Date(2022, 0, 1),
//     end: new Date(2022, 0, 30),
//     baselineEnd: new Date(2022, 0, 30),
//     parent: "3",
//   },
//   {
//     id: "8",
//     name: "Task 8 Task 8 Task 8 Task 8 Task 8 Task 8 Task 8 Task 8",
//     start: new Date(2022, 0, 12),
//     baselineStart: new Date(2022, 0, 12),
//     end: new Date(2022, 1, 28),
//     baselineEnd: new Date(2022, 1, 28),
//     parent: "1",
//   },
//   {
//     id: "9",
//     name: "Task 9",
//     start: new Date(2022, 2, 1),
//     baselineStart: new Date(2022, 2, 1),
//     end: new Date(2022, 2, 15),
//     baselineEnd: new Date(2022, 2, 15),
//     parent: "3",
//   },
//   {
//     id: "10",
//     name: "Task 10",
//     start: new Date(2022, 0, 15),
//     baselineStart: new Date(2022, 0, 1),
//     end: new Date(2022, 0, 30),
//     baselineEnd: new Date(2022, 0, 30),
//     parent: "2",
//   },
//   {
//     id: "11",
//     name: "Task 11",
//     start: new Date(2022, 0, 12),
//     baselineStart: new Date(2022, 0, 12),
//     end: new Date(2022, 1, 28),
//     baselineEnd: new Date(2022, 1, 28),
//     parent: "2",
//   },
//   {
//     id: "12",
//     name: "Task 12",
//     start: new Date(2022, 2, 1),
//     baselineStart: new Date(2022, 2, 1),
//     end: new Date(2022, 2, 15),
//     baselineEnd: new Date(2022, 2, 15),
//     parent: "3",
//   },
//   {
//     id: "13",
//     name: "Task 13",
//     start: new Date(2022, 0, 15),
//     baselineStart: new Date(2022, 0, 1),
//     end: new Date(2022, 0, 30),
//     baselineEnd: new Date(2022, 0, 30),
//
//     parent: "3",
//   },
//   {
//     id: "14",
//     name: "Task 14",
//     start: new Date(2022, 0, 12),
//     baselineStart: new Date(2022, 0, 12),
//     end: new Date(2022, 1, 28),
//     baselineEnd: new Date(2022, 1, 28),
//     parent: "2",
//   },
//   {
//     id: "15",
//     name: "Task 15",
//     start: new Date(2022, 2, 1),
//     baselineStart: new Date(2022, 2, 1),
//     end: new Date(2022, 2, 15),
//     baselineEnd: new Date(2022, 2, 15),
//     parent: "13",
//   },
//   {
//     id: "16",
//     name: "Task 16",
//     start: new Date(2022, 0, 15),
//     baselineStart: new Date(2022, 0, 1),
//     end: new Date(2022, 0, 30),
//     baselineEnd: new Date(2022, 0, 30),
//     parent: "13",
//   },
//   {
//     id: "17",
//     name: "Task 17",
//     start: new Date(2022, 0, 12),
//     baselineStart: new Date(2022, 0, 12),
//     end: new Date(2022, 1, 28),
//     baselineEnd: new Date(2022, 1, 28),
//     parent: "13",
//   },
//   {
//     id: "18",
//     name: "Task 18",
//     start: new Date(2022, 2, 1),
//     baselineStart: new Date(2022, 2, 1),
//     end: new Date(2022, 2, 15),
//     baselineEnd: new Date(2022, 2, 15),
//     parent: "1",
//   },
//   {
//     id: "19",
//     name: "Task 19",
//     start: new Date(2022, 0, 15),
//     baselineStart: new Date(2022, 0, 1),
//     end: new Date(2022, 0, 30),
//     baselineEnd: new Date(2022, 0, 30),
//     parent: "1",
//   },
//   {
//     id: "20",
//     name: "Task 20",
//     start: new Date(2022, 0, 12),
//     baselineStart: new Date(2022, 0, 12),
//     end: new Date(2022, 1, 28),
//     baselineEnd: new Date(2022, 1, 28),
//     parent: "1",
//   },
//   {
//     id: "21",
//     name: "Task 21",
//     start: new Date(2022, 2, 1),
//     baselineStart: new Date(2022, 2, 1),
//     end: new Date(2022, 2, 15),
//     baselineEnd: new Date(2022, 2, 15),
//     parent: "1",
//   },
//   {
//     id: "23",
//     name: "Task 23",
//     start: new Date(2022, 0, 12),
//     baselineStart: new Date(2022, 0, 12),
//     end: new Date(2022, 1, 28),
//     baselineEnd: new Date(2022, 1, 28),
//     parent: "4",
//   },
//   {
//     id: "24",
//     name: "Task 24",
//     start: new Date(2022, 2, 1),
//     baselineStart: new Date(2022, 2, 1),
//     end: new Date(2022, 2, 15),
//     baselineEnd: new Date(2022, 2, 15),
//     parent: "23",
//   },
//   {
//     id: "22",
//     name: "Task 22",
//     start: new Date(2022, 0, 15),
//     baselineStart: new Date(2022, 0, 1),
//     end: new Date(2022, 0, 30),
//     baselineEnd: new Date(2022, 0, 30),
//     parent: "24",
//   },
// ];

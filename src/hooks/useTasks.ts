import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";


type FirebaseTask = Record<string, {
  task_name: string,
  task_point: number,
}>

type TaskType = {
  task_id: string,
  task_name: string,
  task_point: number,
}

export function useTasks() {
  const database = getDatabase();
  const taskRef = ref(database, 'tasks/');
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);

  useEffect(() => {

    onValue(taskRef, tasks => {

      const databaseTasks: FirebaseTask = tasks.val();
      const parsedTasks = Object.entries(databaseTasks).map(([key, value]) => {

        return {
          task_id: key,
          task_name: value.task_name,
          task_point: value.task_point
        }
      })

      setAllTasks(parsedTasks);

    }, {
      onlyOnce: false
    });
  }, [])

  return allTasks;
}
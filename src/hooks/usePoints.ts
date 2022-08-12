import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";


type FirebasePoints = Record<string, {
  point_memberId: string,
  member_name: string,
  task: string,
  description: string,
  point: number,
  waiting: boolean,
  approved: boolean,
}>

type PointsType = {
  point_memberId: string,
  point_id: string,
  member_name: string,
  task: string,
  description: string,
  point_number: number,
  waiting: boolean,
  approved: boolean,
}

export function usePoints() {
  const database = getDatabase();
  const pointsRef =  ref(database, 'points/');
  const [ allPoints, setAllPoints ] = useState<PointsType[]>([]);

  useEffect(() => {

    onValue(pointsRef, points => {

      const databasePoints: FirebasePoints = points.val();
      const parsedPoints = Object.entries(databasePoints).map(([key, value]) => {

        return {
          point_memberId: value.point_memberId,
          point_id: key,
          member_name: value.member_name,
          task: value.task,
          description: value.description,
          point_number: value.point,
          waiting: value.waiting,
          approved: value.approved,
        }
      })
      
      setAllPoints(parsedPoints);

    }, {
      onlyOnce: false
    });
  }, [])

  return  allPoints;
}
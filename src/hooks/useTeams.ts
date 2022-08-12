import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";


type FirebaseTeam = Record<string,{
  name: string,
  group_points: number,
  team_points: number,
  total_points: number,
}>

type TeamType = {
  team_id: string,
  name: string,
  group_points: number,
  team_points: number,
  total_points: number,
}

export function useTeams() {
  const database = getDatabase();
  const teamsRef = ref(database, 'teams');
  const [ allTeams, setAllTeams ] = useState<TeamType[]>([])

  useEffect(() => {

    onValue(teamsRef, teams => {
      const databaseTasks: FirebaseTeam = teams.val();
      const parsedTeam = Object.entries(databaseTasks).map(([key, value]) => {

        return {
          team_id: key,
          name: value.name,
          group_points: value.group_points,
          team_points: value.team_points,
          total_points: value.total_points,
        }
      })

      setAllTeams(parsedTeam)

    }, {
      onlyOnce : false,
    })

  }, [])

  return allTeams;
}
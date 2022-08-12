import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";


type FirebaseMembers = Record<string, {
  member_id: string;
  name: string,
  avatar: string,
  sector: string,
  points: number,
  team: string,
}>

type MemberType = {
  member_firebase_key: string,
  member_id: string;
  name: string,
  avatar: string,
  sector: string,
  points: number,
  team: string,
}


export function useMembers() {
  const  [memberExists, setMemberExists] = useState(false);
  const database = getDatabase();
  const membersRef =  ref(database, 'members/');
  const [ allMembers, setAllMembers ] = useState<MemberType[]>([]);
  const { user, signInWithGoogle } = useAuth();

  useEffect(() => {
    onValue(membersRef, members => {
      const databaseMembers: FirebaseMembers = members.val();
      const parsedmembers = Object.entries(databaseMembers).map(([key, value]) => {
        if ( value.member_id === user?.id) {
          setMemberExists(true);
        }

        return {
          member_firebase_key: key,
          member_id: value.member_id,
          name: value.name,
          avatar: value.avatar,
          sector: value.sector,
          points: value.points,
          team: value.team,
        }
      })
      
      setAllMembers(parsedmembers);

    }, {
      onlyOnce: false
    });
  }, [memberExists])

  return {memberExists, allMembers};
}
import { child, get, getDatabase, ref } from 'firebase/database';
import { Link, useParams } from 'react-router-dom';

import { useMembers } from '../../hooks/useMember';

import { Head } from '../../components/header';

import './style.scss';
import { MemberCard } from '../../components/member-card';
import { usePoints } from '../../hooks/usePoints';
import { PointCard } from '../../components/point-card';

type MemberParams = {
  id: string;
}

type MemberType = {
  member_firebase_key: string,
  member_id: string;
  name: string,
  avatar: string,
  sector: string,
  points: number,
  team: string,
}

export function Member() {
  const params = useParams<MemberParams>();
  const memberId = params.id;

  const { memberExists, allMembers } = useMembers();
  const member = allMembers.find( (element: MemberType) => element.member_firebase_key === memberId)

  const allPoints = usePoints();
  
  return (
    <div>
      <Head />
      <main className='member-main'>
        <h1>Membro</h1>
        <MemberCard
          member_firebase_key={member?.member_firebase_key}
          member_id={member?.member_id}
          name={member?.name}
          avatar={member?.avatar}
          sector={member?.sector}
          points={member?.points}
          team={member?.team}
        />
        <h1>Pontos</h1>
        {allPoints.map(point => {
          return (
            <div className='points-list'>
              {point.point_memberId === member?.member_id && point.approved && (
                <PointCard
                key={point.point_id}
                member_name={point.member_name}
                task={point.task}
                description={point.description}
                waiting={true}
                approved={point.approved} 
                />
              )}
            </div>
          )
        })}
      </main>
    </div>
  )
}
import { Link } from 'react-router-dom'

import { useMembers } from '../../hooks/useMember';

import { MemberCard } from '../../components/member-card';

import logoVoluta from '../../assets/images/logoVoluta.png'

import './style.scss';
import { useState } from 'react';
import { useTeams } from '../../hooks/useTeams';
import { Head } from '../../components/header';


export function Ranking(){

  const { memberExists, allMembers } = useMembers();
  const allTeams = useTeams();
  const [ memberDisplayType , setMemberDisplayType] = useState(true);

  allMembers.sort( (a, b) => (a.points > b.points) ? -1 : 1 );
  allTeams.sort( (a, b) => (a.total_points > b.total_points) ? -1 : 1);

  return (
    <div>
      <Head>
        <ul className='header-list'>
          <li className='link-nav'>
            <Link to="/subir-pontos" >
              SUBIR PONTOS
            </Link>
          </li>
          <li className='link-nav'>
            <Link to="/ranking" >
              RANKING
            </Link>
          </li>
          <li className='link-nav'>
            <Link to="/requisicoes" >
              REQUISIÇÕES
            </Link>
          </li>
        </ul>
      </Head>
      <main className='ranking-main'>
        <div className="tags">
          <button autoFocus={memberDisplayType}
          onClick={() => setMemberDisplayType(true)}>MEMBROS</button>
          <button autoFocus={!memberDisplayType}
          onClick={() => setMemberDisplayType(false)}>CASAS</button>
        </div>
          {memberDisplayType ? (
            <div className="ranking-list">
              {allMembers.map(member => {
                return (
                  <Link to={`member/${member.member_firebase_key}`}>
                    <MemberCard
                    key={member.member_firebase_key}
                    member_firebase_key={member.member_firebase_key}
                    member_id={member.member_id}
                    name={member.name}
                    avatar={member.avatar}
                    sector={member.sector}
                    points={member.points}
                    team={member.team}
                  />
                  </Link>
                )
                
              })}
            </div>
          ) : (
            <div className="ranking-list">
              {allTeams.map(team => {
                return (
                  <div className="team-card" key={team.team_id}>
                    <p className="team-name">{team.name}</p>
                    <p className="team-grouppoints">Equipe: {team.group_points}</p>
                    <p className="team-points">Casa: {team.team_points}</p>
                    <p className="team-totalpoints">Total: {team.total_points}</p>
                  </div>
                )
              })}
            </div>
          )}

          
        
      </main>
    </div>
  )
}
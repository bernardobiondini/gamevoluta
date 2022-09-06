import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useMembers } from "../../hooks/useMember";

import './style.scss';

type MemberProps = {
  member_firebase_key?: string,
  member_id?: string;
  name?: string,
  avatar?: string,
  sector?: string,
  points?: number,
  team?: string,
  children?: ReactNode;
}


export function MemberCard({
  member_firebase_key,
  member_id,
  name,
  avatar,
  sector,
  points,
  team,
  children,
}: MemberProps) {

  return (  
      <div className="member-card">
        <img className="member-img" src={avatar} alt="" />
        <p className="member-name">{name}</p>
        <p className="member-team">{team}</p>
        <p className="member-points">{points}</p>
        {children && (
          <div className="approve-buttons">
            <span>{children}</span>
          </div>
        )}
      </div>
    
  )
}
import { ReactNode } from "react";

import './style.scss';

type TeamType = {
  name: string,
  group_points: number,
  team_points: number,
  total_points: number,
  children?: ReactNode;
}

export function TeamCard({
  name,
  group_points,
  team_points,
  total_points,
  children,
}: TeamType) {

  return (
    <div className="team-card">
      <p className="team-name">{name}</p>
      <p className="team-grouppoints">Equipe: {group_points}</p>
      <p className="team-points">Casa: {team_points}</p>
      <p className="team-totalpoints">Total: {total_points}</p>
      <div>{children}</div>
    </div>
  )
}
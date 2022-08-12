import { ReactNode } from 'react'

import './style.scss'

type PointProps = {
  member_name: string,
  task: string,
  description: string,
  waiting: boolean,
  approved: boolean,
  children?: ReactNode;
}

export function PointCard({
  member_name,
  task,
  description,
  waiting,
  approved,
  children,
}: PointProps) {


  return (
    <div className={`request-card ${waiting ? 'gray-bc' : (approved ? 'green-bc' : 'red-bc')}`}>
      <p className='member-name'>{member_name}</p>
      <p className='member-task'>{task}</p>
      <p className='member-description'>{description}</p>
      <div className="approve-buttons">
        {children}
      </div>
    </div>
  )
}
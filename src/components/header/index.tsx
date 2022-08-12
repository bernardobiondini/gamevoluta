import { ReactNode } from "react";

import { Link } from 'react-router-dom';
import logoVoluta from '../../assets/images/logoVoluta.png'

import './style.scss';

type MemberProps = {
  children: ReactNode
}

export function Head(props: MemberProps){
  return (
    <header>
        <div className="header-content">
          <Link to="/subir-pontos" >
            <img src={logoVoluta} alt="" />
          </Link>
          <nav>
            {props.children}
          </nav>
        </div>
      </header>
  )
}
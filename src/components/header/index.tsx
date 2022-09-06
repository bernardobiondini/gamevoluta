import { ReactNode } from "react";

import { Link } from 'react-router-dom';
import logoVoluta from '../../assets/images/logoVoluta.svg'

import './style.scss';

export function Head(){
  return (
    <header>
        <div className="header-content">
          <Link to="/" >
            <img src={logoVoluta} alt="" />
          </Link>
          <nav>
            <ul className='header-list'>
              <li className='link-nav'>
                <Link to="/" >
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
          </nav>
        </div>
      </header>
  )
}
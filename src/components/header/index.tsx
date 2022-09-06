import React from "react";
import { ReactNode, useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import logoVoluta from '../../assets/images/logoVoluta.svg'

import './style.scss';

export function Head(){

  const [ mobileMenu, setMobileMenu ] = useState(false);

  function handleMenu() {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true)
  }

  return (
    <header>
        <div className="header-content">
          <Link to="/" >
            <img src={logoVoluta} alt="" />
          </Link>
          <nav>
            <button className="hamb-menu" onClick={handleMenu} >
              <div></div>
              <div></div>
              <div></div>
            </button>
            <ul id="header-list" className={`${mobileMenu ? 'active' : 'inactive'}`}>
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
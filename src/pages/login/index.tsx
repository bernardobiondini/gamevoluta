import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useMembers } from '../../hooks/useMember';

import {  getDatabase, push, ref } from 'firebase/database';

import logoGoogleImg from '../../assets/images/google.svg';

import './style.scss'
import { useTeams } from '../../hooks/useTeams';

export function Home() {
  const navigate = useNavigate();

  const { user, signInWithGoogle } = useAuth();
  const { memberExists, allMembers } = useMembers();
  const  allTeams = useTeams();

  const [ memberSector, setMemberSector ] = useState('');
  const [ memberTeam, setMemberTeam ] = useState('');

  async function handleCreateMember(event: FormEvent) {
    event.preventDefault();
    
    await signInWithGoogle();
    
    if(user?.id === "LDi8zaAOBXNoYu5yIr3Q6ca158y2") {
      navigate('/admin/pontos');
      return;
    }

    const database = getDatabase();
    const membersRef =  ref(database, 'members/');

    if (!memberExists) {
      await push(membersRef, {
        member_id: user?.id,
        name: user?.name,
        avatar: user?.avatar,
        sector: memberSector,
        points: 0,
        team: memberTeam,
      })
    }
    
    navigate('/');
  }

  async function handleAdmin() {
    await signInWithGoogle();
    navigate('/admin/pontos')
  }

    return (
      <div>
        <main id='login-page'>
          <div className='login-container'>
            <h1>CADASTRE-SE</h1>
            <img src={logoGoogleImg} alt="Google" />

            <form id='form-login' onSubmit={handleCreateMember}>
              <datalist id="diretorias">
                <option value="Presidência" />
                <option value="Vice-Presidência" />
                <option value="Comercial" />
                <option value="Projetos" />
              </datalist>
              <datalist id="casas" >
                  {allTeams.map(team => {
                    return (
                      <option key={team.team_id} value={team.name} />
                    )
                  })}
                </datalist>

              <label>DIRETORIA</label>
              <input type="search" form='form-login' list="diretorias" required value={memberSector} onChange={event => setMemberSector(event.target.value)}/>
              <label>CASA</label>
              <input type="search" form='form-login' list="casas" required value={memberTeam} onChange={event => setMemberTeam(event.target.value)}/>
              <Link to="/" >JÁ É CADSTRADO?</Link>
              <button className="button-link" onClick={handleAdmin} >É DA VICE-PRESIDÊNCIA?</button>
              <button form='form-login' >CADASTRAR</button>
            </form>
          </div>
        </main>
      </div>
    )
  }
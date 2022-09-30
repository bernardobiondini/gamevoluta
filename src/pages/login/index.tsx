import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { useMembers } from '../../hooks/useMember';

import {  getDatabase, push, ref } from 'firebase/database';

import logoGoogleImg from '../../assets/images/google.svg';

import './style.scss'
import { useTeams } from '../../hooks/useTeams';
import { Button } from '../../components/button';

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
      <main id='login-page'>
        <section className='login-container'>
          <h1>CADASTRE-SE</h1>
          <img src={logoGoogleImg} alt="Google" />

          <form id='form-login' onSubmit={handleCreateMember}>
            <label>DIRETORIA</label>
            <select form='form-login' required value={memberSector} onChange={event => setMemberSector(event.target.value)}>
              <option>Selecione sua diretoria</option>
              <option value="Presidência">Presidência</option>
              <option value="Vice-Presidência">Vice-Presidência</option>
              <option value="Comercial">Comercial</option>
              <option value="Projetos">Projetos</option>
            </select>
            {/* <input type="search" form='form-login' list="diretorias" required value={memberSector} onChange={event => setMemberSector(event.target.value)}/> */}
            
            <label>CASA</label>
            <select form='form-login' required value={memberTeam} onChange={event => setMemberTeam(event.target.value)} >
              <option>Selecione sua diretoria</option>
              {allTeams.map(team => {
                  return (
                    <option key={team.team_id} value={team.name}>{team.name}</option>
                  )
                })}
            </select>
            {/* <input type="search" form='form-login' list="casas" required value={memberTeam} onChange={event => setMemberTeam(event.target.value)}/> */}
            
            <Link to="/" >JÁ É CADSTRADO?</Link>
            <button className="button-link" onClick={handleAdmin} >É DA VICE-PRESIDÊNCIA?</button>
            <Button type='submit' form='form-login'>CADASTRAR</Button>
          </form>
        </section>
      </main>
    )
  }
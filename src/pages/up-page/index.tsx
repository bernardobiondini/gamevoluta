import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import {  getDatabase, push, ref } from 'firebase/database';

import { useMembers } from '../../hooks/useMember';
import { useTasks } from '../../hooks/useTasks';

import logoVoluta from '../../assets/images/logoVoluta.png'

import './style.scss'
import { Head } from '../../components/header';
import { Footer } from '../../components/footer';

export function UpPoints(){
  const { memberExists, allMembers } = useMembers();
  const allTasks = useTasks();

  const [ memberName, setMemberName ] = useState('');
  const [ memberTask, setMemberTask ] = useState('');
  const [ taskDescription, setTaskDescription ] = useState('');
  var taskPoint: number;

  async function handleSubmitPoint (event: FormEvent){ 
    event.preventDefault();

    const database = getDatabase();
    const pointsRef =  ref(database, 'points/');

    allTasks.map(task => {
      if(task.task_name === memberTask){
        taskPoint = task.task_point;
      }
    })

    allMembers.map(async member => {
      if(member.name === memberName) {
        await push(pointsRef, {
          point_memberId: member.member_id,
          member_name: member.name,
          task: memberTask,
          description: taskDescription,
          point: taskPoint,
          waiting: true,
          approved: false,
        })
      }
    })

    setMemberName("");
    setMemberTask("");
    setTaskDescription("");
  }

  return (
    <div id='upPoints-page'>
      <Head>
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
      </Head>
      <main className='upPoints-main'>
          <div className='title-content'>
            <h1>SUBA SEUS PONTOS</h1>
          </div>
          <div className='form-content'>
            <form id="task-form" onSubmit={handleSubmitPoint}>
              <datalist id="tasks" >
                {allTasks.map(task => {
                  return (
                    <option key={task.task_id} value={task.task_name} />
                  )
                })}
              </datalist>
              <datalist id="members" >
                {allMembers.map(member => {
                  return (
                    <option key={member.member_id} value={member.name} />
                  )
                })}
              </datalist>
              <label >MEMBRO</label>
              <input type="search" form='task-form' list="members" value={memberName} onChange={event => setMemberName(event.target.value)}/>
              <label>TAREFA</label>
              <input type="search" form='task-form' list="tasks" value={memberTask} onChange={event => setMemberTask(event.target.value)} />
              <label>DESCRIÇÃO</label>
              <textarea value={taskDescription} onChange={event => setTaskDescription(event.target.value)}/>
              <button >ENVIAR PONTO</button>
            </form>
            <Link to="/cadastro">É membro da Voluta? Faça seu cadastro</Link>
          </div>
      </main>

      <Footer></Footer>
    </div>
  )
}
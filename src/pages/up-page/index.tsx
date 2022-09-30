import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import {  getDatabase, push, ref } from 'firebase/database';

import { useMembers } from '../../hooks/useMember';
import { useTasks } from '../../hooks/useTasks';

import logoVoluta from '../../assets/images/logoVoluta.png'

import './style.scss'
import { Head } from '../../components/header';
import { Footer } from '../../components/footer';
import { Button } from '../../components/button';

export function UpPoints(){
  const { memberExists, allMembers } = useMembers();
  const allTasks = useTasks();

  const [ selectedMember, setSelectedMember] = useState('');

  const [ memberName, setMemberName ] = useState('');
  const [ memberTask, setMemberTask ] = useState('');
  const [ taskDescription, setTaskDescription ] = useState('');
  var taskPoint: number;

  async function handleSubmitPoint (event: FormEvent){ 
    event.preventDefault();

    const database = getDatabase();
    const pointsRef =  ref(database, 'points/');

    console.log("cheguei aqui" + selectedMember);

    // verificar se option/select possui essa funcionalidade


    // e possivel ter acesso a quantidade de pontos já na hora em que a task é escolhida
    // passar objeto, ao invéd de uma string (nome da task) ?????
    allTasks.map(task => {
      if(task.task_name === memberTask){
        taskPoint = task.task_point;
      }
    })

    // é possivel otimizar essa parte tambem? passando um objeto membro????
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
    <>
      <Head />
      <main className='upPoints-main'>
          <div className='title-content'>
            <h1>SUBA SEUS PONTOS</h1>
          </div>
          <div className='form-content'>
            <form id="task-form" onSubmit={handleSubmitPoint}>
              {/* <datalist id="tasks" >
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
              </datalist> */}
              <label htmlFor='member-select' >MEMBRO</label>
              <select name="selectedMember" form='task-form' id="member-select" value={memberName} onChange={event => setMemberName(event.target.value)}>
                <option >Selecione o nome do membro</option>
                {allMembers.map(member => {
                  return (
                    <option key={member.member_id} value={member.name}>{member.name}</option>
                  )
                })}
              </select>
              {/* <input type="search" form='task-form' list="members" value={memberName} onChange={event => setMemberName(event.target.value)}/> */}
              <label htmlFor='task-select' >TAREFA</label>
              <select name="selectTask" form='task-form' id="task-select" onChange={event => setMemberTask(event.target.value)} >
                <option >Selecione a tarefa realizada</option>
                {allTasks.map(task => {
                  return (
                    <option key={task.task_id} value={task.task_name}>{task.task_name}</ option>
                  )
                })}
              </select>
              {/* <input type="search" form='task-form' list="tasks" value={memberTask} onChange={event => setMemberTask(event.target.value)} /> */}
              <label htmlFor='textarea-form' >DESCRIÇÃO</label>
              <textarea id='textarea-form' form='task-form' value={taskDescription} onChange={event => setTaskDescription(event.target.value)} />
              <Button  type='submit' form='task-form' >ENVIAR PONTO</Button>
            </form>
            <Link to="/cadastro">É membro da Voluta? Faça seu cadastro</Link>
          </div>
      </main>

      <Footer></Footer>
    </>
  )
}
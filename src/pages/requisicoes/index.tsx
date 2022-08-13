import { Link } from 'react-router-dom'

import { usePoints } from '../../hooks/usePoints';

import { PointCard } from '../../components/point-card';

import logoVoluta from '../../assets/images/logoVoluta.png'

import './style.scss';
import { Head } from '../../components/header';
import { Footer } from '../../components/footer';

export function Requisicoes(){

  const allPoints = usePoints();

  return (
    <div>
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
      <main className='requisicoes-main'>
        <div className="requests-list">
          {allPoints.map(points => {
            return (
              <PointCard
                key={points.point_id}
                member_name={points.member_name}
                task={points.task}
                description={points.description}
                waiting={points.waiting}
                approved={points.approved} 
              />
            )
          })
          }
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}
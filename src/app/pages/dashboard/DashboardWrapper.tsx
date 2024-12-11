/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import ChatBot from 'react-simple-chatbot';
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
  ChartsWidget1,
  ChartsWidget2,
  ChartsWidget3,
} from '../../../_metronic/partials/widgets'
import { useAuth } from '../../modules/auth'
import ExampleDBPedia from './ExampleDBPedia';



const DashboardPage: FC = () => {
  
  const { currentUser } = useAuth();

  return(
  <>
    {/* begin::Row */}
   


    {/* end::Row */}

    {/* begin::Row */}
   
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gy-5 gx-xl-8'>
      <div className=''>
      {currentUser && currentUser.role === 'admin' && (
      <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' />
      )}
      </div>

      
     
    </div>

    <div className='row gy-5 gx-xl-8'>
      <div className=''>
      {currentUser && currentUser.role === 'admin' && (
      <ChartsWidget3 className='card-xl-stretch mb-5 mb-xl-8' />
      )}
      </div>

      
     
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    
    {/* end::Row */}


    {/* begin::Row */}
    <div
  className="d-flex justify-content-center align-items-center"
  style={{ height: '100vh', backgroundColor: '#f8f9fa' }} 
>
  <div
    className="d-flex flex-column justify-content-center align-items-center"
    style={{
      width: '60%',
      height: '70%',
      backgroundColor: '#ffffff', 
      borderRadius: '10px', 
     
      padding: '20px', 
    }}
  >
    <h2 className="text-center mb-4">Chatbot Example</h2>
    <ExampleDBPedia />
  </div>
</div>

    {/* end::Row */}

    
    </>
  );
};





const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
      
    </>
  )
}

export {DashboardWrapper}

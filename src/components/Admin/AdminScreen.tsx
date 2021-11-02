


import { useSelector } from 'react-redux'
import './AdminScreen.css'
import { Dash } from './Dash'
import { EventsAdmin } from './EventsAdmin'
import { SideBar } from './SideBar'
import { VentasAdmin } from './VentasAdmin'


export const AdminScreen = () => {

    const { admin } = useSelector((state: any) => state.admin)



    return (
        <>
  
            <div className="containerScreem">
              
                <SideBar />
                {admin === 1 ? <Dash /> : admin === 2 ?  <EventsAdmin /> : <VentasAdmin/>}

            </div>
        </>
    )
}

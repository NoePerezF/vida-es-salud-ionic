import { IonItem, IonLabel, IonList, useIonLoading, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter } from '@ionic/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { environment } from './enviroment'

const Negocios = () => {

    const env = environment
    const [negocios, setnegocios] = useState([])
    const history = useHistory()
    const [loading, dismiss] = useIonLoading()
    const [cargando, setcargando] = useState(false)
    const location = useLocation();


     useEffect(() => {
        
        console.log("Useeffect triggered");
        
         getNegocios();
     },[])

     const getNegocios = useCallback(async () => {
        
            console.log("Encendiendo carga.........");
            await loading({
                massage : 'Cargando...',
                spinner : 'circular'
              })

        
        const response = await fetch(env.baseUrl+'negocio/getnegocios',
        { 
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            mode: 'cors', // 
            cache: 'default',
          })
        const resJson = await response.json()
        console.log(resJson);

            console.log("Apagando carga.........");
            await dismiss()
            

        
        setnegocios(resJson)
     },[])
     
     const getNegocio = (e) =>{
        e.preventDefault()
        const servicio = negocios.filter(n => n.id == e.target.id)[0]
        console.log(servicio);
        return "/main/profilenegocio/"+servicio.id
     }

     return(
        <IonList>
            {negocios.length > 0 && negocios.map(negocio =>{
                return(
              
                            <IonItem key={negocio.id} routerLink={"/main/profilenegocio/"+negocio.id} className="ion-margin-bottom">
                                <IonLabel id={negocio.id} >
                                {negocio.nombre}
                                <br/>
                                <br/>
                                {negocio.direccion?.calle + ' ' + negocio.direccion?.numero}
                            </IonLabel>
                            </IonItem>
                    
                )
            })}
        </IonList>
     )
}

export default Negocios
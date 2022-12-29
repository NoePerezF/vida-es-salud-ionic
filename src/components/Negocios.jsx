import { IonItem, IonLabel, IonList } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { environment } from './enviroment'

const Negocios = () => {

    const env = environment
    const [negocios, setnegocios] = useState([])
    const history = useHistory()

    const getNegocios = async () => {
        const response = await fetch(env.baseUrl+'negocio/getnegocios',
        { 
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            mode: 'cors', // 
            cache: 'default',
          })
        const resJson = await response.json()
        setnegocios(resJson)
     }

     useEffect(() => {
       return () => {
         getNegocios()
       }
     },[])
     
     const getNegocio = (e) =>{
        e.preventDefault()
        const servicio = negocios.map(n =>{
            return(
                n.servicios.filter(s => s.id == e.target.id)
            )
        })[0][0]
        history.push("/main/programarcita/"+servicio.id)
     }

     return(
        <IonList>
            {negocios.length > 0 && negocios.map(negocio =>{
                return(
                    negocio.servicios.length > 0 && negocio.servicios.map(
                        servicio =>{
                            return(
                            <IonItem key={servicio.id}>
                                <IonLabel id={servicio.id} onClick={getNegocio}>
                                {negocio.nombre}
                                <br/>
                                {servicio.nombre}
                                <br/>
                                {servicio.descripcion}
                                <br/>
                                {negocio.direccion.calle + ' ' + negocio.direccion.numero}
                            </IonLabel>
                            </IonItem>
                            )
                        }
                    )
                    
                )
            })}
        </IonList>
     )
}

export default Negocios
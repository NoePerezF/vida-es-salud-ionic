import { IonItem, IonLabel, IonList } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { environment } from './enviroment'

const Negocios = () => {

    const env = environment
    const [negocios, setnegocios] = useState([])

    const getNegocios = async () => {
        const response = await fetch(environment.baseUrl+'negocio/getnegocios',
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
     }, [])
     
     const getNegocio = (e) =>{
        e.preventDefault()
        const negocioSelected = negocios.filter(n => n.id == e.target.id)[0]
        console.log(e);
        console.log(e.target);
        console.log(negocioSelected);
     }

     return(
        <IonList>
            {negocios.length > 0 && negocios.map(negocio =>{
                return(
                    <IonItem key={negocio.id}>
                        <IonLabel id={negocio.id} onClick={getNegocio}>
                            {negocio.nombre}
                            <br/>
                            {negocio.direccion.calle + ' ' + negocio.direccion.numero}
                        </IonLabel>
                    </IonItem>
                )
            })}
        </IonList>
     )
}

export default Negocios
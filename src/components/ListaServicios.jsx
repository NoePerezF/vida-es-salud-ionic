import { IonButtons, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonLoading } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { environment } from './enviroment';
import { useParams } from 'react-router';

const ListaServicios = () => {

    const env = environment
    const {idNegocio} = useParams();
    const [loading, dismiss] = useIonLoading()
    const [servicios, setservicios] = useState(undefined)

    useEffect(() => {
        getServicios();
      }, [idNegocio])

      const getServicios = async () => {
        await loading({
            massage : 'Cargando...',
            spinner : 'circular'
          })
          const response = await fetch(env.baseUrl+'servicios/pornegocio/'+idNegocio,
          { 
              headers: { 'Content-Type': 'application/json' },
              method: 'GET',
              mode: 'cors', // 
              cache: 'default',
            })
            const resJson = await response.json()
            console.log(resJson);

                await dismiss()
            await setservicios(resJson)
    }

  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Servicios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
      <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Servicios</IonTitle>
          </IonToolbar>
        </IonHeader>
    <IonGrid className='ion-margin-top'>
    <IonList>
            {servicios && servicios.length > 0 && servicios.map(servicio =>{
                return(
              
                            <IonItem key={servicio.id} routerLink={"/main/programarcita/"+servicio.id}  className="ion-margin-bottom">
                                <IonLabel id={servicio.id} >
                                <h1>{servicio.nombre}</h1>
                                <br/>
                                <br/>
                                {servicio.descripcion}
                                <br/>
                                <br/>
                                Horario: {servicio.horario}
                                <br/>
                                <br/>
                                Precio: ${servicio.precio}
                            </IonLabel>
                            </IonItem>
                    
                )
            })}
        </IonList>
        {servicios && servicios.length == 0 ? 
        <h1>Este negocio no presta ningun servicio</h1> : <></>}
        
    </IonGrid>
    </IonContent>
    </IonPage>
  )
}

export default ListaServicios
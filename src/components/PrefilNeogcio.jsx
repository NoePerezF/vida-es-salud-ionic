import { IonAvatar, IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonImg, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import banner from '../assets/Usuario.svg'
import { environment } from './enviroment'

const PrefilNeogcio = () => {
    const env = environment
    const {idNegocio} = useParams();
    const [loading, dismiss] = useIonLoading()
    const [negocio, setnegocio] = useState(undefined)
    const history = useHistory()


    useEffect(() => {
      getNegocio();
    }, [idNegocio])
    


    const getNegocio = async () => {
        await loading({
            massage : 'Cargando...',
            spinner : 'circular'
          })
          const response = await fetch(env.baseUrl+'negocio/getnegocio/'+idNegocio,
          { 
              headers: { 'Content-Type': 'application/json' },
              method: 'GET',
              mode: 'cors', // 
              cache: 'default',
            })
            const resJson = await response.json()
            console.log(resJson);

                await dismiss()
            await setnegocio(resJson)
    }
    const routeServicios = () => {
      history.push(`/main/servicios/${negocio.id}`)
    }


  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Perfil del negocio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen >
      <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil del negocio</IonTitle>
          </IonToolbar>
        </IonHeader>
    <IonGrid className='ion-margin-top'>
        <IonRow className='ion-justify-content-center'>
            <IonAvatar style={{width:"200px",height: "200px"}}>
                <IonImg src={banner}/>
            </IonAvatar>
            
        </IonRow>
        <IonRow className='ion-justify-content-center'>
        <h1>{negocio && negocio.nombre}</h1>
        </IonRow>
        <IonRow className='ion-justify-content-center'>
        <p className="title">Direccion: {negocio && negocio.direccion && (negocio.direccion?.calle + negocio.direccion?.numero)}</p>
        </IonRow>
        <IonRow className='ion-justify-content-center'> 
        <p>Horario: {negocio && (negocio.horario)}</p>
        </IonRow>
        <IonRow className='ion-justify-content-center'> 
        <p>Email: {negocio && (negocio.email)}</p>
        </IonRow>
        <IonRow className='ion-justify-content-center'>
          <IonButton onClick={routeServicios}>Ver servicios</IonButton>
        </IonRow>
    </IonGrid>
    </IonContent>
    </IonPage>
  
 

  )
}

export default PrefilNeogcio
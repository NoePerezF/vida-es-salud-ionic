import { IonButton, IonButtons, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonLoading } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { environment } from './enviroment';

const ProgramarCita = ({usuario}) => {

    const { servicio } = useParams();
    const history = useHistory();
    const [presentAlert] = useIonAlert();
    const env = environment;
    const datetime = useRef(null);
    const [minDate, setminDate] = useState("1999-12-25T00:00:00")
    const [horaServer, sethoraServer] = useState("")
    const [loading, dismiss] = useIonLoading()
    

    useEffect(() => {

      

        getDateTimeServer()
    },[])

    const getDateTimeServer = async () => {
      await loading({
        massage : 'Cargando...',
        spinner : 'circular'
      })
      const dateTimeResponse = await fetch(env.baseUrl+"negocio/gerhora",
      { 
          method: 'GET',
          mode: 'cors', // 
          cache: 'default',
        })
      const dateTime = await dateTimeResponse.text();
      sethoraServer(datetime);
      setminDate((dateTime.split(" ")[0].split("-").reverse().join("-"))+"T"+dateTime.split(" ")[1]);
      await dismiss()

  }


  const cancel = () => {
    datetime.current?.cancel();
    history.goBack()
  }
  const confirm = async () => {
    const timeCita = {
      fecha : datetime.current.value,
      cliente : {
        id : usuario.id
      }
    }
    const servicioObject = {
      id : parseInt(servicio),
      citas : [timeCita]
    }
    const jsonBody = await JSON.stringify(servicioObject)
    console.log(jsonBody);
    const response = await fetch(env.baseUrl+"servicios/addcita",
        { 
          headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            mode: 'cors', // 
            body : jsonBody,
            cache: 'default',
            
          })
    console.log(response);
    const responseJson = await response.json()
    console.log(responseJson);
    console.log(datetime.current);
    console.log(datetime.current.value);
    history.goBack()
  }

  const showAlert = () => {
    datetime.current?.confirm();
    const fechaSplit = datetime.current.value.split("T")
    const hora = fechaSplit[1].split('-')[0].split(':')
    presentAlert({
        header: '¡Importante!',
        message:'Desea confirmar la cita para el dia '+ 
        fechaSplit[0].split('-').reverse().join('-') + ' a las ' + hora[0] + ':' + hora[1],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              confirm()
            },
          },
        ]
      })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Programar cita</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Programar cita</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent padding class="ion-align-items-center">
        <IonGrid style={{height: "100%"}}>
        <IonRow class="ion-align-items-center " style={{height : "100%"}}>
          <IonCol>
          <IonRow class="ion-justify-content-center">
          <IonCol size='12'>
          <IonDatetime presentation="date-time" ref={datetime}
          min = {minDate} hourCycle="h23"
          minuteValues="0,30" hourValues={"9,10,11,12,13,14,15,16,17,18,19"}  >
          <IonButtons slot="buttons">
        <IonButton color="danger" onClick={cancel}>Cancelar</IonButton>
        <IonButton color="primary" onClick={showAlert}>Programar cita</IonButton>
      </IonButtons>
          </IonDatetime>
          </IonCol>
        </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
    
  )
}

export default ProgramarCita
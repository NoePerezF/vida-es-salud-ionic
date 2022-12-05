import {IonButton, IonCard, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonRow, useIonAlert, useIonLoading,} from '@ionic/react';
import { text } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect } from 'react-router';
import Logo from '../assets/logo.svg'
import { environment } from './enviroment';

const Login = () => {
  const env = environment

  const [user, setuser] = useState('')
  const [pass, setpass] = useState('')
  const [red, setred] = useState(0)
  const [loading, dismiss] = useIonLoading()
  const [alert] = useIonAlert()

  const handleUser = (e) =>{
    setuser(e.target.value);
  }

  const handlePass = (e) => {
    setpass(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    fetchLogin()
  }

  const fetchLogin = async () => {
    await loading({
      massage : 'Cargando...',
      spinner : 'circular'
    })
    const data = {
      usuario : user,
      contrasena : pass
    }
    const bodyJson = JSON.stringify(data)
    console.log(bodyJson);
    const res = await fetch(env.baseUrl+'cliente/login',{ 
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      mode: 'cors', // 
      body : bodyJson,
      cache: 'default',
    })
    let responseJson
    await res.status === 200 ?
    responseJson = await res.json() :
    responseJson = await res.text()
    await res.status !== 200 &&
    alert({
      header: responseJson,
      buttons: [
        {
          text : 'Ok',
          role : 'cancel'
        }
      ]
    })
    await dismiss()
    res.status === 200 &&
    setred(2)
  }
  
  const register = () =>{
    setred(1)
  }
    
  return (
    
      red === 0 ? 
      <IonGrid style={{height: "100%"}}>
  <IonRow className='ion-justify-content-center ion-align-items-center' style={{height: "100%"}}>
    <IonCard className='ion-text-center ion-padding'>
        <IonImg src={Logo} style={{height: "250px",width: "250px"}}/>
        <IonItem className='ion-margin-bottom'>
            <IonLabel position="floating">Usuario</IonLabel>
            <IonInput type='text' onInput={handleUser}/>
        </IonItem>
        <IonItem className='ion-margin-bottom'>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type='password' onInput={handlePass}/>
        </IonItem>
        <IonRow className='ion-text-center ion-justify-content-center'>
        <IonButton className='ion-margin-bottom' onClick={submit}>Ingresar</IonButton>
        </IonRow>
        
        <IonButton className='ion-margin-bottom' onClick={register}>Registrarse</IonButton>
    </IonCard>
  </IonRow>
</IonGrid> : red === 1 ?
  <Redirect to={"/register"}/> :
  <Redirect to={"/main"}/>
    
  )
}

export default Login
import { IonButton, IonCard, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonRow, useIonAlert } from "@ionic/react"
import { useState } from "react"
import Logo from "../assets/logo.svg"
import { environment } from "./enviroment"
const Register = () => {

    const [nombre, setnombre] = useState('')
    const [apellidop, setapellidop] = useState('')
    const [apellidom, setapellidom] = useState('')
    const [email, setemail] = useState('')
    const [telefono, settelefono] = useState('')
    const [user, setuser] = useState('')
    const [pass, setpass] = useState('')
    const [passc, setpassc] = useState('')
    const [alert] = useIonAlert()

    const env = environment

    const handleNombre = (e) => {
        setnombre(e.target.value)
    }

    const handleApellidoP = (e) => {
        setapellidop(e.target.value)
    }

    const handleApellidoM = (e) => {
        setapellidom(e.target.value)
    }

    const handleEmail = (e) => {
        setemail(e.target.value)
    }

    const handleTelefono = (e) => {
        settelefono(e.target.value)
    }

    const handleUser = (e) => {
        setuser(e.target.value)
    }

    const handlePass = (e) => {
        setpass(e.target.value)
    }

    const handlePassC = (e) => {
        setpassc(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        fetchAddCliente()
    }

    const fetchAddCliente = async () => {
        if(pass !== passc){
            alert({
                header : 'Las contraseñas no coinciden',
                buttons : [{
                    text: "Ok",
                    role : "cancel"
                }]
            }) 
        }else{
            const data = {
                nombre : nombre,
                apellido_paterno : apellidop,
                apellido_materno : apellidom,
                usuario : user,
                contrasena : pass,
                email : email,
                telefono : telefono
            }
            const bodyJson = JSON.stringify(data)
            const response = await fetch(env.baseUrl+'cliente/addcliente',{
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                mode: 'cors', // 
                body : bodyJson,
                cache: 'default',
            })
        }

    }

  return (
    <IonContent fullscreen={true} className="ion-padding">
    <IonGrid style={{height: "100%"}}>
        <IonRow className='ion-justify-content-center ion-align-items-center' style={{height: "100%"}}>
            <IonCard className='ion-text-center ion-padding scroll-content'>
                <IonImg src={Logo} style={{height: "250px",width: "250px"}}/>

                    <IonItem className='ion-margin-bottom'>
                        <IonLabel position="floating">Nombre</IonLabel>
                        <IonInput type='text' onInput={handleNombre}/>
                    </IonItem>

                    <IonItem className='ion-margin-bottom'>
                        <IonLabel position="floating">Apellido Paterno</IonLabel>
                        <IonInput type='text' onInput={handleApellidoP}/>
                    </IonItem>

                    <IonItem className='ion-margin-bottom'>
                        <IonLabel position="floating">Apellido Materno</IonLabel>
                        <IonInput type='text' onInput={handleApellidoM}/>
                    </IonItem>

                    <IonItem className='ion-margin-bottom'>
                        <IonLabel position="floating">Correo electronico</IonLabel>
                        <IonInput type='email' onInput={handleEmail}/>
                    </IonItem>

                    <IonItem className='ion-margin-bottom'>
                        <IonLabel position="floating">Telefono</IonLabel>
                        <IonInput type='tel' onInput={handleTelefono}/>
                    </IonItem>

                    <IonItem className='ion-margin-bottom'>
                        <IonLabel position="floating">Usuario</IonLabel>
                        <IonInput type='text' onInput={handleUser}/>
                    </IonItem>

                    <IonItem className='ion-margin-bottom'>
                        <IonLabel position="floating">Contraseña</IonLabel>
                        <IonInput type='password' onInput={handlePass}/>
                    </IonItem>

                    <IonItem className='ion-margin-bottom'>
                        <IonLabel position="floating">Confirmar contraseña</IonLabel>
                        <IonInput type='password' onInput={handlePassC}/>
                    </IonItem>


                <IonButton className='ion-margin-bottom' onClick={submit}>Registrarse</IonButton>
         </IonCard>
        </IonRow>
    </IonGrid>
    </IonContent>
  )
}

export default Register
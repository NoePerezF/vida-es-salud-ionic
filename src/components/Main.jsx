import { IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router'
import Page from '../pages/Page'
import Menu from './Menu'
import PrefilNeogcio from './PrefilNeogcio'
import ProgramarCita from './ProgramarCita'
import ListaServicios from './ListaServicios'

const Main = ({usuario}) => {
  return (
    <IonPage>
        <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/main" exact={true}>
              <Redirect to="/main/page/Inicio" />
            </Route>
            <Route path="/main/page/:name" >
              <Page />
            </Route>
            <Route path="/main/programarcita/:servicio" >
              <ProgramarCita usuario={usuario} />
            </Route>
            <Route path="/main/profilenegocio/:idNegocio" >
              <PrefilNeogcio />
            </Route>
            <Route path="/main/servicios/:idNegocio" >
              <ListaServicios />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>

    </IonPage>
  )
}

export default Main
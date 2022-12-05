import { IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router'
import Page from '../pages/Page'
import Menu from './Menu'

const Main = () => {
  return (
    <IonPage>
        <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/main" exact={true}>
              <Redirect to="/main/page/Inbox" />
            </Route>
            <Route path="/main/page/:name" >
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>

    </IonPage>
  )
}

export default Main
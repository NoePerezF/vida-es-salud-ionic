import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';
import { useState } from 'react';

setupIonicReact();

const App: React.FC = () => {

  const [usuario, setusuario] = useState({})

  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path={"/"} >
          <Login setUsuario = {setusuario}/>
        </Route>
        <Route path={"/main"}>
          <Main usuario = {usuario}/>
        </Route>
        <Route path={"/register"} component={Register}/>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

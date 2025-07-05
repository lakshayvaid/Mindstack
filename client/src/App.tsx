
import './App.css'


import { LoginComponent } from './components/LoginComponent';
import { SignupComponent } from './components/SignupComponent.';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardComponent } from './components/DashboardComponent';
import { ShareMindComponent } from './components/ShareMindComponent';
import { SharableContent } from './components/SharableContent';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

export default function App() {

  return <>
<BrowserRouter>
<Routes>

  <Route  path="/" element={<SignupComponent/>} />
    <Route  path="/signup" element={<SignupComponent/>} />
      <Route  path="/login" element={<LoginComponent/>} />

     <Route path="/dashboard" 
     element={
      <PrivateRoute>{<DashboardComponent/>}</PrivateRoute>
     }
     />
     <Route path="/ShareMind" element={<ShareMindComponent/>}/>
     <Route path="/mindstack/share/:shareid" element={<SharableContent/>}/>
    



</Routes>




</BrowserRouter>


  </>
}

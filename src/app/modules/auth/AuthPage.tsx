import {Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {AuthLayout} from './AuthLayout'
import { SetPassword } from './components/SetPassword'
import Visiteur from './components/Visiteur'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='SetPassword/:email' element={<SetPassword />} />
      <Route path='Visiteur' element={<Visiteur />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}

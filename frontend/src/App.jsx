import './App.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import { useState,useEffect } from 'react'
import supabase from '../supabaseClient'

function App() {
  const [session, setSession] = useState(null)
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log(session )
        setSession(session)
      })
      return () => subscription.unsubscribe()
    }, [])
  return (
    <>
      <Router>
        <Routes>
          {session ? <Route path='/' element={<Home />}/> : <Route path='/' element={<Login />}/>}
          <Route path='/auth/signup' element={<SignUp />}/>
          <Route path='/auth/login' element={<Login />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

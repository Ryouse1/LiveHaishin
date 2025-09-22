import { UserProvider, useUser } from './context/UserContext'
import Login from './auth/Login'
import StreamPage from './pages/StreamPage'

function AppContent() {
  const user = useUser()
  return user ? <StreamPage /> : <Login />
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

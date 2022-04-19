import React, { useEffect, useState } from 'react';
import AppRouter from './router/AppRouter';
import { User } from './types/userType';
import { me } from './utils/apiUtils';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
  const currentUser = await me();
  setCurrentUser(currentUser)
}
function App() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    getCurrentUser(setCurrentUser)
  }, [])
  return <>
    <ReactNotifications />
    <AppRouter currentUser={currentUser} />
  </>
}

export default App;

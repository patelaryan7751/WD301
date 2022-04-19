import React, { useEffect, useState } from 'react';
import AppRouter from './router/AppRouter';
import { User } from './types/userType';
import { me } from './utils/apiUtils';

const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
  const currentUser = await me();
  setCurrentUser(currentUser)
}
function App() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    getCurrentUser(setCurrentUser)
  }, [])
  return <AppRouter currentUser={currentUser} />
}

export default App;

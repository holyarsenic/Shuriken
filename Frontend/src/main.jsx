import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { UserProvider } from './context/user.jsx'
import { PostProvider } from './context/specificPost.jsx'
import { HomeProvider } from './context/homePost.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <HomeProvider>
      <PostProvider>
        <App />
      </PostProvider>
      </HomeProvider>
    </UserProvider>
  </StrictMode>
)
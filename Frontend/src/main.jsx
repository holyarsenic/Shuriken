import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { UserProvider } from './context/user.jsx'
import { PostProvider } from './context/specificPost.jsx'
import { HomeProvider } from './context/homePost.jsx'
import { ProfileProvider } from './context/userProfile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <HomeProvider>
          <PostProvider>
            <ProfileProvider>
              <App />
            </ProfileProvider>
          </PostProvider>
        </HomeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
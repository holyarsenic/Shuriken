import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { UserProvider } from './context/user.jsx'
import { PostProvider } from './context/specificPost.jsx'
import { HomeProvider } from './context/homePost.jsx'
import { ProfileProvider } from './context/userProfile.jsx'
import { ChannelProvider } from './context/channelProfile.jsx'
import { LikedPostProvider } from './context/likedPosts.jsx'
import { CommentsProvider } from './context/commentPage.jsx'
import { DashboardProvider } from './context/dashboardStats.jsx'
import { EditPostProvider } from './context/editPost.jsx'
import { FollowListProvider } from './context/followList.jsx'
import { ThemeProvider } from './context/theme.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
          <UserProvider>
            <HomeProvider>
              <PostProvider>
                <CommentsProvider>
                  <ProfileProvider>
                        <DashboardProvider>
                          <EditPostProvider>
                            <ChannelProvider>
                              <FollowListProvider>
                                <LikedPostProvider>
                                              <App />
                                </LikedPostProvider>
                            </FollowListProvider>
                            </ChannelProvider>
                          </EditPostProvider>
                        </DashboardProvider>
                  </ProfileProvider>
                </CommentsProvider>
              </PostProvider>
            </HomeProvider>
          </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
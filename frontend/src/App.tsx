import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup  from './pages/Signup'
import  Signin  from './pages/Signin'
import  {Blog}  from './pages/Blog'
import {Blogs} from './pages/Blogs'
import { Publish } from './pages/Publish'
import { Update } from './pages/Update'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { useInitializerUser } from './hooks/Auth'

function App() {
  useInitializerUser()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={< Publish/>} />
          <Route path="/update/:id" element={< Update/>} />
          <Route path="/" element={< Home/>} />
          <Route path="/dashboard" element={< Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
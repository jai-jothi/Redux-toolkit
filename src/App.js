
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AddPostsForm from './features/posts/AddPostForm';
import PostList from './features/posts/PostLists';

import Layout from './Components/Layout';
import Singlepostpage from './features/posts/Singlepostpage';
import Editpostform from './features/posts/Editpostform'
import UserLists from './features/users/UserLists';
import Userpage from './features/users/Userpage';
function App() {
  return(
  
    <Routes>
      <Route path="/" element={<Layout/>}>
           <Route index element={<PostList/>}/>
           <Route path="post">
            <Route index element={<AddPostsForm/>}/>
            <Route path=":postId" element={<Singlepostpage/>}/>
            <Route path="edit/:postId" element={<Editpostform/>}/>
           </Route>
           <Route path='user'>
            <Route index element={<UserLists/>}/>
            <Route path=':userId' element={<Userpage/>}/>
           </Route>
    <Route path='*' element={<Navigate to="/" replace/>}/>
      </Route>
    </Routes>
  )
}

export default App;

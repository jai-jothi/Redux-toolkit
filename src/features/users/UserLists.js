import React from 'react'
import { useSelector } from 'react-redux';
import { userSelectAll } from './UserSlice';
import { Link } from 'react-router-dom';

 const UserLists = () => {
 
    const users=useSelector(userSelectAll);

    const renderUser=users.map(user => (
        <li key={user.id}>
    <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))
  return (
     <section>
        <h2>Users</h2>
        <ul>{renderUser}</ul>
     </section>
  )
}
export default UserLists;

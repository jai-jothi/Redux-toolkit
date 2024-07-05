import { Outlet } from "react-router-dom";//main section thavra remain yella outlet la vaikalam
 import Header from './Header'

 
 const Layout = () => {
   return (
     <>
     <Header/>
     <main className="App">
        <Outlet/>
     </main>
     </>
   )
 }
 
 export default Layout
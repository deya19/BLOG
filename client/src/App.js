import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Error from "./pages/error";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ReadMore from "./pages/readMore";
import Register from "./pages/register";
import Single from "./pages/single";
import Write from "./pages/write";
import"./style.scss"





///Router between Pages

// use to route between pages that have the same navbar and footer
const Layout = () => { 
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
 }


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      }, 
      {
        path:"/more/:id",
        element:<ReadMore/>
      },
      {
        path:"/profile/:id",
        element:<Profile/>
      },
    ]
  },
  {
    path: "/register",
    element:<Register/>,
  },
  {
    path: "/login",
    element:<Login/>,
  },
  {
    path: "*",
    element:<Error/>,
  }
]);




function App() {
  return (
    <div className="app">
      <section className="container">
       <RouterProvider router={router}/>
      </section>
    </div>
  );
}



export default App;

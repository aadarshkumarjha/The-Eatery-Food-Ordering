import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
// default import
import Header from './components/Header';
import Body from './components/Body.js';
import Footer from './components/Footer.js';
import { createBrowserRouter,RouterProvider, Outlet } from 'react-router-dom';
import About from './components/About';
import Error from './components/Error';
import Contact from './components/Contact';
import RestaurantMenu from './components/RestaurantMenu';
import Profile from './components/Profile';
import Shimmer from './components/Shimmer';
import UserContext from './utils/userContext.js';
import { Provider } from 'react-redux';
import store from './utils/store';
import Cart from './components/Cart.js'


const Instamart = lazy(()=> import('./components/Instamart'));
const AppLayout = () => {
  const [user, setUser] = useState({
    name: 'dummyname',
    login: 'dummylogin'
  });
  useEffect(()=>{
    getUserInfo();
  },[])
  async function getUserInfo(){
    const data = await fetch('https://api.github.com/users/vineetkhemnani');
    const json = await data.json();
    setUser(json);
  }
  return (
    <Provider store={store}>
      {/* provide store to entire app */}
      <UserContext.Provider value={{
        user: user,
        setUser: setUser
      }}>
        <Header />
        {/* Place where I want to render random things ex:- Body, About , Contact us */}
        {/* {Outlet} */}
        <Outlet />
        <Footer />
      </UserContext.Provider>
    </Provider>
  )
}

const appRouter = createBrowserRouter([
  // place where we define what happens when load /path
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/About',
        element: <About />,
        children: [
          {
            // route relative to about
            // localhost:1234/About/profile 
            // omit the "/"
            path: "profile",
            element: <Profile/>
            // to render this, we need an outlet
          }
        ]
      },
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/Contact',
        element: <Contact />,
      },
      {
        path: '/Instamart',
        element: (
          <Suspense fallback={<Shimmer/>}>
            <Instamart/>
          </Suspense>
        ),
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantMenu />,
      },
      {
        path: '/Cart',
        element: <Cart />
      }
    ],
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<RouterProvider router={appRouter}/>);

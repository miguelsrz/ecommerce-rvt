import { useRoutes, BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../context/appContext';

import Layout from "../../components/Layout/Layout"

import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrders from '../MyOrders';
import MyOrder from '../MyOrder';
import SignIn from '../SignIn';
import NotFound from '../NotFound';

import Navbar from '../../components/Navbar/Navbar';

import './App.css';

const AppRoutes = () =>
{
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/:category', element: <Home />},

    {path: '/my-account', element: <MyAccount />},

    {path: '/my-orders', element: <MyOrders />},

    {path: '/my-orders/:id', element: <MyOrder />},
    {path: '/sign-in', element: <SignIn />},
    {path: '/*', element: <NotFound />}
  ])

  return routes;
}


function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </AppProvider>
    
  )
}

export default App

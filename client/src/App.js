import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScrollToTop from './common/scrollToTop';

//scss file
import "./sass/main.scss"

//landing Page
import Homepage from './views/home';

//footer
import Footer from './components/footer';
import LandingPage from './views/LandingPage';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import ForgotPass from './components/auth/forgotPass';
import Otp from './components/auth/otp';
import ResetPass from './components/auth/resetPass';
import Payment from './components/payment';


import AdminManagement from './API management/AdminManagement' 

import Policy from './components/policy';
import CategoryItem from './Containers/CategoryItem';



function App() {
//   const loader = document.querySelector(".preloader");

// const showLoader = () => loader.classList.remove("preloader");
// const addClass = () => loader.classList.add("loader-hide");
//   useEffect(() => {
//     showLoader();
//     addClass();
//   }, []);
  return (
    <div>
       <Router>
        <ScrollToTop>
        <switch>

          {/*Landing page route (when user is not logged in) */}
          <Route path="/" exact component={LandingPage} />

         {/*Signup page route */}
         {/* <Route path="/signup" component={Signup} /> */}

         {/*Login page route */}
         {/* <Route path="/login" component={Login} /> */}

         {/*forgot password page route */}
         {/* <Route path="/forgot-password" component={ForgotPass} /> */}

         {/*enter otp page route */}
         {/* <Route path="/enter-otp" component={Otp} /> */}

         {/*reset password page route */}
         {/* <Route path="/reset-password" component={ResetPass} /> */}

         {/*reset password page route */}
         {/* <Route path="/pay" component={Payment} /> */}

          {/*HomePage route (when user is logged in) */}
          <Route path="/home" component={Homepage} />

          {/* Admin Management */}
          <Route path="/admin" component={AdminManagement} />

          {/*Policy*/}
          <Route path="/policy" component={Policy} />

          {/*Category Item*/}
          <Route path='/collections/:collectionName' render={(props) => <CategoryItem  {...props} key={props.location.key} />} />

        </switch>
        </ScrollToTop>
        <Footer />
      </Router>
    </div>
  );
}

export default App;


// "start": "set PORT=3001 && react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
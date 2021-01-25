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
         
          {/*HomePage route (when user is logged in) */}
          <Route path="/upload-design/home" component={Homepage} />

        </switch>
        </ScrollToTop>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;

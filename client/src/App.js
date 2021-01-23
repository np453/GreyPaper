import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//scss file
import "./sass/main.scss"

//Homepage component
import Homepage from './views/home';



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
         
          {/*HomePage route*/}
          <Route path="/" exact  component={Homepage} />
        </switch>
        </ScrollToTop>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

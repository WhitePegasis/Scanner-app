// import {Link} from 'react-router-dom';

// function Home(){
//     return (
//         <div>
//             <Link to='/component1'><button>Qr Scanner</button></Link>
//             <Link to='/component2'><button>image Scanner</button></Link>
//         </div>
//     );
// }

// export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import './homestyles.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Scanner App</h1>
      <div className="button-container">
        <Link to="/component1" className="scanner-button">
          <button className='home-buttons'>QR Scanner</button>
        </Link>
        <Link to="/component2" className="scanner-button">
          <button className='home-buttons'>Image Scanner</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

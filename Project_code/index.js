import React from 'react'
import abclogo from './Component/abclogo.svg'
import hrclogo from './Component/hrclogo.svg'
import './index.css'
// import { Button } from '@mui/material';
import GridComponent from './Component/Table'


function Index() {

  /*Function for Buttons*/
 
  return (
    <div>
    <header>
      <div >
        <img src={abclogo} alt="abc logo" className='App-logo'/>
        <img src={hrclogo} alt="Company Logo" className="Com-logo" />
      </div>
    </header>
    <h3 id='TableDetails'>
          Invoice List
      </h3>
   <body>
      <GridComponent/>
    
   </body>
     
     
  
      

<footer id='footer'>
  <p> Privacy policy @ 2023 High Radius Corporation.All rights reserved.</p>
</footer>
</div>



  )
}

export default Index
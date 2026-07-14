import React from 'react'
import loading from './loading.gif'

const Spinner =() => {
  
    return (
      <div>
        <div className="text-center my-10" >
            <img src={loading} alt="Loading..." />
        </div>
      </div>
    )
  }

  export default Spinner;

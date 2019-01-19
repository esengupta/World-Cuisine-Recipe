import React from 'react';

const Jumbotron = (props) => {
  return (
    <div className="jumbotron jumbotron-fluid" >
      <div className="container">
        <h1 className="jumboh1 text-center">{props.pagename}</h1>
        <h3 className="jumboh3 text-center">{props.description}</h3>
      </div>
    </div>
  )
}

export default Jumbotron;
import React from 'react';

const Jumbotron = (props) => {
  return (
    <div className="jumbotron jumbotron-fluid" >
      <div className="container">
        <h1 className="display-4 text-center">{props.pagename}</h1>
        <p className="lead text-center">{props.description}</p>
      </div>
    </div>
  )
}

export default Jumbotron;
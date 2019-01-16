import React from 'react';

const cardStyle = {
  width: '30%'
}

const Card = (props) => {
  return (
    <div className="card m-2" style={cardStyle} >
      {props.thumbnail ?
        (<img className="card-img-top" src={props.thumbnail} alt="Recipe" />)
        :
        (<p className="text-center">No image available</p>)
      }
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.ingredients}</p>
        <a href={props.href} className="btn btn-primary">View Recipe</a>
      </div>
    </div>)
}

export default Card;
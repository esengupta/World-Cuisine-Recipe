import React from 'react';

const Card = (props) => {
  return (
    <div className="card" >
      <img className="card-img-top" src={props.thumbnail} alt="Recipe" />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.ingredients}</p>
        <a href={props.href} className="btn btn-primary">View Recipe</a>
      </div>
    </div>
  )
}

export default Card;
import React from 'react';

const cardStyle = {
  width: '20rem'
}

const Card = (props) => {
  return (
    <div className="card m-2" style={cardStyle} >
      {props.picture ?
        (<img className="card-img-top" src={props.picture} alt="Recipe" />)
        :
        (<p className="text-center">No image available</p>)
      }
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.ingredients}</p>
        <p className="card-text">{props.dietLabels}</p>
        <p className="card-text">{props.healthLabels}</p>
      </div>
      <div className="card-footer">
        <a href={props.url} className="btn btn-primary btn-sm mr-3">View Recipe</a>
        <a href='#' className="btn btn-primary btn-sm">Favorite</a>
      </div>
    </div>)
}

export default Card;
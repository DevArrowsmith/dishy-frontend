import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../styles/RatingCard.css";
import "../../../styles/common/buttons.css";

function RatingCard({ rating }) {
  // const [showScore, setShowScore] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // const handleScore = (e) => {
  //   e.preventDefault();
  //   setShowScore(!showScore);
  // };

  const handleDetails = (e) => {
    e.preventDefault();
    if (e.target.className !== "deleteRating") {
      setShowDetails(!showDetails);
    }
  };

  return (
    <>
      <button type="submit" className="RatingCard" onClick={handleDetails}>
        <div className="RatingCard-top-container">
          <div className="RatingCard-left-container">
            <p>{rating.name}</p>
            <p>Distance: {rating.distance}m</p>
            <div>
              {/* {showScore ? (
              <div>
                <div>
                  {rating.scores.map((score) => (
                    <div>{score}</div>
                  ))}
                </div>
              </div>
            ) : (
              rating.averageScore
            )} */}
              {/* {rating.scores.length > 1 && (
              <button type="submit" onClick={handleScore}>
                scores
              </button>
            )} */}
            </div>
          </div>
          <div id="RatingCard-right-container">
            <div className="rating-circle">
              <p>{rating.averageScore}</p>
            </div>
          </div>
        </div>
        {showDetails && (
          <div className="RatingCard-address">
            <p>Address:</p>
            <p>{rating.address.address1}</p>
            <p>{rating.address.address2}</p>
            <p>{rating.address.city}</p>
            <p>{rating.address.zip_code}</p>
          </div>
        )}
      </button>
      {showDetails && (
        <a
          className="pink-button rating-card-button"
          href={`https://www.google.com/maps/@${rating.coordinates.latitude},${rating.coordinates.longitude},30z`}
          target="_blank"
          rel="noreferrer noopener"
        >
          View in Google Maps
        </a>
      )}
      <div id="card-separator" />
    </>
  );
}

RatingCard.propTypes = {
  rating: PropTypes.shape({
    user: PropTypes.number,
    name: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.number),
    distance: PropTypes.number,
    averageScore: PropTypes.number,
    scores: PropTypes.arrayOf(PropTypes.number),
    address: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
      city: PropTypes.string,
      zip_code: PropTypes.string,
    }),
    coordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    accessToken: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

// RatingCard.propTypes = {
//   rating: PropTypes.shape({
//   user: PropTypes.number,
//   name: PropTypes.string,
//   users: PropTypes.arrayOf(PropTypes.number),
//   distance: PropTypes.number,
//   averageScore: PropTypes.number,
//   scores: PropTypes.arrayOf(PropTypes.number),
//   address: PropTypes.shape({
//   address1: PropTypes.string,
//   address2: PropTypes.string,
//   city: PropTypes.string,
//   zip_code: PropTypes.string,
//   }),
//   coordinates: PropTypes.shape({
//     latitude: PropTypes.number,
//     longitude: PropTypes.number,
//     }),
//   }).isRequired,
//   user: PropTypes.shape({
//   id: PropTypes.number,
//   accessToken: PropTypes.string,
//   username: PropTypes.string,
//   }).isRequired,
//   };

export default RatingCard;

// {
//   showDetails && (
//     <a
//       href={`https://www.google.com/maps/@${rating.coordinates.latitude}, ${rating.coordinates.longitude},18z`}
//     >
//       View in Google Maps
//     </a>
//   );
// }

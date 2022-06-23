import React from 'react'
import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";



const Rating = ({ rating, numReviews }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '110px' }}>
        <div>
          <span>
            {rating >= 1 ? <FaStar color='#ffc000' /> : rating >= 0.5 ? <FaStarHalfAlt color='#ffc000' /> : <AiOutlineStar color='#ffc000' />}
          </span>
          <span>
            {rating >= 2 ? <FaStar color='#ffc000' /> : rating >= 1.5 ? <FaStarHalfAlt color='#ffc000' /> : <AiOutlineStar color='#ffc000' />}
          </span>
          <span>
            {rating >= 3 ? <FaStar color='#ffc000' /> : rating >= 2.5 ? <FaStarHalfAlt color='#ffc000' /> : <AiOutlineStar color='#ffc000' />}
          </span>
          <span>
            {rating >= 4 ? <FaStar color='#ffc000' /> : rating >= 3.5 ? <FaStarHalfAlt color='#ffc000' /> : <AiOutlineStar color='#ffc000' />}
          </span>
          <span>
            {rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalfAlt color='#ffc000' /> : <AiOutlineStar color='#ffc000' />}
          </span>
        </div>
        <div style={{ marginLeftL: '3px' }}>{rating}</div>
      </div>
      <div>
        Reviews: <strong> {numReviews}</strong>
      </div>
    </>
  )
}

export default Rating
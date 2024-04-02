import React from 'react'
import { IMG_CDN } from '../utils/constants'

export const MovieCard = ({posterPath}) => {
  return (
    <div className='md:w-48 w-40 pr-4 transition-transform transform hover:scale-90 cursor-pointer'>
      <img className='object-cover rounded-lg' src={IMG_CDN + posterPath} alt='movie poster' />
    </div>
  )
}

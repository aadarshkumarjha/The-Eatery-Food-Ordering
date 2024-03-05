import { useContext } from 'react'
import { IMAGE_CDN_URL } from '../constants'
import UserContext from '../utils/userContext'

const RestaurantCard = ({ name, cuisines, avgRating, cloudinaryImageId }) => {
  // console.log(restaurant.info)
  const { user } = useContext(UserContext)
  return (
    <div className="h-80 w-56 p-2 m-2 shadow-md bg-purple-50 rounded-lg">
      <img src={IMAGE_CDN_URL + cloudinaryImageId} alt="" />
      <h2 className="text-xl font-bold">{name}</h2>
      <h3>{cuisines.join(', ')}</h3>
      <h4
        className={
          avgRating < 4
            ? avgRating < 3
              ? 'bg-red-500 rounded inline-block p-1'
              : 'bg-orange-500 rounded inline-block p-1'
            : 'bg-green-500 rounded inline-block p-1'
        }
      >
        {avgRating} stars
      </h4>
      {/* <h5>{user.name}</h5> */}
    </div>
  )
}

export default RestaurantCard

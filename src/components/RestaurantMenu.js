import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMAGE_CDN_URL } from '../constants'
import Shimmer from './Shimmer'
import useRestaurant from '../utils/useRestaurant'
import cartSlice, { addItem, removeItem } from '../utils/cartSlice'
import { useDispatch } from 'react-redux'

const RestaurantMenu = () => {
  const params = useParams()
  // console.log(params);
  const { id } = params;

  const restaurant = useRestaurant(id)[0];
  const restaurantMenu = useRestaurant(id)[1];
  
  const dispatch = useDispatch();
  const addFoodItem = (item) => {
    dispatch(addItem(item));
  }
  // const handleAddItem = () => {
  //   dispatch(addItem('Grapes'));
  // }
  // const handleRemoveItem = () => {
  //   dispatch(removeItem('Grapes'));

  // }
  
  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="menu flex">
      <div>
        <h1>Restaurant id: {id}</h1>
        <h2 className="font-bold text-3xl mb-4">{restaurant?.name}</h2>
        <img
          id="restroImg"
          src={IMAGE_CDN_URL + restaurant?.cloudinaryImageId}
          alt=""
        />
        <h2>{restaurant?.areaName}</h2>
        <div
          className={
            restaurant?.avgRating < 4
              ? restaurant?.avgRating < 3
                ? 'bg-red-500 rounded inline-block p-1'
                : 'bg-orange-500 rounded inline-block p-1'
              : 'bg-green-500 rounded inline-block p-1'
          }
        >
          {restaurant?.avgRating} stars
        </div>
        <h3>{restaurant?.costForTwoMessage}</h3>
        {/* <button className='bg-blue-500 p-1 m-1' onClick={()=>handleAddItem()}>Add</button>
        <button className='bg-red-500 p-1 m-1' onClick={()=>handleRemoveItem()}>Remove</button> */}
      </div>
      <div className="ml-10">
        <h1 className="font-bold text-xl">Menu</h1>
        <ul data-testid="menu">
          {restaurantMenu.map((item) => (
            <li key={item?.card?.info?.id}>
              <div className="border rounded-md shadow-md bg-slate-200 w-96 m-5 p-5 flex justify-between">
                <p>{item?.card?.info?.name}</p>
                <p>Rs. {item?.card?.info?.price / 100}</p>
                <button
                data-testid="add-btn"
                  className="rounded bg-green-200 p-1"
                  onClick={() => addFoodItem(item?.card?.info)}
                >
                  Add Item
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
// data.cards[0].card.card.info.city
// data.cards[0].card.card.info.cloudinaryImageId
// data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards[0].card.info
// data.cards[2].groupedCard?.cardGroupMap?.REGULAR.cards[2]?.card?.card?.itemCards[0]?.card?.info?.name
export default RestaurantMenu

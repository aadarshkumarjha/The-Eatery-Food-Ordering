import { restaurantList } from '../constants'
import RestaurantCard from './restaurantCard'
import { useState, useEffect, useContext } from 'react'
import Shimmer from './Shimmer'
import { Link } from 'react-router-dom'
import { filterData } from '../utils/helper'
import useOnline from '../utils/useOnline'
// import useOnline from "../utils/useOnline";
import UserContext from '../utils/userContext'
const Body = () => {
  const { user, setUser } = useContext(UserContext)

  const [allRestaurants, setAllRestaurants] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  // create local state variable in React
  const [searchText, setSearchText] = useState('')

  // useEffect(()=>{
  //   console.log("call this when dependency is changed")
  // },[searchText]);
  useEffect(() => {
    getRestaurants()
  }, [])
  async function getRestaurants() {
    const data = await fetch(
      'https://the-eatery-backend.vercel.app/api/restaurants'
    )
    // console.log(data)
    const json = await data.json()
    console.log(json)
    setAllRestaurants(
      // optional chaining
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )
    setFilteredRestaurants(
      // optional chaining
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    )
  }
  // console.log("render");
  // not render component => Early return
  if (!allRestaurants) return null

  // const isOnline = useOnline();
  // if(!isOnline) {
  //   return <h1>🔴 Offline, please check your internet connection!!</h1>;
  // }

  // if(filteredRestaurants?.length === 0)
  //   return <h1>No restaurants match your filter</h1>
  return allRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container p-5">
        <input
          data-testid="input-box"
          type="text"
          className=" shadow w-72 outline outline-1 rounded focus:outline-blue-700 focus:outline-2 m-2 p-2"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
        <button
          data-testid="search-btn"
          className="search-btn p-2 m-2 bg-blue-300 rounded-md shadow hover:bg-blue-400"
          onClick={() => {
            // need to filter the data
            const data = filterData(searchText, allRestaurants)
            // update the state - restaurants
            setFilteredRestaurants(data)
          }}
        >
          Search
        </button>
        {/* <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          value={user.login}
          onChange={(e) => setUser({ ...user, login: e.target.value })}
        /> */}
      </div>
      {/* conditional rendering */}
      {filteredRestaurants.length === 0 ? (
        <h1 className="font-bold text-3xl">No restaurants match your filter</h1>
      ) : (
        <div className="flex flex-wrap justify-center" data-testid="res-list">
          {/* RestaurantCard(restaurants[0]) */}
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={'/restaurant/' + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard {...restaurant.info} />
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Body

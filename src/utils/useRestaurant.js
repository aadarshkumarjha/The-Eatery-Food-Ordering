import { useState, useEffect } from 'react'
import { FETCH_MENU_URL } from '../constants'
const useRestaurant = (id) => {
  const [restaurant, setRestaurant] = useState(null)
  const [restaurantMenu, setRestaurantMenu] = useState([])
  useEffect(() => {
    getRestaurantInfo()
  }, [])
  async function getRestaurantInfo() {
    try {
      // const data = await fetch('http://localhost:3000/api/restaurants/menu/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({"id":id}),
      // })
      //   .then((response) => response.json())
      //   // .then((data) => {
      //   //   // Process the data received from the backend
      //   //   console.log(data)
      //   // })
      //   .catch((error) => {
      //     console.error('Error fetching data:', error)
      //   })
      const restaurantId = id

      // Append the restaurantId to the URL as a query parameter
      const apiUrl = `https://the-eatery-backend.vercel.app/restaurant/menu?restaurantId=${restaurantId}`

      // Make a GET request to the backend API
      await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Process the data received from the backend
          // console.log(data)
          const json = data
          const itemCards =
            json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
              ?.card?.itemCards
          // console.log(json.data.cards);
          setRestaurant(json?.data?.cards[0]?.card?.card?.info)
          setRestaurantMenu(itemCards)
          console.log(itemCards)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
        
      // const json = data
      // const itemCards =
      //   json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      //     ?.card?.itemCards
      // // console.log(json.data.cards);
      // setRestaurant(json?.data?.cards[0]?.card?.card?.info)
      // setRestaurantMenu(itemCards)
      // console.log(itemCards)
    } catch (error) {
      console.log(error)
    }
  }
  return [restaurant, restaurantMenu]
}
export default useRestaurant

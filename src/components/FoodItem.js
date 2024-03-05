import { useDispatch } from "react-redux"
import { IMAGE_CDN_URL } from "../constants"
import { removeItem } from "../utils/cartSlice";

const FoodItem = (item) => {
    const {name,price,description,imageId, defaultPrice} = item;
    // console.log(item);
      const dispatch = useDispatch();
      const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
      }
    return (
      <>
        <div className="p-2 m-2 shadow-md bg-purple-50 rounded-lg flex">
          <img className="w-32" src={IMAGE_CDN_URL + imageId} alt="" />
          <div className="ml-4">
            <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <button className="bg-red-300 rounded p-1" onClick={()=>{handleRemoveItem(item)}}>Remove</button>
            </div>
            <h3>{description}</h3>
            <h4>{!price ? 'Rs. '+ defaultPrice/100 + '/kg' : 'Rs. ' + price / 100}</h4>
          </div>
        </div>
      </>
    )
}

export default FoodItem;
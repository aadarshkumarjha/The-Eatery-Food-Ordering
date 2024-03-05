import { useDispatch, useSelector } from "react-redux"
import FoodItem from "./FoodItem"
import { clearCart } from "../utils/cartSlice";
const Cart = () => {
  const cartItems = useSelector(store=> store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  }

  return (
    <div>
        <div className="flex">
        <h1 className="font-bold text-3xl">Item(s) added - {cartItems.length}</h1>
        <button className="bg-green-400 rounded p-1 ml-6 mt-1" onClick={()=>handleClearCart()}>Clear cart</button>
        </div>
        <div>
        {cartItems.map(item => 
            <FoodItem key={item.id} {...item} />
            )}
        </div>
        
    </div>
  )
}
export default Cart
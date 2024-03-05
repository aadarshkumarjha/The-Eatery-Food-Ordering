import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/the-eatery-logo.png';
import UserContext from '../utils/userContext';
import useOnline from '../utils/useOnline';
import { useSelector } from 'react-redux';

const Title = () => (
  <a href="/">
    <img data-testid="logo" className="h-28 px-2" src={Logo} alt="" />
  </a>
)
function loggedInUser() {
  // authentication
  return true
}

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isOnline = useOnline()
  const { user } = useContext(UserContext)

  const cartItems = useSelector(store => store.cart.items);
  console.log(cartItems);

  return (
    <div className="flex justify-between bg-[#c4fbfb] shadow-lg">
      <Title />
      <div className="nav-items">
        <ul className="flex py-10">
          <li className="px-2">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2">
            <Link to="/About">About</Link>
          </li>
          <li className="px-2">
            <Link to="/Contact">Contact</Link>
          </li>
          <li className="px-2">
            <Link to="/Instamart">Instamart</Link>
          </li>
          <li data-testid="cart" className="px-2">
            <Link to="/Cart">Cart - {cartItems.length} items</Link>
          </li>
        </ul>
      </div>
      <h1 data-testid="online-status">{isOnline ? '✅' : '🔴'}</h1>
      <div>
        {/* <span className="p-10 font-bold text-blue-600">{user.name}</span> */}

        {isLoggedIn ? (
          <button
            className="bg-gray-400 mt-6 p-3 rounded"
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-gray-400 mt-6 mr-3 p-3 rounded"
            onClick={() => setIsLoggedIn(true)}
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}
export default Header

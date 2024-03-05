import { useState } from "react"
const Profile = (props) => {
  const [count,setCount] = useState(0);
  // setCount not mandatory
  return (
    <div>
        <h2>Profile component</h2>
        <h3>Name: {props.name}</h3>
        <h4>Count: {count}</h4>
        <button onClick={()=> setCount(1)}>Click me</button>
    </div>
  )
}
export default Profile
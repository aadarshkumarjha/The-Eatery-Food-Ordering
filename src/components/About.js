import { Outlet } from "react-router-dom";
import ProfileFunctionalComponent from './Profile';
import ProfileClassComponent from './ProfileClass';

const About = () => {
    return (
        <div>
            <h1>About Us Page</h1>
            <p>
                This project is a part of Namaste React Course  by Akshay Saini
            </p>
            {/* <Outlet/> */}
            <ProfileFunctionalComponent name={"Vineet"}/>
            <ProfileClassComponent name={"VineetClass"}/>
        </div>
    );
};

export default About;
import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';


export default function MenuBar() {

    const { user, logout } = useContext(AuthContext);

    const pathname = window.location.pathname;
    console.log(pathname);
    const path = ((pathname === '/') || (user && pathname === user.username) ) ? 'home' : pathname.substr(1);
    console.log(path);
    console.log(user);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => {console.log(name); setActiveItem(name)};

    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">

          <Menu.Item
            name={user.username}
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />

          <Menu.Item
            name="Profile"
            active={activeItem === 'Profile'}
            onClick={handleItemClick}
            as={Link}
            to={`/profile/${user.username}`}
          />

          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={logout} />
          </Menu.Menu>
        </Menu>
      ) : (
        <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />

          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name="register"
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </Menu>
    );

    return menuBar;

}
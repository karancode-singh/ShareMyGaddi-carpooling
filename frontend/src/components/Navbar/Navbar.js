import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';
import defaultImg from '../../logo.svg';
import './Navbar.css';
import { SidebarData } from './SidebarData';

export default function Navbar(props) {
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars' id="hamburger">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div id='logo'>
            <AiIcons.AiFillCar />
            <Link to='/' className='menu-bars nav-text'>
              ShareMyGaddi
            </Link>
          </div>

          {/* <div id="main-buttons" className={props.is_auth ? '' : 'hidden'}> */}
          <div id='main-buttons'>
            <Button variant='warning' href='/active-trip' className={props.is_trip_active ? 'main-button' : 'hidden'} disabled={'/active-trip' === location.pathname}>
              <AiIcons.AiOutlineCar style={{ color: 'black', marginBottom: '0.1rem', marginRight: '0.3rem' }} /> Active Trip
            </Button>
            <Button variant='warning' href='/drive' className={props.is_trip_active ? 'hidden' : 'main-button'} disabled={'/drive' === location.pathname}>
              <AiIcons.AiTwotoneCar style={{ color: 'black', marginBottom: '0.1rem', marginRight: '0.3rem' }} /> Drive
            </Button>
            <Button variant='warning' href='/ride' className={props.is_trip_active ? 'hidden' : 'main-button'} disabled={'/ride' === location.pathname}>
              <MdIcons.MdPeopleOutline style={{ color: 'black', marginRight: '0.3rem' }} /> Ride
            </Button>
          </div>

        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='sidebar-top-items' onClick={showSidebar}>
            <li className='navbar-toggle' style={{paddingLeft: '1rem'}}>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li>
              {/* <img src={props.user.img} alt={props.user.name} /> */}
              <img src={defaultImg} alt='Name' />
            </li>
            <li style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              {/* <div style={{ color: 'white' }}>{props.user.name}</div> */}
              <div style={{ color: 'white' }}>Full Name</div>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className='nav-text'>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className='sidebar-bottom-items' onClick={showSidebar}>
            {/* <li className={props.is_auth ? 'nav-text' : 'hidden'}> */}
            <li className='nav-text'>
              <Link to='/logout'> {/*call logout method*/}
                <FaIcons.FaSignOutAlt />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>

      </IconContext.Provider>
    </>
  );
}
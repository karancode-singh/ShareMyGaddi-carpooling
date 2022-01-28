import React from 'react';
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Active Trip',
    path: '/active-trip',
    icon: <AiIcons.AiOutlineCar />,
    cName: 'nav-text'
  },
  {
    title: 'Trip History',
    path: '/trip-history',
    icon: <BsIcons.BsCardChecklist />,
    cName: 'nav-text'
  },
  {
    title: 'Drive',
    path: '/drive',
    icon: <AiIcons.AiTwotoneCar />,
    cName: 'nav-text'
  },
  {
    title: 'Ride',
    path: '/ride',
    icon: <MdIcons.MdPeopleOutline />,
    cName: 'nav-text'
  },
];

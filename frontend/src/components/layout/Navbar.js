import * as React from 'react';
import { useState } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <div className="w-64" role="presentation" onClick={toggleDrawer(false)}>
      <ul className="list-none p-0">
        <li>
          <button className="flex items-center p-4 w-full hover:bg-gray-200">
            <div className="mr-4">
              <InboxIcon className="h-6 w-6" />
            </div>
            <span><Link to='/admin/branch-attribute'>List Attribute Branch</Link></span>
          </button>
        </li>
        <li>
          <button className="flex items-center p-4 w-full hover:bg-gray-200">
            <div className="mr-4">
              <InboxIcon className="h-6 w-6" />
            </div>
            <span><Link to='/admin/court-attribute'>List Attribute Court</Link></span>
          </button>
        </li>
      </ul>
      <hr className="my-2" />
      <ul className="list-none p-0">
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <li key={text}>
            <button className="flex items-center p-4 w-full hover:bg-gray-200">
              <div className="mr-4">
                {index % 2 === 0 ? <InboxIcon className="h-6 w-6" /> : <MailIcon className="h-6 w-6" />}
              </div>
              <span>{text}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex-grow">
      <nav className="bg-blue-500 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleDrawer(true)} className="text-white">
              <MenuIcon className="h-8 w-8" />
            </button>
            <h1 className="text-white text-lg ml-4">News</h1>
          </div>
          <a href="/login" className="text-white">
            Login
          </a>
        </div>
        {open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleDrawer(false)}
          ></div>
        )}
        <div
          className={`fixed top-0 left-0 h-full bg-white z-50 transition-transform transform ${open ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          {DrawerList}
        </div>
      </nav>
    </div>
  );
}

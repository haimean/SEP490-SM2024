import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <div className="w-64" role="presentation" onClick={toggleDrawer(false)}>
      <ul className="list-none p-0">
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
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
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

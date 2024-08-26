import { Badge, Button, ListItem, Popover } from "@mui/material";
import {
  equalTo,
  off,
  onValue,
  orderByChild,
  query,
  ref,
  remove,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";

import CallApi from "./../service/CallAPI";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { dbFireBase } from "../utils/firebase";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [records, setRecords] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [seenNumber, setSeenNumber] = useState(0);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const usersRef = ref(dbFireBase, "users");
      const userQuery = query(
        usersRef,
        orderByChild("accountId"),
        equalTo(accountId)
      );
      return onValue(userQuery, (snapshot) => {
        const value = snapshot.val();
        if (value) {
          const data = Object.values(value).reverse();
          // get total notifications status seed
          const total = data.filter((item) => item.status === "SEED");
          setRecords(data);
          setSeenNumber(total.length);
          // update to read
        }
      });
    };
    fetchData();
  }, [accountId]);

  const updateStatusByUserId = async () => {
    const usersRef = ref(dbFireBase, "users");
    const userQuery = query(
      usersRef,
      orderByChild("accountId"),
      equalTo(accountId)
    );
    onValue(userQuery, (snapshot) => {
      const values = snapshot.val();
      if (values) {
        Object.entries(values).forEach(([key, value]) => {
          value.status = "READ";
          const userRef = ref(dbFireBase, `users/${key}`);
          update(userRef, value)
            .then(() => {
              console.log(`User with key ${key} updated successfully.`);
            })
            .catch((error) => {
              console.error(`Error updating user with key ${key}:`, error);
            });
        });
      }
      off(userQuery);
    });
  };
  // Function to delete all notifications by userid
  const deleteNotifications = async () => {
    const usersRef = ref(dbFireBase, "users");
    const userQuery = query(
      usersRef,
      orderByChild("accountId"),
      equalTo(accountId)
    );
    onValue(userQuery, (snapshot) => {
      const values = snapshot.val();
      if (values) {
        Object.entries(values).forEach((value) => {
          const userRef = ref(dbFireBase, `/users/${value[0]}`);
          remove(userRef)
            .then(() => {
              setRecords([]);
              seenNumber(0);
            })
            .catch((error) => {
              console.error("Error removing data: ", error);
            });
        });
      }
      off(userQuery);
    });
    setAnchorEl(null);
  };
  const fetchProfile = async () => {
    const response = await CallApi("/api/user/profile", "get");
    setAccountId(response?.data.id);
  };

  const handleClick = (event) => {
    if (records.length !== 0) {
      setAnchorEl(event.currentTarget);
    }
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    updateStatusByUserId();
  };
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Badge
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        color="warning"
        badgeContent={seenNumber}
        classes="h-3"
        className="mx-2 cursor-pointer"
      >
        <NotificationsIcon />
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {records.map((record, index) => (
          <ListItem
            key={index}
            className={
              record.status === "SEED"
                ? "bg-sky-100 font-medium text-black "
                : "text-black "
            }
          >
            <Link
              to={`${record.url}`}
              className="underline-none mb-3"
              color="inherit"
            >
              {record.createAt}
              {record.message}
            </Link>
          </ListItem>
        ))}
        {records.length !== 0 && (
          <Button onClick={deleteNotifications}>Xóa Hết</Button>
        )}
      </Popover>
    </>
  );
};
export default Notification;

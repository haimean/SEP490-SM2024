import { useEffect, useState } from "react";
import CallApi from "../service/CallAPI.jsx";
import { dbFireBase } from "./../utils/firebase.js";

const Notification = () => {
  return (
    <div>
      <h1>Records for Account ID: {accountId} </h1>
      <table>
        <tr>
          <th>accountId</th>
          <th>status</th>
          <th>url</th>
          <th>message</th>
          <th>createAt</th>
        </tr>
        {records.map((record, index) => (
          <tr key={index}>
            <td>{record.accountId}</td>
            <td>{record.status}</td>
            <td>{record.url}</td>
            <td> {record.message} </td>
            <td> {record.createAt} </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Notification;

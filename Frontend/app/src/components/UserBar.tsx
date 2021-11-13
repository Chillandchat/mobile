import React, { useEffect, useState } from "react";
import { getAllUsers } from "../scripts/getUsers";
import {UserBarIcon } from "./UserBarIcon";
import "./style/UserBar.css";

export const UserBar: React.FC = () => {
  let [userList, setUserList] = useState<any>([]);
  useEffect(() => {
    getAllUsers().then((returnData) => {
      setUserList(returnData.data);
    });
  }, []);
  return (
    <div id="userList">
      {userList.map((user) => {
        return (
          <div id="user">
            <UserBarIcon/>
            <strong className="userDisplayName" key={user.id}>
              {user.username}
            </strong>
          </div>
        );
      })}
    </div>
  );
};

import React from "react";
import UserList from "../userList/UserList";
import styles from "./Admin.module.css";

export default function AdminPanel() {
  return (
    <div className={styles.Container}>
      <UserList />
    </div>
  );
}

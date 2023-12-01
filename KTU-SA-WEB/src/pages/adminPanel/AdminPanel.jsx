import React from "react";
import useQuery from "../../hooks/useQuery";
import { ENDPOINTS } from "../../constants/endpoints";
import LogoutButton from "../../components/logoutButton/LogoutButton";
import { CircularProgress } from "@mui/material";

export default function AdminPanel() {
  const { data: users, error, isLoading } = useQuery(ENDPOINTS.USER.GET_ALL);

  if (isLoading) return <CircularProgress size={24} />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              {user.email} {user.saUnit} {user.role}
            </li>
          ))}
      </ul>
      <LogoutButton />
    </div>
  );
}

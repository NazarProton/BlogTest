/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import EditUserPage from "../components/editUserPage";
import UserPage from "../components/userPage";
import { getCurrentUserId, getIsLoggedIn } from "../store/users";
import UsersList from "./usersList";
import ProtectedRoute from "./protectedRoute";

const Users = () => {
  const { userId, edit } = useParams();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUserId = isLoggedIn? useSelector(getCurrentUserId()):""

  return (
    <>
      <ProtectedRoute>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <EditUserPage />
            ) : (
              <Navigate to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersList />
        )}
      </ProtectedRoute>
    </>
  );
};

export default Users;

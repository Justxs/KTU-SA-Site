import React, { useState } from "react";
import FallbackWrapper from "../../components/fallbackWrapper/FallbackWrapper";
import DataTable from "../../components/dataTable/DataTable";
import ConfirmationDialog from "../../components/confirmationDialog/ConfirmationDialog";
import EditUserDialog from "./editUserDialog/EditUserDialog";
import useQuery from "../../hooks/useQuery";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { ENDPOINTS } from "../../constants/endpoints";
import { HTTP_METHODS } from "../../constants/http";
import SectionName from "../../components/sectionName/SectionName";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function UserList() {
  const { data: users, error, isLoading, refetch } = useQuery(ENDPOINTS.USERS);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [user, setUser] = useState(null);

  const { sendRequest, isLoading: isLoadingDelete } = useAxiosRequest();

  const userColumns = [
    { id: "email", label: "Email" },
    { id: "saUnit", label: "SA Unit" },
    { id: "role", label: "Role" },
    {
      id: "actions",
      label: "Actions",
      align: "right",
      format: (row) => (
        <>
          <IconButton color="primary" onClick={() => openEditDialog(row)}>
            <Edit />
          </IconButton>
          <IconButton color="error" onClick={() => openDeleteDialog(row)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const openDeleteDialog = (user) => {
    setUser(user);
    setOpen(true);
  };

  const openEditDialog = (user) => {
    setUser(user);
    setOpenEdit(true);
  };

  const onSuccess = () => {
    refetch();
  };

  const handleDelete = (userId) => {
    sendRequest(
      {
        url: ENDPOINTS.USERS + "/" + userId,
        method: HTTP_METHODS.delete,
        data: userId,
      },
      onSuccess
    );
    setOpen(false);
  };

  return (
    <>
      <SectionName title="User List" />
      <FallbackWrapper
        isLoading={isLoading || isLoadingDelete}
        error={error}
        data={users}
        emptyMessage="There are no users registered yet"
      >
        <DataTable
          columns={userColumns}
          data={users || []}
        />
      </FallbackWrapper>
      <ConfirmationDialog
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={() => handleDelete(user.id)}
        title={`Are you sure you want to delete ${user?.email} user?`}
      />
      <EditUserDialog
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        title={`Edit ${user?.email}`}
        user={user}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default UserList;

import React from "react";
import useQuery from "../../hooks/useQuery";
import { ENDPOINTS } from "../../constants/endpoints";
import PropTypes from "prop-types";
import FallbackWrapper from "../../components/fallbackWrapper/FallbackWrapper";
import DataTable from "../../components/dataTable/DataTable";
import SectionName from "../../components/sectionName/SectionName";

export default function AdminPanel(props) {
  const { role, saUnit } = props;
  const { data: users, error, isLoading } = useQuery(ENDPOINTS.USER.GET_ALL);

  const userColumns = [
    { id: "email", label: "Email" },
    { id: "saUnit", label: "SA Unit" },
    { id: "role", label: "Role" },
  ];

  const handleDelete = (userId) => {
    console.log("Delete user with id:", userId);
    // Add your delete logic here
  };

  const handleUpdate = (user) => {
    console.log("Update user:", user);
    // Add your update logic here
  };

  if (role === "WaitingForApproval" || saUnit === "Unknown") {
    return <></>;
  }
  return (
    <div>
      <SectionName title="User List" />
      <FallbackWrapper
        isLoading={isLoading}
        error={error}
        data={users}
        emptyMessage="There are no users registered yet"
      >
        <DataTable
          columns={userColumns}
          data={users || []}
          onEdit={handleUpdate}
          onDelete={handleDelete}
        />
      </FallbackWrapper>
    </div>
  );
}

AdminPanel.propTypes = {
  role: PropTypes.string.isRequired,
  saUnit: PropTypes.string.isRequired,
};

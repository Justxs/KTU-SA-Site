import React, { useState } from "react";
import SectionName from "../../components/sectionName/SectionName";
import DataTable from "../../components/dataTable/DataTable";
import useQuery from "../../hooks/useQuery";
import { ENDPOINTS } from "../../constants/endpoints";
import FallbackWrapper from "../../components/fallbackWrapper/FallbackWrapper";
import ConfirmationDialog from "../../components/confirmationDialog/ConfirmationDialog";
import { HTTP_METHODS } from "../../constants/http";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { Button } from "@mui/material";
import NewPositionDialog from "./components/newPositionDialog/NewPositionDialog";

export default function Positions() {
  const {
    data: positions,
    error,
    isLoading,
    refetch,
  } = useQuery(ENDPOINTS.POSITIONS);

  const {
    data: saUnits,
    error: saUnitsError,
    isLoading: saUnitsLoading,
  } = useQuery(ENDPOINTS.SA_UNITS);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [position, setPosition] = useState(null);

  const { sendRequest } = useAxiosRequest();
  const positionColumns = [
    { id: "name", label: "Position Name" },
    { id: "saUnit", label: "SA Unit" },
    { id: "description", label: "Description" },
  ];
  const openDeleteDialog = (position) => {
    setPosition(position);
    setOpen(true);
  };

  const openEditDialog = (position) => {
    setPosition(position);
    setOpenEdit(true);
    console.log(openEdit);
  };

  const onSuccess = () => {
    refetch();
  };

  const handleDelete = (positionId) => {
    sendRequest(
      {
        url: ENDPOINTS.POSITIONS + "/" + positionId,
        method: HTTP_METHODS.delete,
      },
      onSuccess
    );
    setOpen(false);
  };
  console.log(saUnitsLoading);
  return (
    <div>
      <SectionName title="Positions" />
      <FallbackWrapper
        isLoading={saUnitsLoading}
        error={saUnitsError}
        data={saUnits}
        emptyMessage="There are no created SA units"
      >
        <Button variant="contained" onClick={() => setOpenNew(true)}>
          Create new position
        </Button>
        <NewPositionDialog
          open={openNew}
          handleClose={() => setOpenNew(false)}
          onSuccess={onSuccess}
          saUnits={saUnits}
        />
      </FallbackWrapper>
      <FallbackWrapper
        isLoading={isLoading}
        error={error}
        data={positions}
        emptyMessage="There are no created positions"
      >
        <DataTable
          columns={positionColumns}
          data={positions || []}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
        />
      </FallbackWrapper>
      <ConfirmationDialog
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={() => handleDelete(position.id)}
        title="Are you sure you want to delete this position?"
      />
    </div>
  );
}

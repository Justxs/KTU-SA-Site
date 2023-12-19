import React, { useState } from "react";
import SectionName from "../../components/sectionName/SectionName";
import DataTable from "../../components/dataTable/DataTable";
import useQuery from "../../hooks/useQuery";
import { ENDPOINTS } from "../../constants/endpoints";
import FallbackWrapper from "../../components/fallbackWrapper/FallbackWrapper";
import { Button } from "@mui/material";
import NewPositionDialog from "./components/newPositionDialog/NewPositionDialog";
import styles from "./Positions.module.css";
import DeletePositionDialog from "./components/deletePositionDialog/DeletePositionDialog";
import EditPositionDialog from "./components/editPositionDialog/EditPositionDialog";
import AssignPositionDialog from "./components/assignPositionDialog/AssignPositionDialog";

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

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [position, setPosition] = useState(null);

  const positionColumns = [
    { id: "name", label: "Position Name" },
    {
      id: "saUnits",
      label: "SA Units",
      align: "left",
      format: (saUnits) => (
        <ul>
          {Object.entries(saUnits).map(([unitId, unitName]) => (
            <li key={unitId}>{unitName}</li>
          ))}
        </ul>
      ),
    },
    { id: "description", label: "Description" },
  ];

  const openDeleteDialog = (position) => {
    setPosition(position);
    setOpenDelete(true);
  };

  const openEditDialog = (position) => {
    setPosition(position);
    setOpenEdit(true);
  };

  const openAssignDialog = (position) => {
    setPosition(position);
    setOpenAssign(true);
  };

  return (
    <div className={styles.Container}>
      <SectionName title="Positions" />
      <FallbackWrapper
        isLoading={saUnitsLoading}
        error={saUnitsError}
        data={saUnits}
        emptyMessage="There are no created SA units"
      >
        <div className={styles.Button}>
          <Button variant="contained" onClick={() => setOpenNew(true)}>
            Create new position
          </Button>
        </div>
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
          onAssign={openAssignDialog}
        />
      </FallbackWrapper>
      {saUnits && position && (
        <>
          <EditPositionDialog
            open={openEdit}
            position={position}
            handleClose={() => setOpenEdit(false)}
            onSuccess={() => refetch()}
          />
          <DeletePositionDialog
            open={openDelete}
            position={position}
            handleClose={() => setOpenDelete(false)}
            onSuccess={() => refetch()}
          />
          <AssignPositionDialog
            open={openAssign}
            position={position}
            saUnits={saUnits}
            handleClose={() => setOpenAssign(false)}
            onSuccess={() => refetch()}
            initialValues={Object.keys(position.saUnits)}
          />
        </>
      )}
      <NewPositionDialog
        open={openNew}
        handleClose={() => setOpenNew(false)}
        onSuccess={() => refetch()}
        saUnits={saUnits}
      />
    </div>
  );
}

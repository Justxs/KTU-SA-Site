import React, { useState } from "react";
import SectionName from "../../components/sectionName/SectionName";
import DataTable from "../../components/dataTable/DataTable";
import useQuery from "../../hooks/useQuery";
import { ENDPOINTS } from "../../constants/endpoints";
import FallbackWrapper from "../../components/fallbackWrapper/FallbackWrapper";
import { Button, IconButton } from "@mui/material";
import NewPositionDialog from "./components/newPositionDialog/NewPositionDialog";
import styles from "./Positions.module.css";
import TableActions from "./components/tableActions/TableActions";
import SaUnitsDialog from "./components/saUnitsDialog/SaUnitsDialog";
import { Visibility } from "@mui/icons-material";

export default function Positions() {
  const [isSaUnitsDialogOpen, setIsSaUnitsDialogOpen] = useState(false);
  const [currentSaUnits, setCurrentSaUnits] = useState({});

  const openSaUnitsModal = (saUnits) => {
    setCurrentSaUnits(saUnits);
    setIsSaUnitsDialogOpen(true);
  };

  const {
    data: positions,
    error,
    isLoading,
    refetch,
  } = useQuery(ENDPOINTS.POSITIONS);

  const {
    data: saUnits,
    isLoading: saUnitsLoading,
  } = useQuery(ENDPOINTS.SA_UNITS.BASE);

  const [openNew, setOpenNew] = useState(false);

  const positionColumns = [
    { id: "name", label: "Position Name" },
    {
      id: "saUnits",
      label: "SA Units",
      format: (row) => {
        const saUnitCount = Object.keys(row.saUnits).length;
        return (
          <div>
            Currently assigned to {saUnitCount} SA units
            <IconButton onClick={() => openSaUnitsModal(row.saUnits)}>
              <Visibility />
            </IconButton>
          </div>
        )
      },
    },
    { id: "description", label: "Description" },
    {
      id: "actions",
      label: "Actions",
      align: "right",
      format: (row) => (
        <TableActions position={row} refetch={refetch} />
      ),
    },

  ];


  return (
    <div className={styles.Container}>
      <SectionName title="Positions" />
      <div className={styles.Button}>
        <Button variant="contained" onClick={() => setOpenNew(true)} disabled={saUnitsLoading}>
          Create new position
        </Button>
      </div>
      <FallbackWrapper
        isLoading={isLoading}
        error={error}
        data={positions}
        emptyMessage="There are no created positions"
      >
        <DataTable
          columns={positionColumns}
          data={positions || []}
        />
      </FallbackWrapper>

      <NewPositionDialog
        open={openNew}
        handleClose={() => setOpenNew(false)}
        onSuccess={() => refetch()}
        saUnits={saUnits}
      />
      <SaUnitsDialog
        open={isSaUnitsDialogOpen}
        handleClose={() => setIsSaUnitsDialogOpen(false)}
        saUnits={currentSaUnits}
      />
    </div>
  );
}

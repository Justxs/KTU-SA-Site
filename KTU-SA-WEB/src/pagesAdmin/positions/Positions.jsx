import React, { useState } from "react";
import SectionName from "../../components/sectionName/SectionName";
import DataTable from "../../components/dataTable/DataTable";
import useQuery from "../../hooks/useQuery";
import { ENDPOINTS } from "../../constants/endpoints";
import FallbackWrapper from "../../components/fallbackWrapper/FallbackWrapper";
import { Button } from "@mui/material";
import NewPositionDialog from "./components/newPositionDialog/NewPositionDialog";
import styles from "./Positions.module.css";
import TableActions from "./components/tableActions/TableActions";

export default function Positions() {
  const {
    data: positions,
    error,
    isLoading,
    refetch,
  } = useQuery(ENDPOINTS.POSITIONS);

  const {
    data: saUnits,
    isLoading: saUnitsLoading,
  } = useQuery(ENDPOINTS.SA_UNITS);

  const [openNew, setOpenNew] = useState(false);

  const positionColumns = [
    { id: "name", label: "Position Name" },
    {
      id: "saUnits",
      label: "SA Units",
      format: (row) => (
        <ul>
          {Object.entries(row.saUnits).map(([unitId, unitName]) => (
            <li key={unitId}>{unitName}</li>
          ))}
        </ul>
      ),
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
    </div>
  );
}

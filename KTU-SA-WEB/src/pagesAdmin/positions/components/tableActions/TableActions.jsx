import React, { useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditPositionDialog from "../editPositionDialog/EditPositionDialog";
import DeletePositionDialog from "../deletePositionDialog/DeletePositionDialog";
import AssignPositionDialog from "../assignPositionDialog/AssignPositionDialog";

import PropTypes from "prop-types";
import useQuery from "../../../../hooks/useQuery";
import { ENDPOINTS } from "../../../../constants/endpoints";

export default function TableActions({ position, refetch }) {
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAssign, setOpenAssign] = useState(false);

    const {
        data,
        isLoading,
    } = useQuery(ENDPOINTS.SA_UNITS);

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <>
            <IconButton color="success" onClick={() => setOpenAssign(true)}>
                <AddBoxIcon />
            </IconButton>
            <IconButton color="error" onClick={() => setOpenDelete(true)}>
                <DeleteIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => setOpenEdit(true)}>
                <EditIcon />
            </IconButton>
            {data && position && (
                <>
                    <EditPositionDialog
                        open={openEdit}
                        position={position}
                        handleClose={() => setOpenEdit(false)}
                        onSuccess={refetch}
                    />
                    <DeletePositionDialog
                        open={openDelete}
                        position={position}
                        handleClose={() => setOpenDelete(false)}
                        onSuccess={refetch}
                    />
                    <AssignPositionDialog
                        open={openAssign}
                        position={position}
                        saUnits={data}
                        handleClose={() => setOpenAssign(false)}
                        onSuccess={refetch}
                        initialValues={Object.keys(position.saUnits)}
                    />
                </>
            )}
        </>
    )
}

TableActions.propTypes = {
    position: PropTypes.isRequired,
    refetch: PropTypes.func.isRequired,
};


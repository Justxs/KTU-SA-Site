import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";

const HeaderCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#114D8A",
  color: "#E3EDFB",
  fontSize: "20px",
  fontFamily: "PF DinText Pro, sans-serif",
});

export default function DataTable(props) {
  const { columns, data, onEdit, onDelete } = props;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <HeaderCell key={column.id} align={column.align || "left"}>
                {column.label}
              </HeaderCell>
            ))}
            {(onEdit || onDelete) && (
              <HeaderCell align="right">Actions</HeaderCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id || index} hover>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || "left"}>
                  {column.format
                    ? column.format(row[column.id])
                    : row[column.id]}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell align="right">
                  {onEdit && (
                    <IconButton color="warning" onClick={() => onEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton color="error" onClick={() => onDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      format: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

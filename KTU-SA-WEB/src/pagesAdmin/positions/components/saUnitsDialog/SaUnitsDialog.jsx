import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, List, ListItem } from "@mui/material";


export default function SaUnitsDialog(props) {
  const { open, handleClose, saUnits } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>SA Units</DialogTitle>
      <DialogContent>
        <List>
          {Object.entries(saUnits).map(([unitId, unitName]) => (
            <ListItem key={unitId}>{unitName}</ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

SaUnitsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  saUnits: PropTypes.object.isRequired,
};

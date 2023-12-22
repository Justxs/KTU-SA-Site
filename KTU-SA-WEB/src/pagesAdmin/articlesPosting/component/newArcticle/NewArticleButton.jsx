import { Button } from '@mui/material';
import React, { useState } from 'react';
import NewArticleDialog from './NewArticleDialog';
import PropTypes from "prop-types";

export default function NewArticleButton(props) {
  const {saUnitId, refetch} = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    refetch();
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setIsDialogOpen(true)}
        sx={{marginBottom: "10px"}}>
        Create new post
      </Button>
      <NewArticleDialog 
        open={isDialogOpen} 
        handleClose={() => setIsDialogOpen(false)} 
        onSuccess={handleSuccess}
        saUnitId={saUnitId}
      />
    </div>
  );
}

NewArticleButton.propTypes = {
  saUnitId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};
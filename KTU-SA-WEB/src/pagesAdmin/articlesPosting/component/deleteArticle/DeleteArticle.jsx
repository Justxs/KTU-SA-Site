import React, { useState } from 'react';
import useAxiosRequest from '../../../../hooks/useAxiosRequest';
import ConfirmationDialog from '../../../../components/confirmationDialog/ConfirmationDialog';
import { ENDPOINTS } from '../../../../constants/endpoints';
import { HTTP_METHODS } from '../../../../constants/http';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import PropTypes from "prop-types";

export default function DeleteArticle(props) {
  const { post, refetch } = props;
  const { sendRequest } = useAxiosRequest();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = (postId) => {
    sendRequest(
      {
        url: ENDPOINTS.POSTS + "/" + postId,
        method: HTTP_METHODS.delete,
      },
      ()=>{
        setOpenDelete(false);
        refetch();
      }
    );
    () => setOpenDelete(false);
  };
    
  return (
    <>
      <IconButton color="error" onClick={() => setOpenDelete(true)}>
        <Delete />
      </IconButton>
      <ConfirmationDialog
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        onSubmit={() => handleDelete(post.id)}
        title={`Are you sure you want to delete ${post.title} post?`}
      />
    </>
  );
}

DeleteArticle.propTypes = {
  refetch: PropTypes.func.isRequired,
  post: PropTypes.arrayOf(Object).isRequired,
};
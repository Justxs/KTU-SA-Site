import React, { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../../../constants/endpoints';
import { HTTP_METHODS } from '../../../../constants/http';
import useAxiosRequest from '../../../../hooks/useAxiosRequest';
import { useForm } from 'react-hook-form';
import TextInputField from '../../../../components/inputFields/TextInputField';
import DialogBase from '../../../../components/dialogBase/DialogBase';
import PropTypes from "prop-types";
import { IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

export default function EditArticle(props) {
  const { saUnitId, post, refetch } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { sendRequest } = useAxiosRequest();
  const { control, handleSubmit, reset } = useForm();
      
  const onSubmit = (data) => {
    sendRequest(
      {
        url: ENDPOINTS.POSTS + "/" + post.id,
        method: HTTP_METHODS.put,
        data: {studentAsociationUnitId: saUnitId, ...data, type: "Article", HtmlContent: "<h1>temp</h1>"},
      },
      () => {
        setIsDialogOpen(false);
        reset();
        refetch();
      }
    );
    () => setIsDialogOpen(false);
  };

  useEffect(() => {
    reset({ title: post?.title, description: post?.description });
  }, [post, reset]);

  return (
    <>
      <IconButton
        color="primary" 
        onClick={() => setIsDialogOpen(true)}>
        <Edit />
      </IconButton>
      <DialogBase
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit(onSubmit)}
        title="Edit an article"
      >
        <TextInputField
          control={control} 
          name="title" 
          label="Title" 
          rules={{ required: 'Title is required' }} 
        />
        <TextInputField
          control={control}
          name="description"
          label="Description"
          multiline
          rows={4}
          rules={{ required: 'Description is required' }}
        />
      </DialogBase>
    </>
  );
}

EditArticle.propTypes = {
  saUnitId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  post: PropTypes.arrayOf(Object).isRequired,
};
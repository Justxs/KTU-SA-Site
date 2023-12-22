import React from 'react';
import DialogBase from '../../../../components/dialogBase/DialogBase';
import TextInputField from '../../../../components/inputFields/TextInputField';
import { ENDPOINTS } from '../../../../constants/endpoints';
import { HTTP_METHODS } from '../../../../constants/http';
import PropTypes from "prop-types";
import useAxiosRequest from '../../../../hooks/useAxiosRequest';
import { useForm } from 'react-hook-form';

export default function NewArticleDialog(props) {
  const { open, handleClose, onSuccess, saUnitId } = props;
  const { sendRequest } = useAxiosRequest();
  const { control, handleSubmit, reset } = useForm();
    
  const onSubmit = (data) => {
    sendRequest(
      {
        url: ENDPOINTS.POSTS,
        method: HTTP_METHODS.post,
        data: {studentAsociationUnitId: saUnitId, ...data, type: "Article", HtmlContent: "<h1>temp</h1>"},
      },
      () => {
        onSuccess();
        reset();
      }
    );
    handleClose();
  };
  
  return (
    <DialogBase
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Create an article"
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
  );
}
  
NewArticleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  saUnitId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
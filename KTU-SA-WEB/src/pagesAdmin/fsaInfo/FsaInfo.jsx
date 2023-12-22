import React from 'react';
import { useAuthContext } from '../../context/authContext';
import TextInputField from '../../components/inputFields/TextInputField';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import useAxiosRequest from '../../hooks/useAxiosRequest';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import useQuery from '../../hooks/useQuery';
import FallbackWrapper from '../../components/fallbackWrapper/FallbackWrapper';
import styles from "./FsaInfo.module.css";
import SectionName from '../../components/sectionName/SectionName';

export default function FsaInfo() {
  const { userSaUnit, userSaUnitId } = useAuthContext();
  const { sendRequest } = useAxiosRequest();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { data, error, isLoading, refetch } = useQuery(ENDPOINTS.SA_UNITS.BASE + "/" + userSaUnitId);
    
  const onSubmit = data => {
    sendRequest(
      {
        url: ENDPOINTS.SA_UNITS.BASE + "/" + userSaUnitId,
        method: HTTP_METHODS.put,
        data: {description: data.description, },
      },
      refetch(),
    );
  };

  return (
    <div className={styles.Container}>
      <SectionName title={`Edit ${userSaUnit} description`} showArrow/>
      <FallbackWrapper isLoading={isLoading} data={data} error={error}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            control={control}
            name="description"
            label="Description"
            defaultValue={data?.description || ""}
            multiline
            rows={4}
            error={errors.description}
            rules={{ required: 'Description is required' }}
          />
          <Button type="submit" variant="contained" color="primary">
          Submit
          </Button>
        </form>
      </FallbackWrapper>
    </div>
  );
}

import React from 'react';
import FallbackWrapper from '../../../../components/fallbackWrapper/FallbackWrapper';
import DataTable from '../../../../components/dataTable/DataTable';
import PropTypes from "prop-types";
import EditArticle from '../editArticle/EditArticle';
import DeleteArticle from '../deleteArticle/DeleteArticle';

export default function ArticlesList(props) {
  const {saUnitId, isLoading, error, data, refetch} = props;

  const articlesColumns = [
    {
      id: "title",
      label: "Title",
    },
    { id: "description", label: "Description" },
    { id: "createdDate", label: "Creation date" },
    {
      id: "actions",
      label: "Actions",
      align: "right",
      format: (row) => (
        <>
          <EditArticle 
            post={row} 
            saUnitId={saUnitId} 
            refetch={refetch}
          />
          <DeleteArticle 
            refetch={refetch} 
            post={row} 
          />
        </>
      ),
    },
  ];
  return (
    <FallbackWrapper
      isLoading={isLoading}
      error={error}
      data={data}
      emptyMessage="There are no created post"
    >
      <DataTable
        columns={articlesColumns}
        data={data || []}
      />
    </FallbackWrapper>
  );
}

ArticlesList.propTypes ={
  saUnitId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(Object).isRequired
};
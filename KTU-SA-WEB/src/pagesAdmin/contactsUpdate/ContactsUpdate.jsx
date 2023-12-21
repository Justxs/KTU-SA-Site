import React, { useState } from 'react'
import SectionName from '../../components/sectionName/SectionName'
import styles from './ContactsUpdate.module.css'
import { useAuthContext } from '../../context/authContext';
import { ENDPOINTS } from '../../constants/endpoints';
import useQuery from '../../hooks/useQuery';
import DataTable from '../../components/dataTable/DataTable';
import FallbackWrapper from '../../components/fallbackWrapper/FallbackWrapper';
import { IconButton } from '@mui/material';
import { AddBox, Edit } from '@mui/icons-material';
import EditContactDialog from './components/EditContactDialog';
import DeleteButton from './components/deleteButton/DeleteButton';

export default function ContactsUpdate() {
  const { userSaUnitId } = useAuthContext();
  const { data, error, isLoading, refetch } = useQuery(ENDPOINTS.SA_UNITS.POSITIONS(userSaUnitId));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [create, setCreate] = useState(false);

  const contactsColumns = [
    { id: "positionName", label: "Position" },
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone Number" },
    {
      id: "actions", label: "Actions", align: "right",
      format: (row) => (
        <>
          <IconButton color='success' onClick={() => openCreateModal(row)}>
            <AddBox />
          </IconButton>
          {row.fullName &&
            <>
              <IconButton color='primary' onClick={() => openEditModal(row)}>
                <Edit />
              </IconButton>
              <DeleteButton contact={row} refetch={refetch} />
            </>
          }
        </>
      )

    },

  ];

  const openEditModal = (contact) => {
    if (contact.fullName === null) {
      setCreate(true);
    } else {
      setCreate(false);
    }

    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };
  const openCreateModal = (contact) => {
    setCreate(true);
    setSelectedContact({ positionId: contact.positionId, positionName: contact.positionName });
    setIsEditModalOpen(true);
  };

  return (
    <div className={styles.Container}>
      <SectionName title='Update contacts' />
      <FallbackWrapper
        data={data}
        isLoading={isLoading}
        error={error}
        errorMessage="No assigned positions"
      >
        <DataTable
          columns={contactsColumns}
          data={data || []}
        />
        <EditContactDialog
          open={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
          contact={selectedContact}
          onSuccess={refetch}
          create={create}
        />
      </FallbackWrapper>
    </div>
  )
}

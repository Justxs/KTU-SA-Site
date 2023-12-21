import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import TextInputField from "../../../components/inputFields/TextInputField";
import useAxiosRequest from "../../../hooks/useAxiosRequest";
import { ENDPOINTS } from "../../../constants/endpoints";
import { HTTP_METHODS } from "../../../constants/http";
import DialogBase from "../../../components/dialogBase/DialogBase";

export default function EditContactDialog({ open, handleClose, contact, onSuccess, create }) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const { sendRequest } = useAxiosRequest();

    let method = HTTP_METHODS.put;
    let url = `${ENDPOINTS.CONTACTS}/${contact?.id}`;

    if (create) {
        method = HTTP_METHODS.post;
        url = ENDPOINTS.CONTACTS;
    }

    useEffect(() => {
        reset({
            fullName: contact?.fullName,
            email: contact?.email,
            phoneNumber: contact?.phoneNumber,
            positionId: contact?.positionId,
        });
    }, [contact, reset]);

    const onSubmit = (data) => {
        sendRequest(
            {
                url: url,
                method: method,
                data: data,
            },
            onSuccess
        );
        handleClose();
    };

    return (
        <DialogBase
            open={open}
            handleClose={() => {
                handleClose();
                reset();
            }}
            onSubmit={handleSubmit(onSubmit)}
            title={`Edit Contact: ${contact.positionName}`}
        >
            <TextInputField
                control={control}
                name="fullName"
                label="Full Name"
                rules={{ required: "Full name is required" }}
                error={errors.fullName} />
            <TextInputField
                control={control}
                name="email"
                label="Email"
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                    }
                }}
                error={errors.email} />
            <TextInputField
                control={control}
                name="phoneNumber"
                label="Phone Number"
                rules={{
                    required: "Phone number is required",
                    pattern: {
                        value: /^\+?\d+$/,
                        message: "Invalid phone number"
                    }
                }}
                error={errors.phoneNumber} />
        </DialogBase>
    );
}

EditContactDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    contact: PropTypes.shape({
        id: PropTypes.string,
        fullName: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
        positionName: PropTypes.string,
        positionId: PropTypes.string
    }).isRequired,
    create: PropTypes.bool,
};

EditContactDialog.defaultProps = {
    create: false,
}

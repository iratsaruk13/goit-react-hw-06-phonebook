import React from "react";
import PropTypes from "prop-types";
import { StyledForm, FilterLabel, FilterInput } from "./Filter.styled";

export const FormFilter = ({ label, onChange }) => {
  const initialValues = {
    filter: "",
  };

  return (
    <StyledForm initialValues={initialValues}>
      <FilterLabel htmlFor="filter">{label}</FilterLabel>
      <FilterInput
        type="text"
        id="filter"
        name="filter"
        onChange={onChange}
        value={onChange.filter}
      />
    </StyledForm>
  );
};

FormFilter.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

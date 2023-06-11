import React from "react";
import PropTypes from "prop-types";
import {
  ContactsList,
  ContactsItem,
  ContactsName,
  ContactsButton,
} from "./Contacts.styled";

import { BsTrash3 } from "react-icons/bs";

export const Contacts = ({ options, removeContact }) => {
  return (
    <>
      <ContactsList>
        {options.map(({ id, name, number }) => {
          return (
            <ContactsItem key={id}>
              <ContactsName>
                {name}: {number}
              </ContactsName>
              <ContactsButton type="button" onClick={() => removeContact(id)}>
                <BsTrash3 />
              </ContactsButton>
            </ContactsItem>
          );
        })}
      </ContactsList>
    </>
  );
};

Contacts.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape).isRequired,
  removeContact: PropTypes.func.isRequired,
};

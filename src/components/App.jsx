import { Container, MainTitle, ContactsTitle, Message } from "./App.styled";
import { FormContact } from "./FormContact/FormContact";
import { Contacts } from "./Contacts/Contacts";
import { FormFilter } from "./Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, removeContact } from "../redux/contactsSlice";
import { getContacts, getFilters } from "../redux/selectors";
import { setFilter } from "../redux/filtersSlice";

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilters);

  const normalizedNumber = (number) => {
    let normalizedNumber = number.substring(0, 3) + "-";
    for (let i = 3; i < number.length; i += 1) {
      if ((i - 3) % 2 === 0 && i !== 3) {
        normalizedNumber += "-";
      }
      normalizedNumber += number[i];
    }
    return normalizedNumber;
  };

  const addContact = (name, number) => {
    const formattedNumber = normalizedNumber(number);
    const checkName = contacts.some(
      (el) => el.name.toLowerCase() === name.toLowerCase()
    );
    if (checkName) {
      return alert(`${name} is already in contacts.`);
    }
    dispatch(addContacts(name, formattedNumber));
  };

  const getContact = () => {
    const normalized = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalized)
    );
  };

  const deleteContact = (id) => {
    dispatch(removeContact(id));
  };

  const onChangeFilter = (evt) => {
    dispatch(setFilter(evt.currentTarget.value));
  };

  const filteredContacts = getContact();

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <FormContact addContact={addContact} />

      <ContactsTitle>Contacts</ContactsTitle>
      <FormFilter label="Find contacts by name" onChange={onChangeFilter} />
      {contacts.length === 0 ? (
        <Message>You don't have contacts yet</Message>
      ) : (
        <Contacts options={filteredContacts} deleteContact={deleteContact} />
      )}
    </Container>
  );
};

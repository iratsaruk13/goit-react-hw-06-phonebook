import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Container, MainTitle, ContactsTitle, Message } from "./App.styled";
import { FormContact } from "./FormContact/FormContact";
import { Contacts } from "./Contacts/Contacts";
import { FormFilter } from "./Filter/Filter";
import initialContacts from "./contacts.json";

const CONTACTS_KEY = "contacts";

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(CONTACTS_KEY)) ?? initialContacts
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

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

    const contact = {
      id: nanoid(),
      name: name,
      number: formattedNumber,
    };

    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const onChangeFilter = (evt) => {
    setFilter(evt.currentTarget.value);
  };

  const getContacts = () => {
    const normalized = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalized)
    );
  };

  const removeContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const filteredContacts = getContacts();

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <FormContact addContact={addContact} />

      <ContactsTitle>Contacts</ContactsTitle>
      <FormFilter label="Find contacts by name" onChange={onChangeFilter} />
      {contacts.length === 0 ? (
        <Message>You don't have contacts yet</Message>
      ) : (
        <Contacts options={filteredContacts} removeContact={removeContact} />
      )}
    </Container>
  );
};

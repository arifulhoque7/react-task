import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const Problem2 = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [isUS, setIsUS] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [isUS, onlyEven]);

  const fetchContacts = async () => {
    let url = isUS
      ? "https://contact.mediusware.com/api/country-contacts/United%20States/?page=1&page_size=600"
      : "https://contact.mediusware.com/api/contacts/?page=1&page_size=600";
    const response = await axios.get(url);
    let data = response.data.results;
    if (onlyEven) {
      data = data.filter((contact) => contact.id % 2 === 0);
    }
    setContacts(data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            style={{ backgroundColor: "#46139f" }}
            onClick={() => {
              setIsUS(false);
              setModalIsOpen(true);
            }}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            style={{ backgroundColor: "#ff7f50" }}
            onClick={() => {
              setIsUS(true);
              setModalIsOpen(true);
            }}
          >
            US Contacts
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <button
            style={{ backgroundColor: "#46139f" }}
            onClick={() => {
              setIsUS(false);
              fetchContacts();
            }}
          >
            All Contacts
          </button>
          <button
            style={{ backgroundColor: "#ff7f50" }}
            onClick={() => {
              setIsUS(true);
              fetchContacts();
            }}
          >
            US Contacts
          </button>
          <button
            style={{ backgroundColor: "white", borderColor: "#46139f" }}
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
          <input
            type="checkbox"
            id="evenOnly"
            name="evenOnly"
            onChange={(e) => {
              setOnlyEven(e.target.checked);
            }}
          />
          <label for="evenOnly"> Only even</label>
          <input
            type="text"
            id="search"
            name="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {contacts.map((contact) => (
            <div key={contact.id}>
              <p>{contact.phone}</p>
              <p>{contact.country.name}</p>
            </div>
          ))}
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;

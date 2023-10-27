import React, { useState, Fragment ,useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import { nanoid } from "nanoid";
import EditableRow from "./EditableRow";
import data from "./mock-data.json";
import SideBar from "../Elements/SideBar";
import './UpdatedDashboard.css';

const UpdatedDashboard = () => {
    const [contacts, setContacts] = useState([]);

    async function fetchData() {
        const response = await fetch('http://localhost:5000/api/stock/fetchallstocks',{
          method:'GET',
          headers:{
              'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
          }
      });
        const dbData = await response.json();
      //   const dbData1 = JSON.parse({"ID": dbData.stock_id ,
      //   "productName": dbData.stock_name ,
      //   "Quantity": dbData.no_of_units,
      //   "Date": dbData.date_of_importing,
      //   "ISBN" : dbData.isbn })
        setContacts(dbData);
        console.log(dbData)
      }
    useEffect(() => {
        fetchData();
      }, []);

  const [addFormData, setAddFormData] = useState({
    stock_id: "",
    stock_name: "",
    no_of_units: "",
    date_of_importing: "",
    isbn: ""
  });

  const [editFormData, setEditFormData] = useState({
    stock_id: "",
    stock_name: "",
    no_of_units: "",
    date_of_importing: "",
    isbn: ""
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      stock_id: addFormData.ID,
      stock_name: addFormData.stock_name,
      no_of_units: addFormData.no_of_units,
      date_of_importing: addFormData.date_of_importing,
      isbn: addFormData.isbn
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      stock_id: editContactId,
      ID : editFormData.ID,
      stock_name: editFormData.stock_name,
      no_of_units: editFormData.no_of_units,
      date_of_importing: editFormData.date_of_importing,
      isbn: editFormData.isbn,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      stock_id: contact.stock_id,
      stock_name: contact.stock_name,
      no_of_units: contact.no_of_units,
      date_of_importing: contact.date_of_importing,
      isbn: contact.isbn
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact._id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <>
    <SideBar />
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Product ID </th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>ISBN Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add an Product</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="stock_id"
          required="required"
          placeholder="Enter a Product ID"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="stock_name"
          required="required"
          placeholder="Enter an Product Name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="no_of_units"
          required="required"
          placeholder="Enter a Quantity"
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="date_of_importing"
          required="required"
          placeholder="Enter an Date"
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="isbn"
          required="required"
          placeholder="Enter ISBN Number"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
    </>
    );
}
export default UpdatedDashboard;
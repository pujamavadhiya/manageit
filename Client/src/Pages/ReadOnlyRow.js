import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.stock_id}</td>
      <td>{contact.stock_name}</td>
      <td>{contact.no_of_units}</td>
      <td>{contact.date_of_importing}</td>
      <td>{contact.isbn}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;

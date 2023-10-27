import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a ID"
          name="stock_id"
          value={editFormData.stock_id}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Product Name"
          name="stock_name"
          value={editFormData.productName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Quantity"
          name="no_of_units"
          value={editFormData.Quantity}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="date"
          required="required"
          placeholder="Enter Date"
          name="date_of_importing"
          value={editFormData.Date}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Enter ISBN number"
          name="isbn"
          value={editFormData.ISBN}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;

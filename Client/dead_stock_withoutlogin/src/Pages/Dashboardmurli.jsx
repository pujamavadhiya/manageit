import React, { useState ,useEffect } from 'react';
import ProductInfo from '../Elements/productInfo';
import SideBar from '../Elements/SideBar';
import './murli.css';

const Dashboardmurli = () => {
    const [stock_id, setstock_id] = useState('');
  const [stock_name, setstock_name] = useState('');
  const [date_of_importing, setdate_of_importing] = useState('');
  const [no_of_units, setno_of_units] = useState('');
  const [isbn, setIsbn] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/api/stock/addstock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body: JSON.stringify({ stock_id, stock_name, date_of_importing, no_of_units, isbn }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const [stocks, setStocks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState('');


  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/stock/deletestock/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStocks(stocks.filter((stock) => stock._id !== id));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/stock/fetchallstocks',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
        }
    })
      .then((res) => res.json())
      .then((data) => {
        setStocks(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);

  return (
    <>
    <div className="murli">
          <SideBar/>
    <input
        type="text"
        placeholder="Search stock name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    <table>
      <thead className='table-head'>
        <tr>
          <th>Stock Name</th>
          <th>Date of Importing</th>
          <th>Number of Units</th>
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='table-body'>
        {stocks.map((stock) => (
          <tr key={stock.stock_id}>
            <td>{stock.stock_name}</td>
            <td>{stock.date_of_importing}</td>
            <td>{stock.no_of_units}</td>
            <td>{stock.isbn}</td>
            <td className='button-column'> 
              <div className="deleteButton">
                <button onClick={() =>{ handleDelete(stock._id)}}>Delete</button>
              </div>
              <div className="invoiceButton">
                <button>Sell/ Invoice</button>
              </div>
            </td>
            {/* <td> */}
                {/* <button onClick={() => setEditMode(stock)}>Edit</button> */}
              {/* </td> */}
          </tr>
        ))}
      </tbody>
    </table>
    <h2 className='main-head'>Edit the clicked stock</h2>
    
    <form className='update-form' onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Stock id"
        value={stock_id}
        onChange={(e) => setstock_id(e.target.value)}
      />
      <input
        type="text"
        placeholder="Stock Name"
        value={stock_name}
        onChange={(e) => setstock_name(e.target.value)}
      />
      <input
      className='date-input'
        type="date"
        placeholder="Date of Importing"
        value={date_of_importing}
        onChange={(e) => setdate_of_importing(e.target.value)}
      />
      <input
        type="text"
        placeholder="Number of Units"
        value={no_of_units}
        onChange={(e) => setno_of_units(e.target.value)}
      />
      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
    {/* <form onSubmit={handleEditSubmit}>
        <input
        type="text"
        placeholder="Stock id"
        value={stock_id}
        onChange={(e) => setstock_id(e.target.value)}
      />
      <input
        type="text"
        placeholder="Stock Name"
        value={stock_name}
        onChange={(e) => setstock_name(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date of Importing"
        value={date_of_importing}
        onChange={(e) => setdate_of_importing(e.target.value)}
      />
      <input
        type="text"
        placeholder="Number of Units"
        value={no_of_units}
        onChange={(e) => setno_of_units(e.target.value)}
      />
      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form> */}
    </div>
    </>
  );
};

export default Dashboardmurli;

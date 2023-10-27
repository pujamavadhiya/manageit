import React, { useState,useEffect } from "react";
import SideBar from "../Elements/SideBar";
import '../Assets/Dashboard.css';
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import data from '../Assets/mock-data.json';
import ProductInfo from "../Elements/productInfo";

// import newd from '../Pages/new-data.json';
// import fs from
// const fs = require('fs');
// import Popup from "./fetchData";
const Dashboard = (props) => {
    const [Products, setProducts] = useState(data);
    let i = 5;
    const newFormm = [];
    const form = document.getElementById('newproduct');
    const [addProduct, setProduct] = useState({
        "id": '',
        "Name": "",
        "ID": "",
        "Location": "",
        "Expiry": "",
        "Quantity": "",
        "Status": ""
    })

    const [stock_id, setstock_id] = useState('');
    const [stock_name, setstock_name] = useState('');
    const [date_of_importing, setdate_of_importing] = useState('');
    const [no_of_units, setno_of_units] = useState('');
    const [isbn, setIsbn] = useState('');
  
    // const [searchTerm, setSearchTerm] = useState('');
  
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
  
    const handleDelete = (id) => {
      
        fetch('http://localhost:5000/api/deadstock/adddeadstock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
        
        body: JSON.stringify({stock_id:"aniket", stock_name:"stock_name", date_of_importing:"12-02-21", no_of_units:100, isbn:7148523697 }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      fetch(`http://localhost:5000/api/stock/deletestock/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
      })
        .then((res) => {res.json()})
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
  
    const handleFormChange = (event) => {
        event.preventDefault();
        
        let updatedValue = {};
        i++;
        updatedValue = {
            "id": i,
            "Name": document.getElementById('product_name').value,
            "ID":  document.getElementById('product_id').value,
            "Location":  document.getElementById('product_location').value,
            "Expiry": document.getElementById('product_expiry').value,
            "Quantity": document.getElementById('quantity').value,
            "Status": "a"
        }
        
        
        // console.log(event.target);

    //     const save =(data , file)=>{
    //     const finished =(e)=>{
    //         if(e){
    //             console.log(e)
    //             return;
    //         }
    //     }
    //     // const jsonData =JSON.stringify(data)
    //     // fs.writeFile(file ,jsonData , finished);
    // }

    // save(updatedValue , 'mock-data.json');

        setProduct({
            ...addProduct,
            ...updatedValue

        })
        // const newFormData = { ...addProduct };
        // newFormData[productName] = fieldValue;
        // setProduct(newFormData);
    }
    // const handleSubmit = (event) => {
    //     event.preventDefault();
         
    //     i++;
    //     let daat = {
    //         "id": i,
    //         "Name": document.getElementById('product_name').value,
    //         "ID": document.getElementById('product_id').value,
    //         "Location": document.getElementById('product_location').value,
    //         "Expiry": document.getElementById('product_expiry').value,
    //         "Quantity": document.getElementById('quantity').value,
    //         "Status": ""
    //     }
        
    //     newFormm.push(daat);
    //     console.log("THis is data")
    //     console.log(newFormm);
    //     const submitForm = {
    //         "id": i,
    //         "Name": addProduct.Name,
    //         "ID": addProduct.ID,
    //         "Location": addProduct.Location,
    //         "Expiry": addProduct.Expiry,
    //         "Quantity": addProduct.Quantity,
    //         "Status": addProduct.Status
    //     };
   
      
    //     const submitForms = [...Products, submitForm];
    //     setProducts(submitForms);
    //     console.log(submitForms);
    //     document.forms[0].reset();
         
    // };
    const [searchTerm,setSearchTerm] = useState("");

    const products_disp = document.querySelector(".listt")
    const [switchToggled, setSwitchToggled] = useState(false)
    const ToggleSwitch = () => {
    switchToggled ? setSwitchToggled(false) : setSwitchToggled(true)
    if (switchToggled === true) {
      products_disp.classList.add("active")
      
    } else {
      products_disp.classList.remove("active")
       
    }
  }
    const Search = () => {
        console.log('search button clicked')
    }

    // Edit form 
    const [editContactId, setEditContactId] = useState(null);

    // const handleEditclick = (event) =>{
    //   event.preventDefault();
    //   console.log("hello")
    // }
    return (
        <>
            <SideBar />
            <div className="dashboard">
                <div className="upper-half">
                    <section className="scan-item">

                        <ul id="intro-text">
                            <li id="stock">Stock</li>
                            <li>Get notified on every update...</li>
                            <Link>
                                <li id="Scan-button"><button>
                                    Scan
                                </button>
                                </li>
                            </Link>
                        </ul>

                    </section>
                    <section className="add-item">
                        <div className="search-container">
                            <b>
                                <input type="text" placeholder="Search items..." id="hel" onChange={(event)=>{
                                    setSearchTerm(event.target.value);
                                    // console.log(event.target.value)
                                }}/>
                                
                                {data.filter((val)=>{
                                    if(searchTerm===""){
                                        return val
                                    }else if(val.Name.toLowerCase().includes(searchTerm.toLowerCase())){return val}
                                }).map((val,key)=>{
                                    return(<div className="user" key={key}>
                                        <br></br>
                                        {/* <p>{val.Name}</p> */}
                                        <div className="listt">
                        <table className="Products_display"  key="hello">
                            <tbody>
                                <tr>
                                    <th>No.</th>
                                    <th>Product Name/ID</th>
                                    <th>Location</th>
                                    <th>Expiry</th>
                                    <th>Quantity</th>
                                </tr>
                            </tbody>
                            <tbody>
                                    <tr>
                                        <td>
                                            {val.id}
                                        </td>
                                        <td>
                                            <Link to = '/ProductInfo'>{val.Name}</Link> : {val["ID"]}
                                        </td>
                                        <td>{val.Location}</td>
                                        <td>
                                            <span className="dot"></span>
                                            {val.Expiry}
                                        </td>
                                        <td>{val.Quantity}</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                                    </div>)
                                }
                                ) }
                            </b>
                            <b>
                                <button className="submit" type="submit" onChange={ToggleSwitch} onClick={Search}><FaSearch /></button>
                            </b>

                        </div>

                    </section>
                </div>
                <hr />
                <div className="lower-half">
                    <div>
                        <div className="sort">
                            <label htmlFor="Products">Sort By: </label>
                            <select id="sort-options">
                                <option value="Expiry date">Expiry Date</option>
                                <option value="name">Name</option>
                                <option value="date added">date added</option>
                            </select>
                        </div>
                        <div className="toggle-button">
                            {/* check text */}
                        </div>
                    </div>
                    <div className="list">
                        {/* <table className="Products" key="hello">
                            <tbody>
                                <tr>
                                    <th>No.</th>
                                    <th>Product Name/ID</th>
                                    <th>Location</th>
                                    <th>Expiry</th>
                                    <th>Quantity</th>
                                    <th>Status </th>
                                </tr>
                            </tbody>
                            <tbody>
                                {Products.map((Products) => (

                                    <tr>
                                        <td>
                                            {Products.id}
                                        </td>
                                        <td>
                                            <Link to = '/ProductInfo'>{Products.Name}</Link> : {Products["ID"]}
                                        </td>
                                        <td>{Products.Location}</td>
                                        <td>
                                            <span className="dot"></span>
                                            {Products.Expiry}
                                        </td>
                                        <td>{Products.Quantity}</td>

                                        <td>
                                            <select id="staus-options">
                                                <option value="In-stock">In-stock</option>
                                                <option value="Expiring soon">Expiring soon</option>
                                                <option value="Ordered">Ordered</option>
                                            </select>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table> */}
                            <table>
      <thead>
        <tr>
          <th>Stock Name</th>
          <th>Date of Importing</th>
          <th>Number of Units</th>
          <th>ISBN</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.stock_id}>
            <td>{stock.stock_name}</td>
            <td>{stock.date_of_importing}</td>
            <td>{stock.no_of_units}</td>
            <td>{stock.isbn}</td>
            <td>
              <button onClick={() =>{ handleDelete(stock._id)}}>Delete</button>
            </td>
            <td>
                <button >Edit</button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
                    </div>
                    {/* this is list eending */}
                </div>
                {/* this is lower half ending */}

                <div className="option-field">
                <form onSubmit={handleSubmit}>
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
      <button type="submit">Add Product</button>
    </form>
                </div>
            </div>
            <ProductInfo key={data.name} />
        </>
    )
}

export default Dashboard;
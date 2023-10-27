import React,{ useState , useEffect } from "react";
import '../Assets/DeadStock.css';
import SideBar from "../Elements/SideBar";
import { FaSearch } from "react-icons/fa";
import data from '../Assets/DeadStock-data.json';
import './Aniket.css';

const DeadStock = () =>{
    
    const Search = () => {
        console.log('Search button is clicked')
    }
    const [ItemDetails, setItemDetails] = useState(data);

    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/deadstock/fetchalldeadstocks',{
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


    return(
        <>
            <SideBar />
            <div className="History">
                <div className="upper-half">
                    <div className="left-upper-half">
                            <ul id="left-texts">
                                <li id="Stock"> Stock</li>
                                <li>Get notified on every update...</li>
                            </ul>
                        <div className="left-lower-half">
                            <div className="search-bar">
                                <div id="Search">
                                    <input type="text" placeholder="Search items..." />
                                    <button type="submit" onClick={Search}><FaSearch /></button>
                                </div>
                            </div>
                                    
                        </div>
                    </div>
                    <div className="right-upper-half">
                        <p>Stock Which is</p>
                        <h1 id="History">Expired</h1>
                    </div>
                </div>
                <hr />
                <div className="lower-half">
                    <div className="history-list">
                    {/* <table className="Products" key ="product">
                        <tbody >
                            <tr >
                                <th>No.</th>
                                <th>Product Name</th>
                                <th>Product ID</th>
                                <th>Quantity</th>
                                <th>Location</th>
                                <th>Date Expired</th>
                            </tr>
                            </tbody>
                            <tbody>
                                { ItemDetails.map((ItemDetails) => (
                                    // <>
                                    <tr>
                                        <td>{ ItemDetails.No }</td>
                                        <td>{ ItemDetails.Name }</td>
                                        <td>{ ItemDetails.ID}</td>
                                        <td>{ ItemDetails.Quantity }</td>
                                        <td>{ ItemDetails.Location}</td>
                                        <td>{ ItemDetails.Date }</td>
                                    </tr>    
                                    // </>
                                ))}
                            </tbody>
                            
                        </table> */}
                        <table>
      <thead className='dead-stock-head'>
        <tr>
          <th> <p>
            Stock Name
          </p>
            </th>
          <th>Date of Importing</th>
          <th>Number of Units</th>
          <th>ISBN</th>
        </tr>
      </thead>
      <tbody className='dead-stock-body'>
        {stocks.map((stock) => (
          <tr key={stock.stock_id}>
            <td> <p>
             {stock.stock_name}
            </p>
                </td>
            <td>{stock.date_of_importing}</td>
            <td>{stock.no_of_units}</td>
            <td>{stock.isbn}</td>
            {/* <td>
              <button onClick={() =>{ handleDelete(stock._id)}}>Delete</button>
            </td> */}
            {/* <td>
                <button onClick={() => handleEdit(stock)}>Edit</button>
              </td> */}
          </tr>
        ))}
      </tbody>
    </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeadStock;
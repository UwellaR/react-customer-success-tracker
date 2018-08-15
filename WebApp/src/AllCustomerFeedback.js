import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'

class CustomerFeedback extends Component{

  state = {
    data: []
  };

  componentWillMount() {
    fetch('https://ogugu-customer-service.herokuapp.com/feedbacks')
      .then((result) => {
        return result.json()
      })
      .then((result) => {
        this.setState({data:  result.data.rows})
      })
  };

  handleClick = function(index) {
    console.log(this.state.data, index);
    //alert('News -> ' + index);
    //c => (
      //<Link to={`/customerfeedback/${c.col}`}>{c.first_name} {c.last_name}</Link>
    //)
  }

  renderTable = () => {
    return this.state.data.map((element, row) => {
      const newClass =  element.status == 'ongoing' ? 'ongoing-class' : element.status == 'completed' ? 'completed-class' : 'pending-class';
      return (
        <tr key={`row-${row}`} className={`listing-entry ${newClass}`} onClick={() => this.handleClick(row)}>
          <td><Link to={`/customerfeedback/${element.id}`}>{element.first_name}</Link></td>
          <td>{element.last_name}</td>
          <td>{element.phone_number}</td>
          <td>{element.address}</td>
          <td>{element.comments}</td>
          <td><img className="thumb" src={`${element.img}`}/></td>
        </tr>
      );
    });

  }

  render() {

    return (
      <div className="App">
        <header className="App-header"></header>

        <table className="fetching">
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>PHONE NUMBER</th>
              <th>ADDRESS</th>
              <th>COMMENTS</th>
              <th>IMAGE</th>
            </tr>
          </thead>

          <tbody className="items">
            {this.renderTable()}

          </tbody>
        </table>
      </div>
    );
  }

}

export default CustomerFeedback

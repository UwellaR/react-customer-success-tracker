import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CustomerContainer extends Component {

  state = {
    data: {},
    status: 'pending',
    id: 0,
  }

  componentWillMount() {
    const str =  this.props.location.pathname;
    const arr = str.split("/");
    const id = arr[arr.length-1];
    fetch(`https://ogugu-customer-service.herokuapp.com/feedback/${id}`)
      .then((result) => {
        return result.json()
      })
      .then((result) => {
        console.log('res ', result);
        this.setState({data:  result.data.rows[0], id, status: result.data.rows[0].status})
      })
  };

  handleChange = (event) => {
    this.setState({status: event.target.value})
  }

  submitStatus = () => {
    console.log(this.state.status, this.state.id);
    const { status, id } = this.state;
    fetch(`https://ogugu-customer-service.herokuapp.com/feedback`, {
      method: 'put',
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
      body: JSON.stringify({status, id})
    })
  }

  render() {

    const customer = this.state.data;

    if (Object.keys(customer).length < 1) {
      return <div>Sorry, but the customer was not found</div>
    }

    return (
        <div>
          <table className="percustomer">
            <tbody>
              <tr>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.phone_number}</td>
                <td>{customer.address}</td>
                <td>{customer.comments}</td>
                <td><img className="thumb" src={`${customer.img}`}/></td>
                <td>
                  <select name="status" value={this.state.status} onChange={this.handleChange}>
                      <option value="pending">Pending</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                  </select>

                  <br/><br/>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.submitStatus}>Submit</button>
          <br/><br/>

          <Link to='/customerfeedback'>Back</Link>
        </div>
      )
  }
}

export default CustomerContainer

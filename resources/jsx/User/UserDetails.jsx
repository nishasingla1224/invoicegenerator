import React, { Component } from 'react';
import ItemDetails from '../Item/ItemDetails';

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
    	"userName":"",
    	"email":"",
    	"userType":"0"
    };
   
  }
  handleUserSelect(e){
  	this.state.userType = e.target.value;
  	this.setState({
  		"userType":this.state.userType
  	})
  }
  render(){

	return (
	 <form>
	 <fieldset className="scheduler-border">
      <legend align="right">User Details</legend>
      <div className="form-group">
        <label>Customer Name</label>
        <input type="text" className ="form-control" placeholder="Enter User Name">
        </input>
      </div>
      <div className="form-group">
        <label>Email ID</label>
        <input type="text" className ="form-control" placeholder="Enter an email Id">
        </input>
      </div>
      <div className="form-group">
        <label>User Type</label>
        <select className="form-control"  value = {this.state.userType} onChange={this.handleUserSelect.bind(this)} >
		    <option value="30">Employee</option>
		    <option value ="10">Affiliate</option>
		    <option value="0">Normal</option>
		 </select>
      </div>

      </fieldset>
      <ItemDetails  userType={this.state.userType}/>
      </form>)
}
}

export default UserDetails;
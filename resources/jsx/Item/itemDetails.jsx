import React, { Component } from 'react';

class ItemDetails extends Component {

  handleFormChange(rowData,event){
      var actionName = rowData.actionName;
      if(rowData.type == "checkbox"){
      this.state.items[rowData.index][actionName] = event.target.checked;
      }else if(rowData.type == "number" || rowData.type == "text"){
        this.state.items[rowData.index][actionName] = event.target.value;
      }
      
      this.setState({
        "items" : this.state.items
      });
    }
  setAmount(row,index){
    let amount = 0;
    if(row.quantity && row.price){
        if(parseInt(this.state.userType) === 0){
        amount = row.quantity * row.price;
        }else{
         amount = [(100 - parseInt(this.state.userType))/100]*[row.quantity * row.price];
        }
      }
      if(row.isGrocery){
        amount = amount ? 0.95 * amount : 0;
      }
      this.state.items[index].amount = amount;
      var total = 0;
      this.state.items.map(function(row){
        total = total + row.amount;
      })
      this.props.total = total;
      return amount.toFixed(2);
  }
  handleAddItem(e){
    e.preventDefault();
    var  row = {
        "name": "",
        "quantity": 1,
        "isGrocery":false,
        "price":0,
        "amount":0
      }
    this.state.items.push(row);
    this.setState({
      "items": this.state.items
    })
  }
  componentWillReceiveProps(nextProps) {
      this.setState({"userType":nextProps.userType});  
  }
  constructor(props) {
    super(props);
    let row = {
        "name": "",
        "quantity": 1,
        "isGrocery":false,
        "price":0,
        "amount":0
      }
    this.state = {
      items: [row],
      userType:this.props.userType
    };
  }
  
  render() {
    let _this = this;
    return (
      <div>
      <table className="table table-bordered ">
      <thead>
        <tr>
          <th>#</th>
          <th>Items</th>
          <th>Grocery Category</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
      {
        this.state.items.map(function(row,i){
          
          return (<tr>
                  <th scope="row">{i+1}</th>
                  <td> 
                  <input type="text"  placeholder="Enter Item Name" onChange={_this.handleFormChange.bind(_this,{"type":"text","actionName":"name","index":i})} >{row.name}
                  </input>
                  </td>
                  <td>
                  <label className="switch">
                    <input type="checkbox" checked={row.isGrocery} onChange={_this.handleFormChange.bind(_this,{"type":"checkbox","actionName":"isGrocery","index":i})}></input>
                    <div className="slider round"></div>
                  </label>
                  </td>
                  <td> 
                  <input type="number" placeholder="Quantity" value={row.quantity} onChange={_this.handleFormChange.bind(_this,{"type":"number","actionName":"quantity","index":i})}></input>
                  </td>
                  <td>
                  <input type="number" placeholder="Price"  value={row.price} onChange={_this.handleFormChange.bind(_this,{"type":"text","actionName":"price","index":i})}></input>
                  </td>
                  <td>
                  <input type="number" placeholder="Amount" value={_this.setAmount(row,i)}></input>
                  </td>
                  </tr>)
        })
      }
      </tbody>
      </table>
      <div className="addItem">
      <button onClick={_this.handleAddItem.bind(_this)}>Add an Item</button></div>
      <section className="sectionClass">
      <div className="total">
      <div className="subtotal">
        <div className="subtotalLabel">
          <strong >Total:</strong>
        </div>
        <div className="subtotalAmount">
        <span>{this.props.total|| 0.00}</span>
        </div>
      </div>
      </div></section>
      </div>
    );
  }
}

export default ItemDetails;

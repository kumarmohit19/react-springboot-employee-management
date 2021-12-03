import React, { Component } from "react";
import "./App.css";
import LeftBanner from "./Components/LeftBanner";
import Table from "./Components/Table";
import Modal from "./Components/Modal";

class App extends Component {
  state = {
    data: [],
    firstName: undefined,
    lastName: undefined,
    department: undefined,
    salary: undefined,
    showModal: false,
    editId: undefined,
    mode: true,
    deleteId: undefined,
    sort: "none",
    filter: "none",
    errorMsg: "",
  };


  handleGetData = () => {
   
  };

  handleChange = (e) => {
    
  };

  handleResetState = () => {
    
  };

  handleClearFilter = () => {
    
  };

  //filter and sorting
  handleFilter = () => {
    
  };

  handleDelete = (i) => {
    
  };

  closeModal = () => {
    
  };

  handleEdit = (i) => {
    
  };

  handleDeleteEmployee = async (i) => {
    
  };

  handleValidation = () => {
    
  };

  handleAdd = async () => {
    
  };

  render() {
    return (
      <div>
        <header className="Header">
        
        </header>
        <div className="Body">
          
        </div>
        
      </div>
    );
  }
}

export default App;

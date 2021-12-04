import React, { Component } from 'react'
import './App.css'
import LeftBanner from './Components/LeftBanner'
import Table from './Components/Table'
import Modal from './Components/Modal'

class App extends Component {
  state = {
    data: [],
    firstName: '',
    lastName: '',
    department: '',
    salary: 0,
    showModal: false,
    editId: 0,
    mode: true,
    deleteId: 0,
    sort: '',
    filter: '',
    errorMsg: '',
  }
  componentDidMount() {
    // try {
    //   const res = await fetch(`/api/employees`)
    //   const data = await res.json()

    //   //console.log(data)

    //   this.setState({
    //     data: data,
    //   })
    // } catch (error) {
    //   console.error(error)
    // }
    this.handleGetData()
  }

  handleGetData = async () => {
    try {
      const res = await fetch(`/api/employees`)
      const data = await res.json()

      //console.log(data)

      this.setState({
        data: data,
      })

      this.closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = (e) => {
    let target = e.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    let name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleResetState = () => {
    this.setState({
      firstName: '',
      lastName: '',
      department: '',
      salary: '',
      errorMsg: '',
      mode: true,
    })
  }

  handleClearFilter = () => {
    this.setState({
      filter: 'none',
      sort: 'none',
    })
  }

  //filter and sorting
  handleFilter = async (e) => {
    try {
      //e.preventDefault()

      const filter = this.state.filter
      const sort = this.state.sort

      let filters = ''

      if (filter !== '' && filter !== 'none') {
        filters += `dept=${filter}`
      }

      if (sort !== '' && sort !== 'none') {
        // let sortType = ''

        // if (sort === 'High to Low') sortType = 'desc'
        // else sortType = 'asc'

        filters += filters === '' ? `salary=${sort}` : `&salary=${sort}`
      }

      const res = await fetch(`/api/employees?${filters}`)
      const data = await res.json()

      //console.log(data)

      this.setState({
        data: data,
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleDelete = (id) => {
    this.setState({
      showModal: !this.state.showModal,
      deleteId: id,
    })
  }

  closeModal = async () => {
    this.setState({
      showModal: false,
      deleteId: undefined,
    })
    //this.handleGetData()
  }

  handleEdit = (i) => {
    const dataArr = this.state.data
    // console.log(dataArr)
    const empToEdit = dataArr.filter((emp) => emp.id != i)
    // console.log('here ' + empToEdit[0].salary)
    const { id, firstName, lastName, department, salary } = empToEdit[0]
    this.setState({
      editId: id,
      mode: false,
      firstName: firstName,
      lastName: lastName,
      department: department,
      salary: salary,
    })
  }

  handleDeleteEmployee = async (id) => {
    await fetch(`/api/employees/${id}`, {
      method: 'Delete',
    })
    // setTimeout(function () {
    //this.closeModal()
    // }, 100)
    this.handleGetData()

    // console.log('here')
  }

  handleValidation = (e) => {
    //e.preventDefault()
  }

  handleAdd = async (e) => {
    //e.preventDefault()
    const firstName = this.state.firstName
    const lastName = this.state.lastName
    const department = this.state.department
    const salary = this.state.salary

    //console.log(firstName, lastName, salary, department)
    if (firstName == '' || lastName == '' || department == '' || salary == '') {
      this.setState({
        errorMsg: 'All fields are mandatory to fill',
      })
      return
    } else if (
      !(/^[a-zA-Z]+$/.test(firstName) && /^[a-zA-Z]+$/.test(lastName))
    ) {
      this.setState({
        errorMsg: 'First/Last name should contain only alphabets',
      })
      return
    } else if (!(firstName.length >= 3 && lastName.length >= 3)) {
      this.setState({
        errorMsg: 'First/Last name should contain atleast 3 characters',
      })
      return
    } else if (salary <= 15000) {
      this.setState({
        errorMsg: 'Minimum salary should be 15000',
      })
      return
    }

    const emp = {
      firstName,
      lastName,
      department,
      salary,
    }

    if (this.state.mode) {
      const res = await fetch(`/api/employees`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emp),
      })

      const data = await res.json()
      //console.log(data)

      // const updData = this.state.data
      // updData.push(data)

      this.setState({
        data: [data, ...this.state.data],
        filter: 'Front-end',
        sort: 'Low to High',
      })

      this.handleFilter()
      this.handleResetState()
    } else {
      await fetch(`/api/employees/${this.state.editId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emp),
      })
    }
  }

  render() {
    return (
      <div>
        <header className='Header'>Employee Management</header>
        <div className='Body'>
          <LeftBanner
            sort={this.state.sort}
            filter={this.state.filter}
            errorMsg={this.state.errorMsg}
            empId={this.state.editId}
            firstName={this.state.firstName}
            secondName={this.state.lastName}
            salary={this.state.salary}
            department={this.state.department}
            onAdd={this.handleAdd}
            onChange={this.handleChange}
            onReset={this.handleResetState}
            onClearFilter={this.handleClearFilter}
            mode={this.state.mode}
            onFilter={this.handleFilter}
          />
          <Table
            data={this.state.data}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
            editId={this.state.editId}
          />
        </div>
        {this.state.showModal && (
          <Modal
            title={'Confirm'}
            message={
              'Are you sure? Do you want to delete employee detail with id'
            }
            onDelete={this.handleDeleteEmployee}
            onClose={this.closeModal}
            id={this.state.deleteId}
          />
        )}
      </div>
    )
  }
}

export default App

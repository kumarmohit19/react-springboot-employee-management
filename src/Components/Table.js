import React from 'react'
import editIcon from '../images/edit.png'
import deleteIcon from '../images/delete.png'

function Table({ data, onEdit, onDelete, editId }) {
  return (
    <div className='TableContainer'>
      <table className='Table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((emp) => (
              <tr key={emp.id} className={editId === emp.id ? 'onEdit' : ''}>
                <td>{emp.id}</td>
                <td>
                  {emp.firstName} {emp.lastName}
                </td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <img
                    src={editIcon}
                    onClick={() => onEdit(emp.id)}
                    alt='edit'
                  />
                </td>
                <td>
                  <img
                    src={deleteIcon}
                    onClick={() => onDelete(emp.id)}
                    alt='delete'
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6'>No Employee Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table

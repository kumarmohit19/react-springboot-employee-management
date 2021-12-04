import React from 'react'

function LeftBanner({
  firstName,
  secondName,
  department,
  salary,
  onAdd,
  onChange,
  onReset,
  filter,
  sort,
  errorMsg,
  onClearFilter,
  onFilter,
  mode,
}) {
  return (
    <div className='LeftBanner'>
      <div className='AsideDiv'>
        <form action=''>
          <span className='AsideTitle'>
            {mode ? 'AddClear' : 'UpdateClear'}
          </span>
          <button className='ClearButton' type='button' onClick={onReset}>
            Clear
          </button>
          <hr />
          <input
            type='text'
            name='firstName'
            value={firstName || ''}
            onChange={(e) => onChange(e)}
            className='InputFields'
            placeholder='First Name'
            required
          />
          <input
            type='text'
            value={secondName || ''}
            name='lastName'
            onChange={(e) => onChange(e)}
            className='InputFields'
            placeholder='Last Name'
            required
          />
          <select
            type='text'
            name='department'
            onChange={(e) => onChange(e)}
            value={department || ''}
            className='select'
            placeholder='First Name'
            required
          >
            <option value=''>--Select Department--</option>
            <option value='front-end'>Front-end</option>
            <option value='back-end'>Back-end</option>
            <option value='full-stack'>Full-stack</option>
          </select>
          <input
            type='number'
            name='salary'
            className='InputFields'
            onChange={(e) => onChange(e)}
            value={salary || ''}
            placeholder='Salary Per Month'
            min='15000'
            required
          />
          {mode ? (
            <button
              type='submit'
              className='AddButton'
              onClick={(e) => onAdd(e)}
            >
              Add Employee
            </button>
          ) : (
            <button type='button' className='AddButton' onClick={onAdd}>
              Update Employee
            </button>
          )}

          <span style={{ display: !errorMsg && 'none', color: 'red' }}>
            {errorMsg}
          </span>
        </form>
      </div>

      <div className='AsideDiv'>
        <form action=''>
          <span className='AsideTitle'>Filter & SortClear</span>
          <button className='ClearButton' type='button' onClick={onClearFilter}>
            Clear
          </button>
          <hr />
          <select
            type='text'
            name='filter'
            onChange={(e) => onChange(e)}
            value={filter}
            className='select'
            placeholder='First Name'
          >
            <option value=''>--no filter--</option>
            <option value='Front-end'>Front-end</option>
            <option value='Back-end'>Back-end</option>
            <option value='Full-stack'>Full-stack</option>
            <option value='Mainframe'>Mainframe</option>
          </select>
          <select
            type='text'
            name='sort'
            onChange={(e) => onChange(e)}
            value={sort}
            className='select'
            placeholder='First Name'
          >
            <option value=''>--no sorting--</option>
            <option value='High to Low'>High to Low</option>
            <option value='Low to High'>Low to High</option>
          </select>
          <button type='button' className='AddButton' onClick={onFilter}>
            Filter
          </button>
        </form>
      </div>
    </div>
  )
}

export default LeftBanner

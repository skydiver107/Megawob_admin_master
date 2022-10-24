// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Store & Actions
import { getData, addEvent, updateEvent, deleteEvent } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Plus, Edit, MoreVertical, Trash, ChevronDown, ChevronUp } from 'react-feather'

// ** Reactstrap Imports
import {
  Card, CardHeader, CardTitle, Input, Label, Row, Col, Button,
  Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap'

import AddNewModal from './AddNewModal'

const Datatable = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.nft)

  // ** States
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("NEW")
  const [filter, setFilter] = useState({
    currentPage: 1,
    column: 'id',
    direction: 'asc',
    rowsPerPage: 7,
    searchValue: ''
  })

  const [data, setData] = useState(
    {
      _id: "",
      id: 0,
      uri: "",
      imageUrl: "",
      prevUri: "",
      prevImageUrl: "",
      state: 0
    }
  )

  const count = Math.ceil(store.total / filter.rowsPerPage)

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData(filter)
    )
  }, [dispatch])

  // ** Function to handle filter
  const handleFilter = e => {
    const filterData = {
      ...filter,
      searchValue: e.target.value,
      currentPage: 1
    }
    setFilter(filterData)

    dispatch(
      getData(filterData)
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    const filterData = {
      ...filter,
      currentPage: page.selected + 1
    }
    setFilter(filterData)
    dispatch(
      getData(filterData)
    )
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    const filterData = {
      ...filter,
      currentPage: 1,
      rowsPerPage: parseInt(e.target.value)

    }
    setFilter(filterData)
    dispatch(
      getData(filterData)
    )
  }

  const handleSort = (column) => {
    if (filter.column === column) {
      const filterData = {
        ...filter,
        currentPage: 1,
        column,
        direction: filter.direction === "asc" ? "desc" : "asc"
      }
      setFilter(filterData)
      dispatch(
        getData(filterData)
      )
    } else {
      const filterData = {
        ...filter,
        currentPage: 1,
        column,
        direction: "asc"
      }
      setFilter(filterData)
      dispatch(
        getData(filterData)
      )
    }
  }

  // Custom Functions

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)


  const handleEditChange = (event) => {
    switch (event.target.name) {
      case 'state':
        {
          setData({
            ...data,
            [event.target.name]: event.target.checked ? 1 : 0
          })
        }
        break
      default:
        setData({
          ...data,
          [event.target.name]: event.target.value
        })
    }
  }

  const handleNewModal = () => {
    setData({
      _id: "",
      id: 0,
      uri: "",
      imageUrl: "",
      state: 0
    })
    setMode("NEW")
    handleModal()
  }

  const handleEditRow = (event, id) => {
    event.preventDefault()
    setData({
      ...store.data[id]
    })
    setMode("EDIT")
    handleModal()
  }

  const handleDeleteRow = (event, id) => {
    event.preventDefault()

    if (confirm("Do you want to delete this row?")) {
      dispatch(
        deleteEvent(store.data[id]._id)
      )
    }
  }

  const handleSubmitModal = () => {
    if (mode === "NEW") {
      dispatch(
        addEvent(data)
      )

      handleModal()
    } else {
      dispatch(
        updateEvent(data)
      )
      handleModal()
    }
  }
  console.log('store', store)
  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>NFTs With Trait</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ml-2' color='primary' onClick={handleNewModal}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add Record</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-50'>
          <Col sm='6'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={filter.rowsPerPage}
                onChange={e => handlePerPage(e)}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <Label for='sort-select'>entries</Label>
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={filter.searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <Table striped responsive>
          <thead>
            <tr>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("id")} >
                id {filter.column === "id" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("uri")}>
                Uri  {filter.column === "uri" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              {/* <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("imageUrl")}>
                Image Url  {filter.column === "imageUrl" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th> */}
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("state")}>
                State  {filter.column === "state" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              store.data.map((element, index) => (
                <tr key={index}>
                  <td> {element.id} </td>
                  <td> {element.uri} </td>
                  {/* <td> {element.imageUrl} </td> */}
                  <td> {element.state} </td>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='/' onClick={(event) => handleEditRow(event, index)}>
                          <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                        </DropdownItem>
                        <DropdownItem href='/' onClick={(event) => handleDeleteRow(event, index)}>
                          <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              )
              )
            }
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          breakLabel='...'
          pageCount={count || 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          activeClassName='active'
          forcePage={filter.currentPage !== 0 ? filter.currentPage - 1 : 0}
          onPageChange={page => handlePagination(page)}
          pageClassName='page-item'
          breakClassName='page-item'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          breakLinkClassName='page-link'
          previousLinkClassName='page-link'
          nextClassName='page-item next-item'
          previousClassName='page-item prev-item'
          containerClassName={
            'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
          }
        />
      </Card>
      <AddNewModal
        open={modal}
        handleModal={handleModal}
        mode={mode}
        data={data}
        handleEditChange={handleEditChange}
        handleSubmitModal={handleSubmitModal}
      />
    </Fragment>
  )
}

export default memo(Datatable)

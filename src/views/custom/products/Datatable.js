// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Store & Actions
import { getData, addEvent, updateEvent, deleteEvent } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Plus, Edit, MoreVertical, Trash, ChevronDown, ChevronUp, Upload } from 'react-feather'

// ** Reactstrap Imports
import {
  Card, CardHeader, CardTitle, Input, Label, Row, Col, Button,
  Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap'

import AddNewModal from './AddNewModal'
import UploadIcon from '@src/assets/images/icons/upload.png'
import { BACKEND_URL } from '@src/configs'

const Datatable = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.products)

  // ** States
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("NEW")
  const [filter, setFilter] = useState({
    currentPage: 1,
    column: 'key',
    direction: 'asc',
    rowsPerPage: 7,
    searchValue: ''
  })
  const [imageSrc, setImageSrc] = useState(UploadIcon)
  const [imageFile, setImageFile] = useState('')
  const [newSize, setNewSize] = useState('')

  const [data, setData] = useState(
    {
      _id: "",
      name: "",
      image: "",
      CMID: "",
      price: "",
      displayOrder: "",
      creatorAddress: "",
      sizes: []
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


  const handleEditChange = (event, type) => {
    switch (type) {
      default:
        setData({
          ...data,
          [type]: event.target.value
        })
    }
  }

  const handleNewModal = () => {
    setData({
      _id: "",
      name: "",
      image: "",
      CMID: "",
      price: "",
      displayOrder: "",
      creatorAddress: "",
      sizes: []
    })
    setMode("NEW")
    setImageSrc(UploadIcon)
    setImageFile('')
    handleModal()
  }

  const handleEditRow = (event, id) => {
    event.preventDefault()
    setData({
      ...store.data[id]
    })
    setMode("EDIT")
    setImageSrc(BACKEND_URL + store.data[id].image)
    setImageFile('')

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
    const formData = new FormData()
    if (imageFile !== '') {
      formData.append('file', imageFile)
    }
    formData.append('data', JSON.stringify(data))

    if (mode === "NEW") {
      console.log(formData)
      dispatch(
        addEvent(formData)
      )
    } else {
      dispatch(
        updateEvent(formData)
      )
    }
    handleModal()
  }
  // image import
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]))
      setImageFile(event.target.files[0])
    }
  }


  const handleNewSizeChange = (event) => {
    setNewSize(event.target.value)
    // console.log("new size", newSize)
  }

  const handleAddSize = (event) => {
    const newSizes = [...data.sizes]
    newSizes.push(newSize)
    setNewSize('')
    setData({
      ...data,
      sizes: newSizes
    })
    // console.log("newSizes:", data.sizes)
  }

  const handleSizeChange = (event, index) => {
    const newSizes = data.sizes
    newSizes[index] = event.target.value
    setData({
      ...data,
      sizes: newSizes
    })
  }

  const handleDeleteSize = (event, index) => {
    const newSizes = data.sizes.filter((size, key) => key !== index)

    setData({
      ...data,
      sizes: newSizes
    })
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Products</CardTitle>
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
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("name")} >
                Name {filter.column === "name" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("CMID")} >
                CMID {filter.column === "CMID" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("price")} >
                Price {filter.column === "price" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("displayOrder")}>
                Display Order  {filter.column === "displayOrder" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              store.data.map((element, index) => (
                <tr key={index}>
                  <td> {element.name} </td>
                  <td> {element.CMID} </td>
                  <td> {element.price} </td>
                  <td> {element.displayOrder} </td>
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
        imageSrc={imageSrc}
        handleImageChange={handleImageChange}
        handleEditChange={handleEditChange}
        handleSubmitModal={handleSubmitModal}
        newSize={newSize}
        handleNewSizeChange={handleNewSizeChange}
        handleAddSize={handleAddSize}
        handleSizeChange={handleSizeChange}
        handleDeleteSize={handleDeleteSize}
      />
    </Fragment>
  )
}

export default memo(Datatable)

// ** React Imports
import { useState } from 'react'

import { User, AlignCenter, Info, X, PlusCircle, MinusCircle } from 'react-feather'

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
  Input,
  Label
} from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

import styles from './index.module.scss'

const AddNewModal = ({
  open,
  handleModal,
  mode,
  data,
  imageSrc,
  handleImageChange,
  handleSubmitModal,
  handleEditChange,
  newSize,
  handleNewSizeChange,
  handleAddSize,
  handleSizeChange,
  handleDeleteSize
}) => {

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{mode === 'NEW' ? 'New Record' : 'Edit Record'}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label for='Name'>* Name</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='Name' placeholder='Name' value={data.name} onChange={(event) => handleEditChange(event, 'name')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <div className={styles.collection_icon}>
            <div className={styles.icon_header}>Image</div>
            <div className={styles.icon_content}>
              <img src={imageSrc} />
              <input type='file' onChange={handleImageChange} />
            </div>
          </div>
        </div>
        <div className='mb-1'>
          <Label for='CMID'>* Candy Machine ID</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='CMID' placeholder='CMID' value={data.CMID} onChange={(event) => handleEditChange(event, 'CMID')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='creatorAddress'>Creator Address</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='creatorAddress' placeholder='Creator Address' value={data.creatorAddress} onChange={(event) => handleEditChange(event, 'creatorAddress')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='Price'>* Price</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='Price' type='number' placeholder='Price' value={data.price} onChange={(event) => handleEditChange(event, 'price')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='displayOrder'>* Display Order</Label>
          <InputGroup>
            <InputGroupText>
              <Info size={15} />
            </InputGroupText>
            <Input id='displayOrder' placeholder='Display Order' value={data.displayOrder} onChange={(event) => handleEditChange(event, 'displayOrder')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='size'>Size</Label>
          {
            data.sizes.map((size, index) => {
              return (
                <InputGroup key={index} className='mb-1'>
                  <InputGroupText>
                    <Info size={15} />
                  </InputGroupText>
                  <Input value={size} onChange={(event) => handleSizeChange(event, index)} />
                  <Button.Ripple className='btn-icon' color='danger' onClick={(event) => handleDeleteSize(event, index)}>
                    <MinusCircle size={16} />
                  </Button.Ripple>
                </InputGroup>
              )
            })
          }
        </div>
        <div className='mb-1'>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input placeholder='New Size' value={newSize} onChange={handleNewSizeChange} />
            <Button.Ripple className='btn-icon' color='primary' onClick={handleAddSize}>
              <PlusCircle size={16} />
            </Button.Ripple>
          </InputGroup>
        </div>
        <Button className='mr-1' color='primary' onClick={handleSubmitModal}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal

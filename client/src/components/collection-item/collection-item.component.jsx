import React from 'react';
import { connect } from 'react-redux';

import "./collection-item.style.scss"

import CustomButton from '../custom-button/custom-button.component'
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItem }) => {

  const { name, price, imageUrl } = item
  return(
  <div className='collection-item'>
    <div
      className='image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='collection-footer'>
      <span className='name'>{name}</span>
      <span className='price'>${price}</span>
    </div>
    {/* by doing onClick={(item) => addItem(item)} item is passed as an event which is clicking on button */}
    <CustomButton className='custom-button' inverted onClick={() => addItem(item)}>Add to Cart</CustomButton>
    
    {/* Never do this. this will call additem(item) whenever it will render
    <CustomButton inverted onclick={addItem(item)}>Add to Cart</CustomButton> */}
  </div>
)};

const mapDispatchToProps = dispatch => ({
  addItem: (item) => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);
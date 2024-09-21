
import React from 'react';
import Modal from 'react-modal';

const ProductModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [image, setImage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, price, image });
    setTitle('');
    setPrice('');
    setImage('');
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Title"
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <div className='flex gap-3'>
          <button
            type="submit"
            className="bg-blue-500  text-white rounded-lg px-4 py-2"
          >
            Add Product
          </button>
          <button
          onClick={onRequestClose}
          className=" bg-gray-300 text-gray-700 rounded-lg px-4 py-2"
        >
          Close
        </button>
          </div>
         
        </form>
        
      </div>
    </Modal>
  );
};

export default ProductModal;

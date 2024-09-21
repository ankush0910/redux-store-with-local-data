
import React, { useEffect, useState } from 'react';
import { useAddProductMutation, useGetProductsQuery } from '../Services/ProductListapi';
import ProductModal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectProducts, setProducts, updateProduct } from '../Slice/productSlice';

const ProductList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();
  const combinedProducts = useSelector(selectProducts); 

  useEffect(() => {
    if (products) {
      const productsWithIds = products.map(product => ({
        ...product,
        id: product.id
      }));
      dispatch(setProducts(productsWithIds)); 
    }
  }, [products, dispatch]);

  const handleAddProduct = async (newProduct) => {
    dispatch(addProduct(newProduct)); 
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (product) => {
    if (currentProduct) {
  
      dispatch(updateProduct({ id: currentProduct.id, updatedProduct: product }));
    } else {
      handleAddProduct(product);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-[100vh]">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 ">Product List</h1>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white rounded-lg px-4 py-2 mb-2">
        Add Product
      </button>
   
      <div>
        <h1 className="text-center text-2xl font-bold mb-4 mt-8">All Products</h1>
        <ProductModal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
            setCurrentProduct(null); 
          }}
          onSubmit={handleModalSubmit}
          product={currentProduct} 
        />
      
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {combinedProducts.map((product, index) => (
            <li key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img src={product.image} alt={product.title} className="w-48 h-48 object-cover mb-4" />
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-700">${product.price}</p>
              <button onClick={() => handleEditProduct(product)} className="mt-2 bg-yellow-500 text-white rounded px-2 py-1">Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;

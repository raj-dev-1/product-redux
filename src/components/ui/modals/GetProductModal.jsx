import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';

const GetProductModal = ({ setOpenGetProductModal, productId }) => {
    const [productDetails, setProductDetails] = useState({});

    const {products, loading, error } = useSelector((state) => state.product);

    const fetchProductDetails = async () => {
        try {
            const product = products?.find((product) => product.id === parseInt(productId));
            if (!product) {
                alert('Product not found.');
                return;
            }            
            setProductDetails(product);
        } catch (error) {
            setError('Failed to fetch product details. Please try again later.');
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto border-2 border-gray-300 rounded-xl bg-white p-4 lg:p-11">
                <div className="px-2 flex items-center justify-between pb-4">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800">Product Details</h4>
                    <IoClose className="h-6 w-6 cursor-pointer" onClick={() => setOpenGetProductModal(false)} />
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <div className="loader"></div>
                    </div>
                )}
                {error && (
                    <div className="text-red-500 text-center py-4">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="h-[370px] overflow-y-auto px-2 pb-3">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Field</th>
                                    <th className="px-4 py-2 text-left">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Title</td>
                                    <td className="px-4 py-2">{productDetails.title}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Description</td>
                                    <td className="px-4 py-2">{productDetails.description}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Price</td>
                                    <td className="px-4 py-2">{productDetails.price}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Category</td>
                                    <td className="px-4 py-2">{productDetails.category}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Product Image</td>
                                    <td className="px-4 py-2">
                                        <img
                                            src={productDetails.image}
                                            alt="Product"
                                            className="w-30 h-30 object-cover"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-semibold">Product Reviews</td>
                                    <td className="px-4 py-2">
                                        <div className='flex items-center'>
                                            {[...Array(5)].map((_, index) => (
                                                index < Math.round(productDetails?.rating?.rate) ? (
                                                    <IoIosStar key={index} className="w-5 h-5 text-amber-500" />
                                                ) : (
                                                    <IoIosStarOutline key={index} className="w-5 h-5 text-gray-300" />
                                                )
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetProductModal;

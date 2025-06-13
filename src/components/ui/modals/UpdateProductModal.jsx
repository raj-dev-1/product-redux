import React, { useEffect, useCallback } from 'react';
import Label from "../../form/Label.jsx";
import Input from "../../form/InputField.jsx";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Button from '../button/Button.jsx';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../../store/productSlice.js';

const UpdateProductModal = ({ setOpenUpdateProductModal, productId }) => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
    const initialValues = {
        title: "",
        price: "",
        description: "",
        category: ""
    };

    const Validation = Yup.object({
        title: Yup.string().min(3, "Title must be at least 3 characters").required("Please Enter Title"),
        price: Yup.number().positive("Price must be a positive number").required("Please Enter Price"),
        description: Yup.string().min(10, "Description must be at least 10 characters").required("Please Enter Description"),
        category: Yup.string().required('Please Enter at least one category'),
    });

    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched,
        resetForm,
        setValues
    } = useFormik({
        initialValues,
        validationSchema: Validation,
        onSubmit: async (values) => {
            try {
                dispatch(updateProduct({ id: productId, updatedProduct: values }));
                const updatedProduct = products.find((product) => product.id === productId);
                alert(`Product Updated Successfully!\n\nTitle: ${updatedProduct.title}\nDescription: ${updatedProduct.description}\nPrice: ${updatedProduct.price}\nCategory: ${updatedProduct.category}`);
                setOpenUpdateProductModal(false);
                resetForm();
            } catch (error) {
                console.error("Error in adding new product", error);
            }
        }
    });

    const fetchProductDetails = useCallback(async () => {
        try {
            const productDetails = products.find((product) => product.id === productId);
            if (!productDetails) {
                alert("Product not found");
            }
            setValues({
                title: productDetails.title,
                description: productDetails.description,
                price: productDetails.price,
                category: productDetails.category
            });
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }, [productId]);

    useEffect(() => {
        if (productId) {
            fetchProductDetails();
        }
    }, [productId, fetchProductDetails]);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto border-2 border-gray-300 rounded-xl bg-white p-4 lg:p-11">
                <div className="px-2 flex items-center justify-between max-md:flex-col">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800">
                        Update Product
                    </h4>
                    <IoClose className="h-6 w-6 cursor-pointer" onClick={() => setOpenUpdateProductModal(false)} />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-4">
                     <div className="loader"></div>
                    </div>
                ) : (
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="h-[370px] overflow-y-auto px-2 pb-3">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:min-w-[375px]">
                                <div className="relative">
                                    <Label>Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        value={values.title}
                                        error={errors.title && touched.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.title && touched.title && (
                                        <p className="absolute -bottom-4 text-error-500 text-xs mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div className="relative">
                                    <Label>Description</Label>
                                    <Input
                                        type="text"
                                        name="description"
                                        value={values.description}
                                        error={errors.description && touched.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.description && touched.description && (
                                        <p className="absolute -bottom-4 text-error-500 text-xs mt-1">{errors.description}</p>
                                    )}
                                </div>

                                <div className="relative">
                                    <Label>Price</Label>
                                    <Input
                                        type="number"
                                        name="price"
                                        value={values.price}
                                        error={errors.price && touched.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.price && touched.price && (
                                        <p className="absolute -bottom-4 text-error-500 text-xs mt-1">{errors.price}</p>
                                    )}
                                </div>

                                <div className="relative">
                                    <Label>Category</Label>
                                    <Input
                                        type="text"
                                        name="category"
                                        value={values.category}
                                        error={errors.category && touched.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.category && touched.category && (
                                        <p className="absolute -bottom-4 text-error-500 text-xs mt-1">{errors.category}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={() => setOpenUpdateProductModal(false)} type="button">
                                Cancel
                            </Button>
                            <Button size="sm" type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateProductModal;

import React from 'react';
import Label from "../../form/Label.jsx";
import Input from "../../form/InputField.jsx";
import * as Yup from 'yup';
import {useFormik} from "formik";
import Button from '../button/Button.jsx';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../store/productSlice.js';

const AddProductModal = ({setOpenAddProductModal}) => {
    const dispatch = useDispatch();

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
    } = useFormik({
        initialValues,
        validationSchema: Validation,
        onSubmit: async (values) => {
            try {
                dispatch(createProduct(values));
                setOpenAddProductModal(false);
                resetForm();
            } catch (error) {
                console.error("Error in adding new product", error);
            }
        }
    });
    

  return (
    <div  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-30 max-w-[700px] m-4 ">
        <div
            className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto border-2 border-gray-300 rounded-xl bg-white p-4 lg:p-11">
            <div className="px-2 flex items-center justify-between max-md:flex-col">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800">
                    Add Product
                </h4>
                <IoClose className='h-6 w-6' onClick={() => setOpenAddProductModal(false)} />
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="h-[370px] overflow-y-auto px-2 pb-3">
                    <div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:min-w-[375px]">
                            <div className='relative'>
                                <Label>Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    error={(errors.title && touched.title)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.title && touched.title && (
                                    <p className="absolute -bottom-4 text-error-500 text-xs mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div className='relative'>
                                <Label>Decription</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    error={(errors.description && touched.description)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.description && touched.description && (
                                    <p className="absolute -bottom-4 text-error-500 text-xs mt-1">{errors.description}</p>
                                )}
                            </div>
                            <div className='relative'>
                                <Label>Price</Label>
                                <Input
                                    type="number"
                                    name="price"
                                    value={values.price}
                                    error={(errors.price && touched.price)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.price && touched.price && (
                                    <p className="absolute -bottom-4 text-error-500 text-xs mt-1">{errors.price}</p>
                                )}
                            </div>
                            <div className='relative'>
                                <Label>category</Label>
                                <Input
                                    type="text"
                                    name="category"
                                    value={values.category}
                                    error={(errors.category && touched.category)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.category && touched.category && (
                                    <p className="absolute -bottom-4 text-error-500 text-xs mt-1">{errors.category}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="outline" onClick={() => setOpenAddProductModal(false)} type="button">
                        Cancel
                    </Button>
                    <Button size="sm" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddProductModal;

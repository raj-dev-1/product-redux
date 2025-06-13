import { useEffect, useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import AddProductModal from "../modals/AddProductModal.jsx";
import Button from "../button/Button.jsx";
import UpdateProductModal from "../modals/UpdateProductModal.jsx";
import GetProductModal from "../modals/GetProductModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../../store/productSlice.js";

const SearchInput = ({ search, setSearch }) => {
    return (
        <div className="relative">
            <button className="absolute -translate-y-1/2 left-4 top-1/2">
                <CiSearch />
            </button>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-subtitle-xs placeholder:text-gray-400 xl:w-[430px]"
            />
        </div>
    )
}

const DataTable = () => {
    const [filteredList, setFilteredList] = useState([]);
    const categoryList = [
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
    ]
    const [category, setCategory] = useState("");
    const [productId, setProductId] = useState("");
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
    const [openGetProductModal, setOpenGetProductModal] = useState(false);
    const [search, setSearch] = useState("");
    const [rowsLimit] = useState(3);
    const [rowsToShow, setRowsToShow] = useState([]);
    const [customPagination, setCustomPagination] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);
    
    const nextPage = () => {
        const startIndex = rowsLimit * (currentPage + 1);
        const endIndex = startIndex + rowsLimit;
        const newArray = filteredList.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(currentPage + 1);
    };
    const changePage = (value) => {
        const startIndex = value * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = filteredList.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(value);
    };
    const previousPage = () => {
        const startIndex = (currentPage - 1) * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = filteredList.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(0);
        }
    };

    const handleDeleteClick = async (productId) => {
        try {
            const deletedProduct = products.find((product) => product.id === productId);
            dispatch(deleteProduct(productId));
            alert(`Product Deleted Successfully!\n\nTitle: ${deletedProduct.title}\nDescription: ${deletedProduct.description}\nPrice: ${deletedProduct.price}\nCategory: ${deletedProduct.category}`);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useMemo(() => {
        setCustomPagination(
            Array(Math.ceil(filteredList?.length / rowsLimit)).fill(null)
        );
        setTotalPage(
            Math.ceil(filteredList?.length / rowsLimit)
        )
    }, [filteredList?.length, rowsLimit]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        let filteredProducts = [...products];

        if (search !== "") {
            filteredProducts = products.filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (category !== "") {
            filteredProducts = filteredProducts.filter((product) =>
                product.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        setFilteredList(filteredProducts);
        setRowsToShow(filteredProducts.slice(0, rowsLimit));
        setTotalPage(Math.ceil(filteredProducts.length / rowsLimit));
        setCurrentPage(0);
    }, [search, products, rowsLimit, category]);

    useEffect(() => {
        setRowsToShow(products.slice(0, rowsLimit));
    }, [products, rowsLimit]);

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <SearchInput search={search} setSearch={setSearch} />
                    <select className="h-10 border border-gray-200" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        {categoryList.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <Button className="max-w-40" size="sm" onClick={() => setOpenAddProductModal(true)} >
                    Add Product
                </Button>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-200">
                                <tr>
                                    <th className="px-5 py-3 font-medium text-gray-500 text-center text-subtitle-xs "
                                    >
                                        Title
                                    </th>
                                    <th className="px-5 py-3 font-medium text-gray-500 max-w-[200px] text-center text-subtitle-xs "
                                    >
                                        Product Title
                                    </th>
                                    <th className="px-5 py-3 font-medium text-gray-500 text-center text-subtitle-xs "
                                    >
                                        Product Description
                                    </th>
                                    <th className="px-5 py-3 font-medium text-gray-500 text-center text-subtitle-xs "
                                    >
                                        Product Category
                                    </th>
                                    <th className="px-5 py-3 font-medium text-gray-500 text-center text-subtitle-xs "
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center px-5 py-3 text-gray-500">
                                        <div className="flex justify-center items-center space-x-2">
                                        <div className="w-4 h-4 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
                                        <span>Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : rowsToShow.length > 0 ? (
                                rowsToShow.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-5 py-4 max-w-[200px] sm:px-6 text-center text-gray-800 text-subtitle-sm">
                                        {product.title}
                                    </td>
                                    <td className="px-4 py-3 max-w-[200px] text-gray-500 text-center text-subtitle-sm ">
                                        {product.price}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 text-center text-subtitle-sm max-w-52">
                                        {product.description}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 text-center text-subtitle-sm ">
                                        {product.category}
                                    </td>
                                    <td>
                                    <div className="flex items-center justify-center gap-4">
                                        <span
                                        onClick={() => {
                                            setOpenGetProductModal(true);
                                            setProductId(product.id);
                                        }}
                                        className="transition duration-300 text-gray-500 hover:text-brand-500 cursor-pointer"
                                        >
                                        <FaRegEye className="h-5 w-5" />
                                        </span>
                                        <span
                                        onClick={() => {
                                            setOpenUpdateProductModal(true);
                                            setProductId(product.id);
                                        }}
                                        className="transition duration-300 text-gray-500 hover:text-brand-500 cursor-pointer"
                                        >
                                        <FaEdit className="h-5 w-5" />
                                        </span>
                                        <span
                                        onClick={() => handleDeleteClick(product.id)}
                                        className="transition duration-300 text-gray-500 hover:text-error-500 cursor-pointer"
                                        >
                                        <MdDelete className="h-5 w-5" />
                                        </span>
                                    </div>
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan={5} className="text-center px-5 py-3 text-gray-500">
                                    No Data Found
                                </td>
                                </tr>
                            )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            {
                totalPage > 1 && (
                    <div className="w-full justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
                        <div className="flex justify-center">
                            <ul
                                className="flex justify-center items-center gap-x-[10px] z-30"
                                role="navigation"
                                aria-label="Pagination"
                            >
                                <li
                                    className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-2 text-gray-400 disabled ${currentPage == 0
                                            ? "border-gray-200 pointer-events-none"
                                            : "border-gray-400 cursor-pointer"
                                        }
  `}
                                    onClick={previousPage}
                                >
                                    <FaAngleLeft />
                                </li>
                                {customPagination?.map((_data, index) => (
                                    <li
                                        className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-solid border-[2px] bg-transparent cursor-pointer ${currentPage == index
                                                ? "text-brand-500  border-brand-500"
                                                : "border-gray-200 text-gray-800"
                                            }`}
                                        onClick={() => changePage(index)}
                                        key={index}
                                    >
                                        {index + 1}
                                    </li>
                                ))}
                                <li
                                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-2 border-solid text-gray-400 ${currentPage == totalPage - 1
                                            ? "border-gray-200 pointer-events-none"
                                            : "border-gray-400 cursor-pointer"
                                        }`}
                                    onClick={nextPage}
                                >
                                    <FaAngleRight />
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
            {
                openAddProductModal && (
                    <AddProductModal setOpenAddProductModal={setOpenAddProductModal} />
                )
            }
            {
                openUpdateProductModal && (
                    <UpdateProductModal setOpenUpdateProductModal={setOpenUpdateProductModal} productId={productId} />
                )
            }
            {
                openGetProductModal && (
                    <GetProductModal setOpenGetProductModal={setOpenGetProductModal} productId={productId} />
                )
            }
        </>

    );
}

export default DataTable;

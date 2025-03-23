/* eslint-disable no-irregular-whitespace */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/services/authService"; // Assuming this service correctly fetches user with userId
import { Navbar } from "@/components/Navbar";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Your backend API base URL

export default function SellerDashboard() {
    const [user, setUser] = useState(null);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("listings");
    const [myListings, setMyListings] = useState([]);
    const [requests, setRequests] = useState([]); // Keeping requests state, even if tab is commented out, for future use
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        type: "",
        name: "",
        price: "",
        images: [],
        sellerId: null, // Seller ID will be set after fetching user data
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to handle errors in UI

    useEffect(() => {
        const fetchSellerData = async () => {
            setLoading(true);
            setError(null); // Reset error on new fetch attempt
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/auth/login");
                return;
            }

            try {
                const userData = await getCurrentUser(token);
                setUser(userData.user);
                setNewProduct((prev) => ({ ...prev, sellerId: userData.user.userId }));

                // Fetch only the logged-in seller's products using sellerId
                const productsResponse = await axios.get(`${API_BASE_URL}/products?sellerId=${userData.user.userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMyListings(productsResponse.data);

                // Fetch buyer requests (if you are using requests tab and have backend endpoint)
                // Example endpoint - adjust if your backend request endpoint is different
                // const requestsResponse = await axios.get(`${API_BASE_URL}/requests/seller/${userData.user.userId}`, {
                //     headers: { Authorization: `Bearer ${token}` },
                // });
                // setRequests(requestsResponse.data);

            } catch (fetchError) {
                console.error("Error fetching seller data:", fetchError);
                setError("Failed to load dashboard data. Please check console for details."); // Set error state
                navigate("/auth/login"); // Optionally navigate to login on data fetch failure
            } finally {
                setLoading(false);
            }
        };

        fetchSellerData();
    }, [navigate]);

    const toggleAddProduct = () => {
        setIsAddProductOpen(!isAddProductOpen);
        if (!isAddProductOpen) {
            setNewProduct({
                type: "",
                name: "",
                price: "",
                images: [],
                sellerId: user?.userId || null,
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setError(null); // Clear any previous image upload errors
        const files = Array.from(e.target.files as File[]);
        if (files.some(file => file.size > 10 * 1024 * 1024)) { // 10MB limit check
            setError("One or more images exceed the 10MB size limit.");
            e.target.value = ''; // Clear selected files from input
            setNewProduct(prev => ({ ...prev, images: [] }));
            return;
        }
        setNewProduct((prev) => ({ ...prev, images: files }));
    };


    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before submission
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append('type', newProduct.type);
            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price);
            // sellerId is handled on backend from token, no need to send it here

            newProduct.images.forEach(image => {
                formData.append('images', image);
            });

            await axios.post(`${API_BASE_URL}/products`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Re-fetch seller's products to update the listing table
            const productsResponse = await axios.get(`${API_BASE_URL}/products?sellerId=${user.userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMyListings(productsResponse.data);
            setIsAddProductOpen(false);
            alert("Product listed successfully!");

        } catch (submitError) {
            console.error("Error adding product:", submitError);
            setError("Failed to list product. Please check console for details."); // Set error state
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteListing = async (id) => {
        setError(null); // Reset error before delete
        if (window.confirm("Are you sure you want to delete this listing?")) {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                await axios.delete(`${API_BASE_URL}/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Re-fetch seller's products after deletion
                const productsResponse = await axios.get(`${API_BASE_URL}/products?sellerId=${user.userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMyListings(productsResponse.data);
                alert("Listing deleted successfully!");
            } catch (deleteError) {
                console.error("Error deleting listing:", deleteError);
                setError("Failed to delete listing. Please check console for details."); // Set error state
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEditListing = (id) => {
        navigate(`/seller/products/edit/${id}`);
    };

    // If you are using requests tab and actions (example - adapt to your actual request handling)
    const handleAcceptRequest = async (id) => { /* ... (unchanged logic if you use requests) */ };
    const handleRejectRequest = async (id) => { /* ... (unchanged logic if you use requests) */ };

    if (loading) {
        return <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>;
    }

    if (error) {
        return <div className="min-h-screen bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Error</h2>
                <p className="text-red-700">{error}</p>
                <button onClick={() => setError(null)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Clear Error</button>
            </div>
        </div>;
    }


    if (!user) {
        return <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-eco-500 to-tech-500">
            <Navbar />

            <div className="pt-36 p-6">
                <div className="container mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
                                <p className="text-gray-600">Welcome, {user.firstName} {user.lastName}!</p>
                            </div>
                            <button
                                onClick={toggleAddProduct}
                                className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 010-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Product
                            </button>
                        </div>

                        <div className="border-b border-gray-200 mb-6">
                            <nav className="-mb-px flex space-x-6">
                                <button
                                    onClick={() => setActiveTab("listings")}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "listings" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                                >
                                    My Listings
                                </button>
                                {/*  Requests Tab - Uncomment if you need to implement buyer requests in the future
                                <button
                                    onClick={() => setActiveTab("requests")}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === "requests" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                                >
                                    Buyer Requests
                                    {requests.filter(r => r.status === "pending").length > 0 && (
                                        <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {requests.filter(r => r.status === "pending").length}
                                        </span>
                                    )}
                                </button>
                                */}
                            </nav>
                        </div>

                        {activeTab === "listings" && (
                            <div className="overflow-x-auto">
                                {myListings.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">You haven't listed any products yet.</p>
                                        <button
                                            onClick={toggleAddProduct}
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                                        >
                                            Add Your First Product
                                        </button>
                                    </div>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Listed</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {myListings.map((listing) => (
                                                <tr key={listing._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-md object-cover" src={listing.images?.[0] || "/api/placeholder/120/90"} alt={listing.name} />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{listing.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{listing.type}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">${listing.price}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(listing.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => handleEditListing(listing._id)}
                                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteListing(listing._id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {/* Requests Tab Content - Uncomment if you need buyer requests functionality
                        {activeTab === "requests" && (
                            <div className="overflow-x-auto">
                                {requests.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">You don't have any buyer requests yet.</p>
                                    </div>
                                ) : (
                                    <table className="min-w-full divide-y divide-gray-200">
                                        </table>
                                )}
                            </div>
                        )}
                        */}


                    </div>
                </div>
            </div>

            {isAddProductOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        // eslint-disable-next-line no-irregular-whitespace
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleAddProductSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Product</h3>
                                            {error && <p className="text-red-500 text-sm mb-2">{error}</p>} {/* Display error message here */}
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Product Type</label>
                                                    <select
                                                        id="type"
                                                        name="type"
                                                        value={newProduct.type}
                                                        onChange={handleInputChange}
                                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                                                        required
                                                    >
                                                        <option value="">Select a type</option>
                                                        <option value="keyboard">Keyboard</option>
                                                        <option value="mouse">Mouse</option>
                                                        <option value="arduino">Arduino</option>
                                                        <option value="charger">Charger</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={newProduct.name}
                                                        onChange={handleInputChange}
                                                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="e.g., Product Name"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                                                    <input
                                                        type="number"
                                                        id="price"
                                                        name="price"
                                                        value={newProduct.price}
                                                        onChange={handleInputChange}
                                                        min="0"
                                                        step="0.01"
                                                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="0.00"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Product Images (Max 10MB each)</label>
                                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        <div className="space-y-1 text-center">
                                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <div className="flex text-sm text-gray-600">
                                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                                                                    <span>Upload images</span>
                                                                    <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" onChange={handleImageChange} required />
                                                                </label>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" disabled={loading || error}>
                                        {loading ? "Listing Product..." : "List Product"}
                                    </button>
                                    <button
                                        onClick={toggleAddProduct}
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getListingById } from '@/services/listingService';

// export default function CreateRequestPage() {
//   const { listingId } = useParams();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState('');
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const response = await getListingById(listingId!);
//         setListing(response.data);
//       } catch (error) {
//         console.error('Error fetching listing:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [listingId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/requests', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ listingId, message })
//       });

//       if (response.ok) {
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       console.error('Error creating request:', error);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!listing) return <div>Listing not found</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Create Purchase Request</h1>
//       <div className="max-w-lg mx-auto">
//         <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
//           <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
//           <img 
//             src={listing.image} 
//             alt={listing.title} 
//             className="w-full h-48 object-cover mb-4 rounded"
//           />
//           <p className="text-gray-600">Price: ₹{listing.price}</p>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">
//               Additional Message
//             </label>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="w-full p-2 border rounded"
//               rows={4}
//               placeholder="Add any special requests or notes..."
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Submit Request
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
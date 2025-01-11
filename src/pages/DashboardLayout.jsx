// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const DashboardLayout = ({ children }) => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <h1 className="text-xl font-semibold">
//               Leave Management System
//             </h1>
            
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-600">
//                 Welcome, {user?.name}
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
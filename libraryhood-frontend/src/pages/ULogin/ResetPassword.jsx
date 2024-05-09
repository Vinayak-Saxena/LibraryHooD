// import React, { useState } from 'react';
// import { useNavigate, useParams } from "react-router-dom";

// function ResetPassword() {
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const { id, token } = useParams();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             const response = await fetch(`http://localhost:4000/reset-password/${id}/${token}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ password })
//             });

//             const data = await response.json();

//             if (data.Status === "Success") {
//                 navigate('/login');
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <h4>Reset Password</h4>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="password">
//                             <strong>New Password</strong>
//                         </label>
//                         <input
//                             type="password"
//                             placeholder="Enter Password"
//                             autoComplete="off"
//                             name="password"
//                             className="form-control rounded-0"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button type="submit">
//                         Update
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ResetPassword;

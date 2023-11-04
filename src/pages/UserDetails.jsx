// import { useLoaderData, useParams, useNavigate } from "react-router-dom";

// const UserDetails = () => {
//   const { id } = useParams();
//   const userInfo = useLoaderData();

//   const user = userInfo.results.find((u) => u.login.uuid === id);

//   console.log(user);

//   return (
//     <div className="user-details">
//       {user && (
//         <div className="user-preview">
//           <h2>{`${user.name.first} ${user.name.last}`}</h2>
//           <p>{user.location.country}</p>
//           <p>{user.email}</p>
//           <p>{user.phone}</p>
//           <p>{user.login.uuid}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDetails;

// // data loader
// // export const UserDetailsLoader = async ({ params }) => {
// //   const { id } = params;

// //   const response = await fetch("https://randomuser.me/api/?results=10" + id);

// //   if (!response.ok) {
// //     throw Error("Could not find that user.");
// //   }

// //   return response.json();
// // };

// export const UserDetailsLoader = async ({ params }) => {
//   const { id } = params;

//   const response = await fetch("https://randomuser.me/api/?results=10");

//   if (!response.ok) {
//     throw Error("Could not fetch user data.");
//   }

//   const data = await response.json();
//   const user = data.results.find((u) => u.login.uuid === id);

//   if (!user) {
//     throw Error("User not found.");
//   }

//   return user;
// };

import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);

  const user = users.results.find((u) => u.login.uuid === id);

  return (
    <div className="user-details">
      {user ? (
        <div className="user-preview">
          <h2>{`${user.name.first} ${user.name.last}`}</h2>
          <p>{user.location.country}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.login.uuid}</p>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserDetails;

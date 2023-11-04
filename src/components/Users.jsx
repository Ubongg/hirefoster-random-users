import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div className="user-list">
      {users &&
        users.map((user) => (
          <div className="user-preview" key={user.login.uuid}>
            <Link to={`/users/${user.login.uuid}`}>
              <h2>{`${user.name.first} ${user.name.last}`}</h2>
            </Link>
            <p>{user.location.country}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        ))}
    </div>
  );
};

export default Users;

import { useEffect, useState } from "react";
import { getUsers, addUser } from "./api";

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // Load users on mount
  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  // Handle adding user
  const handleAddUser = async () => {
    await addUser({ ...newUser, password: "12345", role: "standard" });
    const res = await getUsers();
    setUsers(res.data);
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} ({u.role})</li>
        ))}
      </ul>

      <input
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}

export default Users;

export default function UserList({ users, selectUser }) {
  return (
    <div>
      {users.map((u) => (
        <div key={u._id} onClick={() => selectUser(u)}>{u.userName}</div>
      ))}
    </div>
  );
}

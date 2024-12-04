type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone : string;
}

export default async function UsersClient() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const users: User[] = await response.json()
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
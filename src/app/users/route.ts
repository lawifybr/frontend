export const users = 
[    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Doe'},]

export async function GET() {
    return Response.json(users)
}

export async function POST(request: Request) {
    const user = await request.json()
    const newUser = {id: users.length + 1, ...user}
    users.push(newUser)
    return new Response(JSON.stringify(newUser), {status: 201})
}
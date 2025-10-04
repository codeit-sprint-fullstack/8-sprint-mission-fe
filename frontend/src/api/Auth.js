const url = "https://panda-market-api.vercel.app/";


export async function login(body){
    const result = await fetch(`${url}/auth/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
}

export async function signUp(body){
    const result = await fetch(`${url}/auth/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
}
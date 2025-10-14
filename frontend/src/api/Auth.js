const url = "https://panda-market-api.vercel.app/";


export async function login(body){
    const res = await fetch(`${url}/auth/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((res) => res.data)
    .catch((err)=> {
        console.log(`에러: ${err.message}`);
        return err.message;
    });

    return res;
}

export async function signup(body){
    const res = await fetch(`${url}/auth/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((res) => res.data)
    .catch((err)=> {
        console.log(`에러: ${err.message}`);
        return err.message;
    });

    return res;
}

export async function getToken(refreshToken){
    const body = {
        refreshToken
    }
    const res = await fetch(`${url}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((res) => res.data)
    .catch((err)=> {
        console.log(`에러: ${err.message}`);
        return err.message;
    });

    return res;
}
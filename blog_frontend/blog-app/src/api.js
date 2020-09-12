export async function loginApi(data) {
    const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log('res', res);

    if(res.status > 299) {
        return Promise.reject('Incorrect login')
    }

    return await res.json();
}
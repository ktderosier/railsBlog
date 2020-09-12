let header = {};
const token = '';

export function setToken(token) {
    header = {     
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
}

export async function loginApi(data) {
    const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(res.status > 299) {
        return Promise.reject('Incorrect login')
    }

    return await res.json();
}

export async function signupApi(data) {
    const res = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export async function getBlogs() {
    const res = await fetch('/api/blogs', {
        headers: header
    });

    if(res.status > 299) {
        return Promise.reject('not authorized');
    }

    return await res.json();
}

export async function createBlog(data) {
    const res = await fetch(`/api/blogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


export async function getSingleBlog(id) {
    const res = await fetch(`/api/blogs/${id}`, {
        headers: header
    });

    if(res.status > 299) {
        return Promise.reject('not authorized');
    }

    return await res.json();
}

export async function editSingleBlog(id) {
    const res = await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        headers: header
    });

    if(res.status > 299) {
        return Promise.reject('not authorized');
    }

    return await res.json();
}

export async function deleteSingleBlog(id) {
    const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: header
    });

    if(res.status > 299) {
        return Promise.reject('not authorized');
    }

    return await res.json();
}
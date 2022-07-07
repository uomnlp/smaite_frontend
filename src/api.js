import config from "./config";

const SERVER_PATH = config.server.host;

const get = (path = '') => {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Pragma': 'no-cache', 'Cache-Control': 'private, no-cache, no-store, must-revalidate', 'Expires': '-1' },
        credentials: 'include',
        errorRedirect: false,
    };

    return fetch(SERVER_PATH + path, options);
}

const post = (path = '', body = {}) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Pragma': 'no-cache', 'Cache-Control': 'private, no-cache, no-store, must-revalidate', 'Expires': '-1' },
        body: JSON.stringify(body),
        credentials: 'include',
    };

    return fetch(SERVER_PATH + path, options)
}

const put = (path = '', body = {}) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Pragma': 'no-cache', 'Cache-Control': 'private, no-cache, no-store, must-revalidate', 'Expires': '-1' },
        body: JSON.stringify(body),
        credentials: 'include'
    };

    return fetch(SERVER_PATH + path, options);
}

export {
    get,
    post,
    put,
}
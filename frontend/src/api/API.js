function API (url, headers = {}) {
  this.url = url;
  this.headers = {
    'Content-Type': 'application/json',
    ...headers
  }
}

API.prototype.get = function (endpoint, headers) {
  return fetch(`${this.url}${endpoint}`, {
    method: 'get',
    headers: {
      ...this.headers,
      ...headers
    }
  });
}

API.prototype.post = function (endpoint, headers, body) {
  return fetch(`${this.url}${endpoint}`, {
    method: 'post',
    headers: {
      ...this.headers,
      ...headers
    },
    body
  });
}

API.prototype.put = function (endpoint, headers, body) {
  return fetch(`${this.url}${endpoint}`, {
    method: 'put',
    headers: {
      ...this.headers,
      ...headers
    },
    body
  });
}

API.prototype.delete = function (endpoint, headers) {
  return fetch(`${this.url}${endpoint}`, {
    method: 'delete',
    headers: {
      ...this.headers,
      ...headers
    }
  });
}

function SecureAPI (url, headers = {}) {
  const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    headers = {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      ...headers
    };
  }

  API.call(this, url, headers);
}

SecureAPI.prototype = Object.create(API.prototype);

Object.defineProperty(SecureAPI.prototype, 'constructor', {
  value: SecureAPI,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true
});

export { SecureAPI };
export default API;
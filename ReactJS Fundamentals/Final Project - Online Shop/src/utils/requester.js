const appKey = 'kid_SkiI-HAGm';
const appSecret = 'd19d4cf816e44521b30d051afc9d27ca';
const hostUrl = 'https://baas.kinvey.com';

const reqHandler = {
  login: (payload) => {
    return fetch(`${hostUrl}/user/${appKey}/login`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json();
      });
  },
  register: (payload) => {
    return fetch(`${hostUrl}/user/${appKey}`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json();
      });
  },
  logout: () => {
    return fetch(`${hostUrl}/user/${appKey}/_logout`, {
      method: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
      });
  },
  listProducts: (token) => {
    return fetch(`${hostUrl}/appdata/${appKey}/products?query={}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {        
        Authorization: 'Kinvey ' + token
      }
    })
      .then(res => {
        return res.json();
      });
  },
  addProduct: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/products`, {
      method: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json();
      });
  },
  editProduct: (id, payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/products/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json();
      });
  },
  deleteProduct: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  productDetails: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/products/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  similarProducts: (category) => {
    return fetch(`${hostUrl}/appdata/${appKey}/products?query={"category":"${category}"}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  addOrder: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/orders`, {
      method: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json();
      });
  },
  listOrders: () => {
    return fetch(`${hostUrl}/appdata/${appKey}/orders?query={}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {        
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  deleteOrder: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/orders/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  addCategory: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories`, {
      method: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json();
      });
  },
  listCategories: () => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories?query={}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {        
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  deleteCategory: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  getCategory: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  editCategory: (id, payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json();
      });
  },
  addComment: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments`, {
      method: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json();
      });
  },
  listComments: (productId) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments?query={"productId":"${productId}"}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {        
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  deleteComment: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  likedProducts: (username) => {
    return fetch(`${hostUrl}/appdata/${appKey}/products?query={"likes":"${username}"}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  commentedProducts: (username) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
};

export default reqHandler;

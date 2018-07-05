const appKey = 'kid_Hk4cOfYf7';
const appSecret = '34a227a0b717462ca31aa5689990d3ad';
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
  listPosts: () => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  listMyPosts: () => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts?query={"author":"${localStorage.getItem('username')}"}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  addPost: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts`, {
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
  editPost: (id, payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts/${id}`, {
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
  getPostDetails: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  deletePost: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      });
  },
  listComments: (id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
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
  }
};

export default reqHandler;

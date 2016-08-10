import isomorphicFetch from 'isomorphic-fetch';
import io from 'socket.io-client';
import { SOCKETIO_URL } from './backend_url';
import { socket } from './constants';

export function getAuthToken() {
  return window.localStorage.OneLoveAuthToken;
}


export function isLoggedIn() {
  return Boolean(getAuthToken());
}


export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace('/login/');
  }
}


export function fetch(args) {
  const {
    url,
    body,
    method,
  } = args;
  const newbody = JSON.stringify(body);
  const newargs = {
    body: newbody,
    method: method || 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `JWT ${getAuthToken()}`,
    },
  };
  if (!isLoggedIn()) {
    delete newargs.headers.Authorization;
  }
  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    newargs.headers['Content-Type'] = 'application/json';
  }
  return isomorphicFetch(url, newargs)
    .then(response => {
      const json = response.json();
      if (response.status >= 400) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return json;
    });
}


export function socketio() {
  if (socket.io) { return socket.io; }
  if (window.localStorage.OneLoveAuthToken) {
    socket.io = io(
      SOCKETIO_URL,
      {
        transports: ['websocket'],
        query: `token=${window.localStorage.OneLoveAuthToken}`,
      },
    );
  }
  return socket.io;
}


export function pathnameToBreadcrumbs(pathname) {
  let arg;
  const pathElements = [];
  const result = [];
  const crumbBlueprint = [];
  const breadcrumbItems = {
    applications: 'Applications',
    clusters: 'Clusters',
    hosts: 'Hosts',
    providers: 'Providers',
    provisions: 'Provisions',
    services: 'Services',
  };
  pathname.split('/').forEach(element => {
    if (element !== '') {
      pathElements.push(element);
    }
  });
  pathElements.forEach(element => {
    const elementIsCrumb = breadcrumbItems[element] !== undefined;
    if (elementIsCrumb) {
      if (arg) {
        crumbBlueprint.push({
          name: element,
          argument: arg,
        });
      } else {
        crumbBlueprint.push({
          name: element,
        });
      }
      arg = undefined;
    } else {
      arg = element;
    }
  });

  crumbBlueprint.forEach((element, index) => {
    const item = {
      name: breadcrumbItems[element.name],
      path: element.argument ? `/${element.argument}/${element.name}` : `/${element.name}`,
    };
    if (element.argument) {
      item.path = `${result[index - 1].path}${item.path}`;
    }
    result.push(item);
  });
  return result;
}

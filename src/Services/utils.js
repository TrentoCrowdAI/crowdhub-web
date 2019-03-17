async function sendAndParseJSON(url, params) {
  const res = await fetch(url, params);
  return await res.json();
}

export async function getJSON(url, params) {
  return await sendAndParseJSON(url, params);
}

export async function postJSON(url, data) {
  return await sendAndParseJSON(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export async function putJSON(url, data) {
  return await sendAndParseJSON(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export async function sendDelete(url) {
  return await fetch(url, {
    method: 'DELETE'
  });
}



export function makeCancellable(request) {
  let cancelled = false;
  return {
    result: new Promise((resolve, reject) => {
      request
        .then(res => {
          if (!cancelled) {
            resolve(res);
          }
        })
        .catch(err => {
          if (!cancelled) {
            reject(err);
          }
        })
    }),
    cancel: () => cancelled = true
  }
}
async function sendAndParseJSON(url, params) {
  const res = await fetch(url, params);

  if (!isResponseOk(res)) {
    const error = new Error('HTTP response code not 200');
    error.status = res.status;
    throw error;
  }

  return await res.json();
}

export const isResponseOk = (res) => res.status >= 200 && res.status <= 299;

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
  return await sendAndParseJSON(url, {
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

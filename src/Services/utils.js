async function sendAndParseJSON(url, params) {
  const res = await fetch(url, params);
  return await res.json();
}

export async function getJSON(url, params) {
  return await sendAndParseJSON(url, params);
}

export async function postJson(url, data) {
  return await sendAndParseJSON(url, {
    method: 'POST',
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

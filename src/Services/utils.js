export async function getJson(url, params) {
  const res = await fetch(url, params);
  return await res.json();
}

export async function postJson(url, data) {
  return await getJson(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}


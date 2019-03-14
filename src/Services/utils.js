
export async function fetchJson(url, params) {
  const res = await fetch(url, params);
  return await res.json();
}

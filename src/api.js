export async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/');


  if (!response.ok) {
    throw new Error("Ошибка сервера")
  }

  const tracks = await response.json();
  console.log(tracks)
  return tracks
}

export async function addPost() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  const ss = await response.json()
  return ss
}

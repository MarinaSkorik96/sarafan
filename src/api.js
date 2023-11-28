export async function getTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/');


  if (!response.ok) {
    throw new Error("Ошибка сервера")
  }

  const tracks = await response.json();
  return tracks
}
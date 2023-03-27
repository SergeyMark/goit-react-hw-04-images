import axios from 'axios';

export async function FetchApi(searchQuery, page) {
  const KEY = `32918808-7bed14219e5e11c2127636ebd`;
  const BASE_URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(BASE_URL);

  return response;
}
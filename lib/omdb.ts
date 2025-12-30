const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com';

export async function searchMovies(query: string) {
  if (!API_KEY) throw new Error('OMDB API key not found');
  
  const response = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
    {
      next: { revalidate: 300 } // 5 minute cache
    }
  );
  
  if (!response.ok) throw new Error('Failed to fetch movies');
  
  return response.json();
}
import { dbApiKey, removeData } from "./api";
import { movieData } from "./MovieF/Movie";

const targetLanguages = ["en", "zh", "ja", "ko"];
const collectedData: Record<string, movieData[]> = {
  en: [],
  zh: [],
  ja: [],
  ko: [],
};

const fetchWithRetry = async (url: string, retries = 3): Promise<any> => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Fetch failed"); //에러 발생
        return res.json();

    } catch (error) {
      if (retries > 0) {
        return fetchWithRetry(url, retries - 1);
      } else {
        throw new Error(`Failed to fetch ${url} after 3 attempts`);
      }
    }
  };  


  const fetchTvPopular = async (): Promise<movieData[]> => {
  
    let page = 1;
  
    while (true) {
      const urls = [0, 1, 2].map(
        (i) =>
          `https://api.themoviedb.org/3/tv/popular?api_key=${dbApiKey}&page=${page + i}`
      );
  
      const responses = await Promise.all(
        urls.map((url) => fetchWithRetry(url))
      );
  
      page += 3;
  
      for (const json of responses) {
        const filtered = removeData(json);
        for (const item of filtered) {
          const lang = item.original_language;
          if (
            targetLanguages.includes(lang) &&
            collectedData[lang].length < 10
          ) {
            collectedData[lang].push(item);
          }
        }
      }
  
      const done = targetLanguages.every(
        (lang) => collectedData[lang].length >= 10
      );
      if (done) break;
    }
  
    return targetLanguages
      .flatMap((lang) =>
        collectedData[lang]
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 10)
      );
  };
  
  export { fetchTvPopular };

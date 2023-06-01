import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { movieData } from "./MovieF/Movie";

export interface IPopularLanguage {
  value: string;
  label: string;
}
  const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const Keyword = atom<string | null>({
  key: "keyword",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
})

export const PopularLanguage = atom<IPopularLanguage[]>({
  key: "PopularLanguage",
  default: [
    { value: "en", label: "English" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japan" },
    { value: "ko", label: "Korean" },
  ],
});


export const HandleValue = atom<movieData[]>({
  key: "SelectHandleValue",
  default: [],
});

import { atom } from "recoil";
export interface IPopularLanguage {
  value: string;
  label: string;
}

export const PopularLanguage = atom<IPopularLanguage[]>({
  key: "PopularLanguage",
  default: [
    { value: "en", label: "English" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japan" },
    { value: "ko", label: "Korean" },
  ],
});


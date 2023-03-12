import { atom } from "recoil";
import { tvData } from "./Tv/AiringToday";
export interface IPopularLanguage {
    value: string;
    label: string;
}

export const PopularLanguage = atom<IPopularLanguage[]>({
    key: "PopularLanguage",
    default: [{ value: 'en', label: 'English' }, { value: 'zh', label: 'Chinese' }, { value: 'ja', label: 'Japan' },{ value: 'ko', label: 'Korean' }],
});

export const DefalutEn = atom<tvData[]>({
    key: "DefalutEn",
    default: [],
});
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { HandleValue, IPopularLanguage, PopularLanguage } from "../Atoms";
import { movieData } from "../MovieF/Movie";
import { useCallback, useEffect } from "react";
import Select, { SingleValue } from "react-select";

const SelectBox = styled.div`
  width: 4rem;
  font-size: 0.2rem;
  font-weight: 600;
  z-index: 4;
  right: 0;
  margin-left: 1rem;
  color: ${(props) => props.theme.bodyBgColor};
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  @media screen and (max-width: 550px) {
    margin: 5px;
  }
`;

const customStyles = {
    control: (base: any) => ({
        ...base,
        height: 25,
        minHeight: 25,
        alignContent: "center",
    }),
    valueContainer: (base: any) => ({
        ...base,
        alignItems: "center",
    }),
    menuList: (base: any) => ({
        ...base,
        color: "black",
    }),
};

const PopularSelect = ({ data }: { data: movieData[] | undefined }) => {
    const setHandleValue = useSetRecoilState(HandleValue);
    const popularLanguage = useRecoilValue(PopularLanguage);

    /* defalt "en" tv 시리즈 */
    useEffect(() => {
        if (data) {
            setHandleValue(data.filter((i: movieData) => i.original_language === "en"));
        }
    }, [data, setHandleValue]); //초기 값 "en"

    const handleChange = useCallback(
        (e: SingleValue<IPopularLanguage>) => {
            const value = e?.value;
        if (data) {
                setHandleValue(data.filter((i: movieData) => i.original_language === value));
            } else {
                setHandleValue([]); // 데이터가 없을 경우 빈 배열 할당
            }
          },
          [data, setHandleValue] //  useCallback으로 최적화
      );

    return (
        <SelectBox>
            <Select
                defaultValue={popularLanguage[0]}
                options={popularLanguage}
                onChange={handleChange}
                styles={customStyles}
            />
        </SelectBox>
    )
};

export default PopularSelect;
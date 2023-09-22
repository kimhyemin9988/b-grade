import Pagination from "./WebSliderC";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Pagination", () => {
  test("Pagination 컴포넌트 렌더링", () => {
    render(
      <Pagination
        //totalItems={15} // 실제 아이템 개수가 아님
        //itemsPerPage={5} //각 페이지당 5개 item -> Box 컴포넌트가 5개인지 확인
      />
    );

    const prevButton = screen.getByText(/</);
    const nextButton = screen.getByText(/>/);
  });

  test("첫번째 페이지에서는 왼쪽으로 가는 버튼을 클릭했을 때 가장 마지막 페이지로 이동함", () => {
    render(
      <Pagination/>
    );

    const prevButton = screen.getByText(/</);
    fireEvent.click(prevButton);
  });

  test("중간 페이지에서는 이전, 다음 페이지로 이동할 수 있음", () => {
    render(
      <Pagination
      />
    );

    const prevButton = screen.getByText(/</);
    const nextButton = screen.getByText(/>/);

    fireEvent.click(nextButton);

  });

  test("마지막 페이지에서는 다음 버튼을 클릭했을 때 첫번째 페이지로 이동함", () => {
    render(
      <Pagination
      />
    );

    const nextButton = screen.getByText(/>/);
    fireEvent.click(nextButton);
  });
});

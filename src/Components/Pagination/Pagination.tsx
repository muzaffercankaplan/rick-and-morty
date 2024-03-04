import "./Pagination.scss";

type Props = {
  current: number;
  totalPage: number;
  changePage: (value: number) => void;
};

const Pagination = ({ current, totalPage, changePage }: Props) => {
  return (
    <ul className="pagination">
      <div onClick={() => current >= 2 && changePage(1)} className="arrow">
        {"<<"}
      </div>
      <div
        onClick={() => current >= 2 && changePage(current - 1)}
        className="arrow"
      >
        {"<"}
      </div>
      {Array.from({ length: totalPage }).map((i, number) => {
        return (
          number < current + 2 &&
          number > current - 2 && (
            <li
              className={current == number + 1 ? "activePagination" : ""}
              key={number}
              onClick={() => changePage(number + 1)}
            >
              {" "}
              {number + 1}{" "}
            </li>
          )
        );
      })}
      <div
        onClick={() => current != totalPage && changePage(current + 1)}
        className="arrow"
      >
        {">"}
      </div>
      <div
        onClick={() => current != totalPage && changePage(totalPage)}
        className="arrow"
      >
        {">>"}
      </div>
    </ul>
  );
};

export default Pagination;

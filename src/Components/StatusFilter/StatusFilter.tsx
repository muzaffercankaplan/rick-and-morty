type Props = {
  isEmptyList?: boolean;
  handleClick: (item: string) => void;
  type: string;
  searchValue?: string;
  setSearchValue?: (val: string) => void;
  status: string;
};

const StatusFilter = ({
  isEmptyList,
  handleClick,
  type,
  searchValue,
  setSearchValue,
  status,
}: Props) => {
  const statusFilterArray: string[] = ["All", "Alive", "Dead", "unknown"];

  if (type === "favorite") {
    statusFilterArray.push("clear favorite list");
  }

  return (
    <div>
      {statusFilterArray.map((item) => (
        // (list && list.length > 0) || item !== "clear favorite list" ? (
        <button
          disabled={isEmptyList && item == "clear favorite list"}
          className={`statusFilter ${status === item && "activeStatusFilter"}`}
          onClick={() => handleClick(item)}
          key={item}
        >
          {item}
        </button>
      ))}
      <input
        value={searchValue}
        onChange={(e) => setSearchValue && setSearchValue(e.target.value)}
        placeholder="search character"
      />
    </div>
  );
};

export default StatusFilter;

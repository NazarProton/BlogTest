
export default function UsersTablePagination({ limit, skip, total, onChange }) {
  const totalPages = Math.floor(total / limit);
  const choosedPage = skip > 0 ? skip / 10 : limit / 10;

  return (
    <div>
      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((pageIndex) => {
        const isActive = pageIndex === choosedPage;
        const action = () => {
          if (pageIndex !== choosedPage) onChange(pageIndex);
        };
        return isActive ? (
          <b key={pageIndex} onClick={action}>
            {" "}
            {pageIndex}{" "}
          </b>
        ) : (
          <span key={pageIndex} onClick={action}>
            {" "}
            {pageIndex}{" "}
          </span>
        );
      })}
    </div>
  );
};

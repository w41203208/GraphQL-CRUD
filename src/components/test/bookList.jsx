import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { getTestQuery } from '../queries/test';

export const BookList = () => {
  const { loading, error, data } = useQuery(getTestQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="flex">
        <div className="flex-item-left">
          <div className="page-head">Book List</div>
          <div className="book-container">
            {data?.books?.map((item) => {
              return (
                <div key={item?.id} className="book-tile">
                  <div className="book-tile-head">{item?.name}</div>
                  <div className="book-tile-sub">{item?.genre}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

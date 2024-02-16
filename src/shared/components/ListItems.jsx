/* eslint-disable react/prop-types */
import { useState } from "react";

const ListItems = ({ items = [], maxLength = 10 }) => {
  const [pageCounter, setPageCounter] = useState(maxLength);
  const [view, setView] = useState("grid");

  const getMoreItems = () => {
    setPageCounter(pageCounter + (items.length - maxLength));
  };

  const getLessItems = () => {
    setPageCounter(pageCounter - (pageCounter - maxLength));
  };

  const changeToGrid = () => {
    setView("grid");
  };

  const changeToList = () => {
    setView("list");
  };

  return (
    <div className="w-full h-full flex flex-col content-between">
      <header className="w-full flex justify-between items-center mb-4">
        <div>
          <span>{pageCounter + " of " + items.length}</span>
        </div>
        <div className={`flex items-center`}>
          <button
            className="border-e flex items-center pr-3"
            type="button"
            onClick={changeToGrid}
          >
            <span
              className="material-icons-outlined p-2 hover:bg-black hover:rounded"
              style={{ fontSize: "30px" }}
              title="Grid"
            >
              apps
            </span>
          </button>
          <button
            className="flex items-center justify-start pl-3"
            type="button"
            onClick={changeToList}
          >
            <span
              className="material-icons-outlined p-2 hover:bg-black hover:rounded"
              style={{ fontSize: "30px" }}
              title="List"
            >
              list
            </span>
          </button>
        </div>
      </header>

      <main className="w-full">
        <div
          className={`gap-10 ${
            view === "grid" ? "flex flex-wrap w-full" : "flex flex-col w-full"
          }`}
        >
          {items.map((item, index) => {
            if (index < pageCounter) {
              return (
                <div className="w-full flex-1" key={index}>
                  {item}
                </div>
              );
            }
          })}
        </div>
      </main>

      <footer className="mt-10">
        {pageCounter < items.length && (
          <div className="text-center mt-5 mb-10">
            <button
              className="text-light font-bold"
              type="button"
              onClick={getMoreItems}
            >
              See more...
            </button>
          </div>
        )}
        {pageCounter > maxLength && pageCounter >= items.length && (
          <div className="text-center mt-5 mb-10">
            <button
              className="text-light font-bold"
              type="button"
              onClick={getLessItems}
            >
              See less...
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default ListItems;

{
  /* <main className="flex flex-1 flex-col gap-y-10 py-10 px-6 bg-dark">
  <div className="flex flex-1 flex-wrap w-full gap-10 h-full justify-evenly m-auto"></div>
</main>; */
}

import { Block, DialogButton, List, ListItem } from "konsta/react";
import HistoryCard from "../components/cards/HistoryCard";
import useFetchProd from "../hooks/useFetchProd";
import LoadingPage from "./LoadingPage";

const HistoryPage = () => {
  const { data: productions, isLoading } = useFetchProd();

  if (isLoading) return <div>{<LoadingPage />}</div>;

  return (
    <>
      <div className="mb-20 p-2">
        <div className="flex flex-col gap-4 mt-4">
          <Block
            nested
            inset
            strong
            className="shadow-[0px_0px_5px_rgba(0,0,0,0.10)]"
          >
            <p className="font-medium text-slate-600">Production History</p>
          </Block>
          <Block
            nested
            inset
            strong
            className="
              rounded-2xl
              shadow-[0px_0px_5px_rgba(0,0,0,0.10)]
            "
          >
            <p className="ml-1 text-sm font-medium text-slate-600">
              Filter by date
            </p>

            <div className="flex gap-3 my-2">
              <input
                type="date"
                className="
                  w-full
                  px-3 py-2
                  rounded-xl

                  border border-slate-300
                  text-slate-700
                  text-sm

                  focus:outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />

              <input
                type="date"
                className="
                  w-full
                  px-3 py-2
                  rounded-xl
                  border border-slate-300
                  text-slate-700
                  text-sm

                  focus:outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/20
                "
              />
            </div>
            <DialogButton
              className="
                bg-sky-800 
                text-slate-100
                  px-6
                "
            >
              Filter
            </DialogButton>
          </Block>
        </div>
        <hr className="mt-4 w-[92%] mx-auto border-slate-200/80" />
        <List nested>
          {productions?.map((prod) => (
            <ListItem key={prod._id}>
              <HistoryCard productionDetails={prod} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default HistoryPage;

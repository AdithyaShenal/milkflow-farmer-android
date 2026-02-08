import { Block, Button } from "konsta/react";
import { Calendar } from "lucide-react";
import HistoryCard from "../components/cards/HistoryCard";
import useFetchProd from "../hooks/useFetchProd";
import LoadingPage from "./LoadingPage";

const HistoryPage = () => {
  const { data: productions, isLoading } = useFetchProd();

  if (isLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-slate-50 px-1 pb-24">
      {/* Date Filter */}
      <Block inset strong className="shadow-lg rounded-3xl bg-white mb-4">
        <h1 className="text-sm font-bold text-slate-800 mb-2">
          Production History
        </h1>

        <div className="flex items-center gap-2 mb-4">
          <Calendar size={15} className="text-sky-600" />
          <p className="text-sm font-semibold text-slate-700">Filter by Date</p>
        </div>

        <div className="flex mb-4 justify-between">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-1 ml-1">
              From
            </label>
            <input
              type="date"
              className="p-2 rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none transition-colors bg-slate-50 text-slate-700 text-sm"
            />
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-600 mb-1 ml-1">
              To
            </label>
            <input
              type="date"
              className="p-2 rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none transition-colors bg-slate-50 text-slate-700 text-sm"
            />
          </div>
        </div>

        <Button
          rounded
          raised
          className="w-full bg-sky-600 text-white h-12 font-semibold"
        >
          Apply Filter
        </Button>
      </Block>

      {/* Production List */}
      <div className="space-y-3">
        {productions && productions.length > 0 ? (
          productions.map((prod) => (
            <HistoryCard key={prod._id} productionDetails={prod} />
          ))
        ) : (
          <Block
            inset
            strong
            className="shadow-lg rounded-3xl bg-white text-center"
          >
            <p className="text-slate-500">No production history found</p>
          </Block>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;

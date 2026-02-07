import { Block, Chip } from "konsta/react";
import type { Production } from "../../hooks/usefetchToday";

interface Props {
  productionDetails: Production;
}

const HistoryCard = ({ productionDetails }: Props) => {
  return (
    <>
      <Block
        strong
        inset
        className="p-6 rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.10)] m-0"
      >
        {/* Header: Label & Status Dot */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-slate-600 font-semibold">
            {new Date(productionDetails.registration_time).toLocaleDateString()}
          </span>
          {productionDetails.status === "failed" && (
            <Chip className="m-0.5 bg-red-500 text-white">Failed</Chip>
          )}

          {productionDetails.status !== "failed" && (
            <Chip className="m-0.5 bg-blue-500 text-white">
              {productionDetails.status}
            </Chip>
          )}
        </div>

        {/* Hero: Volume */}
        <div className="bg-sky-800/10 flex flex-col justify-center items-center p-4 rounded-xl gap-2 text-slate-600 font-medium">
          <p className="text-3xl">{productionDetails.volume} L</p>
        </div>

        {/* Footer: Timeline Grid */}
        <div className="pt-4">
          {productionDetails.registration_time && (
            <div>
              <p className="font-bold text-slate-500 uppercase mb-1">Pickup</p>
              <p className="text-sm font-bold text-slate-600">
                {new Date(
                  productionDetails.registration_time
                ).toLocaleTimeString()}
              </p>
            </div>
          )}
          <p className="text-red-500 font-bold">
            {productionDetails.status === "failed" &&
              productionDetails.failure_reason}
          </p>
        </div>
      </Block>
    </>
  );
};

export default HistoryCard;

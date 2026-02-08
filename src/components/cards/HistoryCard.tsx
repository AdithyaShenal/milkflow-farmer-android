import { Block, Chip } from "konsta/react";
import { Clock, Droplet, AlertCircle } from "lucide-react";
import type { Production } from "../../hooks/usefetchToday";

interface Props {
  productionDetails: Production;
}

const HistoryCard = ({ productionDetails }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "failed":
        return "bg-red-500";
      case "pending":
        return "bg-amber-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-sky-600";
    }
  };

  return (
    <Block strong inset className="shadow-lg rounded-3xl bg-white p-6">
      {/* Header: Date & Status */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-slate-700">
          {new Date(productionDetails.registration_time).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          )}
        </span>
        <Chip
          className={`${getStatusColor(
            productionDetails.status,
          )} text-white px-3 py-1 text-xs font-semibold`}
        >
          {productionDetails.status.charAt(0).toUpperCase() +
            productionDetails.status.slice(1)}
        </Chip>
      </div>

      {/* Volume Display */}
      <div className="bg-sky-50 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-center gap-3">
          <Droplet size={32} className="text-sky-600" />
          <div className="text-center">
            <p className="text-4xl font-bold text-slate-800">
              {productionDetails.volume}
            </p>
            <p className="text-sm font-medium text-slate-600 mt-1">Liters</p>
          </div>
        </div>
      </div>

      {/* Pickup Time */}
      {productionDetails.registration_time && (
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center">
            <Clock size={20} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Pickup Time
            </p>
            <p className="text-sm font-bold text-slate-700">
              {new Date(productionDetails.registration_time).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
            </p>
          </div>
        </div>
      )}

      {/* Failure Reason */}
      {productionDetails.status === "failed" &&
        productionDetails.failure_reason && (
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl mt-3">
            <AlertCircle size={20} className="text-red-500 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-red-600 uppercase mb-1">
                Failure Reason
              </p>
              <p className="text-sm text-red-700">
                {productionDetails.failure_reason}
              </p>
            </div>
          </div>
        )}
    </Block>
  );
};

export default HistoryCard;

import { Block, Button, Chip, Dialog, Preloader } from "konsta/react";
import { Clock, Droplet, Pencil, Trash2, TruckIcon, X } from "lucide-react";
import type { Production } from "../../hooks/usefetchToday";
import useUpdateProd from "../../hooks/useUpdateProd";
import useCancelProd from "../../hooks/useCancelProd";
import { Toast } from "@capacitor/toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitionData } from "../../pages/HomePage";
import z from "zod";

interface Props {
  productionDetails: Production;
}

const schema = z.object({
  volume: z
    .number({ message: "Volume is required" })
    .int("Volume must be an integer")
    .gt(0, "Volume must be greater than 0"),
});

const ProductionControl = ({ productionDetails }: Props) => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [dialogCanceledOpened, setDialogCanceledOpened] = useState(false);

  const {
    mutate: updateProd,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateProd();

  const {
    mutate: deleteProd,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useCancelProd();

  useEffect(() => {
    if (isUpdateError) {
      Toast.show({
        text: updateError.response?.data.message ?? updateError.message,
      });
    }

    if (isDeleteError) {
      Toast.show({
        text: deleteError.response?.data.message ?? deleteError.message,
      });
    }
  }, [isUpdateError, isDeleteError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmitionData>({
    resolver: zodResolver(schema),
    defaultValues: {
      volume: productionDetails.volume,
    },
  });

  const submitHandler = (data: SubmitionData) => {
    updateProd({ volume: data.volume, productionId: productionDetails._id });
    setDialogOpened(false);
    reset();
  };

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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Production Details Card */}
      <Block strong inset className="shadow-lg rounded-3xl bg-white p-6 mb-4">
        {/* Header: Label & Status */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-slate-800">
            Today's Production
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

        {/* Timeline Grid - 3 columns */}
        <div className="grid grid-cols-3 gap-3">
          {/* Submitted Time */}
          <div className="p-3 bg-slate-50 rounded-xl">
            <div className="flex flex-col items-center gap-2 mb-2">
              <Clock size={18} className="text-slate-500" />
              <p className="text-xs font-semibold text-slate-500 uppercase text-center">
                Submitted
              </p>
            </div>
            <p className="text-sm font-bold text-slate-700 text-center">
              {formatTime(productionDetails.registration_time)}
            </p>
          </div>

          {/* Arrival Time */}
          <div className="p-3 bg-slate-50 rounded-xl">
            <div className="flex flex-col items-center gap-2 mb-2">
              <TruckIcon size={18} className="text-slate-500" />
              <p className="text-xs font-semibold text-slate-500 uppercase text-center">
                Arrival
              </p>
            </div>
            <p className="text-sm font-bold text-slate-700 text-center">
              {productionDetails.registration_time
                ? formatTime(productionDetails.registration_time)
                : "Pending"}
            </p>
          </div>

          {/* Pickup Time */}
          <div className="p-3 bg-slate-50 rounded-xl">
            <div className="flex flex-col items-center gap-2 mb-2">
              <Clock size={18} className="text-slate-500" />
              <p className="text-xs font-semibold text-slate-500 uppercase text-center">
                Pickup
              </p>
            </div>
            <p className="text-sm font-bold text-slate-700 text-center">
              {productionDetails.registration_time
                ? formatTime(productionDetails.registration_time)
                : "Pending"}
            </p>
          </div>
        </div>
      </Block>

      {/* Action Buttons */}
      <div className="px-4 space-y-3">
        {/* Update Button */}
        <Button
          disabled={isUpdatePending}
          rounded
          raised
          large
          className="w-full bg-sky-600 text-white h-12 font-semibold shadow-md disabled:opacity-70"
          onClick={() => setDialogOpened(true)}
        >
          {isUpdatePending ? (
            <Preloader className="w-5 h-5" />
          ) : (
            <>
              <Pencil size={20} className="mr-2" />
              Update Production
            </>
          )}
        </Button>

        {/* Delete Button */}
        <Button
          disabled={isDeletePending}
          rounded
          outline
          large
          className="w-full border-2 border-red-500 text-red-500 h-12 font-semibold disabled:opacity-70"
          onClick={() => {
            setDialogCanceledOpened(true);
          }}
        >
          {isDeletePending ? (
            <Preloader className="w-5 h-5" />
          ) : (
            <>
              <Trash2 size={20} className="mr-2" />
              Delete Production
            </>
          )}
        </Button>
      </div>

      {/* Update Dialog */}
      <Dialog
        className="p-0"
        opened={dialogOpened}
        onBackdropClick={() => setDialogOpened(false)}
      >
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-white rounded-3xl"
        >
          {/* Dialog Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Update Production
            </h2>
            <button
              type="button"
              onClick={() => setDialogOpened(false)}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-slate-600" />
            </button>
          </div>

          {/* Dialog Content */}
          <div className="p-6">
            <label
              htmlFor="milkAmount"
              className="block mb-2 text-sm font-semibold text-slate-700"
            >
              How Many Liters?
            </label>
            <input
              {...register("volume", { valueAsNumber: true })}
              id="milkAmount"
              type="number"
              inputMode="decimal"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder:text-slate-400"
              placeholder="Enter liters"
            />
            {errors.volume && (
              <p className="text-xs text-red-500 mt-1">
                {errors.volume.message}
              </p>
            )}
          </div>

          {/* Dialog Actions */}
          <div className="p-6 pt-0 flex gap-3">
            <Button
              type="button"
              rounded
              outline
              className="flex-1 border-2 border-slate-300 text-slate-700 h-12 font-semibold"
              onClick={() => {
                setDialogOpened(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              rounded
              raised
              className="flex-1 bg-sky-600 text-white h-12 font-semibold"
            >
              Update
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog
        className="p-0"
        opened={dialogCanceledOpened}
        onBackdropClick={() => setDialogCanceledOpened(false)}
      >
        <div className="bg-red-50 rounded-3xl">
          {/* Dialog Header */}
          <div className="flex items-center justify-between p-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Delete Production
            </h2>
            <button
              type="button"
              onClick={() => setDialogCanceledOpened(false)}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-slate-600" />
            </button>
          </div>

          {/* Dialog Content */}

          {/* Dialog Actions */}
          <div className="p-6 pt-0 flex gap-3">
            <Button
              type="button"
              rounded
              outline
              className="flex-1 border-2 border-slate-300 text-slate-700 h-12 font-semibold"
              onClick={() => {
                setDialogCanceledOpened(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              rounded
              raised
              className="flex-1 bg-red-500 text-white h-12 font-semibold"
              onClick={() => {
                deleteProd({ productionId: productionDetails._id });
                setDialogCanceledOpened(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductionControl;

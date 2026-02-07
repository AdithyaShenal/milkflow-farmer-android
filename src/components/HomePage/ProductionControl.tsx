import {
  Block,
  Button,
  Chip,
  Dialog,
  DialogButton,
  Preloader,
} from "konsta/react";
import type { Production } from "../../hooks/usefetchToday";
import useUpdateProd from "../../hooks/useUpdateProd";
import useCancelProd from "../../hooks/useCancelProd";
import { Toast } from "@capacitor/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitionData } from "../../pages/HomePage";
import z from "zod";

interface Props {
  productionDetails: Production;
}

const schema = z.object({
  volume: z
    .number({ message: "Route number is required" })
    .int("Route number must be an integer")
    .gt(0, "Volume must be greater than 0"),
});

const ProductionControl = ({ productionDetails }: Props) => {
  const [dialogOpened, setDialogOpened] = useState(false);

  const {
    mutate: updateProd,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: upateError,
  } = useUpdateProd();

  const {
    mutate: deleteProd,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useCancelProd();

  if (isUpdateError) {
    Toast.show({
      text: upateError.response?.data.message ?? "Failed to Submit Production",
    });
  }

  if (isDeleteError) {
    Toast.show({
      text: deleteError.response?.data.message ?? "Failed to Submit Production",
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitionData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (data: SubmitionData) => {
    updateProd({ volume: data.volume, productionId: productionDetails._id });
  };

  return (
    <>
      {/* Production Details Card */}
      <Block
        strong
        inset
        className="m-4 p-6 rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.10)]"
      >
        {/* Header: Label & Status Dot */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-slate-600 font-semibold">Today Production</span>
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
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-300/50">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
              Submitted
            </p>
            <p className="text-sm font-bold text-slate-600">
              {new Date(
                productionDetails.registration_time
              ).toLocaleTimeString()}
            </p>
          </div>
          <div className="border-l border-slate-100 pl-8">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
              Pickup
            </p>
            {
              <p className="text-sm font-bold text-slate-600">
                Fix the pickup time issue
              </p>
            }
          </div>
        </div>
      </Block>

      {/* Update Button (Primary Action) */}
      <Block>
        <Button
          disabled={isUpdatePending}
          rounded
          raised
          large
          className="w-full bg-sky-800 text-lg"
          onClick={() => setDialogOpened(true)}
        >
          {isUpdatePending && <Preloader />}
          Update production
        </Button>
      </Block>

      {/* Delete Button (Destructive Action) */}
      <Block>
        <Button
          disabled={isDeletePending}
          rounded
          raised
          large
          className="w-full bg-red-600 text-lg"
          onClick={() => deleteProd({ productionId: productionDetails._id })}
        >
          {isDeletePending && <Preloader />}
          Delete production
        </Button>
      </Block>

      <p className="text-red-500 my-2">{errors.volume?.message}</p>

      {/*  */}
      <Dialog
        className="w-full"
        opened={dialogOpened}
        onBackdropClick={() => setDialogOpened(false)}
        title="Submit Milk Production"
        content={
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-4"
          >
            <label htmlFor="milkAmount" className="text-gray-700">
              How Many Liters?
            </label>
            <input
              {...register("volume", { valueAsNumber: true })}
              id="milkAmount"
              type="number"
              className="w-full px-3 py-2 rounded-xl border-2 border-sky-800/15"
              placeholder="Enter litres"
            />

            <div className="flex justify-end gap-2">
              <DialogButton
                type="reset"
                onClick={() => {
                  setDialogOpened(false);
                }}
              >
                Cancel
              </DialogButton>
              <DialogButton
                className="bg-sky-800"
                type="submit"
                strong
                onClick={() => {
                  setDialogOpened(false);
                }}
              >
                Submit
              </DialogButton>
            </div>
          </form>
        }
      />
    </>
  );
};

export default ProductionControl;

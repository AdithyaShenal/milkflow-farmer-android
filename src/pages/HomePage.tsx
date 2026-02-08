import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, Button } from "konsta/react";
import { Toast } from "@capacitor/toast";
import { X } from "lucide-react";
import useSubmitProd from "../hooks/useSubmitProd";
import useFetchToday from "../hooks/usefetchToday";
import UserDetailsHeader from "../components/HomePage/UserDetailsHeader";
import ProductionControl from "../components/HomePage/ProductionControl";
import ProductionSubmit from "../components/HomePage/ProductionSubmit";
import LoadingPage from "./LoadingPage";

const schema = z.object({
  volume: z
    .number({ message: "Volume is required" })
    .int("Volume must be an integer")
    .gt(0, "Volume must be greater than 0"),
});

export type SubmitionData = z.infer<typeof schema>;

const HomePage = () => {
  const [dialogOpened, setDialogOpened] = useState(false);

  const {
    mutate: submitProd,
    isPending: submittingProd,
    isError: isSubmitErr,
    error: submitErr,
  } = useSubmitProd();

  const { data, isLoading, isError, error } = useFetchToday();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmitionData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (data: SubmitionData) => {
    submitProd({ volume: data.volume });
    reset();
  };

  if (isSubmitErr) {
    Toast.show({
      text: submitErr.response?.data.message ?? "Failed to Submit Production",
    });
  }

  if (isError && !data) {
    Toast.show({
      text: error.response?.data.message ?? "Failed to Fetch Data",
    });
  }

  if (isLoading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-slate-50 px-1 pb-24">
      {/* Header */}
      <UserDetailsHeader />

      {/* Production Submit */}
      {!data?.registered && (
        <ProductionSubmit
          submittingProd={submittingProd}
          onButtonClick={() => setDialogOpened(true)}
        />
      )}

      {data?.registered && data?.production && (
        <ProductionControl productionDetails={data.production} />
      )}

      {/* Submit Production Dialog */}
      <Dialog
        className="p-0"
        opened={dialogOpened}
        onBackdropClick={() => setDialogOpened(false)}
      >
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-white rounded-3xl h-full"
        >
          {/* Dialog Header */}
          <div className="flex items-center justify-between border-b p-6 border-slate-200">
            <h2 className="text-sm font-semibold text-slate-800">
              Submit Milk Production
            </h2>
            <button
              type="button"
              onClick={() => setDialogOpened(false)}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={18} className="text-slate-600" />
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
              onClick={() => setDialogOpened(false)}
            >
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default HomePage;

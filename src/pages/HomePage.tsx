import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogButton } from "konsta/react";
import { Toast } from "@capacitor/toast";
import useSubmitProd from "../hooks/useSubmitProd";
import useFetchToday from "../hooks/usefetchToday";
import UserDetailsHeader from "../components/HomePage/UserDetailsHeader";
import ProductionControl from "../components/HomePage/ProductionControl";
import ProductionSubmit from "../components/HomePage/ProductionSubmit";
import LoadingPage from "./LoadingPage";

const schema = z.object({
  volume: z
    .number({ message: "Route number is required" })
    .int("Route number must be an integer")
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

  const { register, handleSubmit } = useForm<SubmitionData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (data: SubmitionData) => {
    submitProd({ volume: data.volume });
  };

  if (isSubmitErr) {
    Toast.show({
      text: submitErr.response?.data.message ?? "Failed to Submit Production",
    });
  }

  if (isError && !data) {
    Toast.show({
      text: error.response?.data.message ?? "Failed to Submit Production",
    });
  }

  if (isLoading) return <div>{<LoadingPage />}</div>;

  return (
    <div className="p-2 mb-10">
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

      {/* Dialog */}
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
    </div>
  );
};

export default HomePage;

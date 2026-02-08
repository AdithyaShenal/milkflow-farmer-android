import { zodResolver } from "@hookform/resolvers/zod";
import { Block, Button, Dialog } from "konsta/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";
import { Milk, MapPin, Locate, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from "../components/DraggableMarker";
import { Geolocation } from "@capacitor/geolocation";
import { useRegisterFarmer } from "../hooks/useRegisterFarmer";
import LoadingPage from "./LoadingPage";
import { Toast } from "@capacitor/toast";

interface Location {
  lat: number;
  lon: number;
}

const DEFAULT_LOCATION: Location = {
  lat: 6.1887723305151265,
  lon: 80.90262807303365,
};

const schema = z.object({
  name: z.string().min(1, { message: "Full name is required" }),
  shortName: z.string().min(1, { message: "Username is required" }),
  phone: z.string().min(10, { message: "Valid contact number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  pinNo: z.string().min(4, { message: "Password must be at least 4 digits" }),
  route: z
    .number({ message: "Enter valid route number" })
    .min(1, { message: "Enter valid route number" }),
  location: z.object({
    lat: z.number({ message: "Please select the location" }),
    lon: z.number({ message: "Please select the location" }),
  }),
});

type RegisterFormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [tempLocation, setTempLocation] = useState<Location>(DEFAULT_LOCATION);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const { mutate, isError, error, isPending } = useRegisterFarmer();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isError) {
      Toast.show({
        text: error.response?.data.message ?? error.message,
      });
    }
  }, [isError]);

  const submitHandler = async (data: RegisterFormData) => {
    console.log("Complete Data Object:", data);
    mutate(data);
  };

  const fetchCurrentLocation = async () => {
    try {
      setIsFetchingLocation(true);
      setLocationError(null);

      const permission = await Geolocation.requestPermissions();
      if (permission.location !== "granted") {
        setLocationError("Location permission denied");
        setIsFetchingLocation(false);
        return;
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      const currentLoc = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };

      setTempLocation(currentLoc);
      setLocationError(null);
    } catch (err) {
      setLocationError(
        err instanceof Error ? err.message : "Unable to access location",
      );
    } finally {
      setIsFetchingLocation(false);
    }
  };

  const handleConfirmLocation = () => {
    setSelectedLocation(tempLocation);
    setValue("location", tempLocation, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setDialogOpened(false);
  };

  const handleOpenDialog = () => {
    setTempLocation(selectedLocation || DEFAULT_LOCATION);
    setLocationError(null);
    setDialogOpened(true);
  };

  if (isPending) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-slate-50 overflow-y-auto">
      <div className="w-full max-w-md mx-auto py-4">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Block inset strong className="shadow-lg p-4 rounded-3xl bg-white">
            {/* Header with Icon */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-10 h-10 bg-sky-600 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <Milk size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">
                Create Account
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Join Dairy Connect today
              </p>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>
                <input
                  {...register("name")}
                  id="fullName"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder:text-slate-400"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="shortName"
                  className="block mb-2 text-sm font-semibold text-slate-700"
                >
                  Username
                </label>
                <input
                  {...register("shortName")}
                  id="shortName"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder:text-slate-400"
                  placeholder="Enter your username"
                />
                {errors.shortName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.shortName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contactNo"
                  className="block mb-2 text-sm font-semibold text-slate-700"
                >
                  Contact Number
                </label>
                <input
                  {...register("phone")}
                  id="contactNo"
                  type="tel"
                  inputMode="numeric"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder:text-slate-400"
                  placeholder="Enter contact number"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-semibold text-slate-700"
                >
                  Address
                </label>
                <textarea
                  {...register("address")}
                  id="address"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder:text-slate-400 resize-none"
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="route"
                  className="block mb-2 text-sm font-semibold text-slate-700"
                >
                  Route No
                </label>
                <input
                  {...register("route", { valueAsNumber: true })}
                  id="route"
                  type="number"
                  inputMode="numeric"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder:text-slate-400"
                  placeholder="Enter route number"
                />
                {errors.route && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.route.message}
                  </p>
                )}
              </div>

              {/* Location Button */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Pickup Location
                </label>
                <Button
                  type="button"
                  rounded
                  outline
                  className={`w-full border-2 h-12 font-semibold ${
                    selectedLocation
                      ? "border-green-600 text-green-600"
                      : "border-sky-600 text-sky-600"
                  }`}
                  onClick={handleOpenDialog}
                >
                  <MapPin size={20} className="mr-2" />
                  {selectedLocation ? "Location Selected" : "Select Location"}
                </Button>
                {selectedLocation && (
                  <p className="text-xs text-green-600 mt-1 ml-1">
                    Lat: {selectedLocation.lat.toFixed(6)}, Lon:{" "}
                    {selectedLocation.lon.toFixed(6)}
                  </p>
                )}
                {errors.location && !selectedLocation && (
                  <p className="text-xs text-red-500 mt-1">
                    Please select your pickup location
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pinNo"
                  className="block mb-2 text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <input
                  {...register("pinNo")}
                  id="pinNo"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-sky-600 focus:outline-none transition-colors bg-slate-50 text-slate-800 placeholder:text-slate-400"
                  placeholder="Create a password"
                />
                {errors.pinNo && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.pinNo.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                rounded
                raised
                large
                className="w-full bg-sky-600 text-white text-base font-semibold mt-4 h-12 shadow-md disabled:opacity-70"
              >
                Register
              </Button>

              {/* Login Link */}
              <div className="text-center mt-2">
                <p className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="text-sky-600 font-semibold hover:text-sky-700"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer Branding */}
            <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-slate-100">
              <Milk size={18} className="text-sky-600" />
              <p className="text-sm font-semibold text-slate-600">
                Dairy Connect
              </p>
            </div>
          </Block>
        </form>
      </div>

      {/* Location Dialog */}
      {dialogOpened && (
        <Dialog
          opened={dialogOpened}
          onBackdropClick={() => setDialogOpened(false)}
          className="location-dialog w-full p-4 bg-white rounded-xl"
        >
          <div className="flex flex-col gap-3">
            {/* Dialog Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm">Select Pickup Location</h2>
              <button
                onClick={() => setDialogOpened(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-slate-600" />
              </button>
            </div>

            {/* Map Container */}
            <div className="flex-1">
              <MapContainer
                center={[tempLocation.lat, tempLocation.lon]}
                zoom={14}
                scrollWheelZoom
                className="h-[300px] w-full rounded-xl border-2 border-slate-200 shadow-sm"
                key={`${tempLocation.lat}-${tempLocation.lon}`}
              >
                <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRpdGh5YXNoZW5hbCIsImEiOiJjbWlrazQ0aTQwZDdtM2VzZGJrcXA0d3ZnIn0.lI5omaXW6lzbln2Vpb3ubA" />
                <DraggableMarker
                  position={tempLocation}
                  onChange={(loc: Location) => setTempLocation(loc)}
                />
              </MapContainer>

              {/* Location Info */}
              <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600 font-medium">
                  Selected Coordinates:
                </p>
                <p className="text-sm text-slate-800 mt-1">
                  Lat: {tempLocation.lat.toFixed(6)}, Lon:{" "}
                  {tempLocation.lon.toFixed(6)}
                </p>
              </div>

              {/* Error Message */}
              {locationError && (
                <div className="mt-3 p-3 bg-red-50 rounded-lg">
                  <p className="text-xs text-red-600">{locationError}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                rounded
                outline
                className="flex-1 text-white bg-sky-600 font-semibold disabled:opacity-50"
                onClick={fetchCurrentLocation}
                disabled={isFetchingLocation}
              >
                <Locate size={20} />
              </Button>
              <Button
                type="button"
                rounded
                raised
                className="flex-1 bg-sky-600 text-white font-semibold"
                onClick={handleConfirmLocation}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default RegisterPage;

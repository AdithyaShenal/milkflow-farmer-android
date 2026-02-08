import { Block } from "konsta/react";
import { useQueryClient } from "@tanstack/react-query";

interface FarmerProps {
  _id: string;
  name: string;
}

const UserDetailsHeader = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<FarmerProps>(["auth", "user"]);

  if (!user) return null;

  const currentDate = new Date();

  return (
    <Block strong inset className="shadow-lg rounded-3xl bg-white mb-4">
      <div className="flex flex-col items-center py-6">
        {/* User Name */}
        <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>

        {/* Current Date */}
        <p className="text-sm text-slate-500 mt-2">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </Block>
  );
};

export default UserDetailsHeader;

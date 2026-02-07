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

  return (
    <Block strong inset className="shadow-[0px_0px_5px_rgba(0,0,0,0.10)]">
      <div className="flex flex-col items-center my-4">
        <p className="text-3xl font-bold text-slate-600">{user.name}</p>
        <p className="mt-4 text-slate-400">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Block>
  );
};

export default UserDetailsHeader;

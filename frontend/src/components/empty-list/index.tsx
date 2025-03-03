import nlcLogo from "../../assets/images/nlc-logo.png";
import { EmptyListProps } from "./types";

export const EmptyList = ({ title }: EmptyListProps) => {
  return (
    <div className="flex flex-1 h-full flex-col gap-4 items-center justify-center">
      <div className="flex flex-col gap-8 items-center justify-center bg-secondary p-8 rounded-full opacity-70 w-72 h-72">
        <img src={nlcLogo} alt="No data" className="opacity-20" width={84} />
        <h3 className="text-xl font-medium text-info text-center">{title}</h3>
      </div>
    </div>
  );
};

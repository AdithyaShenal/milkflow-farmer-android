import { Block, Button, Preloader } from "konsta/react";
import { Droplets, Plus } from "lucide-react";

interface Props {
  onButtonClick: () => void;
  submittingProd: boolean;
}

const ProductionSubmit = ({ onButtonClick, submittingProd }: Props) => {
  return (
    <>
      <Block strong inset className="shadow-lg rounded-3xl bg-white p-8 mb-4">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center">
            <Droplets className="text-sky-600" size={32} />
          </div>

          {/* Message */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No Production Today
            </h3>
            <p className="text-sm text-slate-500">
              Submit today's milk production to get started
            </p>
          </div>
        </div>
      </Block>

      {/* Submit Button */}
      <div className="px-4">
        <Button
          rounded
          raised
          large
          className="w-full bg-sky-600 text-white h-12 font-semibold shadow-md disabled:opacity-70"
          onClick={onButtonClick}
          disabled={submittingProd}
        >
          {submittingProd ? (
            <Preloader className="w-5 h-5" />
          ) : (
            <>
              <Plus size={20} className="mr-2" />
              Submit Production
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default ProductionSubmit;

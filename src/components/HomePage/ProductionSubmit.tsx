import { Block, Button, Preloader } from "konsta/react";
import { Droplets } from "lucide-react";

interface Props {
  onButtonClick: () => void;
  submittingProd: boolean;
}

const ProductionSubmit = ({ onButtonClick, submittingProd }: Props) => {
  return (
    <>
      <Block
        strong
        inset
        className="h-40 flex flex-col gap-4 items-center justify-center shadow-[0px_0px_5px_rgba(0,0,0,0.10)]"
      >
        <Droplets className="text-slate-600" size={28} />
        <p className="font-medium text-slate-600">
          Please submit today production
        </p>
      </Block>

      {/* Button */}
      <Block>
        <Button
          rounded
          raised
          large
          className="w-full bg-sky-800 text-lg"
          onClick={onButtonClick}
        >
          {submittingProd && <Preloader />}
          {!submittingProd && "Submit Milk"}
        </Button>
      </Block>
    </>
  );
};

export default ProductionSubmit;

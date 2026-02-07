import { Block, Button } from "konsta/react";

const HelpPage = () => {
  return (
    <div className="flex flex-col">
      {/* Content */}
      <div className="flex-1">
        <Block
          strong
          inset
          className="flex flex-col gap-4 p-4 py-6 shadow-[0px_0px_5px_rgba(0,0,0,0.10)]"
        >
          <p className="text-slate-600 font-medium ml-1">Need any help ?</p>
          <textarea
            className="w-full h-25 px-3 py-2 border-2 border-sky-800/15 rounded-xl"
            placeholder="Enter message"
          />
          <Button large rounded className="bg-sky-800 text-lg">
            Send
          </Button>
        </Block>
      </div>
    </div>
  );
};

export default HelpPage;

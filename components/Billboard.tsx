import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";

import { AiOutlineInfoCircle } from "react-icons/ai"
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
const Billboard = () => {
  const { data } = useBillboard();

  const { openModal } = useInfoModal()

  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [openModal, data?.id])

  return (
    <div className="relative h-[56.25vw]">
      {/* Video */}
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>

      {/* Title and description */}
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p
          className="
            text-white
            text-xl
            md:text-5xl
            h-full
            w-[60%]
            lg:text-5xl
            font-bold
            drop-shadow-xl
            "
        >
          {data?.title}
        </p>
        <p
          className="
                text-white
                text-[12px]
                md:text-lg
                mt-3
                md:mt-8
                w-[90%]
                md:w-[80%]
                lg:w-[50%]
                drop-shadow-xl
            "
        >
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            <PlayButton movieId={data?.id} />
            <button 
              className="bg-white text-white bg-opacity-30 py-1 md:py-2 px-2 md:px-4 w-auto rounded-md text-xs lg:text-lg font-semibold hover:bg-opacity-20 flex flex-row items-center gap-1 transition"
              onClick={handleOpenModal}  
            >
                <AiOutlineInfoCircle size={25} className="mr-1" /> More Info
            </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;

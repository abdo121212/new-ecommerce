const Loading = () => {
  return (
    <section className="w-full h-full bg-black/95 z-50 flex items-center justify-center fixed to-0% left-0 right-0 bottom-0 ">
      <div className="m-0 p-0 box-border bg-black font-[cairo] relative to-0% left-0 right-0 bottom-0">
        <div className="absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2">
          <span className="text-[80px] leading-none uppercase relative before:absolute before:bg-white before:w-[100px] before:h-[84px] before:mix-blend-difference before:animate-move">
            Loading
          </span>
        </div>
      </div>
    </section>
  );
};

export default Loading;

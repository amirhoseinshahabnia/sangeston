const Skeleton = () => {
  return (
    <div role="status" className="w-full animate-pulse flex items-center">
      <div
        className="rounded-full bg-gray-500 shrink-0"
        id="icon-skeleton"
      ></div>
      <div className="rounded-lg bg-gray-500 shrink-0" id="wave-skeleton"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;

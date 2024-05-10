const Skeleton = () => {
  return (
    <div role="status" className="w-full animate-pulse flex items-center">
      <div
        className="rounded-full bg-gray-500"
        style={{ minWidth: 34, height: 34, marginRight: 10 }}
      ></div>
      <div
        className="h-10 rounded-lg bg-gray-500 w-"
        style={{ height: 40, minWidth: 250 }}
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;

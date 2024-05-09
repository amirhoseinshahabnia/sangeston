const Skeleton = () => {
  return (
    <div role="status" className="w-full animate-pulse">
      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-500 w-32"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Skeleton;

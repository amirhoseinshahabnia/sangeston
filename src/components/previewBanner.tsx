"use client";

import { useRouter } from "next/navigation";

const PreviewBanner = () => {
  const router = useRouter();

  function exitPreview() {
    fetch("/api/disable-draft").then((res) => {
      if (res.ok) {
        router.refresh();
      }
    });
  }

  return (
    <div className="fixed z-20 shadow-md bottom-4 left-0 right-0 mx-auto w-9/12 py-6 px-8 bg-slate-500 text-slate-100 rounded-lg flex justify-between items-center">
      <h5 className="text-lg">Preview Mode Enabled</h5>
      <button
        className="bg-slate-900 cursor-pointer rounded-full py-2 px-6 hover:opacity-80"
        onClick={exitPreview}
      >
        Exit Preview
      </button>
    </div>
  );
};

export default PreviewBanner;

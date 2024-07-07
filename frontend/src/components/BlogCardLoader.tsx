

const BlogCardLoader = () => {
  return (
    <div className="flex flex-col items-center m-10  ">
        <div className="p-4 border-b border-slate-200  w-[60vw] cursor-pointer shrink-0 animate-pulse ">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div> {/* Avatar placeholder */}
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
          <div className="w-20 h-4 bg-gray-300"></div> {/* Author name placeholder */}
        </div>
        <div className="flex justify-center flex-col pl-2">
          <div className="w-4 h-4 rounded-full bg-gray-300"></div> {/* Circle placeholder */}
        </div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
          <div className="w-16 h-4 bg-gray-300"></div> {/* Published date placeholder */}
        </div>
      </div>
      <div className="text-xl font-semibold pt-2">
        <div className="w-full h-6 bg-gray-300 mb-2"></div> {/* Title placeholder */}
      </div>
      <div className="text-md font-thin">
        <div className="w-full h-4 bg-gray-300"></div> {/* Content placeholder */}
      </div>
      <div className="text-slate-500 text-sm font-thin pt-4">
        <div className="w-24 h-4 bg-gray-300"></div> {/* Reading time placeholder */}
      </div>
    </div>
    </div>
  );
};

export default BlogCardLoader;

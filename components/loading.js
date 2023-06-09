
export default function Loading() {
  return (
    <div className="">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="p-5 rounded-lg m-10 shadow-md max-w-md ">
          <img
            className="animate-spin-slow mx-auto md:w-6/12 lg:w-6/12"
            src="https://i.postimg.cc/qB5j0Vfq/image-removebg-preview-4.png "
            alt=""
          />
          <p className="text-white text-center animate-pulse">Loading</p>
        </div>
      </div>
    </div>
  );
}

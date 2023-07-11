export default function ProblemSolution() {
  const images = [
    {
      src: "https://i.postimg.cc/HxLJKHjf/image.png",
      name: "Tanning",
    },
    {
      src: "https://i.postimg.cc/jqLv9nwd/image.png",

      name: "Pimples",
    },
    {
      src: "https://i.postimg.cc/G3F9bqsM/image.png",
      name: "Hairfall",
    },
    {
      src: "https://i.postimg.cc/fL3n7rhM/image.png",
      name: "Dandruff",
    },
    {
      src: "https://i.postimg.cc/3J61fXcJ/image.png",
      name: "Aging",
    },
  ];
  return (
    <div className="lg:relative">
      <h1 className="font-bold items-center justify-center flex text-lg pt-10 px-10 text-center ">
        Your Problem, Our Solution !
      </h1>
      <div className="flex flex-wrap justify-items-center gap-6 py-10 pb-20 justify-center lg:space-x-10 lg:items-center">
        {images.map((img, index) => (
          <div
            key={index}
            className={`text-center mb-4 ${
              index >= images.length - 2 ? "col-span-1.5" : "col-span-1"
            }`}
          >
            <img
              className="w-20 rounded-full bg-white border-4 p-2 border-green-500 mx-auto"
              src={img.src}
              alt=""
            />
            <span className="font-bold text-xs">{img.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

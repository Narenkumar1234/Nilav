export default function WePromise() {
  const images = [
    {
      src: "/Ingredients.png",
      name: "INGREDIENT DISCLOSURE",
    },
    {
      src: "/cruelty-free.png",

      name: "CRUELTY FREE",
    },
    {
      src: "/organic.png",
      name: "100% ORGANIC",
    },
    {
      src: "chemical-free.png",
      name: "CHEMICALS FREE",
    },
    {
      src: "sideEffects.png",
      name: "CHEMICALS FREE",
    },
  ];

  return (
    <div className="lg:relative">
      <h1 className="font-bold items-center justify-center flex text-2xl pt-10 px-10 text-center ">
        We Guarantee !
      </h1>
      <div className="py-10">
        <div className="flex justify-center text-center">
          <div className="flex flex-wrap lg:m-0 mx-7 w-9/12 lg:w-7/12">
            {images.map((img, index) => (
              <div
                key={index}
                className=" lg:mb-20  space-y-5 w-24 mb-10 mx-auto"
              >
                <div className="w-24 shadow-2xl shadow-green-700 rounded-full bg-gradient-radial from-green-500 to-button p-5 text-white">
                  <img className="" src={img.src} alt="" />
                </div>
                <div>
                  <span className="font-bold text-lg ">{img.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

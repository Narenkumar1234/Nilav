import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function ProblemSolution() {
  const images = [
    [
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
      {
        src: "https://i.postimg.cc/HxLJKHjf/image.png",
        name: "Tanning",
      },
    ],
    [
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
      {
        src: "https://i.postimg.cc/HxLJKHjf/image.png",
        name: "Tanning",
      },
      {
        src: "https://i.postimg.cc/HxLJKHjf/image.png",
        name: "Tanning",
      },
    ],
  ];
  return (
    <div className="lg:relative">
      <h1 className="font-bold items-center justify-center flex text-lg pt-10 px-10 text-center ">
        Your Problem, Our Solution !
      </h1>
      <div className="py-10">
        <Carousel
          infiniteLoop
          autoPlay
          emulateTouch={true}
          showThumbs={false}
          showStatus={false}
          swipeable={true}
          transitionTime={700}
          interval={5000}
        >
          {images.map((sliderImages, index) => (
            <div className="flex justify-center">
              <div className="flex flex-wrap lg:m-0 mx-7 w-10/12 lg:w-8/12">
                {sliderImages.map((img, index) => (
                  <div key={index} className="lg:mb-20 mb-10 mx-auto">
                    <div className="w-20 rounded-full  border-button border-4 p-2">
                      <img className=" p-1.5" src={img.src} alt="" />
                    </div>
                    <span className="font-bold text-xs">{img.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

import { useState } from "react";
import Loading from "@/components/loading";
import feedBack from "./feedback.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function Testimonials({}) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <>

      <div className="lg:relative">
        <h1 className="font-bold items-center justify-center flex text-lg pt-10 px-10 text-center ">
          Our Customers' Beauty Journey
        </h1>
        <div className="lg:bg-subtheme lg:mx-52 lg:rounded-3xl">
          <Carousel
            emulateTouch={true}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={5000}
            className=""
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="absolute left-3 lg:left-44 hidden top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 rounded-full w-5 h-6 lg:w-10 lg:h-10  items-center justify-center text-white shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="absolute right-3 lg:right-44 hidden top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 rounded-full w-5 h-6 lg:w-10 lg:h-10  items-center justify-center text-white shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L15.17 12z" />
                  </svg>
                </button>
              )
            }
          >
            {feedBack.feedback.map((feedback, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center mx-10 my-8 py-3 text-left"
              >
                <div className="max-w-xl mx-auto">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="">
                          <h3 className="text-lg font-bold text-gray-900">
                            {feedback.name}
                          </h3>
                          {stars.map((star, index) => (
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-sm text-yellow-400"
                              key={index}
                            />
                          ))}
                        </div>
                        <div className="flex-shrink-0">
                          <span className="bg-button text-white text-xs px-2 py-1 rounded-lg">
                            Trusted Buyer
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-gray-800 text-sm">
                          "{feedback.feedback}"
                        </p>
                      </div>
                    </div>
                    <div className="px-6 py-2 bg-gray-100">
                      <span className="text-xs leading-none text-gray-600">
                        June 25, 2023
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

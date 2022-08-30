import React from "react";

const Home = () => {
  return (
    <div>
      <section className="relative ">
        <div className=" bg-gray-500">
          <ul>
            <li className="h-[80vh] " id="one">
              <img
                className="h-full w-full object-cover "
                src="img1.webp"
                alt="dummmy"
              />
            </li>
          </ul>
        </div>
        <div className="absolute top-0 left-0  h-full w-full clear-left flex justify-center items-end pb-10">
          <button className="border-2  px-10 mr-2"></button>
        </div>
      </section>
    </div>
  );
};

export default Home;

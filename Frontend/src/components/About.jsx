import React from "react";

import aboutImage from "../assets/images/about-image.png";

const About = () => {
  return (
    <div className="bg-white">
      <div className="p-24 grid grid-cols-2">
        <div className="">
          <h2 className="text-2xl font-medium">About Us</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            architecto non voluptatum, fuga quos iure debitis explicabo minus
            laboriosam modi optio, ipsa corporis veritatis incidunt velit
            eveniet itaque? Delectus, porro. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Error architecto non voluptatum, fuga
            quos iure debitis explicabo minus laboriosam modi optio, ipsa
            corporis veritatis incidunt velit eveniet itaque? Delectus, porro.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={aboutImage}
            alt="aboutImage"
            className="w-[400px] h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

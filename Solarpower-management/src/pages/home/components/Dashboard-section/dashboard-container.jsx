"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";


const DashBoardScrollDemo = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-primary-light dark:text-white">
              Take a look of our<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-primary-dark">
                DashBoard Page
              </span>
            </h1>
          </>
        }
      >
        <iframe
          src="https://fed-4-frontend.netlify.app/dashboard"
          className="mx-auto rounded-2xl w-full h-[600px] md:h-[800px] border-0"
          title="Dashboard preview"
        />  
      </ContainerScroll>
    </div>
  );
};

export default DashBoardScrollDemo;

import React, { ReactNode } from "react";

interface ICard {
  children: ReactNode;
  title?: string;
  className?: string;
}
const Card: React.FC<ICard> = ({ children, title, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] shadow-2xl"></div>
      <div className="relative  px-8 py-8 sm:px-10 sm:pt-10 flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
        <div className="">
          {title && (
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
              {title}
            </p>
          )}

          <div className=" min-w-full mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
            {children}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
    </div>
  );
};

export default Card;

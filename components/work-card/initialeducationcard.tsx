import React from "react";

interface InitialEducationCardProps {
  logoSrc: string;
  title: string;
  subtitle: string;
  year: string;
}

export default function InitialEducationCard({ logoSrc, title, subtitle, year }: InitialEducationCardProps) {
  return (
    <div className="flex flex-col relative pl-8 pb-0 w-full md:max-w-[576px]">
      {/* Timeline decoration */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center w-6">
        <div
          className="w-2 h-2 rounded-full flex-shrink-0 flex-grow-0 aspect-square z-10 fill-dot absolute"
          style={{ top: 57 }}
        ></div>
        <div
          className="w-px timeline-line-custom absolute left-1/2 transform -translate-x-1/2"
          style={{ top: 61, height: "calc(100% - 61px)" }}
        ></div>
      </div>
      {/* Card */}
      <div className="rounded-lg shadow-sm border flex flex-col h-fit items-start w-full gap-6 mt-6 bg-white/30 backdrop-blur-md border-gray-100" style={{ borderBottom: "1px solid rgba(0, 94, 182, 0.1)" }}>
        <div className="p-3 w-full">
          <div className="flex justify-between items-start mb-1">
            <div className="flex gap-2 items-center">
              <div className="rounded-md overflow-hidden flex-shrink-0 w-10 h-10 bg-gray-100">
                <img alt={`${title} Logo`} className="w-full h-full object-cover" src={logoSrc} />
              </div>
              <div className="flex-1 min-w-0 flex justify-center">
                <h3 className="text-xs leading-tight overflow-hidden">
                  <span className="font-medium text-[hsl(var(--color-text))]">{title}</span>
                  <span className="font-normal text-gray-500"> | {subtitle}</span>
                </h3>
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500 ml-auto self-center flex items-center flex-shrink-0 ml-1">{year}</div>
          </div>
          <div className="mt-1"></div>
        </div>
      </div>
    </div>
  );
}

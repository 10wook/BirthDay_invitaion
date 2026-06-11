"use client";

import { PixelCloud, PixelCloudSmall } from "./routePixelArt";

const SKY_CLOUDS = [
  { className: "route-scenery__cloud route-scenery__cloud--1", w: 84 },
  { className: "route-scenery__cloud route-scenery__cloud--2", w: 56, small: true },
  { className: "route-scenery__cloud route-scenery__cloud--3", w: 72 },
  { className: "route-scenery__cloud route-scenery__cloud--4", w: 48, small: true },
  { className: "route-scenery__cloud route-scenery__cloud--5", w: 64 },
] as { className: string; w: number; small?: boolean }[];

export function RouteSceneryBackground() {
  return (
    <div className="route-scenery pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="route-scenery__sky absolute inset-x-0 top-0 h-[38vh]">
        {SKY_CLOUDS.map(({ className, w, small }) =>
          small ? (
            <PixelCloudSmall key={className} className={className} style={{ width: w }} />
          ) : (
            <PixelCloud key={className} className={className} style={{ width: w }} />
          ),
        )}
      </div>
    </div>
  );
}

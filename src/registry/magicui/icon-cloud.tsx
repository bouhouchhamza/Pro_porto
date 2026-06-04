"use client";

import type { CSSProperties } from "react";

type IconCloudProps = {
  images: string[];
};

export function IconCloud({ images }: IconCloudProps) {
  const total = images.length;

  return (
    <div className="magic-icon-cloud" aria-hidden="true">
      <div className="magic-icon-cloud-orbit">
        {images.map((src, index) => {
          const y = 1 - (index / Math.max(total - 1, 1)) * 2;
          const radius = Math.sqrt(1 - y * y);
          const theta = index * Math.PI * (3 - Math.sqrt(5));
          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;
          const scale = 0.72 + ((z + 1) / 2) * 0.28;
          const opacity = 0.58 + ((z + 1) / 2) * 0.42;

          return (
            <span
              className="magic-icon-cloud-item"
              key={`${src}-${index}`}
              style={
                {
                  "--cloud-x": x.toFixed(4),
                  "--cloud-y": y.toFixed(4),
                  "--cloud-z": z.toFixed(4),
                  "--cloud-scale": scale.toFixed(4),
                  "--cloud-opacity": opacity.toFixed(4),
                } as CSSProperties
              }
            >
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          );
        })}
      </div>
    </div>
  );
}

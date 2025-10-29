"use client";

import NextImage, { type ImageLoader, type ImageProps } from "next/image";
import { forwardRef } from "react";
import wsrvLoaderBase from "@/lib/image/wsrvLoader";

type Props = Omit<ImageProps, "loader"> & {
  preferWsrv?: boolean;
};

function buildWsrvLoaderFor(src: string): ImageLoader {
  return ({ width, quality }) => wsrvLoaderBase({ src, width, quality });
}

const OptimizedImage = forwardRef<HTMLImageElement, Readonly<Props>>(
  ({ src, preferWsrv = true, ...rest }, ref) => {
    const isStringSrc = typeof src === "string";
    const isAbsolute = isStringSrc && /^https?:\/\//i.test(src as string);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    let useLoader: ImageLoader | undefined;
    let unoptimized = false;
    let finalSrc = src as any;

    if (preferWsrv) {
      if (isAbsolute) {
        useLoader = wsrvLoaderBase;
      } else if (isStringSrc && siteUrl) {
        try {
          const absolute = new URL(src as string, siteUrl).toString();
          useLoader = buildWsrvLoaderFor(absolute);
        } catch {
          unoptimized = true;
        }
      } else {
        unoptimized = true;
      }
    }

    return (
      <NextImage
        ref={ref}
        {...rest}
        src={finalSrc}
        loader={useLoader}
        unoptimized={unoptimized}
      />
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;

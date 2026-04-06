"use client";

import dynamic from "next/dynamic";

import type { Design, PlacementCode, ProductColorCode } from "@/types/domain";

import { MockupViewer2D } from "./mockup-viewer-2d";

const MockupViewer3D = dynamic(
  () => import("./mockup-viewer-3d").then((module) => module.MockupViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[360px]">
        <div className="aspect-[4/5] animate-pulse rounded-[32px] border border-white/60 bg-white/60 shadow-soft" />
      </div>
    ),
  },
);

type MockupViewerProps = {
  design: Design;
  colorCode: ProductColorCode;
  placement: PlacementCode;
  size?: "hero" | "panel" | "thumb";
  highlightLabel?: string;
};

export function MockupViewer(props: MockupViewerProps) {
  if (props.size === "thumb") {
    return <MockupViewer2D {...props} />;
  }

  return (
    <MockupViewer3D
      colorCode={props.colorCode}
      design={props.design}
      highlightLabel={props.highlightLabel}
      placement={props.placement}
      size={props.size === "hero" ? "hero" : "panel"}
    />
  );
}

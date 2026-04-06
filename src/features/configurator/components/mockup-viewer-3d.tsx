"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import { Badge } from "@/components/ui/badge";
import { colorOptions } from "@/data/storefront";
import { cn } from "@/lib/utils";
import type { Design, PlacementCode, ProductColorCode } from "@/types/domain";

type MockupViewer3DProps = {
  design: Design;
  colorCode: ProductColorCode;
  placement: PlacementCode;
  size?: "hero" | "panel";
  highlightLabel?: string;
};

const frameSizes = {
  hero: "w-full max-w-[420px]",
  panel: "w-full max-w-[500px]",
};

const modelScale = {
  hero: 2.15,
  panel: 2.18,
};

const placementConfig: Record<
  PlacementCode,
  {
    shirtRotationY: number;
    decalPosition: [number, number, number];
    decalRotation: [number, number, number];
    decalScale: [number, number, number];
  }
> = {
  "front-center": {
    shirtRotationY: 0,
    decalPosition: [0, 0.1, 0.17],
    decalRotation: [0, 0, 0],
    decalScale: [0.62, 0.62, 1],
  },
  "chest-left": {
    shirtRotationY: 0,
    decalPosition: [-0.17, 0.19, 0.18],
    decalRotation: [0, 0, -0.08],
    decalScale: [0.28, 0.28, 1],
  },
  "back-center": {
    shirtRotationY: Math.PI,
    decalPosition: [0, 0.12, 0.17],
    decalRotation: [0, 0, 0],
    decalScale: [0.56, 0.56, 1],
  },
};

function LoadingFallback({ size = "panel", highlightLabel }: Pick<MockupViewer3DProps, "size" | "highlightLabel">) {
  return (
    <div className={cn("relative", frameSizes[size ?? "panel"])}>
      <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-[linear-gradient(180deg,#f8fbff_0%,#ecf3f8_100%)] p-5 shadow-soft">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%)]" />
        <div className="relative mx-auto aspect-[4/5] w-full animate-pulse rounded-[28px] bg-white/50">
          {highlightLabel ? (
            <Badge className="absolute left-4 top-4 z-20" variant="outline">
              {highlightLabel}
            </Badge>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ShirtModel({
  artworkUrl,
  colorCode,
  placement,
  size = "panel",
}: {
  artworkUrl: string;
  colorCode: ProductColorCode;
  placement: PlacementCode;
  size?: "hero" | "panel";
}) {
  const groupRef = useRef<THREE.Group>(null);
  const decalRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF("/mockup-3d/shirt_baked.glb");
  const texture = useTexture(artworkUrl);
  const color = colorOptions.find((option) => option.code === colorCode) ?? colorOptions[1];
  const placementMeta = placementConfig[placement];

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (Array.isArray(child.material)) {
          child.material = child.material.map((material) => {
            const nextMaterial = material.clone();
            if ("color" in nextMaterial) {
              nextMaterial.color = new THREE.Color(color.shirtFill);
            }
            return nextMaterial;
          });
        } else {
          const nextMaterial = child.material.clone();
          if ("color" in nextMaterial) {
            nextMaterial.color = new THREE.Color(color.shirtFill);
          }
          child.material = nextMaterial;
        }
      }
    });

    return clone;
  }, [scene, color.shirtFill]);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      placementMeta.shirtRotationY,
      0.12,
    );

    if (decalRef.current) {
      decalRef.current.rotation.z += 0.0015;
    }
  });

  return (
    <Float floatIntensity={0.22} rotationIntensity={0.16} speed={1.2}>
      <group ref={groupRef} scale={modelScale[size]}>
        <primitive object={clonedScene} position={[0, -1.15, 0]} />
        <mesh
          ref={decalRef}
          position={placementMeta.decalPosition}
          rotation={placementMeta.decalRotation}
          scale={placementMeta.decalScale}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial alphaTest={0.08} map={texture} transparent />
        </mesh>
      </group>
    </Float>
  );
}

export function MockupViewer3D({
  design,
  colorCode,
  placement,
  size = "panel",
  highlightLabel,
}: MockupViewer3DProps) {
  return (
    <div className={cn("relative", frameSizes[size])}>
      <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-[linear-gradient(180deg,#f8fbff_0%,#ecf3f8_100%)] p-5 shadow-soft">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%)]" />
        <div className="relative mx-auto aspect-[4/5] w-full">
          {highlightLabel ? (
            <Badge className="absolute left-4 top-4 z-20" variant="outline">
              {highlightLabel}
            </Badge>
          ) : null}

          {placement === "back-center" ? (
            <Badge className="absolute right-4 top-4 z-20" variant="secondary">
              Vista espalda
            </Badge>
          ) : null}

          <Canvas camera={{ fov: 28, position: [0, 0.2, 4.6] }} dpr={[1, 1.75]} shadows>
            <color args={["#eef6fb"]} attach="background" />
            <ambientLight intensity={1.35} />
            <directionalLight castShadow intensity={2.2} position={[4, 5, 4]} />
            <directionalLight intensity={1.15} position={[-3, 2, -2]} />
            <spotLight angle={0.45} intensity={15} penumbra={1} position={[0, 4, 4]} />

            <Suspense fallback={null}>
              <ShirtModel
                artworkUrl={design.artworkUrl}
                colorCode={colorCode}
                placement={placement}
                size={size}
              />
            </Suspense>

            <OrbitControls
              enablePan={false}
              enableZoom={false}
              maxAzimuthAngle={0.8}
              maxPolarAngle={Math.PI / 1.8}
              minAzimuthAngle={-0.8}
              minPolarAngle={Math.PI / 2.8}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload("/mockup-3d/shirt_baked.glb");

export { LoadingFallback as MockupViewer3DLoadingFallback };

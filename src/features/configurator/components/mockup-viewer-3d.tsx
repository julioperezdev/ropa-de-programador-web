"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
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
  panel: "w-full max-w-[460px]",
};

const modelScale = {
  hero: 2.35,
  panel: 2.05,
};

const placementConfig: Record<
  PlacementCode,
  {
    designFacingRotationY: number;
    decalPosition: [number, number, number];
    decalRotation: [number, number, number];
    decalScale: [number, number, number];
  }
> = {
  "front-center": {
    designFacingRotationY: 0,
    decalPosition: [0, 0.08, 0.13],
    decalRotation: [0, 0, 0],
    decalScale: [0.16, 0.16, 0.16],
  },
  "chest-left": {
    designFacingRotationY: 0,
    decalPosition: [-0.11, 0.13, 0.13],
    decalRotation: [0, 0, -0.08],
    decalScale: [0.08, 0.08, 0.08],
  },
  "back-center": {
    designFacingRotationY: Math.PI,
    decalPosition: [0, 0.1, 0.115],
    decalRotation: [0, 0, 0],
    decalScale: [0.14, 0.14, 0.14],
  },
};

const slowAngularSpeed = 0.42;
const fastAngularSpeed = 1.2;
const speedSmoothing = 3.2;

function normalizeAngle(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

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
  const { scene } = useGLTF("/mockup-3d/shirt_baked.glb");
  const texture = useTexture(artworkUrl);
  const color = colorOptions.find((option) => option.code === colorCode) ?? colorOptions[1];
  const placementMeta = placementConfig[placement];
  const rotationRef = useRef(placementMeta.designFacingRotationY);
  const angularSpeedRef = useRef(slowAngularSpeed);

  const { shirtMesh, center, fitScale } = useMemo<{
    shirtMesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | null;
    center: THREE.Vector3;
    fitScale: number;
  }>(() => {
    const clone = scene.clone(true);
    let firstMesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> | null = null;

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (!firstMesh) {
          firstMesh = child;
        }

        child.castShadow = true;
        child.receiveShadow = true;

        if (Array.isArray(child.material)) {
          child.material = child.material.map((material) => {
            const nextMaterial = material.clone();
            if ("color" in nextMaterial) {
              nextMaterial.color = new THREE.Color(color.shirtFill);
            }
            if ("roughness" in nextMaterial) {
              nextMaterial.roughness = 0.92;
            }
            if ("metalness" in nextMaterial) {
              nextMaterial.metalness = 0.02;
            }
            return nextMaterial;
          });
        } else {
          const nextMaterial = child.material.clone();
          if ("color" in nextMaterial) {
            nextMaterial.color = new THREE.Color(color.shirtFill);
          }
          if ("roughness" in nextMaterial) {
            nextMaterial.roughness = 0.92;
          }
          if ("metalness" in nextMaterial) {
            nextMaterial.metalness = 0.02;
          }
          child.material = nextMaterial;
        }
      }
    });

    const bounds = new THREE.Box3().setFromObject(clone);
    const sizeVector = new THREE.Vector3();
    const centerVector = new THREE.Vector3();
    bounds.getSize(sizeVector);
    bounds.getCenter(centerVector);

    const dominantAxis = Math.max(sizeVector.x, sizeVector.y, sizeVector.z) || 1;
    const fitScale = modelScale[size] / dominantAxis;

    return {
      shirtMesh: firstMesh,
      center: centerVector,
      fitScale,
    };
  }, [scene, color.shirtFill]);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    rotationRef.current = placementMeta.designFacingRotationY;
    angularSpeedRef.current = slowAngularSpeed;
  }, [placementMeta.designFacingRotationY]);

  const shirtGeometry = shirtMesh?.geometry as THREE.BufferGeometry | undefined;
  const shirtMaterial = shirtMesh?.material as THREE.Material | THREE.Material[] | undefined;

  if (!shirtGeometry || !shirtMaterial) {
    return null;
  }

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    const relativeAngle = normalizeAngle(rotationRef.current - placementMeta.designFacingRotationY);
    const isFrontVisible =
      relativeAngle > -Math.PI / 2 &&
      relativeAngle < Math.PI / 2;
    const targetSpeed = isFrontVisible ? slowAngularSpeed : fastAngularSpeed;

    angularSpeedRef.current = THREE.MathUtils.damp(
      angularSpeedRef.current,
      targetSpeed,
      speedSmoothing,
      delta,
    );

    rotationRef.current += angularSpeedRef.current * delta;

    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.z = 0;
    groupRef.current.rotation.y = rotationRef.current;
  });

  return (
    <group ref={groupRef}>
      <group scale={fitScale}>
        <group position={[-center.x, -center.y, -center.z]}>
          <mesh
            castShadow
            geometry={shirtGeometry}
            material={shirtMaterial}
            receiveShadow
          >
            <Decal
              map={texture}
              position={placementMeta.decalPosition}
              rotation={placementMeta.decalRotation}
              scale={placementMeta.decalScale}
            >
              <meshStandardMaterial
                alphaTest={0.05}
                map={texture}
                polygonOffset
                polygonOffsetFactor={-1}
                transparent
              />
            </Decal>
          </mesh>
        </group>
      </group>
    </group>
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
        <div className="absolute inset-x-10 bottom-8 h-10 rounded-full bg-slate-900/10 blur-2xl" />
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

          <Canvas
            camera={{ fov: 24, position: [0, 0.05, 6.4] }}
            dpr={[1, 1.75]}
            gl={{ antialias: true }}
            shadows={{ type: THREE.PCFShadowMap }}
          >
            <color args={["#edf4f8"]} attach="background" />
            <ambientLight intensity={1.8} />
            <directionalLight castShadow intensity={2.8} position={[4, 5, 5]} />
            <directionalLight intensity={1.4} position={[-4, 2, -3]} />
            <spotLight angle={0.42} intensity={18} penumbra={1} position={[0, 5, 5]} />

            <Suspense fallback={null}>
              <ShirtModel
                artworkUrl={design.artworkUrl}
                colorCode={colorCode}
                placement={placement}
                size={size}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload("/mockup-3d/shirt_baked.glb");

export { LoadingFallback as MockupViewer3DLoadingFallback };

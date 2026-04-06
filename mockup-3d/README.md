# Recursos del mockup 3D

Esta carpeta reúne los assets locales mínimos que el mockup 3D legacy necesita para renderizar.

## Archivos incluidos

- `shirt_baked.glb`
  - Modelo 3D de la remera.
  - Origen: `public/shirt_baked.glb`
  - Uso en código: `src/canvas/Shirt.jsx` mediante `useGLTF('/shirt_baked.glb')`

- `threejs.png`
  - Textura por defecto usada como decal inicial.
  - Origen: `public/threejs.png`
  - Uso en código:
    - `src/store/index.ts` como valor inicial de `logoDecal`
    - `src/store/index.ts` como valor inicial de `fullDecal`

## Recursos de código relacionados

Los siguientes archivos no fueron copiados aquí porque son lógica, no assets, pero forman parte del render 3D:

- `src/canvas/index.jsx`
- `src/canvas/Shirt.jsx`
- `src/canvas/CameraRig.jsx`
- `src/canvas/Backdrop.jsx`
- `src/store/index.ts`
- `src/components/customizerComponent/Customizer.tsx`
- `src/config/constants.ts`
- `src/config/helpers.ts`

## Alcance de esta extracción

Esta extracción incluye solo los recursos locales imprescindibles para que el mockup 3D exista visualmente.

No incluye:

- imágenes que el usuario sube en tiempo de ejecución
- assets de UI del customizador
- mockups 2D de la landing
- endpoints backend

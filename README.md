# Ropa de programador

Frontend público del ecommerce de `Ropa de Programador`, construido como base reusable para conectar backend más adelante.

La implementación actual cubre:

- landing page comercial
- configurador visual de remeras
- mockup 3D con diseño aplicado
- carrito local
- formulario visual de envío con validaciones

## Fuente de verdad

Las decisiones de producto, dominio y UI de esta app parten de estos documentos:

- [Storefront-Specification.md](/Users/julio/developer/realProjects/RDP/landing_page/Storefront-Specification.md)
- [Shared-Domain.md](/Users/julio/developer/realProjects/RDP/landing_page/Shared-Domain.md)
- [UI-Baseline.md](/Users/julio/developer/realProjects/RDP/landing_page/UI-Baseline.md)
- [Design-Refinement-Checklist.md](/Users/julio/developer/realProjects/RDP/landing_page/Design-Refinement-Checklist.md)
- [Frontend-Implementation-Plan.md](/Users/julio/developer/realProjects/RDP/landing_page/Frontend-Implementation-Plan.md)

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui base components
- Zustand
- React Hook Form
- Zod
- Lucide React
- Three.js
- @react-three/fiber
- @react-three/drei
- clsx
- tailwind-merge

## Qué hay implementado hoy

### Landing storefront

La home actual está compuesta por 3 bloques principales:

1. `Hero`
   - propuesta de valor
   - beneficios comerciales
   - CTA principal
   - mockup destacado

2. `Configurador 50/50`
   - izquierda: grid de diseños reales
   - derecha: preview + configuración de producto

3. `Carrito + envío`
   - resumen local del carrito
   - formulario visual validado
   - CTA final todavía sin checkout real

### Configurador

Incluye estado local para:

- diseño seleccionado
- talle
- color
- placement
- cantidad

Comportamiento actual:

- el diseño cambia el preview
- el color modifica la prenda
- el mockup usa un modelo 3D real
- el diseño se aplica sobre la remera con `Decal`
- la rotación prioriza mostrar más tiempo el lado visible del diseño

### Carrito

El carrito funciona 100% en frontend con Zustand:

- agregar item
- fusionar configuraciones idénticas
- editar cantidad
- eliminar item
- calcular subtotal y total

### Formulario

El formulario de envío usa React Hook Form + Zod:

- campos visibles
- validaciones básicas
- errores visuales
- sin submit real a backend

## Mock data y assets

La app trabaja con datos locales y assets reales:

- catálogo mock en [src/data/storefront.ts](/Users/julio/developer/realProjects/RDP/landing_page/src/data/storefront.ts)
- tipos de dominio en [src/types/domain.ts](/Users/julio/developer/realProjects/RDP/landing_page/src/types/domain.ts)
- diseños reales en [public/designs/real](/Users/julio/developer/realProjects/RDP/landing_page/public/designs/real)
- logo en [public/brand](/Users/julio/developer/realProjects/RDP/landing_page/public/brand)
- modelo 3D en [public/mockup-3d](/Users/julio/developer/realProjects/RDP/landing_page/public/mockup-3d)

## Estructura

```text
src/
  app/
  components/
    ui/
  data/
  features/
    storefront/
    configurator/
    cart/
    checkout/
  lib/
    validators/
  store/
  types/
```

## Mapa rápido de archivos

- [src/app/page.tsx](/Users/julio/developer/realProjects/RDP/landing_page/src/app/page.tsx)
- [src/features/storefront/components/storefront-page.tsx](/Users/julio/developer/realProjects/RDP/landing_page/src/features/storefront/components/storefront-page.tsx)
- [src/features/storefront/components/hero-section.tsx](/Users/julio/developer/realProjects/RDP/landing_page/src/features/storefront/components/hero-section.tsx)
- [src/features/configurator/components/configurator-section.tsx](/Users/julio/developer/realProjects/RDP/landing_page/src/features/configurator/components/configurator-section.tsx)
- [src/features/configurator/components/product-preview-panel.tsx](/Users/julio/developer/realProjects/RDP/landing_page/src/features/configurator/components/product-preview-panel.tsx)
- [src/features/configurator/components/mockup-viewer-3d.tsx](/Users/julio/developer/realProjects/RDP/landing_page/src/features/configurator/components/mockup-viewer-3d.tsx)
- [src/features/cart/components/cart-summary.tsx](/Users/julio/developer/realProjects/RDP/landing_page/src/features/cart/components/cart-summary.tsx)
- [src/features/checkout/components/shipping-form.tsx](/Users/julio/developer/realProjects/RDP/landing_page/src/features/checkout/components/shipping-form.tsx)
- [src/store/use-configurator-store.ts](/Users/julio/developer/realProjects/RDP/landing_page/src/store/use-configurator-store.ts)
- [src/store/use-cart-store.ts](/Users/julio/developer/realProjects/RDP/landing_page/src/store/use-cart-store.ts)

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrir:

- [http://localhost:3000](http://localhost:3000)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
```

## Validación recomendada

En este repo conviene validar en este orden:

```bash
npm run build
npm run typecheck
```

Motivo:

- `tsconfig.json` incluye `.next/types/**/*.ts`
- si `typecheck` corre antes de que Next termine de generar esos tipos, puede aparecer un falso error

## Decisiones de arquitectura

- `features/` separa la UI por vertical funcional
- `store/` concentra estado local reusable
- `data/` mantiene mocks y evita hardcodear catálogo dentro de componentes
- `types/` replica el dominio compartido definido en la documentación
- `lib/` concentra helpers y validaciones
- el carrito y el configurador están desacoplados pero comparten contratos de dominio
- el mockup 3D convive con previews 2D más simples donde conviene lectura rápida

## Qué todavía está mockeado

- catálogo
- stock real
- precio dinámico por variante
- checkout real
- persistencia real de orden
- envío real
- integración con backend
- reglas de negocio server-side

## Next steps

Los próximos pasos más naturales desde esta base son:

1. Pulir UX/UI
   - spacing fino
   - responsive más estricto
   - feedbacks y estados vacíos
   - jerarquía visual final

2. Cerrar configurador comercial
   - availability real por variante
   - copy de producto más final
   - criterios de placement y tamaños de arte

3. Integrar backend
   - catálogo real
   - variantes reales
   - carrito persistente
   - checkout real

4. Preparar operación
   - contratos con backoffice
   - administración de diseños
   - disponibilidad y stock

## Estado de esta fase

Esta fase deja listo un storefront frontend funcional, tipado y reusable, con datos locales y arquitectura preparada para evolucionar sin rehacer la base.

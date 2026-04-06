# Frontend-Implementation-Plan.md

## 1. Objetivo

Definir el plan de implementación del frontend de la landing ecommerce usando como insumos:

- Specification.md
- UI-Baseline.md
- Design-Refinement-Checklist.md
- diseño actual generado en Stitch

La meta es construir una primera versión funcional del frontend con una arquitectura ordenada, reusable y fácil de evolucionar.

---

## 2. Estrategia general

La implementación del frontend debe hacerse por fases.

No se recomienda comenzar integrando APIs reales desde el primer momento.

Se recomienda este enfoque:

1. implementar estructura visual base
2. implementar componentes reutilizables
3. usar mock data local
4. conectar interacciones del configurador
5. agregar carrito funcional
6. implementar formulario de envío
7. integrar APIs reales después

---

## 3. Objetivo de la primera versión

La primera versión del frontend debe permitir:

- visualizar el hero
- visualizar un grid de diseños
- seleccionar un diseño
- ver un mockup/preview actualizado
- elegir talle
- elegir color
- elegir placement
- elegir cantidad
- agregar al carrito
- ver resumen del carrito
- completar formulario visual funcional

Todavía no es obligatorio en la primera fase:

- integrar API real
- integrar pasarela de pago
- manejar stock real
- persistir backend
- tener checkout transaccional final

---

## 4. Fases de implementación

## Fase 1 - Base visual y layout

### Objetivo
Construir la estructura general de la landing con contenido mockeado.

### Alcance
- layout general
- navbar si aplica
- hero
- panel central 50/50
- carrito
- formulario
- responsive base

### Resultado esperado
La landing ya se ve y navega correctamente, aunque todavía use datos mock.

---

## Fase 2 - Configurador visual funcional

### Objetivo
Conectar el bloque central para que deje de ser estático.

### Alcance
- grid de diseños con mock data
- selección de diseño
- preview/mockup dinámico básico
- selector de talle
- selector de color
- selector de placement
- selector de cantidad
- botón de agregar al carrito

### Resultado esperado
El usuario puede configurar visualmente un producto y prepararlo para el carrito.

---

## Fase 3 - Carrito funcional

### Objetivo
Permitir flujo real básico de compra dentro del frontend.

### Alcance
- agregar item al carrito
- listar cart items
- editar cantidad
- eliminar item
- calcular subtotal
- calcular total
- empty state

### Resultado esperado
El carrito ya funciona de forma local y refleja lo configurado por el usuario.

---

## Fase 4 - Formulario y validaciones

### Objetivo
Preparar el flujo de compra desde frontend.

### Alcance
- formulario de envío
- validaciones
- estados de error
- CTA final visual funcional
- resumen final visible

### Resultado esperado
El flujo visual de compra queda completo a nivel frontend.

---

## Fase 5 - Integración backend

### Objetivo
Sustituir mocks por datos reales.

### Alcance
- carga de diseños desde API
- carga de detalle de diseño/producto
- integración de carrito/checkout si aplica
- adaptación de contratos

### Resultado esperado
La UI queda conectada a datos reales.

---

## 5. Arquitectura de componentes sugerida

## 5.1 Estructura de alto nivel

Componentes sugeridos:

- `LandingPage`
- `Navbar`
- `HeroSection`
- `ConfiguratorSection`
- `CartCheckoutSection`

---

## 5.2 Hero

Componentes:

- `HeroSection`
- `HeroContent`
- `HeroPriceBlock`
- `HeroBenefits`
- `HeroProductImage`

Responsabilidad:
- comunicar propuesta de valor y oferta

---

## 5.3 Configurador

Componentes:

- `ConfiguratorSection`
- `DesignGrid`
- `DesignCard`
- `ProductPreviewPanel`
- `MockupViewer`
- `SizeSelector`
- `ColorSelector`
- `PlacementSelector`
- `QuantityStepper`
- `AddToCartButton`

Responsabilidad:
- permitir configuración de producto

---

## 5.4 Carrito y compra

Componentes:

- `CartCheckoutSection`
- `CartSummary`
- `CartItem`
- `OrderTotals`
- `ShippingForm`
- `CheckoutCTA`

Responsabilidad:
- mostrar items configurados y preparar compra

---

## 6. Estado sugerido

## 6.1 Estado del configurador

Se recomienda manejar al menos:

- `selectedDesign`
- `selectedSize`
- `selectedColor`
- `selectedPlacement`
- `selectedQuantity`

---

## 6.2 Estado del carrito

- `cartItems`

Cada `cartItem` debería incluir:

- id
- designId
- designName
- designImage
- productBase
- size
- color
- placement
- quantity
- unitPrice
- subtotal
- previewReference

---

## 6.3 Estado del formulario

- `shippingForm`

Campos sugeridos:

- firstName
- lastName
- phone
- email
- street
- streetNumber
- floorApartment
- reference
- postalCode
- city

---

## 6.4 Estado UI

- `isLoadingDesigns`
- `designsError`
- `isAddingToCart`
- `isSubmittingCheckout`
- `formErrors`

---

## 7. Datos mock iniciales

## 7.1 Mock de diseños

Crear un archivo de datos local para el grid izquierdo.

Cada diseño debería incluir:

- id
- slug
- name
- thumbnailUrl
- artworkUrl
- price
- availableSizes
- availableColorsBySize
- availablePlacements

---

## 7.2 Mock del producto base

Si inicialmente solo habrá una remera base:

- id
- name
- basePrice
- mockupImageWhite
- mockupImageBlack
- mockupImageGray

---

## 7.3 Mock de carrito

Permitir arrancar con:

- carrito vacío
- o un cart item demo opcional durante desarrollo

---

## 8. Estrategia de mockup para frontend

## 8.1 Recomendación para primera implementación

Para la primera implementación frontend, se recomienda usar un preview visual simple pero convincente.

Opciones:

### Opción recomendada para fase inicial
Mockup 2D con capas:
- imagen base de remera
- overlay del diseño
- cambios de color según variante

### Opción futura
Integrar el módulo 3D en fase posterior, cuando la UX principal ya esté estable.

---

## 8.2 Reglas del mockup en primera fase

El preview debe reaccionar a:

- cambio de diseño
- cambio de color
- cambio de placement

No es obligatorio inicialmente reaccionar a:

- cambio visual de talle
- movimientos 3D
- exportación de imagen
- rotación de prenda

---

## 9. Reglas funcionales mínimas para frontend

- no permitir agregar al carrito si falta diseño
- no permitir agregar al carrito si falta talle
- no permitir agregar al carrito si falta color
- no permitir agregar al carrito si falta placement
- cantidad mínima = 1
- si cambia el talle y el color deja de ser válido, resetear el color
- el carrito debe reflejar exactamente la configuración elegida

---

## 10. Responsive strategy

## Desktop
- hero amplio
- panel 50/50
- carrito y formulario en dos columnas o layout equilibrado

## Tablet
- revisar escalado del mockup
- grid izquierdo puede reducir columnas

## Mobile
- hero apilado
- panel central convertido en bloques verticales
- definir orden recomendado:
  1. grid de diseños
  2. mockup
  3. selectores
  4. add to cart
  5. carrito
  6. formulario

---

## 11. Stack y convenciones sugeridas

## Framework
Usar el stack frontend actual/objetivo definido para el proyecto.

## Recomendaciones
- componentes pequeños y reutilizables
- tipado fuerte si se usa TypeScript
- separar UI, state y mock data
- evitar lógica demasiado acoplada a la vista
- preparar estructura para integrar API después sin reescribir todo

---

## 12. Orden recomendado de construcción con Codex

## Paso 1
Crear estructura del proyecto y layout general.

## Paso 2
Implementar hero.

## Paso 3
Implementar panel central 50/50.

## Paso 4
Implementar grid de diseños con mock data.

## Paso 5
Implementar preview/mockup simple.

## Paso 6
Implementar selectores:
- talle
- color
- placement
- cantidad

## Paso 7
Implementar agregar al carrito.

## Paso 8
Implementar carrito.

## Paso 9
Implementar formulario.

## Paso 10
Refinar responsive y estados UI.

---

## 13. Entregables esperados de Codex en primera ronda

La primera ronda con Codex debería entregar:

- estructura de carpetas
- páginas o vistas
- componentes principales
- mock data
- estado local funcional
- selección de diseño
- configurador funcional básico
- carrito local básico
- formulario visual funcional
- estilos coherentes con el baseline visual

No debería intentar todavía:

- integrar todos los endpoints reales
- cerrar backend
- inventar reglas de negocio no definidas
- sobrecomplicar el mockup

---

## 14. Riesgos a evitar durante implementación

- codificar directamente el diseño de Stitch sin filtrar placeholders
- mezclar diseño real con copies ficticios
- hacer el mockup demasiado complejo demasiado pronto
- acoplar el grid a una API antes de validar estructura local
- implementar un carrito sin modelo consistente
- dejar placement fuera del modelo del item

---

## 15. Definición de éxito de esta fase

Esta fase será exitosa si se logra:

- una landing visualmente consistente con el baseline
- un configurador entendible y usable
- un carrito que refleje la configuración real
- un formulario claro
- una base frontend limpia para luego conectar API real y checkout
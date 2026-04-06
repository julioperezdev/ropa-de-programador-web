# README.md

## 1. Resumen del proyecto

Este proyecto busca construir un ecommerce de ropa temática para programadores, partiendo de un proyecto legacy realizado años atrás y rediseñándolo desde cero con una arquitectura, experiencia de usuario y documentación mucho más claras.

La solución completa se divide conceptualmente en dos grandes productos:

- **Storefront**: experiencia pública de venta orientada al cliente final
- **Backoffice**: experiencia interna de operación orientada a administración, proveedor y vendedor

En la etapa actual, la prioridad es el **frontend del storefront**, sin backend todavía.

---

## 2. Estado actual

Hoy ya existe una base de trabajo bastante sólida a nivel de descubrimiento, producto y frontend planning.

Ya se definieron:

- el análisis del proyecto legacy
- la visión del nuevo producto
- la separación entre storefront y backoffice
- el dominio compartido del negocio
- el baseline visual del diseño actual
- una checklist de refinamiento visual/funcional
- un plan de implementación frontend
- prompts de trabajo para Stitch y Codex

En otras palabras: el proyecto ya no está en una etapa de idea vaga. Ya tiene una dirección concreta.

---

## 3. Origen del proyecto

El punto de partida fue un proyecto legacy desarrollado hace aproximadamente tres años.

Ese proyecto tenía como base:

- una web de tienda de ropa
- diseños como imágenes
- frontend con una lógica de visualización de mockups
- una exploración adicional con React Three Fiber para mostrar remeras con diseños aplicados

El análisis del proyecto legacy permitió rescatar varias ideas importantes:

- catálogo temático de diseños
- selección de diseño
- configuración por talle y color
- idea de placement del estampado
- valor del mockup como herramienta de conversión
- contrato conceptual de variantes devueltas por backend

La conclusión fue clara:

> conviene reconstruir desde cero y usar el legacy solo como referencia funcional y conceptual, no como base de implementación.

---

## 4. Visión del producto

La visión general del sistema es construir una experiencia donde un usuario pueda:

- entrar a una landing page de marca
- explorar diseños de ropa para programadores
- visualizar cómo se vería un diseño aplicado a una prenda
- seleccionar configuración básica del producto
- agregar al carrito o wishlist
- completar datos de envío
- avanzar al pago

Además, a futuro, el sistema debe poder ser operado internamente mediante un backoffice.

---

## 5. Productos del ecosistema

### 5.1 Storefront

El storefront es la interfaz pública de venta.

Su responsabilidad es:

- presentar la marca
- mostrar diseños y productos
- permitir configurar una prenda
- acompañar la decisión de compra
- manejar carrito y checkout

Módulos esperados:

- landing page
- hero comercial
- grid de diseños o productos
- configurador de producto
- mockup/preview
- wishlist
- carrito
- checkout
- confirmación de compra

### 5.2 Backoffice

El backoffice es la interfaz interna de operación.

Su responsabilidad es:

- gestionar productos
- gestionar diseños
- gestionar variantes
- revisar pedidos
- actualizar estados operativos
- soportar la operación del negocio

Roles previstos:

- admin
- proveedor
- vendedor

---

## 6. Prioridad actual

La prioridad actual es únicamente:

> **Frontend del Storefront**

Eso significa:

- no backend todavía
- no APIs reales todavía
- no autenticación todavía
- no pasarela de pago real todavía

La meta de la etapa actual es construir una primera versión del frontend usando **mock data local**, con una estructura preparada para integrar backend más adelante.

---

## 7. Decisión de diseño y UX

Ya se generó una primera propuesta visual con Stitch.

### Estructura aprobada del diseño actual

La estructura general quedó bien encaminada y se toma como base:

1. **Hero superior**
   - slogan
   - precio protagonista
   - beneficios comerciales
   - imagen hero de la remera

2. **Panel principal 50/50**
   - izquierda: grid de diseños
   - derecha: mockup/configurador

3. **Carrito + formulario**
   - resumen del carrito
   - formulario de envío
   - CTA final de compra

### Qué sí se aprobó del diseño

- estructura general
- jerarquía visual
- estética moderna, limpia y premium
- narrativa visual tipo ecommerce
- mockup como protagonista del configurador

### Qué todavía no es final

- branding ficticio
- copies placeholder
- grid izquierdo con íconos en vez de diseños reales
- mockup demasiado conceptual
- falta de selector visual de placement
- carrito todavía demasiado genérico
- formulario todavía no aterrizado al flujo real

---

## 8. Estrategia de implementación

La implementación se hará por fases.

### Fase 1
Base visual y layout general:

- hero
- panel 50/50
- carrito
- formulario
- responsive base

### Fase 2
Configurador funcional local:

- grid de diseños con mock data
- selección de diseño
- preview/mockup simple
- selección de talle
- selección de color
- selección de placement
- selección de cantidad
- botón add to cart

### Fase 3
Carrito local funcional:

- agregar item
- editar cantidad
- eliminar item
- subtotal
- total

### Fase 4
Formulario y validaciones:

- campos de envío
- validaciones básicas
- estados visuales

### Fase 5
Integración backend futura:

- catálogo real
- detalle real
- carrito/orden real
- checkout real
- pagos

---

## 9. Estrategia de mockup

Para esta etapa inicial no se prioriza 3D.

La recomendación actual es:

- usar **mockup 2D convincente**
- mantener el sistema preparado para evolucionar después
- desacoplar el motor de preview del resto del flujo

El 3D queda como una posibilidad futura, no como prioridad del MVP inicial.

---

## 10. Dominio compartido

Ya se definió un dominio compartido para evitar inconsistencias entre storefront, backoffice y backend futuro.

Conceptos centrales:

- `Product`
- `Design`
- `Placement`
- `ProductVariant`
- `ConfiguredProduct`
- `Cart`
- `CartItem`
- `Order`
- `OrderItem`
- `ShippingInfo`
- `Payment`
- `InternalUser`

Este dominio se documentó para que frontend, backoffice y backend hablen el mismo idioma de negocio.

---

## 11. Documentos existentes

Actualmente el proyecto cuenta con estos documentos de referencia:

### Producto y negocio
- `Storefront-Specification.md`
- `Backoffice-Specification.md`
- `Shared-Domain.md`

### Diseño y frontend
- `UI-Baseline.md`
- `Design-Refinement-Checklist.md`
- `Frontend-Implementation-Plan.md`

Estos archivos son la base actual para desarrollar con criterio y evitar improvisación.

---

## 12. Foco inmediato para Codex

El siguiente paso práctico es usar Codex para construir el frontend del storefront con estos principios:

- frontend only
- mock data local
- arquitectura limpia
- tipado consistente
- componentes reutilizables
- sin backend todavía
- sin APIs reales todavía
- sin inventar lógica server-side

### Alcance esperado para la primera ronda con Codex

- layout general
- hero
- panel 50/50
- grid de diseños con mock data
- mockup simple 2D
- selectores de talle, color, placement y cantidad
- add to cart
- carrito local
- formulario visual de envío
- responsive base

---

## 13. Arquitectura frontend sugerida

Se recomienda separar claramente:

- componentes UI
- estado
- tipos/modelos
- mock data
- utilidades
- features por módulo

Estructura conceptual sugerida:

- `components/`
- `features/storefront/`
- `features/configurator/`
- `features/cart/`
- `features/checkout/`
- `data/mock/`
- `types/`
- `utils/`

---

## 14. Estado funcional esperado del frontend inicial

Como mínimo, el frontend inicial debería manejar:

### Estado del configurador
- `selectedDesign`
- `selectedSize`
- `selectedColor`
- `selectedPlacement`
- `selectedQuantity`

### Estado del carrito
- `cartItems`

### Estado del formulario
- `shippingForm`
- `formErrors`

### Estado UI
- `isLoadingDesigns`
- `designsError`
- `isAddingToCart`
- `isSubmittingCheckout`

---

## 15. Reglas funcionales mínimas

El frontend debe respetar estas reglas:

- no permitir agregar al carrito si falta diseño
- no permitir agregar al carrito si falta talle
- no permitir agregar al carrito si falta color
- no permitir agregar al carrito si falta placement
- cantidad mínima = 1
- si cambia el talle y el color deja de ser válido, resetear el color
- el carrito debe reflejar la configuración exacta elegida
- items idénticos pueden fusionarse
- items con distinta configuración deben tratarse como distintos

---

## 16. Qué no hacer todavía

En esta etapa se debe evitar:

- construir backend antes de validar bien frontend
- integrar APIs reales demasiado pronto
- implementar pagos reales
- acoplar demasiado la UI a servicios futuros
- complicar el mockup con 3D antes de tiempo
- usar branding ficticio final como si fuera definitivo
- mezclar storefront y backoffice en la misma implementación

---

## 17. Próximos pasos recomendados

### Inmediato
Usar Codex para implementar el storefront frontend basado en los `.md` ya definidos.

### Después
Refinar visualmente:

- grid de diseños con imágenes reales
- mockup más fiel al producto
- selector visual de placement
- carrito mejor conectado al configurador
- formulario más realista

### Más adelante
Abrir la etapa de backend con:

- API-Spec
- contratos
- catálogo real
- carrito real
- orden/pago

Y luego:

- backoffice
- roles y permisos
- operación interna

---

## 18. Resumen ejecutivo

Este proyecto ya tiene:

- visión de producto
- separación de dominios
- baseline visual
- plan de implementación frontend
- documentación suficiente para empezar a construir

La prioridad actual no es seguir pensando en abstracto, sino:

> **implementar una primera versión del frontend del storefront, con mock data local y arquitectura limpia, preparada para integrar backend después.**

---

## 19. Archivo clave para arrancar

Si se va a trabajar con Codex ahora mismo, los archivos mínimos que debe usar como fuente son:

- `Storefront-Specification.md`
- `Shared-Domain.md`
- `UI-Baseline.md`
- `Design-Refinement-Checklist.md`
- `Frontend-Implementation-Plan.md`

Ese conjunto define suficientemente bien el problema para arrancar frontend con criterio.

---

## 20. Estado del proyecto en una frase

> Ecommerce de ropa temática para programadores, reconstruido desde cero, actualmente enfocado en implementar el storefront frontend con base documental sólida y sin backend todavía.

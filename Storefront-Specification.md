# Storefront-Specification.md

## 1. Overview

### 1.1 Purpose

Este documento define la especificación funcional inicial del storefront público del ecommerce de ropa temática para programadores.

El storefront será la interfaz orientada al cliente final y tendrá como objetivo:

- presentar la marca
- mostrar diseños y productos
- permitir configurar una prenda
- facilitar la compra
- acompañar al usuario hasta el checkout

### 1.2 Product vision

El storefront debe ofrecer una experiencia moderna, clara y visualmente fuerte, donde el usuario pueda:

- descubrir productos rápidamente
- entender la propuesta de valor
- visualizar cómo se verá una prenda con un diseño aplicado
- seleccionar variantes
- agregar al carrito
- completar su compra con confianza

### 1.3 Scope of this document

Este documento cubre:

- objetivo del storefront
- experiencia del usuario final
- módulos funcionales
- páginas principales
- entidades de negocio visibles en frontend
- reglas funcionales de compra
- criterios UX/UI de alto nivel

No cubre todavía:

- detalle técnico completo de backend
- diseño visual pixel-perfect
- arquitectura interna del backoffice
- permisos administrativos internos
- workflows operativos internos

---

## 2. Product goal

### 2.1 Main goal

Construir una experiencia pública de ecommerce que convierta tráfico en intención de compra y órdenes concretas.

### 2.2 Business objective

Vender productos de ropa temática con una experiencia atractiva y confiable, apoyándose en mockups/configuración visual para reducir incertidumbre antes de comprar.

### 2.3 User objective

Permitir que el usuario:

- explore productos con facilidad
- elija un diseño
- configure una prenda
- vea una previsualización clara
- compre de forma simple

---

## 3. Target audience

### 3.1 Primary audience

Clientes finales interesados en ropa con identidad tech/programación.

### 3.2 User characteristics

- compran online
- valoran diseño y estética
- quieren claridad antes de pagar
- buscan afinidad temática con tecnología o programación
- esperan una experiencia fluida en desktop y mobile

### 3.3 User expectations

- buena presentación del producto
- precio visible
- opciones claras
- mockup convincente
- flujo de compra simple
- checkout confiable

---

## 4. Product strategy

### 4.1 Product type

Storefront ecommerce con landing integrada y flujo de compra corto.

### 4.2 Strategic approach

Se prioriza un MVP comercial sólido antes que una experiencia de personalización avanzada compleja.

### 4.3 Visualization strategy

El storefront debe usar la visualización del producto como elemento de conversión.

Para MVP se recomienda:

- mockup 2D convincente
- arquitectura preparada para evolucionar a 3D
- preview reactivo a diseño, color y placement

### 4.4 Personalization level

La personalización inicial será semilibre.

El usuario podrá elegir:

- diseño
- talle
- color
- placement
- cantidad

No se incluirá inicialmente:

- subida de arte propio
- edición libre de posición
- edición libre de escala
- personalización por IA

---

## 5. MVP scope

### 5.1 Included in MVP

- landing principal
- hero comercial
- grid de diseños o productos
- configurador básico de producto
- mockup/preview
- wishlist simple
- carrito
- formulario de envío
- checkout básico
- integración de pago
- confirmación de compra

### 5.2 Excluded from MVP

- login del cliente
- historial de órdenes del cliente
- personalización libre avanzada
- editor 3D avanzado
- sistema de promociones complejas
- recomendaciones automáticas
- cuenta de usuario persistente

---

## 6. Core user journey

### 6.1 Main journey

1. El usuario entra al storefront.
2. Ve el hero y la oferta principal.
3. Explora diseños disponibles.
4. Selecciona un diseño.
5. Configura la prenda:
   - talle
   - color
   - placement
   - cantidad
6. Visualiza el mockup actualizado.
7. Agrega el producto al carrito o wishlist.
8. Revisa el carrito.
9. Completa datos de envío.
10. Inicia y completa el pago.
11. Recibe confirmación.

### 6.2 Secondary journeys

- guardar en wishlist para revisar luego
- modificar configuración antes de pagar
- abandonar y retomar si el carrito persiste localmente

---

## 7. Main pages

### 7.1 `/`
Landing principal del storefront.

Debe incluir:

- hero
- oferta
- diseños destacados
- configurador o acceso directo al configurador
- beneficios
- CTA final

### 7.2 `/product/[slug]`
Vista de detalle/configuración del producto.

Debe incluir:

- nombre del producto o diseño
- precio
- mockup
- selección de variante
- botón add to cart
- información relevante

### 7.3 `/cart`
Resumen del carrito.

Debe incluir:

- items agregados
- configuración visible por item
- edición de cantidad
- eliminación
- subtotal y total

### 7.4 `/checkout`
Formulario de datos y compra.

Debe incluir:

- datos personales
- dirección de envío
- resumen de orden
- CTA final de pago

### 7.5 `/order/confirmation`
Confirmación de compra.

Debe incluir:

- confirmación visual clara
- resumen breve del pedido
- referencia del pedido

---

## 8. Landing structure

### 8.1 Hero

Objetivo:
- comunicar rápidamente qué vende la marca y por qué comprar

Contenido:
- headline
- subtítulo breve
- precio u oferta
- beneficios comerciales
- CTA principal
- producto hero visual

### 8.2 Product/design exploration block

Objetivo:
- mostrar opciones disponibles

Contenido:
- grid de diseños o productos
- miniaturas visuales
- estado seleccionado
- opcionalmente precio o badge

### 8.3 Configurator block

Objetivo:
- permitir configurar un producto de forma simple

Contenido:
- mockup grande
- selector de talle
- selector de color
- selector de placement
- selector de cantidad
- add to cart

### 8.4 Benefits / trust block

Objetivo:
- reducir fricción y dudas

Contenido:
- envío
- calidad
- pago seguro
- facilidad de compra

### 8.5 Cart / purchase continuation block

Objetivo:
- permitir continuar a compra sin fricción

Contenido:
- resumen de carrito
- CTA a checkout

### 8.6 Final CTA

Objetivo:
- cerrar la landing con intención de compra

---

## 9. Functional modules

### 9.1 Catalog module

Responsabilidades:

- listar productos o diseños visibles
- permitir exploración inicial
- mostrar información resumida

MVP:

- grid visual
- imagen
- nombre
- precio base o desde

### 9.2 Product configurator module

Responsabilidades:

- mostrar el producto seleccionado
- permitir elegir variantes
- validar configuración
- actualizar preview

MVP:

- selección de talle
- selección de color
- selección de placement
- selección de cantidad
- add to cart

### 9.3 Mockup engine module

Responsabilidades:

- representar visualmente la configuración elegida
- actualizar el preview según cambios
- mantenerse desacoplado del resto del flujo

Inputs mínimos:

- diseño seleccionado
- color base
- placement
- variante base

Outputs mínimos:

- preview visible
- referencia serializable del item configurado

### 9.4 Wishlist module

Responsabilidades:

- guardar productos de interés

MVP:

- agregar
- eliminar
- persistencia local

### 9.5 Cart module

Responsabilidades:

- guardar productos configurados
- editar cantidad
- eliminar items
- calcular subtotal/total

### 9.6 Checkout module

Responsabilidades:

- capturar datos del comprador
- validar datos
- resumir la orden
- iniciar pago

### 9.7 Payment module

Responsabilidades:

- iniciar flujo de pago
- mostrar estado de confirmación o error
- cerrar la compra de forma clara

---

## 10. Domain model visible to storefront

### 10.1 Product

Campos iniciales:

- id
- slug
- name
- description
- basePrice
- thumbnail
- active

### 10.2 Design

Campos iniciales:

- id
- slug
- name
- imageUrl
- category
- tags
- active

### 10.3 ProductVariant

Campos iniciales:

- productId
- size
- allowedColors
- active
- optional stock

### 10.4 Placement

Valores iniciales sugeridos:

- front-center
- chest-left
- back-center

### 10.5 ConfiguredProduct

Campos:

- productId
- designId
- size
- color
- placement
- quantity
- unitPrice
- previewData

### 10.6 CartItem

Campos:

- id
- configuredProduct
- subtotal

### 10.7 ShippingInfo

Campos:

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

### 10.8 OrderSummary

Campos:

- items
- subtotal
- shippingCost
- total

---

## 11. Business rules

### 11.1 Catalog rules

- solo deben mostrarse productos y diseños activos
- solo deben mostrarse variantes válidas para compra

### 11.2 Configurator rules

- no se puede agregar al carrito un producto incompleto
- el color debe depender del talle si aplica esa restricción
- placement solo puede ser uno soportado por el producto
- cantidad mínima = 1

### 11.3 Cart rules

- el carrito no puede incluir items inválidos
- items idénticos pueden fusionarse si toda la configuración coincide
- si cambia cualquier atributo relevante, debe considerarse otro item

### 11.4 Checkout rules

- no se puede avanzar con carrito vacío
- no se puede pagar sin datos mínimos de envío
- el usuario debe ver claramente qué está comprando antes de pagar

### 11.5 Order integrity rules

- una orden debe reflejar exactamente la configuración seleccionada al momento de compra
- cambios posteriores en catálogo no deben alterar órdenes ya generadas

---

## 12. UX requirements

### 12.1 General UX principles

- mobile-first
- claridad antes que complejidad
- visual fuerte
- navegación simple
- feedback inmediato
- compra en pocos pasos

### 12.2 Hero UX requirements

- el usuario debe entender rápidamente qué se vende
- el precio/oferta debe ser visible
- el CTA debe ser claro

### 12.3 Configurator UX requirements

- la configuración debe sentirse fácil
- el mockup debe reaccionar visualmente
- el diseño seleccionado debe percibirse claramente
- no debe parecer una herramienta técnica compleja

### 12.4 Cart UX requirements

- cada item debe ser reconocible
- la configuración debe quedar visible
- el total debe verse claramente

### 12.5 Checkout UX requirements

- formulario simple
- validaciones claras
- resumen siempre entendible
- sensación de seguridad

---

## 13. Visual direction

### 13.1 Brand feeling

El storefront debe sentirse:

- moderno
- premium
- digital-native
- limpio
- centrado en producto
- visualmente confiable

### 13.2 Visual priorities

- mockups atractivos
- jerarquía tipográfica clara
- precio visible
- CTAs fuertes
- grid visual ordenado
- continuidad entre landing, configurador y compra

### 13.3 Avoid

- apariencia de template genérico
- UI demasiado técnica
- demasiados efectos innecesarios
- branding ficticio excesivo en fase de implementación
- experiencia fragmentada

---

## 14. Technical expectations for storefront

### 14.1 Frontend responsibilities

- renderizar landing
- mostrar catálogo
- manejar configurador
- manejar wishlist local
- manejar carrito local o híbrido
- mostrar checkout
- integrar backend y pagos

### 14.2 Backend dependencies

El storefront necesitará consumir capacidades backend como:

- catálogo
- detalle de producto
- variantes válidas
- cálculo de orden
- creación de orden
- pago

### 14.3 Persistence strategy

MVP:

- wishlist local
- carrito local
- orden persistida en backend
- pago manejado por backend/gateway

---

## 15. API expectations

Capacidades mínimas esperadas:

- obtener catálogo
- obtener detalle de producto/diseño
- validar configuraciones
- crear orden
- iniciar pago
- consultar resultado de compra

Endpoints conceptuales:

- `GET /products`
- `GET /products/{slug}`
- `GET /designs`
- `POST /cart/validate`
- `POST /orders`
- `POST /payments/session`
- `GET /orders/{id}`

---

## 16. Non-functional requirements

### 16.1 Performance

- carga rápida de landing
- imágenes optimizadas
- preview suficientemente fluido
- buena experiencia mobile

### 16.2 SEO

- landing indexable
- contenido estructurado
- metadata correcta
- rendimiento técnico aceptable

### 16.3 Accessibility

- contraste adecuado
- labels correctos
- navegación razonable por teclado
- errores de formulario visibles y entendibles

### 16.4 Maintainability

- componentes reutilizables
- contratos claros
- tipado fuerte
- separación entre UI, estado y mockup engine

### 16.5 Analytics

Eventos mínimos sugeridos:

- landing_view
- design_selected
- variant_selected
- add_to_wishlist
- add_to_cart
- cart_view
- begin_checkout
- payment_started
- payment_success

---

## 17. MVP success criteria

El MVP del storefront será exitoso si:

- comunica claramente qué se vende
- permite seleccionar y configurar un producto sin confusión
- muestra un mockup convincente
- permite agregar al carrito correctamente
- permite completar datos de envío
- permite iniciar y completar compra
- deja una base preparada para evolución futura

---

## 18. Open questions

- ¿el storefront venderá una sola prenda base al inicio o varias?
- ¿el catálogo se organiza por diseño, por producto o por ambos?
- ¿placement impacta precio?
- ¿habrá stock real o disponibilidad lógica?
- ¿el preview final debe guardarse como imagen?
- ¿la wishlist será solo local o futura cuenta de usuario?
- ¿qué gateway de pago se integrará primero?
- ¿habrá cálculo de envío real o tarifa fija inicial?
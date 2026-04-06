# Shared-Domain.md

## 1. Purpose

Este documento define el dominio compartido del sistema ecommerce de ropa temática.

Su objetivo es establecer un modelo común para que todos los módulos del ecosistema hablen el mismo idioma de negocio:

- storefront
- backoffice
- backend
- integraciones
- analítica
- documentación futura

Este documento no describe pantallas ni layouts.
Describe conceptos de negocio, entidades, relaciones y reglas compartidas.

---

## 2. Domain scope

El dominio compartido cubre principalmente:

- catálogo
- diseños
- productos
- variantes
- configuración de compra
- carrito
- orden
- envío
- pago
- usuarios internos y externos en términos funcionales

No cubre todavía:

- implementación de base de datos
- contratos API definitivos
- detalles de UI
- permisos técnicos finos
- procesos contables complejos

---

## 3. Core domain concepts

## 3.1 Product

### Definition
Un `Product` representa una prenda o artículo base comercializable.

Ejemplos:
- remera básica unisex
- hoodie
- oversized tee

### Responsibilities
- define la base física/comercial del artículo
- define qué placements soporta
- define precio base
- define si está disponible para venta

### Key attributes
- id
- slug
- name
- description
- basePrice
- supportedPlacements
- status
- thumbnailUrl

### Notes
El `Product` no es el diseño impreso.
Es la base sobre la cual se aplica un diseño.

---

## 3.2 Design

### Definition
Un `Design` representa el arte visual que puede aplicarse a un producto.

Ejemplos:
- diseño con texto de programación
- diseño con chiste tech
- diseño con iconografía de lenguaje

### Responsibilities
- representa el contenido gráfico imprimible
- define identidad visual de venta
- puede asociarse a categorías o tags

### Key attributes
- id
- slug
- name
- description
- artworkUrl
- thumbnailUrl
- category
- tags
- status

### Notes
Un diseño puede potencialmente aplicarse a uno o varios productos compatibles.

---

## 3.3 Placement

### Definition
Un `Placement` representa la ubicación permitida del diseño sobre la prenda.

### Suggested initial values
- front-center
- chest-left
- back-center

### Responsibilities
- restringe las ubicaciones válidas del estampado
- puede afectar visualización
- podría afectar precio en el futuro

### Key attributes
- code
- name
- description
- active

### Notes
Placement debe modelarse como dato del dominio, no solo como detalle visual.

---

## 3.4 ProductVariant

### Definition
Una `ProductVariant` representa una combinación válida de opciones comerciales del producto.

### Example
Para una remera:
- talle M con colores negro y blanco
- talle XL con color negro solamente

### Responsibilities
- definir disponibilidad real
- restringir configuraciones inválidas
- opcionalmente almacenar stock

### Key attributes
- id
- productId
- size
- allowedColors
- stock
- status

### Notes
No todos los talles deben tener los mismos colores disponibles.

---

## 3.5 ConfiguredProduct

### Definition
Un `ConfiguredProduct` representa una selección concreta hecha por un usuario lista para agregarse al carrito o a una orden.

### Responsibilities
- encapsular una compra específica
- capturar la configuración exacta elegida
- servir como snapshot comercial del producto configurado

### Key attributes
- productId
- designId
- size
- color
- placement
- quantity
- unitPrice
- previewData

### Notes
Este objeto es central para storefront, carrito y orden.

---

## 3.6 Cart

### Definition
El `Cart` representa la colección temporal de productos configurados que un usuario desea comprar.

### Responsibilities
- agrupar `CartItem`
- calcular subtotal
- permitir edición antes del checkout

### Key attributes
- id
- items
- subtotal
- totalQuantity
- currency

### Notes
En MVP puede ser persistido localmente en frontend.

---

## 3.7 CartItem

### Definition
Un `CartItem` representa un `ConfiguredProduct` agregado al carrito.

### Responsibilities
- conservar una configuración concreta
- calcular subtotal por línea
- permitir edición/eliminación

### Key attributes
- id
- configuredProduct
- quantity
- unitPrice
- subtotal

### Notes
Dos items solo deben fusionarse si toda la configuración relevante coincide.

---

## 3.8 Order

### Definition
Una `Order` representa una compra formalizada por el cliente.

### Responsibilities
- conservar snapshot de la compra
- registrar totales
- vincular envío y pago
- servir como unidad principal de operación del negocio

### Key attributes
- id
- items
- subtotal
- shippingCost
- total
- currency
- orderStatus
- paymentStatus
- createdAt

### Notes
Una orden no debe depender de cambios futuros en producto o diseño.

---

## 3.9 OrderItem

### Definition
Un `OrderItem` representa un producto configurado dentro de una orden ya creada.

### Responsibilities
- congelar la configuración comprada
- preservar trazabilidad histórica

### Key attributes
- id
- orderId
- productId
- productNameSnapshot
- designId
- designNameSnapshot
- designArtworkSnapshot
- size
- color
- placement
- quantity
- unitPrice
- subtotal
- previewSnapshot

### Notes
La orden debe guardar snapshots, no referencias vivas solamente.

---

## 3.10 ShippingInfo

### Definition
`ShippingInfo` representa los datos necesarios para entregar la orden.

### Responsibilities
- almacenar datos del destinatario
- almacenar dirección de entrega
- permitir operación logística

### Key attributes
- fullName
- email
- phone
- street
- streetNumber
- floorApartment
- reference
- postalCode
- city
- state
- country

---

## 3.11 Payment

### Definition
`Payment` representa la información de la transacción o intento de cobro asociado a una orden.

### Responsibilities
- vincular orden con gateway de pago
- registrar estado de pago
- permitir trazabilidad

### Key attributes
- id
- orderId
- gateway
- externalReference
- amount
- currency
- paymentStatus
- createdAt
- updatedAt

---

## 3.12 Customer

### Definition
`Customer` representa al comprador final en términos funcionales del dominio.

### Responsibilities
- identificar a la persona que realiza la compra
- vincular datos de contacto a la orden

### Key attributes
- fullName
- email
- phone

### Notes
En MVP no es obligatorio que exista cuenta autenticada persistente.

---

## 3.13 InternalUser

### Definition
`InternalUser` representa a un usuario del backoffice.

### Possible roles
- admin
- proveedor
- vendedor

### Responsibilities
- operar partes del sistema interno según permisos

### Key attributes
- id
- name
- email
- role
- status

---

## 4. Domain relationships

## 4.1 Product and Design
- un `Product` es la base física/comercial
- un `Design` es el arte visual
- un `ConfiguredProduct` combina ambos

## 4.2 Product and ProductVariant
- un `Product` puede tener muchas `ProductVariant`
- una `ProductVariant` depende de un solo `Product`

## 4.3 Product and Placement
- un `Product` define qué `Placement` soporta
- no todos los productos deben soportar todos los placements

## 4.4 Cart and CartItem
- un `Cart` contiene muchos `CartItem`
- un `CartItem` contiene un `ConfiguredProduct`

## 4.5 Order and OrderItem
- una `Order` contiene muchos `OrderItem`
- `OrderItem` es un snapshot transaccional

## 4.6 Order and ShippingInfo
- una `Order` debe tener un `ShippingInfo`

## 4.7 Order and Payment
- una `Order` puede tener uno o varios eventos de pago
- para MVP puede modelarse una sola referencia principal de pago

---

## 5. Shared business rules

## 5.1 Product activation rule
Un producto inactivo no debe aparecer en storefront ni poder comprarse.

## 5.2 Design activation rule
Un diseño inactivo no debe aparecer en storefront ni poder usarse en nuevas compras.

## 5.3 Variant validity rule
Solo deben ofrecerse configuraciones válidas según producto, talle, color y placement.

## 5.4 Cart validity rule
No debe agregarse al carrito una configuración incompleta o inválida.

## 5.5 Snapshot rule
Toda orden debe conservar snapshots de la configuración comprada.

## 5.6 Historical consistency rule
Cambios futuros en catálogo no deben alterar órdenes históricas.

## 5.7 Role separation rule
Los usuarios internos operan el dominio según rol, pero no cambian el significado del dominio compartido.

---

## 6. Shared enums and suggested values

## 6.1 ProductStatus
- active
- inactive
- archived

## 6.2 DesignStatus
- active
- inactive
- archived

## 6.3 OrderStatus
- pending-payment
- paid
- preparing
- in-production
- ready-to-ship
- shipped
- delivered
- cancelled

## 6.4 PaymentStatus
- pending
- authorized
- paid
- failed
- refunded
- cancelled

## 6.5 InternalUserRole
- admin
- proveedor
- vendedor

## 6.6 PlacementCode
- front-center
- chest-left
- back-center

---

## 7. Shared invariants

Estas condiciones deben mantenerse en cualquier módulo del sistema:

- un `ConfiguredProduct` debe tener producto, diseño, talle, color, placement y cantidad válidos
- un `CartItem` debe poder trazarse a una configuración concreta
- una `Order` debe reflejar exactamente lo comprado
- `Payment.amount` debe ser consistente con la orden o intento de pago
- `ShippingInfo` debe ser suficiente para entregar la orden
- el dominio no debe depender de nombres de pantalla o componentes UI

---

## 8. Shared language guidelines

Para evitar inconsistencias entre equipos y módulos:

### Use these business terms consistently
- Product
- Design
- Placement
- ProductVariant
- ConfiguredProduct
- CartItem
- Order
- OrderItem
- ShippingInfo
- Payment
- InternalUser

### Avoid mixing these concepts
- no usar “producto” para referirse al diseño
- no usar “mockup” como entidad de negocio principal
- no usar “carrito” para referirse a una orden ya creada
- no usar “variante” como sinónimo de diseño
- no usar placement como simple etiqueta visual sin impacto funcional

---

## 9. Suggested canonical models

## 9.1 Product
```json
{
  "id": "prod_001",
  "slug": "remera-basica-unisex",
  "name": "Remera básica unisex",
  "description": "Prenda base para aplicar diseños",
  "basePrice": 35.00,
  "supportedPlacements": ["front-center", "chest-left", "back-center"],
  "status": "active",
  "thumbnailUrl": "/products/basic-tee-thumb.png"
}
```

## 9.2 Design
```json
{
  "id": "des_001",
  "slug": "hello-world",
  "name": "Hello World",
  "description": "Diseño minimalista para programadores",
  "artworkUrl": "/designs/hello-world-art.png",
  "thumbnailUrl": "/designs/hello-world-thumb.png",
  "category": "programming",
  "tags": ["java", "developer", "minimal"],
  "status": "active"
}
```

## 9.3 ProductVariant
```json
{
  "id": "var_001",
  "productId": "prod_001",
  "size": "M",
  "allowedColors": ["white", "black", "gray"],
  "stock": 25,
  "status": "active"
}
```

## 9.4 ConfiguredProduct
```json
{
  "productId": "prod_001",
  "designId": "des_001",
  "size": "M",
  "color": "black",
  "placement": "front-center",
  "quantity": 1,
  "unitPrice": 35.00,
  "previewData": {
    "mockupMode": "2d",
    "previewUrl": "/previews/hello-world-black-front.png"
  }
}
```

## 9.5 CartItem
```json
{
  "id": "cart_item_001",
  "configuredProduct": {
    "productId": "prod_001",
    "designId": "des_001",
    "size": "M",
    "color": "black",
    "placement": "front-center",
    "quantity": 1,
    "unitPrice": 35.00,
    "previewData": {
      "mockupMode": "2d",
      "previewUrl": "/previews/hello-world-black-front.png"
    }
  },
  "quantity": 1,
  "unitPrice": 35.00,
  "subtotal": 35.00
}
```

## 9.6 Order
```json
{
  "id": "ord_001",
  "items": [],
  "subtotal": 35.00,
  "shippingCost": 0.00,
  "total": 35.00,
  "currency": "USD",
  "orderStatus": "paid",
  "paymentStatus": "paid",
  "createdAt": "2026-04-05T12:00:00Z"
}
```

---

## 10. Boundaries

## 10.1 Storefront boundary
Consume y manipula:
- Product
- Design
- ProductVariant
- ConfiguredProduct
- Cart
- CartItem
- ShippingInfo
- OrderSummary

## 10.2 Backoffice boundary
Administra y opera:
- Product
- Design
- ProductVariant
- Order
- OrderItem
- ShippingInfo
- Payment
- InternalUser

## 10.3 Backend boundary
Orquesta y persiste:
- todos los conceptos principales del dominio compartido

---

## 11. Open questions

- ¿un diseño podrá aplicarse a múltiples productos desde el inicio?
- ¿habrá stock real por variante o disponibilidad lógica?
- ¿placement afectará precio?
- ¿previewData será solo frontend o se persistirá en backend?
- ¿existirá entidad explícita `WishlistItem` en una fase posterior?
- ¿se necesitará una entidad `Shipment` separada de `ShippingInfo`?
- ¿habrá múltiples intentos de pago por orden?

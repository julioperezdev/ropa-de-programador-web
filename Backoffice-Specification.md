# Backoffice-Specification.md

## 1. Overview

### 1.1 Purpose

Este documento define la especificación funcional inicial del backoffice del sistema ecommerce de ropa temática.

El backoffice será una aplicación interna separada del storefront público y tendrá como objetivo permitir la gestión operativa del negocio por distintos perfiles internos.

### 1.2 Product vision

El backoffice debe permitir que usuarios internos puedan:

- gestionar diseños
- gestionar productos base
- gestionar variantes
- revisar pedidos
- actualizar estados operativos
- consultar información comercial básica

### 1.3 Scope of this document

Este documento cubre:

- objetivo del backoffice
- perfiles de usuario
- módulos funcionales
- flujos principales
- entidades operativas
- reglas de acceso de alto nivel

No cubre todavía:

- diseño visual final
- detalle técnico completo de API
- permisos finos por endpoint
- dashboards avanzados
- workflows complejos de producción

---

## 2. Product goal

## 2.1 Main goal

Construir una interfaz interna que permita operar el negocio sin depender de edición manual de datos dispersos o cambios directos en base de datos.

## 2.2 Business objective

Centralizar la gestión de catálogo, pedidos y operación comercial en una herramienta controlada, mantenible y escalable.

---

## 3. User roles

## 3.1 Admin

Responsable de administración general del sistema.

Permisos esperados:

- acceso completo
- gestión de productos
- gestión de diseños
- gestión de variantes
- gestión de pedidos
- gestión de estados
- gestión de usuarios internos
- acceso a métricas básicas

## 3.2 Proveedor

Responsable de operación relacionada con producto, diseño o producción.

Permisos esperados:

- ver pedidos asignados o disponibles
- revisar detalles de producto
- actualizar estados de producción si aplica
- consultar variantes requeridas
- gestionar ciertos assets o diseños según política

## 3.3 Vendedor

Responsable de operación comercial.

Permisos esperados:

- ver pedidos
- revisar estado de pago
- revisar estado de envío
- consultar datos del cliente
- actualizar estados comerciales permitidos
- apoyar en seguimiento postventa

---

## 4. Backoffice modules

## 4.1 Authentication and access

Objetivo:
- controlar acceso a la aplicación interna

Funcionalidades:
- login
- logout
- control de sesión
- control por rol

MVP:
- login interno simple
- roles básicos: admin, proveedor, vendedor

---

## 4.2 Dashboard

Objetivo:
- ofrecer una vista resumida del estado operativo

Contenido sugerido:
- cantidad de pedidos nuevos
- pedidos en producción
- pedidos enviados
- pedidos con incidencia
- diseños activos
- productos activos

MVP:
- dashboard simple con métricas básicas

---

## 4.3 Orders management

Objetivo:
- permitir revisar y operar pedidos

Funcionalidades:
- listar pedidos
- filtrar por estado
- ver detalle del pedido
- ver productos configurados
- ver datos de envío
- actualizar estado permitido según rol

Estados sugeridos:
- pending-payment
- paid
- preparing
- in-production
- ready-to-ship
- shipped
- delivered
- cancelled

MVP:
- listado
- detalle
- cambio de estado básico

---

## 4.4 Products management

Objetivo:
- administrar prendas base

Funcionalidades:
- listar productos
- crear producto
- editar producto
- activar/desactivar producto
- definir talles
- definir placements soportados
- definir precio base

Ejemplo de producto:
- remera básica unisex
- hoodie
- oversized tee

MVP:
- CRUD básico de producto

---

## 4.5 Designs management

Objetivo:
- administrar diseños imprimibles

Funcionalidades:
- listar diseños
- crear diseño
- editar diseño
- activar/desactivar diseño
- asociar imagen principal
- asociar tags o categoría
- asociar diseños a productos si aplica

MVP:
- CRUD básico de diseños
- carga de imagen principal
- estado activo/inactivo

---

## 4.6 Variants management

Objetivo:
- administrar disponibilidad comercial de variantes

Funcionalidades:
- definir colores por talle
- definir combinaciones permitidas
- activar/desactivar variantes
- definir stock si aplica

MVP:
- edición de variantes por producto

---

## 4.7 Shipping management

Objetivo:
- visualizar información de envío de pedidos

Funcionalidades:
- ver dirección de envío
- ver estado de envío
- actualizar tracking si aplica
- marcar pedido como enviado

MVP:
- consulta de datos de envío
- actualización de estado de envío

---

## 4.8 Users and roles management

Objetivo:
- administrar usuarios internos

Funcionalidades:
- listar usuarios internos
- crear usuario interno
- asignar rol
- activar/desactivar usuario

MVP:
- opcional según alcance inicial
- si no entra en MVP, puede resolverse manualmente al inicio

---

## 5. Main backoffice flows

## 5.1 Admin flow
- ingresa al sistema
- revisa dashboard
- gestiona catálogo
- revisa pedidos
- actualiza estados
- controla operación general

## 5.2 Proveedor flow
- ingresa al sistema
- ve pedidos relevantes
- revisa detalle de producto/configuración
- actualiza estado de preparación o producción

## 5.3 Vendedor flow
- ingresa al sistema
- consulta pedidos
- revisa pago y envío
- da seguimiento comercial
- resuelve incidencias simples

---

## 6. Core entities

## 6.1 InternalUser
Campos:
- id
- name
- email
- role
- active

## 6.2 Product
Campos:
- id
- slug
- name
- description
- basePrice
- active

## 6.3 Design
Campos:
- id
- slug
- name
- imageUrl
- category
- active

## 6.4 ProductVariant
Campos:
- id
- productId
- size
- allowedColors
- stock
- active

## 6.5 Order
Campos:
- id
- customerName
- items
- subtotal
- shippingCost
- total
- paymentStatus
- orderStatus
- createdAt

## 6.6 OrderItem
Campos:
- id
- orderId
- productId
- designId
- size
- color
- placement
- quantity
- unitPrice
- subtotal

## 6.7 ShippingInfo
Campos:
- orderId
- fullName
- phone
- email
- address
- city
- postalCode
- reference

---

## 7. Business rules

## 7.1 Access rules
- cada usuario solo puede ver y operar según su rol
- admin tiene acceso completo
- proveedor y vendedor tienen acceso restringido

## 7.2 Orders rules
- un pedido debe conservar trazabilidad de estados
- no todos los roles pueden mover cualquier estado
- los cambios de estado deben ser consistentes

## 7.3 Catalog rules
- un producto inactivo no debe aparecer en storefront
- un diseño inactivo no debe aparecer en storefront
- una variante inválida no debe estar disponible para compra

## 7.4 Data integrity rules
- un pedido debe conservar snapshot de lo comprado
- cambios futuros en producto o diseño no deben romper pedidos históricos

---

## 8. MVP scope for backoffice

Incluido en MVP:
- login interno
- dashboard simple
- listado de pedidos
- detalle de pedido
- cambio de estado básico
- CRUD básico de productos
- CRUD básico de diseños
- edición básica de variantes

Fuera de MVP:
- dashboards avanzados
- reportería compleja
- auditoría detallada
- gestión compleja de devoluciones
- sistema avanzado de permisos
- mensajería interna
- automatizaciones complejas

---

## 9. Suggested pages

- `/login`
- `/dashboard`
- `/orders`
- `/orders/[id]`
- `/products`
- `/products/new`
- `/products/[id]`
- `/designs`
- `/designs/new`
- `/designs/[id]`
- `/variants`
- `/users` (opcional para MVP)

---

## 10. UI principles

El backoffice debe sentirse:

- claro
- funcional
- rápido de usar
- orientado a tablas y formularios
- sobrio
- mantenible

No debe competir visualmente con la landing pública.
Debe priorizar eficiencia operativa.

---

## 11. Non-functional requirements

- control de acceso por rol
- trazabilidad básica de cambios importantes
- buena performance en listados
- formularios claros
- validaciones consistentes
- diseño responsive al menos en resolución laptop/tablet

---

## 12. Open questions

- ¿proveedor y vendedor usarán exactamente la misma interfaz con permisos distintos?
- ¿el proveedor podrá editar diseños o solo ver pedidos?
- ¿habrá stock real por variante?
- ¿habrá asignación de pedidos por proveedor?
- ¿se requerirá historial de cambios por pedido?
- ¿se gestionarán devoluciones desde el backoffice?
- ¿qué estados exactos tendrá el flujo operativo?
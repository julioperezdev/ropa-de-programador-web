# Design-Refinement-Checklist.md

## 1. Objetivo

Esta checklist define los ajustes visuales y de producto que deben revisarse antes o durante la implementación del frontend.

No todos los puntos requieren una nueva iteración en Stitch.
Algunos pueden resolverse directamente en frontend durante la implementación.

---

## 2. Hero

- [ ] Reemplazar slogan ficticio por copy real o temporal más alineado al negocio
- [ ] Definir texto comercial real del precio
- [ ] Definir cómo mostrar oferta en cuotas
- [ ] Definir cómo mostrar beneficio de envío gratis
- [ ] Validar CTA principal
- [ ] Validar CTA secundario si existirá
- [ ] Confirmar si el precio será fijo o “desde”
- [ ] Reforzar sensación de oferta ecommerce real
- [ ] Asegurar que la imagen hero se vea como producto real y no como placeholder genérico

---

## 3. Grid de diseños (lado izquierdo del panel 50/50)

- [ ] Reemplazar íconos por thumbnails reales de diseños 2D
- [ ] Definir tamaño final de cada design card
- [ ] Definir cuántas cards se ven por fila en desktop
- [ ] Definir cuántas cards se ven por fila en tablet
- [ ] Definir cuántas cards se ven por fila en mobile
- [ ] Diseñar estado selected
- [ ] Diseñar estado hover
- [ ] Diseñar estado disabled si aplica
- [ ] Mostrar nombre corto del diseño
- [ ] Evaluar si mostrar precio en cada card o no
- [ ] Definir comportamiento si la API devuelve muchas imágenes
- [ ] Definir comportamiento de scroll interno o paginación visual si aplica

---

## 4. Mockup / configurador (lado derecho del panel 50/50)

- [ ] Hacer el mockup visualmente más realista
- [ ] Conectar mejor el diseño seleccionado con el estampado mostrado
- [ ] Definir si el mockup será 2D, 3D o híbrido en el MVP
- [ ] Agregar selector visual de placement
- [ ] Definir placements soportados en MVP
- [ ] Definir orden visual de los controles
- [ ] Definir qué control tiene prioridad visual
- [ ] Confirmar si el precio cambia por placement
- [ ] Definir estado sin diseño seleccionado
- [ ] Definir estado loading mientras llega el diseño
- [ ] Definir feedback visual al cambiar color
- [ ] Definir feedback visual al cambiar talle
- [ ] Definir feedback visual al cambiar cantidad
- [ ] Confirmar si habrá imagen secundaria o solo una vista del mockup
- [ ] Confirmar si el botón Add to Cart queda siempre visible o no

---

## 5. Selector de talle

- [ ] Confirmar talles soportados
- [ ] Definir visual seleccionado
- [ ] Definir visual no seleccionado
- [ ] Definir estado disabled para talles sin stock o no disponibles
- [ ] Confirmar si el talle afecta colores disponibles
- [ ] Definir comportamiento al cambiar talle y resetear color si corresponde

---

## 6. Selector de color

- [ ] Confirmar colores soportados en MVP
- [ ] Definir visual seleccionado
- [ ] Definir si se muestra nombre del color o solo swatch
- [ ] Confirmar qué pasa si un color no aplica a un talle
- [ ] Confirmar si el cambio de color modifica el mockup en tiempo real

---

## 7. Selector de placement

- [ ] Confirmar placements del MVP
- [ ] Definir nombres visibles para usuario
- [ ] Definir representación visual del placement
- [ ] Confirmar si se usa texto, ícono o mini preview
- [ ] Confirmar si placement afecta precio
- [ ] Confirmar si todos los diseños soportan todos los placements

---

## 8. Cantidad y CTA

- [ ] Definir stepper de cantidad
- [ ] Confirmar cantidad mínima
- [ ] Confirmar cantidad máxima si aplica
- [ ] Definir botón disabled cuando falta configuración obligatoria
- [ ] Definir feedback al agregar al carrito
- [ ] Definir si se mostrará toast, mini cart update o scroll automático

---

## 9. Carrito

- [ ] Mostrar miniatura real del producto configurado
- [ ] Mostrar nombre real del diseño
- [ ] Mostrar color seleccionado
- [ ] Mostrar talle seleccionado
- [ ] Mostrar placement seleccionado
- [ ] Mostrar cantidad editable o no
- [ ] Mostrar precio unitario
- [ ] Mostrar subtotal por item
- [ ] Mostrar total general
- [ ] Definir empty state del carrito
- [ ] Definir visual cuando hay más de un item
- [ ] Definir comportamiento para remover item
- [ ] Definir comportamiento para editar cantidad

---

## 10. Formulario de compra / envío

- [ ] Pasar labels a idioma final del producto
- [ ] Confirmar campos obligatorios
- [ ] Confirmar campos opcionales
- [ ] Confirmar estructura:
  - [ ] nombre
  - [ ] apellido
  - [ ] teléfono
  - [ ] email
  - [ ] calle
  - [ ] número
  - [ ] piso/depto opcional
  - [ ] referencia opcional
  - [ ] código postal
  - [ ] ciudad
- [ ] Definir validaciones visuales
- [ ] Definir mensajes de error
- [ ] Definir CTA final
- [ ] Confirmar si el usuario ve el total siempre visible durante el formulario

---

## 11. Responsive

- [ ] Definir cómo colapsa el hero en mobile
- [ ] Definir orden del bloque 50/50 en mobile
- [ ] Confirmar si primero va grid o mockup en mobile
- [ ] Confirmar tamaño del mockup en mobile
- [ ] Confirmar comportamiento del carrito en mobile
- [ ] Confirmar comportamiento del formulario en mobile
- [ ] Evaluar sticky CTA en mobile
- [ ] Revisar spacing general para pantallas pequeñas

---

## 12. Estados UI

- [ ] Estado de carga inicial de diseños
- [ ] Estado error al cargar API
- [ ] Estado sin diseño seleccionado
- [ ] Estado diseño seleccionado
- [ ] Estado add to cart disabled
- [ ] Estado carrito vacío
- [ ] Estado carrito con items
- [ ] Estado submit de formulario
- [ ] Estado error de validación
- [ ] Estado éxito de acción

---

## 13. Contenido y tono

- [ ] Reemplazar copies demasiado ficticios
- [ ] Alinear tono con marca real o temporal más creíble
- [ ] Confirmar idioma de interfaz
- [ ] Confirmar formato de precio
- [ ] Confirmar textos de botones
- [ ] Confirmar labels de campos
- [ ] Confirmar tono general: más ecommerce real, menos conceptual demo

---

## 14. Prioridad recomendada

### Alta prioridad
- [ ] Grid con diseños reales
- [ ] Mockup más fiel al producto
- [ ] Selector de placement
- [ ] Carrito conectado al configurador
- [ ] Formulario alineado al flujo real
- [ ] Responsive base

### Prioridad media
- [ ] Refinar hero
- [ ] Mejorar estados UI
- [ ] Ajustar copies
- [ ] Mejorar feedback visual

### Prioridad baja
- [ ] Pulido de microinteracciones
- [ ] Decoración visual avanzada
- [ ] Variantes extra de cards o secciones

---

## 15. Uso recomendado de esta checklist

Esta checklist debe usarse para decidir:

- qué se vuelve a iterar en Stitch
- qué se define directamente en documentación
- qué se implementa primero en frontend con Codex
- qué se deja para una fase posterior
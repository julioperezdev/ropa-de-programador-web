# UI-Baseline.md

## 1. Objetivo

Este documento define la base visual actual del proyecto a partir del diseño generado en Stitch.

Su propósito es:

- congelar el estado actual del diseño
- distinguir qué decisiones visuales ya están aprobadas
- identificar qué partes son todavía conceptuales o placeholder
- servir como referencia para el inicio de implementación del frontend con Codex

---

## 2. Estado actual del diseño

Actualmente existe una primera propuesta visual de la landing ecommerce.

La propuesta ya resolvió correctamente:

- la estructura general de la landing
- la narrativa visual principal
- el layout base desktop
- la jerarquía general entre hero, configurador y carrito
- una estética moderna, limpia y premium

Sin embargo, todavía contiene varios elementos conceptuales, ficticios o no alineados completamente con el producto real.

---

## 3. Estructura visual aprobada

La siguiente estructura queda aprobada como base de trabajo:

### 3.1 Hero superior
Bloque inicial con:

- slogan principal
- precio protagonista
- texto de apoyo
- beneficios comerciales
- imagen hero de la remera

### 3.2 Panel central 50/50
Bloque principal dividido en dos columnas de igual importancia visual:

#### Izquierda
- grid de diseños
- selección visual de diseño

#### Derecha
- mockup de la remera
- controles de configuración
- botón de agregar al carrito

### 3.3 Carrito + formulario
Bloque inferior con:

- resumen del carrito
- total
- formulario de datos personales y envío
- CTA final de compra

---

## 4. Decisiones visuales aprobadas

Estas decisiones ya se consideran válidas para continuar:

- landing de una sola página
- jerarquía: hero → configuración → carrito → compra
- panel central 50/50
- mockup como elemento protagonista del configurador
- layout limpio, minimalista y moderno
- estética ecommerce premium
- uso de cards y paneles bien separados
- buena cantidad de espacio en blanco
- CTA visualmente destacable
- formulario integrado al flujo de compra

---

## 5. Elementos que todavía NO están aprobados como versión final

Los siguientes elementos del diseño actual deben considerarse temporales o placeholders:

### 5.1 Branding y copies
No se aprueban todavía como definitivos:

- nombre de marca inventado
- slogans ficticios
- nombres ficticios de productos o diseños
- títulos demasiado conceptuales
- labels en inglés si el producto final será en español

### 5.2 Grid izquierdo
No queda aprobado como versión final:

- uso de íconos en lugar de thumbnails reales
- apariencia tipo selector conceptual en vez de catálogo visual real

### 5.3 Mockup derecho
No queda aprobado como versión final:

- mockup demasiado ilustrativo
- diseño aplicado de forma poco realista
- ausencia de mayor conexión visual entre diseño seleccionado y prenda final

### 5.4 Configurador
No queda completo todavía:

- falta selector visual de ubicación del estampado
- faltan estados más reales de interacción
- el configurador aún se percibe algo conceptual

### 5.5 Carrito
No queda aprobado todavía como definitivo:

- item de carrito poco conectado visualmente al configurador
- falta placement visible dentro del resumen
- composición demasiado genérica de checkout

### 5.6 Formulario
No queda aprobado todavía como definitivo:

- labels en inglés
- campos no ajustados al flujo real esperado
- copy demasiado conceptual

---

## 6. Criterios visuales que sí deben mantenerse

Durante iteraciones futuras o implementación, debe mantenerse:

- estética moderna
- limpieza visual
- jerarquía clara
- layout respirado
- mockup protagonista
- panel principal bien balanceado
- sensación de tienda real
- foco en compra rápida
- navegación visual sencilla
- composición apta para mobile adaptation

---

## 7. Desviaciones detectadas respecto al producto real

El diseño actual se desvió parcialmente en estos puntos:

- representó el grid izquierdo como íconos y no como diseños 2D reales
- mostró el mockup como una ilustración conceptual más que como una prenda configurable real
- no integró placement del estampado
- dio demasiado peso a branding ficticio
- trató el checkout como un demo genérico en lugar de continuidad natural del configurador

---

## 8. Qué debe interpretarse como base para frontend

Para frontend debe tomarse como base:

- composición general
- jerarquía de secciones
- layout principal
- relación visual entre bloques
- estilo general limpio/premium
- idea de panel central dividido

No debe tomarse todavía como definitivo:

- contenido textual
- assets visuales placeholder
- iconografía usada como reemplazo de diseños
- mockup exacto
- labels y copies finales

---

## 9. Riesgos si no se documenta este baseline

Si este baseline no se congela, hay riesgo de:

- implementar placeholders como si fueran diseño final
- construir componentes basados en contenido equivocado
- perder la estructura buena que ya se consiguió
- mezclar lo aprobado con lo todavía conceptual
- generar retrabajo en frontend

---

## 10. Resultado esperado de este baseline

Este documento deja claro que:

- el diseño actual sí sirve como base visual
- la estructura general está validada
- todavía hay refinamientos obligatorios
- la implementación frontend debe arrancar con criterio controlado, no copiando ciegamente todos los detalles del diseño actual
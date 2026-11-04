# MiQR

Lector y creador de códigos QR que funciona **100 % en local**. Se instala en el móvil como una app (PWA) y, una vez instalada, funciona sin conexión.

## Qué hace

**Leer QR**
- Desde una foto hecha con la cámara o desde imágenes de la galería (varias a la vez).
- Detecta varios códigos en una misma imagen y los marca sobre la foto.
- Reconoce enlaces, Wi-Fi, contactos, teléfonos, SMS, correos y ubicaciones.
- Guarda un historial solo en el dispositivo.
- En Android, aparece en el menú *Compartir* de la galería.

**Crear QR**
- Texto o enlace, Wi-Fi, contacto (vCard), teléfono, correo y SMS.
- Color, nivel de corrección de errores y texto al pie.
- Impresión en vectorial: tamaño real de 2,5 a 18 cm, varias copias por hoja y líneas de recorte.
- Exporta a PNG o SVG, o compártelo directamente.

## Privacidad

Las imágenes se analizan en el navegador. No se envía nada a ningún servidor y no se usan servicios externos: las librerías van incluidas en el repositorio.

## Instalación

1. Abre la web publicada con GitHub Pages en el móvil.
2. **Android / Chrome:** pulsa *Instalar* en el aviso que aparece.
3. **iPhone / Safari:** *Compartir → Añadir a pantalla de inicio*.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa (interfaz y lógica) |
| `sw.js` | Service worker: modo sin conexión e imágenes compartidas |
| `manifest.webmanifest` | Datos para instalarla como app |
| `jsQR.js` | Lectura de QR ([jsQR](https://github.com/cozmo/jsQR) 1.4.0, licencia Apache-2.0) |
| `qrcode.js` | Generación de QR ([qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) 1.4.4, licencia MIT) |
| `icon-*.png` | Iconos de la app |

Para publicar una nueva versión, cambia `CACHE` en `sw.js` (por ejemplo `lector-qr-v3`) para que los móviles descarguen los archivos nuevos.

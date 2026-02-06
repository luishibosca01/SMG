# SMG - Sistema de Gestión (PWA)

Progressive Web App para gestión de servicios y horarios laborales.

## 📱 Características PWA

- ✅ Instalable en dispositivos móviles y escritorio
- ✅ Funciona offline con Service Worker
- ✅ Detección automática de instalación
- ✅ Botón flotante para instalar (solo en móviles Android no instalados)
- ✅ Modal de instalación personalizado
- ✅ Caché de recursos para acceso rápido

## 🚀 Instalación en GitHub Pages

### 1. Subir archivos al repositorio

Asegúrate de que tu repositorio contenga estos archivos en la raíz:

```
/
├── index.html
├── Servicios.html
├── Horarios.html
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512.png
└── README.md
```

### 2. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Dirígete a **Settings** > **Pages**
3. En **Source**, selecciona la rama `main` (o `master`)
4. Selecciona la carpeta `/ (root)`
5. Haz clic en **Save**

### 3. Actualizar rutas (si es necesario)

Si tu repositorio NO está en `username.github.io` sino en `username.github.io/nombre-repo`, debes actualizar:

**En `manifest.json`:**
```json
"start_url": "/nombre-repo/",
```

**En `sw.js`:**
```javascript
const urlsToCache = [
  '/nombre-repo/',
  '/nombre-repo/index.html',
  '/nombre-repo/Servicios.html',
  '/nombre-repo/Horarios.html'
];
```

**En `index.html`:**
```html
<link rel="manifest" href="/nombre-repo/manifest.json">
```

## 📱 Funcionamiento de la Instalación

### En Android (Chrome/Edge)

1. **Usuario visita la página por primera vez:**
   - Aparece un botón flotante azul/morado en la esquina inferior derecha
   - El botón tiene un ícono de descarga y una animación de pulso

2. **Usuario hace clic en el botón:**
   - Se abre un modal con información sobre la instalación
   - Opciones: "Ahora no" o "Instalar"

3. **Usuario acepta instalar:**
   - Se muestra el prompt nativo de Android
   - La app se instala en el dispositivo
   - El botón desaparece permanentemente

4. **Próximas visitas:**
   - Si la PWA ya está instalada, el botón NO aparece
   - Detecta si se abrió en modo standalone (instalada)

### En iOS (Safari)

- El botón NO aparece (iOS no soporta `beforeinstallprompt`)
- Los usuarios pueden instalar manualmente:
  1. Abrir en Safari
  2. Tocar el botón "Compartir"
  3. Seleccionar "Agregar a la pantalla de inicio"

### En Escritorio

- En Chrome/Edge, aparece el ícono de instalación en la barra de direcciones
- El botón flotante también funciona en escritorio

## 🔧 Personalización

### Cambiar colores del tema

En `manifest.json`:
```json
"theme_color": "#0ea5e9",
"background_color": "#000000"
```

### Modificar el caché

En `sw.js`, ajusta `CACHE_NAME` y `urlsToCache`:
```javascript
const CACHE_NAME = 'smg-v2'; // Incrementar versión
const urlsToCache = [
  // Agregar o quitar URLs
];
```

### Personalizar el botón de instalación

En `index.html`, busca `#install-button` en los estilos CSS:
```css
#install-button {
  /* Modificar posición, tamaño, colores, etc. */
}
```

## 🧪 Pruebas

### Local

1. Inicia un servidor local:
```bash
python -m http.server 8000
# o
npx http-server
```

2. Abre Chrome DevTools > Application > Service Workers
3. Verifica que el Service Worker esté registrado
4. Prueba el modo offline desmarcando "Online"

### En producción

1. Abre Chrome DevTools (F12)
2. Ve a **Application** > **Manifest**
3. Verifica que todos los campos estén correctos
4. En **Service Workers**, verifica que esté activo
5. Prueba el botón de instalación en un dispositivo móvil

## 📋 Checklist de Despliegue

- [ ] Todos los archivos subidos a GitHub
- [ ] GitHub Pages activado y funcionando
- [ ] Manifest.json accesible (visita `tu-url/manifest.json`)
- [ ] Service Worker registrado correctamente
- [ ] Iconos cargando correctamente
- [ ] Rutas actualizadas si usas subdirectorio
- [ ] HTTPS activo (GitHub Pages lo proporciona automáticamente)
- [ ] Probado en dispositivo Android real
- [ ] Botón de instalación aparece y funciona
- [ ] Botón desaparece después de instalar

## 🐛 Solución de Problemas

### El botón no aparece

1. **Verifica HTTPS:** PWA solo funcionan con HTTPS
2. **Limpia caché:** En DevTools > Application > Clear storage
3. **Verifica manifest:** Debe ser accesible y válido
4. **Revisa consola:** Busca errores en DevTools

### Service Worker no se registra

1. Verifica la ruta del SW: debe ser `/sw.js` desde la raíz
2. Comprueba la consola por errores
3. En DevTools > Application > Service Workers, haz clic en "Unregister" y recarga

### La app no funciona offline

1. Verifica que las URLs en el caché estén correctas
2. Actualiza la versión del caché (`CACHE_NAME`)
3. Desinstala la PWA y vuelve a instalarla

## 📞 Soporte

Si tienes problemas, verifica:
- [Can I Use - Service Workers](https://caniuse.com/serviceworkers)
- [MDN - Progressive Web Apps](https://developer.mozilla.org/es/docs/Web/Progressive_web_apps)
- [Google Web.dev - PWA](https://web.dev/progressive-web-apps/)

---

Desarrollado con ❤️ para SMG

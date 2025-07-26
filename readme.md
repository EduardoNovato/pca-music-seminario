<div align="center">
  <img src="https://pca.edu.co/wp/wp-content/uploads/2025/05/nuevo-logo-pca-web.jpg" width="80" alt="PCA Music Logo" />
  
  # PCA Music
  
  **App tipo Spotify para el Politécnico de la Costa Atlántica (PCA)**
</div>

---

## Descripción

PCA Music es una aplicación móvil desarrollada como proyecto de grado/seminario para el Politécnico de la Costa Atlántica. Inspirada en Spotify, permite explorar, escuchar y disfrutar música vallenata, especialmente de Silvestre Dangond. La app busca ofrecer una experiencia moderna, fluida y personalizada para los usuarios.

## Características principales

- Pantalla de introducción con slides informativos.
- Autenticación básica de usuario (login).
- Home con listado de canciones, imágenes y descripciones.
- Cambio de tema claro/oscuro y persistencia de preferencias.
- Navegación protegida por guardas (intro, home, login).
- Uso de almacenamiento local para guardar estado y preferencias.

## Tecnologías utilizadas

- **Angular** 20
- **Ionic** 8
- **Capacitor** 7
- **TypeScript**
- **SCSS**
- **Swiper** para slides

## Instalación y ejecución

1. Clona el repositorio:
    ```bash
    git clone https://github.com/EduardoNovato/pca-music-seminario.git
    cd pca-ionic-music
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Instala el CLI de Ionic:

    ```bash
    npm install -g @ionic/cli
    ```

3. Ejecuta la app:
    ```bash
    ionic serve
    ```

## Estructura del proyecto

```
src/
  app/
    core/
      guards/         # Guardas de navegación
      models/         # Modelos de datos
      services/       # Servicios (auth, storage, consumo de API de música)
    screens/
      menu/           # Menu Desplegable
      home/           # Pantalla principal
      intro/          # Pantalla de introducción
      login/          # Pantalla de login
    assets/           # Imágenes y recursos
    theme/            # Variables de tema SCSS
  environments/       # Configuración de entornos
  global.scss         # Estilos globales
  index.html          # HTML principal
```

## Uso básico

- Al abrir la app, verás una introducción con slides.
- Puedes iniciar sesión con el usuario de prueba:
   - **Email:** ejco@gmail.com
   - **Password:** 12345678
- Tras iniciar sesión, accede al home donde la app se conecta automáticamente a una API para obtener y mostrar el listado de canciones disponibles en tiempo real.
- Explora las canciones, imágenes y descripciones obtenidas desde la API.
- Cambia entre tema claro y oscuro desde la pantalla principal. La preferencia se guarda localmente.

## Créditos y contacto

- **Autor:** Eduardo Novato
- **Colaboración:** Andrea Vecino
- **Institución:** Politécnico de la Costa Atlántica (PCA)
- **Repositorio:** [GitHub](https://github.com/EduardoNovato/pca-music-seminario)

---

<div align="center">
  Hecho con ❤️ para el PCA
</div>

# 🎙️ EDGE-TTS GUI

![DIGIMIX EDGE-TTS PRO](https://img.shields.io/badge/Estado-Operativo-brightgreen?style=for-the-badge&logo=rust) ![Rust](https://img.shields.io/badge/Rust-Core-orange?style=for-the-badge&logo=rust) ![Tauri](https://img.shields.io/badge/Tauri-v2-FFD13B?style=for-the-badge&logo=tauri) ![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)

Una interfaz gráfica (GUI) "brutal", segura y de alto rendimiento para el motor [edge-tts](https://github.com/rany2/edge-tts). Diseñada bajo principios de Ciberseguridad, Neumorfismo Oscuro y Entropía Front-End. 

Convierte texto a voz neuronal ultra-realista utilizando los servidores de Microsoft Edge, directamente desde tu escritorio, sin necesidad de usar la terminal.

---

## ✨ Características

- 🛡️ **Núcleo Seguro en Rust:** Ejecución de subprocesos ultrarrápida y libre de vulnerabilidades gracias a Tauri.
- 🎨 **Interfaz Neumórfica:** Diseño "Bento Grid", Glassmorphism, y renderizado fluido construido con Tailwind CSS v4.
- 🌍 **Arsenal de Voces:** Decenas de voces neuronales agrupadas por geolocalización (México, España, Colombia, Argentina, US, etc).
- 🎛️ **Control Total:** Ajustes milimétricos de **Velocidad**, **Tono (Pitch)** y **Volumen**.
- 📥 **Exportación Directa:** Los audios se guardan automáticamente y de forma segura en tu carpeta de `Descargas` en formato `.mp3`.

---

## ⚙️ Instalación desde Cero (Paso a Paso)

Si quieres correr este proyecto en tu propia máquina o compilarlo, sigue estas instrucciones tácticas:

### 1. Instalar dependencias del sistema operativo
Necesitas tener **Node.js** (para la interfaz) y **Rust** (para el núcleo lógico). En Windows, puedes abrir PowerShell y ejecutar:
```powershell
winget install -e --id OpenJS.NodeJS
winget install -e --id Rustlang.Rustup
```
*(Reinicia tu terminal después de instalarlos).*

### 2. Instalar el motor `edge-tts`
El núcleo en Rust se comunica con el programa oficial de `edge-tts` escrito en Python. Debes tener [Python](https://www.python.org/downloads/) instalado y luego ejecutar:
```bash
pip install edge-tts
```
Asegúrate de que el comando `edge-tts` funcione en tu terminal escribiendo `edge-tts --version`.

### 3. Clonar y Desplegar
Clona este repositorio y levanta el entorno de desarrollo:
```bash
git clone https://github.com/theloghox/digi_edgetts.git
cd digi_edgetts
npm install
npm run tauri dev
```
¡La interfaz nativa se abrirá automáticamente en tu pantalla!

---

## 📦 Compilar el Ejecutable (Fácil)

Si solo quieres el archivo `.exe` para enviárselo a otra persona (y que no tengan que abrir la terminal), puedes compilar el proyecto con un solo comando:

```bash
npm run tauri build
```

Una vez terminado, encontrarás tu ejecutable listo para distribución en la carpeta:
`src-tauri/target/release/edge-tts-gui.exe`

*(Nota: El usuario final seguirá necesitando tener Python y `edge-tts` instalados en su sistema para que el audio pueda ser sintetizado).*


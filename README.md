# 🧠 Plataforma de Reservas de Sesiones de Psicología

Una aplicación web moderna desarrollada con **Next.js 15** que permite a los usuarios encontrar psicólogos, filtrar por especialidades y reservar sesiones online de manera sencilla e intuitiva.

## 📋 Tabla de Contenidos

- [🚀 Características Principales](#-características-principales)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [⚙️ Instalación y Configuración](#️-instalación-y-configuración)
- [🔄 Flujos Implementados](#-flujos-implementados)
- [🎯 Decisiones Técnicas y Funcionales](#-decisiones-técnicas-y-funcionales)
- [📖 Guía de Uso](#-guía-de-uso)
- [🔐 Autenticación](#-autenticación)
- [📱 Características de UX/UI](#-características-de-uxui)
- [🚧 Estado Actual y Limitaciones](#-estado-actual-y-limitaciones)
- [🔮 Próximas Funcionalidades](#-próximas-funcionalidades)

## 🚀 Características Principales

### ✅ Funcionalidades Implementadas

- **Sistema de autenticación completo** con Supabase Auth
- **Búsqueda y filtrado de psicólogos** por nombre y especialidades
- **Visualización detallada** de perfiles de terapeutas
- **Sistema de reservas** con calendario interactivo
- **Gestión de disponibilidad** de horarios
- **Página de confirmación** de reservas
- **Integración con Google Calendar**
- **Diseño responsive** y modo oscuro
- **Interface moderna** con animaciones suaves

### 🎯 Especialidades Disponibles

- Ansiedad
- Depresión
- Terapia de parejas
- Trastorno de estrés postraumático
- Adicción
- Trastornos de alimentación
- Luto
- Gestión del estrés
- Fobias
- Trastorno obsesivo-compulsivo

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconos

### Backend y Base de Datos
- **Supabase** - Backend como servicio (BaaS)
- **Supabase Auth** - Sistema de autenticación
- **Supabase Database** - Base de datos PostgreSQL

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Turbopack** - Bundler para desarrollo rápido

## 📁 Estructura del Proyecto

```
├── app/                      # App Router de Next.js
│   ├── auth/                 # Páginas de autenticación
│   │   ├── login/            # Inicio de sesión
│   │   ├── sign-up/          # Registro
│   │   ├── forgot-password/  # Recuperación de contraseña
│   │   ├── update-password/  # Actualización de contraseña
│   │   ├── confirm/          # Confirmación de email
│   │   └── error/            # Página de errores
│   ├── find/                 # Sistema de búsqueda y reservas
│   │   ├── page.tsx          # Lista de psicólogos con filtros
│   │   ├── therapist/[id]/   # Detalle de terapeuta
│   │   └── booking-success/  # Confirmación de reserva
│   ├── layout.tsx            # Layout principal
│   ├── page.tsx              # Página de inicio
│   └── globals.css           # Estilos globales
├── components/               # Componentes React
│   ├── ui/                   # Componentes base de UI
│   ├── auth-button.tsx       # Botón de autenticación
│   ├── login-form.tsx        # Formulario de login
│   ├── sign-up-form.tsx      # Formulario de registro
│   ├── therapist-card.tsx    # Tarjeta de terapeuta
│   ├── book-session-modal.tsx # Modal de reserva
│   └── theme-switcher.tsx    # Selector de tema
├── lib/                      # Utilidades y configuración
│   ├── supabase/             # Configuración de Supabase
│   ├── mock-data.ts          # Datos de prueba
│   ├── types.ts              # Tipos TypeScript
│   └── utils.ts              # Funciones utilitarias
└── middleware.ts             # Middleware de autenticación
```

## ⚙️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd psi-mammoliti
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
cp .env.example .env.local
```

Completa las variables de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=tu-clave-publica-de-supabase
VERCEL_PROJECT_PRODUCTION_URL=tu-url-de-produccion
```

### 4. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Obtén las credenciales del proyecto
3. Configura las políticas de autenticación según tus necesidades

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### 6. Comandos Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo con Turbopack
npm run build    # Compilar para producción
npm run start    # Ejecutar versión de producción
npm run lint     # Ejecutar linting
```

## 🔄 Flujos Implementados

### 1. Flujo de Autenticación

**Registro de Usuario:**
```
Inicio → Registro → Confirmación por Email → Login → Dashboard
```

**Funcionalidades incluidas:**
- ✅ Registro con email y contraseña
- ✅ Confirmación por email
- ✅ Inicio de sesión
- ✅ Recuperación de contraseña
- ✅ Actualización de contraseña
- ✅ Cierre de sesión
- ✅ Protección de rutas con middleware

### 2. Flujo de Búsqueda de Psicólogos

**Búsqueda y Filtrado:**
```
Lista de Psicólogos → Filtros por Especialidad → Búsqueda por Nombre → Resultados
```

**Funcionalidades incluidas:**
- ✅ Visualización de todos los psicólogos disponibles
- ✅ Filtro múltiple por especialidades
- ✅ Búsqueda por nombre
- ✅ Indicadores de disponibilidad
- ✅ Contador de resultados
- ✅ Limpieza de filtros

### 3. Flujo de Reserva de Sesiones

**Proceso de Reserva:**
```
Lista → Selección de Psicólogo → Ver Perfil → Elegir Horario → Confirmar Reserva → Confirmación
```

**Funcionalidades incluidas:**
- ✅ Perfil detallado del terapeuta
- ✅ Calendario semanal interactivo
- ✅ Selección de horarios disponibles
- ✅ Modal de confirmación de reserva
- ✅ Página de éxito con detalles
- ✅ Integración con Google Calendar
- ✅ Instrucciones post-reserva

### 4. Flujo de Experiencia de Usuario

**Navegación:**
```
Landing Page → Búsqueda → Selección → Reserva → Confirmación
```

**Características de UX:**
- ✅ Diseño responsivo para móviles y desktop
- ✅ Modo oscuro/claro automático
- ✅ Animaciones y transiciones suaves
- ✅ Estados de carga
- ✅ Manejo de errores
- ✅ Navegación intuitiva

### Arquitectura

**Next.js 15 con App Router:**
- **Decisión:** Utilizar el nuevo App Router para aprovechar las mejores prácticas
- **Beneficio:** Mejor performance, SEO optimizado, y routing más intuitivo

**Supabase como Backend:**
- **Decisión:** BaaS para acelerar el desarrollo
- **Beneficio:** Autenticación robusta, base de datos PostgreSQL, APIs automáticas

### Gestión de Estados

**Server Components por Defecto:**
- **Decisión:** Maximizar el uso de Server Components
- **Beneficio:** Mejor performance inicial y menor bundle JavaScript

**Client Components Solo Cuando Necesario:**
- **Decisión:** Usar 'use client' solo para interactividad
- **Ejemplos:** Formularios, modales, filtros dinámicos

### Diseño y UX

**Sistema de Diseño Consistente:**
- **Componentes:** Radix UI como base para accesibilidad
- **Estilos:** Tailwind CSS para rapidez de desarrollo
- **Iconos:** Lucide React para consistencia visual

**Datos de Prueba Realistas:**
- **Decisión:** Crear datos mock detallados y variados
- **Beneficio:** Experiencia de usuario realista durante desarrollo

### Funcionalidades de Negocio

**Gestión de Disponibilidad:**
- **Lógica:** Algoritmo para generar horarios realistas
- **Variación:** Algunos terapeutas con "poca disponibilidad"
- **Formato:** Slots de 45 minutos en horarios laborales

**Sistema de Especialidades:**
- **Categorización:** 10 especialidades principales
- **Filtrado:** Múltiple selección para mayor flexibilidad

## 📖 Guía de Uso

### Para Usuarios Finales

#### 1. Crear Cuenta
1. Hacer clic en "Comenzar ahora" desde la página principal
2. Completar el formulario de registro
3. Confirmar email recibido
4. Iniciar sesión

#### 2. Buscar Psicólogo
1. Navegar a la sección "Encontrá tu psicólogo"
2. Usar filtros por especialidad si es necesario
3. Buscar por nombre específico (opcional)
4. Revisar perfiles disponibles

#### 3. Reservar Sesión
1. Hacer clic en el psicólogo deseado
2. Revisar su perfil y especialidades
3. Seleccionar día en el calendario
4. Elegir horario disponible
5. Confirmar la reserva
6. Agregar al calendario personal


## 🔐 Autenticación

### Sistema Implementado

**Proveedor:** Supabase Auth
**Métodos soportados:**
- ✅ Email/Contraseña
- ✅ Confirmación por email
- ✅ Recuperación de contraseña
- ✅ Actualización de contraseña

### Protección de Rutas

**Middleware:** Protege automáticamente rutas sensibles
**Rutas Públicas:** Landing page, login, registro
**Rutas Protegidas:** Dashboard de búsqueda y reservas

### Gestión de Sesiones

**SSR:** Manejo de sesiones server-side
**Persistencia:** Sesiones persisten entre recargas
**Expiración:** Manejo automático de tokens expirados

## 📱 Características de UX/UI

### Diseño Responsivo

**Mobile First:** Optimizado para dispositivos móviles
**Breakpoints:** Responsive en tablet y desktop
**Componentes:** Adaptables a diferentes tamaños de pantalla

### Modo Oscuro

**Implementación:** next-themes para persistencia
**Toggle:** Selector en la navegación principal
**Consistencia:** Todos los componentes soportan ambos modos


## 🚧 Estado Actual y Limitaciones

### ✅ Funcionalidades Completadas

- Sistema de autenticación completo
- Búsqueda y filtrado de terapeutas
- Sistema de reservas end-to-end
- UI/UX moderna y responsiva
- Integración con calendario
- Manejo de errores básico


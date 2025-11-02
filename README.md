# Backend-Proyecto-Final-Grupo-3-mfpfsdev

------------------------------------------------------------------------

## 📌 Objetivo del Repositorio

Este proyecto se desarrolla en equipo. La finalidad de este documento es
establecer una **guía clara de trabajo**, especialmente para quienes no
tienen mucha experiencia usando Git/GitHub, para evitar romper la
estructura del repositorio y asegurar que el flujo de trabajo sea
ordenado.

------------------------------------------------------------------------

# 🚀 Flujo de trabajo: GitFlow

Usaremos una versión simplificada del modelo **GitFlow**, adecuado para
equipos pequeños.

## 🌳 Estructura de ramas

    main / master    ← Producción (solo versiones estables)
    │
    └─ develop        ← Integración (código listo pero no publicado)
       ├─ feature/... ← Nuevas funcionalidades
       └─ fix/...     ← Hotfixes detectados durante el desarrollo o en producción

### ✅ main / master

-   Contiene **solo código estable**.
-   Nadie hace commits directos aquí.
-   Solo se hace merge desde `develop` o desde ramas `bug/*` en casos concretos.

### ✅ develop

-   Rama donde se integran las funcionalidades terminadas.
-   Antes de hacer merge aquí, se deben pasar pruebas básicas.
-   Se usa como base para crear nuevas ramas `feature/*` o `fix/*`.

### ✅ feature/\*

Para nuevas características.\
Ejemplos: - `feature/login`

Reglas: - Se crean desde `develop`. - Al terminar, se hace **Pull
Request hacia `develop`**.

### ✅ fix/\*

Para errores encontrados durante el desarrollo.\

### ✅ bug/\*

Para errores urgentes detectados en producción.\

------------------------------------------------------------------------

# 🧪 Procedimiento de Trabajo (paso a paso)

### 1️⃣ Antes de empezar una tarea

``` bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre
```

### 2️⃣ Durante el desarrollo

-   Commits pequeños.
-   Mensajes descriptivos:

``` bash
feat: implementa endpoint de login
fix: corrige error al generar token
refactor: mejora la estructura del endpoint login
```

### 3️⃣ Al terminar

1.  Actualizar tu rama:

``` bash
git pull origin develop
```

2.  Resolver conflictos si los hay.\
3.  Crear un **Pull Request → hacia develop**.\
4.  Solicitar revisión a otro compañero.

### 4️⃣ Nunca hacer:

⛔ commits directos a `main`\
⛔ merges sin Pull Request\
⛔ subir código roto o que no compile\
⛔ trabajar varias personas sobre la misma rama

------------------------------------------------------------------------

# ✅ Convenciones del Proyecto

## ✔️ Estilo de código

-   Mantener el mismo estilo (indentación, nombres, nomenclatura).
-   Evitar funciones o archivos gigantes.
-   Comentar lo estrictamente necesario.

## ✔️ Lenguaje de commits y PRs

-   Español o inglés, pero consistente.
-   PRs siempre con descripción clara y breve.

------------------------------------------------------------------------

# 🙌 Contribución

Cualquier aporte debe seguir el flujo de trabajo definido arriba.\
Si tienes dudas, pregunta antes de hacer merges importantes.

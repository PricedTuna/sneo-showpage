# Sneo Showpage

Documentación de Sneo Brutalism con Next.js, Nextra y ejemplos interactivos con Sandpack.

## Desarrollo

Requisitos: Node.js 20.9 o superior y npm.

```bash
npm ci
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La página principal está en `app/page.mdx` y el ejemplo interactivo en `components/HelloWorldPlayground.tsx`.

Para comprobar tipos y generar la versión de producción:

```bash
npm run typecheck
npm run build
npm start
```

Sandpack necesita conexión a internet para cargar su entorno y las dependencias del ejemplo. La versión de `sneo-brutalism` del playground se configura en `customSetup.dependencies`.

## Estructura y mantenimiento

La guía de primeros pasos está en `app/page.mdx`, el constructor en `components/ThemeBuilder.tsx` y el catálogo en `components/ComponentDemo.tsx`. Para añadir un componente al catálogo, comprueba primero los tipos de la versión instalada, añade su nombre en `components/componentNames.ts`, su descripción y ejemplo en `ComponentDemo.tsx`, su referencia en `componentReference.ts`, y verifica que aparezca en el explorador de componentes. Ejecuta `npm run typecheck` y `npm run build`.

## Despliegue

El proyecto es una aplicación Next.js: ejecuta `npm ci` y `npm run build` en el proveedor elegido y utiliza `npm start` para servir la compilación. No se ha configurado ningún servicio de hosting.

Nextra 4.6.1 requiere aquí Zod 4.1.12 fijado: versiones posteriores provocaron un error de validación en el layout. Next.js 15 se eligió tras detectar una incompatibilidad de MDX con Next.js 16.4.

## Control de versiones

El proyecto incluye `package-lock.json` para reproducir las dependencias. Para iniciar un repositorio local y crear el primer commit:

```bash
git init
git add .
git commit -m "Initial commit"
```

Los archivos de dependencias, compilaciones, variables de entorno y registros locales se excluyen mediante `.gitignore`. Si se añaden variables de entorno necesarias, documenta sus nombres en un archivo `.env.example` sin valores sensibles.

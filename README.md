# ChatBot Financiero Banorte

> Asistente financiero inteligente que analiza transacciones bancarias usando IA local con Ollama

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Tkinter](https://img.shields.io/badge/GUI-Tkinter-green.svg)](https://docs.python.org/3/library/tkinter.html)
[![Ollama](https://img.shields.io/badge/IA-Ollama-orange.svg)](https://ollama.ai/)

## 📋 Tabla de Contenidos

- [¿Qué hace este proyecto?](#-qué-hace-este-proyecto)
- [¿Por qué es útil?](#-por-qué-es-útil)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Cómo Empezar](#-cómo-empezar)
- [Uso del Sistema](#-uso-del-sistema)
- [Soporte y Ayuda](#-soporte-y-ayuda)
- [Equipo](#-equipo)

## ¿Qué hace este proyecto?

Este proyecto es un **chatbot financiero inteligente** que permite a los usuarios:

- **Consultar** información sobre sus transacciones bancarias de forma conversacional
- **Analizar** patrones de gastos e ingresos usando inteligencia artificial
- **Obtener insights** financieros personalizados basados en su historial
- **Interactuar** con un asistente virtual que entiende preguntas en lenguaje natural

El sistema utiliza **Ollama** (IA local) para procesar consultas y proporcionar respuestas contextualizadas sobre datos financieros almacenados en formato JSON.

## 💡 ¿Por qué es útil?

### Problema que resuelve

Muchas personas tienen dificultades para:
- Entender sus patrones de gasto
- Analizar grandes cantidades de transacciones bancarias
- Obtener respuestas rápidas sobre su situación financiera
- Acceder a análisis financieros sin compartir datos sensibles en la nube

### Solución

Este chatbot ofrece:
- ✅ **Análisis local**: Tus datos financieros nunca salen de tu computadora
- ✅ **IA conversacional**: Pregunta en lenguaje natural, no necesitas saber programación
- ✅ **Respuestas instantáneas**: Obtén análisis financieros en segundos
- ✅ **Privacidad total**: Sin necesidad de conexión a internet para el análisis
- ✅ **Interfaz amigable**: GUI simple y fácil de usar

### Beneficios

- **Para usuarios finales**: Control total sobre sus datos financieros con análisis inteligente
- **Para empresas**: Sistema de análisis financiero que puede desplegarse localmente
- **Para desarrolladores**: Base extensible para agregar más funcionalidades de IA financiera

## ✨ Características Principales

### Sistema de Autenticación
- Login por ID de usuario
- Modo de prueba sin autenticación****
- Gestión de múltiples usuarios****

### Análisis Financiero
- **Resumen financiero completo**: Ingresos, gastos y balance neto
- **Gastos por categoría**: Desglose detallado de gastos
- **Comparación ingresos vs gastos**: Análisis de proporción y tendencias
- **Transacciones recientes**: Historial ordenado cronológicamente
- **Análisis categorico**:
- **Tendencias**:

### Chat con IA
- Consultas en lenguaje natural usando Ollama
- Respuestas contextualizadas basadas en datos del usuario
- Historial de conversación persistente
- Indicador visual de "escribiendo..."

### Interfaz de Usuario
- GUI moderna con Tkinter
- Diseño responsivo y fácil de usar
- Área de chat con scroll
- Botones de acceso rápido para funciones comunes

## 🏗️ Arquitectura del Sistema *****

```
┌─────────────────────────────────────────┐
│         Interfaz de Usuario             │
│            (Tkinter GUI)                │
│  ┌──────────┐      ┌─────────────┐    │
│  │  Login   │      │  Chat Area  │    │
│  └──────────┘      └─────────────┘    │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│       Lógica de Aplicación              │
│      (ChatBotApp Class)                 │
│  ┌──────────────┐  ┌──────────────┐   │
│  │ Autenticación│  │  Procesador  │   │
│  │              │  │  de Mensajes │   │
│  └──────────────┘  └──────────────┘   │
└────────┬───────────────┬────────────────┘
         │               │
         ▼               ▼
┌────────────────┐  ┌─────────────────┐
│  Datos JSON    │  │  API Ollama     │
│  (Base1.json)  │  │  (localhost)    │
│                │  │                 │
│ - id_usuario   │  │ - Modelo: Llama2│
│ - transacciones│  │ - Puerto: 11434 │
│ - categorías   │  │ - Stream: false │
└────────────────┘  └─────────────────┘
```

### Componentes del Sistema

#### Frontend (Tkinter)
- **LoginInterface**: Pantalla de autenticación
- **ChatInterface**: Interfaz principal de chat
- **MessageDisplay**: Área de visualización de mensajes
- **ControlPanel**: Botones de acciones rápidas

#### Backend (Python)
- **AuthenticationManager**: Gestión de usuarios y sesiones
- **DataProcessor**: Análisis de transacciones financieras
- **MessageHandler**: Procesamiento de mensajes con threading*******
- **OllamaConnector**: Comunicación con API de Ollama

#### Datos
- **Base1.json**: Almacenamiento de transacciones con estructura:
  ```json
  {
    "id_usuario": 123,
    "fecha": "MM/DD/YYYY",
    "tipo": "ingreso|gasto",
    "monto": 1000.00,
    "categoria": "categoria",
    "descripcion": "descripción"
  }
  ```

## 📦 Requisitos Previos *****

### Software Necesario ******

1. **Python 3.8 o superior**
   - Descarga: [python.org](https://www.python.org/downloads/)
   - Verifica instalación: `python --version`

2. **Ollama**
   - Descarga: [ollama.ai](https://ollama.ai/)
   - Sistema de IA local para procesamiento de lenguaje natural

3. **Bibliotecas Python**
   - tkinter (incluido con Python)
   - requests
   - json (incluido con Python)
   - threading (incluido con Python)
   - datetime (incluido con Python)

### Datos Requeridos ***************

- Archivo `Base1.json` con datos de transacciones financieras

## 🚀 Instalación y Configuración

### Paso 1: Clonar o Descargar el Proyecto

```bash
# Si tienes el repositorio en GitHub
git clone https://github.com/tu-usuario/chatbot-financiero.git
cd chatbot-financiero

# O simplemente descarga los archivos del proyecto
```

### Paso 2: Instalar Dependencias

```bash
# Instalar requests (única dependencia externa)
pip install requests
```

### Paso 3: Instalar y Configurar Ollama

```bash
# Descargar e instalar Ollama desde ollama.ai

# Descargar el modelo Llama2
ollama pull llama2

# Verificar que Ollama está funcionando
ollama list
```

### Paso 4: Preparar Datos

Asegúrate de tener un archivo `Base1.json` en el directorio del proyecto con el siguiente formato:

```json
[
  {
    "id_usuario": 1,
    "fecha": "01/15/2024",
    "tipo": "ingreso",
    "monto": 5000.00,
    "categoria": "Salario",
    "descripcion": "Pago mensual"
  },
  {
    "id_usuario": 1,
    "fecha": "01/16/2024",
    "tipo": "gasto",
    "monto": 150.00,
    "categoria": "Alimentación",
    "descripcion": "Supermercado"
  }
]
```

### Paso 5: Ejecutar Ollama

```bash
# Iniciar el servidor de Ollama (en una terminal separada)
ollama serve
```

El servidor estará disponible en `http://localhost:11434`

## ▶️ Cómo Empezar

### Ejecución del Programa

1. **Iniciar Ollama** (si no está corriendo):
   ```bash
   ollama serve
   ```

2. **Ejecutar la aplicación**:
   ```bash
   python chatbot_app.py
   ```

3. **Usar la aplicación**:
   - Se abrirá la ventana de login
   - Ingresa un ID de usuario disponible en `Base1.json`
   - O haz clic en "Probar sin iniciar sesión" para modo demo

### Primera Interacción

1. **Login**: Ingresa tu ID de usuario (ejemplo: `1`, `2`, `3`)
2. **Explorar**: Usa los botones de acceso rápido para ver análisis predefinidos
3. **Preguntar**: Escribe preguntas en lenguaje natural como:
   - "¿Cuánto gasté en total este mes?"
   - "¿Cuáles son mis categorías de gasto más grandes?"
   - "Muéstrame un resumen de mis finanzas"
   - "¿Tengo más ingresos o gastos?"

## 📖 Uso del Sistema

### Funcionalidades Disponibles

#### 1. Botones de Acceso Rápido *************

| Botón | Descripción |
|-------|-------------|
| **Resumen financiero** | Muestra ingresos totales, gastos totales, balance neto |
| **Gastos por categoría** | Desglose de gastos agrupados por categoría |
| **Ingresos vs Gastos** | Comparación y proporción entre ingresos y gastos |
| **Transacciones recientes** | Últimas 5 transacciones ordenadas por fecha |
| **Limpiar chat** | Reinicia el historial de conversación |

#### 2. Chat con IA

Escribe preguntas en lenguaje natural y la IA responderá analizando tus datos:

**Ejemplos de consultas:**
```
- ¿Cuál es mi gasto promedio mensual?
- ¿En qué categoría gasto más dinero?
- Dame consejos para ahorrar basado en mis gastos
- ¿Cuál fue mi transacción más grande?
- Analiza mis patrones de gasto
```

#### 3. Análisis Personalizado

El sistema adapta sus respuestas según:
- El usuario autenticado
- El contexto de la conversación
- Los datos históricos disponibles

### Ejemplos de Uso

**Caso 1: Análisis Rápido**
```
1. Clic en "Resumen financiero"
2. Revisar balance neto
3. Si hay déficit, clic en "Gastos por categoría" para identificar áreas
```

**Caso 2: Consulta Específica**
```
1. Escribir: "¿Cuánto gasté en entretenimiento?"
2. La IA analiza los datos y responde con el total
3. Hacer seguimiento: "¿Es más que el mes pasado?"
```

**Caso 3: Planificación**
```
1. Preguntar: "¿Cuál es mi capacidad de ahorro?"
2. La IA calcula ingresos - gastos
3. Solicitar: "Dame recomendaciones para aumentar mis ahorros"
```

## 🆘 Soporte y Ayuda *************

### Problemas Comunes

#### 1. Error: "No se encontró el archivo Base1.json"
**Solución**: Asegúrate de que `Base1.json` está en el mismo directorio que el script

#### 2. Error: "Error de conexión con Ollama"
**Soluciones**:
- Verifica que Ollama esté corriendo: `ollama serve`
- Confirma que el puerto 11434 esté disponible
- Revisa que el modelo esté instalado: `ollama list`

#### 3. La IA no responde o tarda mucho
**Soluciones**:
- Espera unos segundos, el modelo puede tardar en procesar
- Reinicia Ollama
- Prueba con un modelo más liviano: cambia `llama2` por `tinyllama` en el código

#### 4. No aparecen usuarios en el login
**Solución**: Verifica que `Base1.json` tenga datos válidos y el campo `id_usuario` exista

### Configuración Avanzada

#### Cambiar el Modelo de IA *****************

En el archivo Python, línea ~174, modifica:
```python
payload = {
    "model": "llama2",  # Cambia a: "mistral", "tinyllama", etc.
    "prompt": prompt,
    "stream": False
}
```

Modelos disponibles:
- `llama2`: Balanceado (recomendado)
- `mistral`: Más rápido, bueno para análisis
- `tinyllama`: Muy rápido, menos preciso
- `codellama`: Mejor para queries técnicas

#### Ajustar Timeout de Conexión

Línea ~178:
```python
response = requests.post(self.ollama_url, json=payload, timeout=30)
# Aumenta timeout si tu sistema es lento: timeout=60
```

### Obtener Ayuda ***************

Si tienes problemas:

1. **Revisa la documentación**: Lee este README completo
2. **Consulta logs**: Los errores aparecen en la terminal donde ejecutaste el programa
3. **Documentación de Ollama**: [docs.ollama.ai](https://docs.ollama.ai)
4. **Issues del proyecto**: Abre un issue en GitHub con:
   - Descripción del problema
   - Mensaje de error completo
   - Versión de Python y Ollama
   - Sistema operativo

### Recursos Útiles *******************************

- [Documentación de Tkinter](https://docs.python.org/3/library/tkinter.html)
- [Guía de Ollama](https://ollama.ai/docs)
- [Python Requests](https://requests.readthedocs.io/)

## 👥 Equipo **********************

### Desarrolladores

- **[Tu Nombre]** - Desarrollador Principal - [GitHub](https://github.com/tu-usuario)
- **[Nombre 2]** - Diseño de UI/UX - [GitHub](https://github.com/usuario2)
- **[Nombre 3]** - Integración de IA - [GitHub](https://github.com/usuario3)

### Contribuciones ********************

Este proyecto fue creado para [Nombre del Hackathon] - [Fecha]

### Contacto *******************

- **Email**: equipo@proyecto.com
- **Discord**: [Servidor del proyecto]
- **GitHub**: [Repositorio del proyecto]

## 📝 Licencia *******************

Este proyecto fue desarrollado con fines educativos para el hackathon [Nombre].

## 🎉 Agradecimientos ******************************

- Anthropic por proporcionar inspiración en chatbots conversacionales
- Comunidad de Ollama por el excelente soporte de IA local
- [Nombre

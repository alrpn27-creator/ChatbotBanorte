# servidor_mcp_banorte.py
import asyncio
import json
import aiohttp
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import random

class ServidorMCPBanorte:
    def __init__(self):
        self.session = None
        self.ollama_url = "http://localhost:11434/api/generate"
        self.datos_usuario = {}
        
    async def inicializar(self):
        self.session = aiohttp.ClientSession()
        # Inicializar datos de ejemplo para el hackathon
        self._inicializar_datos_ejemplo()
    
    def _inicializar_datos_ejemplo(self):
        """Datos de ejemplo para demostración durante el hackathon"""
        self.datos_usuario = {
            "saldo_actual": 15420.75,
            "ingresos_mensuales": 25000.00,
            "gastos": {
                "vivienda": 8000.00,
                "alimentacion": 3500.00,
                "transporte": 1500.00,
                "entretenimiento": 1200.00,
                "servicios": 800.00,
                "otros": 1000.00
            },
            "metas": {
                "ahorro_emergencia": 50000.00,
                "vacaciones": 20000.00,
                "inversion": 100000.00
            },
            "historial_transacciones": [
                {"fecha": "2024-10-01", "descripcion": "Depósito nómina", "monto": 25000.00, "tipo": "ingreso"},
                {"fecha": "2024-10-02", "descripcion": "Renta departamento", "monto": -8000.00, "tipo": "gasto"},
                {"fecha": "2024-10-03", "descripcion": "Supermercado", "monto": -1500.00, "tipo": "gasto"},
                {"fecha": "2024-10-05", "descripcion": "Gasolina", "monto": -800.00, "tipo": "gasto"},
                {"fecha": "2024-10-07", "descripcion": "Restaurante", "monto": -450.00, "tipo": "gasto"},
            ]
        }
    
    async def consultar_gemma3(self, prompt: str, contexto: str = "") -> str:
        """Consulta el modelo Gemma 3 via Ollama con contexto financiero"""
        try:
            prompt_completo = f"""
            Eres un asistente financiero experto de Banorte. Analiza la siguiente situación y responde de manera útil y profesional.

            CONTEXTO FINANCIERO DEL USUARIO:
            {contexto}

            PREGUNTA DEL USUARIO:
            {prompt}

            Responde en español, sé claro y proporciona recomendaciones accionables.
            """
            
            data = {
                "model": "gemma3:4b",
                "prompt": prompt_completo,
                "stream": False,
                "options": {
                    "temperature": 0.3,
                    "top_p": 0.9
                }
            }
            
            async with self.session.post(self.ollama_url, json=data) as response:
                if response.status == 200:
                    result = await response.json()
                    return result.get("response", "Lo siento, no pude procesar tu consulta.")
                else:
                    return f"Error en la consulta a Ollama: {response.status}"
                    
        except Exception as e:
            return f"Error: {str(e)}"
    
    # HERRAMIENTAS MCP PARA EL ASISTENTE FINANCIERO
    
    async def herramienta_consultar_saldo(self) -> str:
        """Consulta el saldo actual del usuario"""
        saldo = self.datos_usuario.get("saldo_actual", 0)
        return f"Saldo actual: ${saldo:,.2f} MXN"
    
    async def herramienta_analizar_gastos(self, categoria: Optional[str] = None) -> str:
        """Analiza los gastos por categoría"""
        gastos = self.datos_usuario.get("gastos", {})
        ingresos = self.datos_usuario.get("ingresos_mensuales", 1)
        
        if categoria and categoria in gastos:
            porcentaje = (gastos[categoria] / ingresos) * 100
            return f"Gasto en {categoria}: ${gastos[categoria]:,.2f} ({porcentaje:.1f}% de ingresos)"
        
        # Análisis completo
        total_gastos = sum(gastos.values())
        ahorro = ingresos - total_gastos
        tasa_ahorro = (ahorro / ingresos) * 100
        
        analisis = f"Análisis de Gastos Mensuales:\n"
        analisis += f"Ingresos: ${ingresos:,.2f}\n"
        analisis += f"Total Gastos: ${total_gastos:,.2f}\n"
        analisis += f"Ahorro: ${ahorro:,.2f} ({tasa_ahorro:.1f}%)\n\n"
        analisis += "Desglose por Categoría:\n"
        
        for cat, monto in gastos.items():
            porcentaje = (monto / ingresos) * 100
            analisis += f"- {cat}: ${monto:,.2f} ({porcentaje:.1f}%)\n"
        
        return analisis
    
    async def herramienta_simular_escenario(self, 
                                          aumento_ingresos: float = 0,
                                          reduccion_gastos: float = 0,
                                          meses: int = 12) -> str:
        """Simula escenarios financieros futuros"""
        ingresos_actual = self.datos_usuario.get("ingresos_mensuales", 25000)
        gastos_actual = sum(self.datos_usuario.get("gastos", {}).values())
        
        # Proyecciones
        nuevos_ingresos = ingresos_actual * (1 + aumento_ingresos/100)
        nuevos_gastos = gastos_actual * (1 - reduccion_gastos/100)
        
        ahorro_mensual = nuevos_ingresos - nuevos_gastos
        ahorro_total = ahorro_mensual * meses
        
        escenario = f"📊 Simulación de Escenario ({meses} meses):\n\n"
        escenario += f"Ingresos mensuales: ${nuevos_ingresos:,.2f} "
        if aumento_ingresos > 0:
            escenario += f"(+{aumento_ingresos}%)\n"
        else:
            escenario += "\n"
            
        escenario += f"Gastos mensuales: ${nuevos_gastos:,.2f} "
        if reduccion_gastos > 0:
            escenario += f"(-{reduccion_gastos}%)\n"
        else:
            escenario += "\n"
            
        escenario += f"Ahorro mensual: ${ahorro_mensual:,.2f}\n"
        escenario += f"Ahorro total proyectado: ${ahorro_total:,.2f}\n\n"
        
        # Análisis de impacto en metas
        metas = self.datos_usuario.get("metas", {})
        if ahorro_mensual > 0:
            for meta, monto in metas.items():
                meses_meta = monto / ahorro_mensual
                escenario += f"• {meta.replace('_', ' ').title()}: {meses_meta:.1f} meses\n"
        
        return escenario
    
    async def herramienta_proyectar_flujo(self, meses: int = 6) -> str:
        """Proyecta el flujo de caja futuro"""
        saldo_actual = self.datos_usuario.get("saldo_actual", 0)
        ahorro_mensual = (self.datos_usuario.get("ingresos_mensuales", 0) - 
                         sum(self.datos_usuario.get("gastos", {}).values()))
        
        proyeccion = f"📈 Proyección de Flujo ({meses} meses):\n\n"
        proyeccion += f"Saldo actual: ${saldo_actual:,.2f}\n"
        proyeccion += f"Ahorro mensual estimado: ${ahorro_mensual:,.2f}\n\n"
        
        saldo_proyectado = saldo_actual
        for mes in range(1, meses + 1):
            saldo_proyectado += ahorro_mensual
            proyeccion += f"Mes {mes}: ${saldo_proyectado:,.2f}\n"
        
        return proyeccion
    
    async def herramienta_comparar_presupuesto(self) -> str:
        """Compara gastos reales vs presupuesto ideal"""
        gastos_actuales = self.datos_usuario.get("gastos", {})
        ingresos = self.datos_usuario.get("ingresos_mensuales", 1)
        
        # Presupuesto ideal (porcentajes recomendados)
        presupuesto_ideal = {
            "vivienda": 0.30,      # 30%
            "alimentacion": 0.15,  # 15%
            "transporte": 0.10,    # 10%
            "servicios": 0.05,     # 5%
            "entretenimiento": 0.10, # 10%
            "otros": 0.10,         # 10%
            "ahorro": 0.20         # 20%
        }
        
        comparacion = "📋 Comparación vs Presupuesto Ideal:\n\n"
        
        for categoria, porcentaje_ideal in presupuesto_ideal.items():
            if categoria == "ahorro":
                continue  # Lo manejamos aparte
                
            gasto_actual = gastos_actuales.get(categoria, 0)
            porcentaje_actual = (gasto_actual / ingresos) * 100
            porcentaje_ideal_pct = porcentaje_ideal * 100
            
            estado = "✅ DENTRO" if porcentaje_actual <= porcentaje_ideal_pct else "⚠️  SOBRE"
            comparacion += f"{categoria.title()}:\n"
            comparacion += f"  Actual: {porcentaje_actual:.1f}% vs Ideal: {porcentaje_ideal_pct:.1f}% {estado}\n"
        
        # Análisis de ahorro
        total_gastos = sum(gastos_actuales.values())
        ahorro_actual = ingresos - total_gastos
        porcentaje_ahorro_actual = (ahorro_actual / ingresos) * 100
        
        comparacion += f"\nAhorro:\n"
        comparacion += f"  Actual: {porcentaje_ahorro_actual:.1f}% vs Ideal: 20.0% "
        comparacion += "✅" if porcentaje_ahorro_actual >= 20 else "⚠️"
        
        return comparacion
    
    async def herramienta_generar_recomendacion(self, consulta: str) -> str:
        """Genera recomendaciones personalizadas usando Gemma 3"""
        # Preparar contexto financiero
        contexto = f"""
        Situación Financiera Actual:
        - Saldo: ${self.datos_usuario.get('saldo_actual', 0):,.2f}
        - Ingresos mensuales: ${self.datos_usuario.get('ingresos_mensuales', 0):,.2f}
        - Gastos mensuales: ${sum(self.datos_usuario.get('gastos', {}).values()):,.2f}
        - Ahorro mensual: ${self.datos_usuario.get('ingresos_mensuales', 0) - sum(self.datos_usuario.get('gastos', {}).values()):,.2f}
        
        Metas:
        {json.dumps(self.datos_usuario.get('metas', {}), indent=2)}
        """
        
        recomendacion = await self.consultar_gemma3(consulta, contexto)
        return recomendacion
    
    async def herramienta_ultimas_transacciones(self, cantidad: int = 5) -> str:
        """Muestra las últimas transacciones"""
        transacciones = self.datos_usuario.get("historial_transacciones", [])
        ultimas = transacciones[-cantidad:] if transacciones else []
        
        if not ultimas:
            return "No hay transacciones recientes."
        
        reporte = "💳 Últimas Transacciones:\n\n"
        for trans in ultimas:
            icono = "📥" if trans["tipo"] == "ingreso" else "📤"
            reporte += f"{icono} {trans['fecha']}: {trans['descripcion']}\n"
            reporte += f"   ${trans['monto']:,.2f}\n\n"
        
        return reporte

# Configuración e inicialización del servidor MCP
async def main():
    servidor = ServidorMCPBanorte()
    await servidor.inicializar()
    
    print("🚀 Servidor MCP Financiero Banorte Iniciado")
    print("📍 Herramientas disponibles:")
    print("1. consultar_saldo()")
    print("2. analizar_gastos([categoria])")
    print("3. simular_escenario(aumento_ingresos, reduccion_gastos, meses)")
    print("4. proyectar_flujo(meses)")
    print("5. comparar_presupuesto()")
    print("6. generar_recomendacion(consulta)")
    print("7. ultimas_transacciones(cantidad)")
    
    # Mantener el servidor corriendo
    while True:
        await asyncio.sleep(3600)  # Mantener activo

if __name__ == "__main__":
    asyncio.run(main())
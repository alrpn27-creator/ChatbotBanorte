import { useState } from "react";
import {
  Send,
  TrendingUp,
  DollarSign,
  AlertCircle,
  BarChart3,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const ChatInterface = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu CFO Virtual de Banorte. Estoy aquí para ayudarte a tomar mejores decisiones financieras. ¿En qué puedo asistirte hoy?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const metrics = [
    {
      icon: DollarSign,
      label: "Liquidez",
      value: "$450,000",
      status: "good",
      change: "+12%",
    },
    {
      icon: TrendingUp,
      label: "Flujo",
      value: "Positivo",
      status: "good",
      change: "+8%",
    },
    {
      icon: BarChart3,
      label: "Gastos",
      value: "$180,000",
      status: "warning",
      change: "+5%",
    },
    {
      icon: AlertCircle,
      label: "Salud",
      value: "Buena",
      status: "good",
      change: "95%",
    },
  ];

  const suggestions = [
    "¿Puedo contratar personal nuevo?",
    "Analiza mis gastos del último mes",
    "¿Cuál es mi ratio de liquidez?",
    "Proyecta mi flujo para el próximo trimestre",
  ];

  const handleSubmit = () => {
    if (input.trim() && !loading) {
      const userMessage = input;
      setMessages([...messages, { role: "user", content: userMessage }]);
      setInput("");
      setLoading(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Basado en tu situación financiera actual:\n\n• Liquidez disponible: $450,000 MXN\n• Gastos mensuales promedio: $180,000 MXN\n• Ratio de liquidez: 2.5 (saludable)\n\n✅ Recomendación: Tienes capacidad financiera para proceder. Te sugiero mantener una reserva de emergencia de al menos 3 meses.",
          },
        ]);
        setLoading(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">CFO Virtual</h2>
                  <p className="text-xs text-gray-500">Banorte AI</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-3 overflow-y-auto flex-1">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Estado Financiero
            </h3>
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      metric.status === "good"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    <metric.icon
                      className={
                        metric.status === "good"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                      size={18}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      metric.change.startsWith("+")
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                <p className="text-lg font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-200">
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
              Nuevo Análisis
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  Asistente Financiero Inteligente
                </h1>
                <p className="text-sm text-gray-500">Powered by Banorte AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">
                  En línea
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] ${
                  msg.role === "user" ? "order-2" : "order-1"
                }`}
              >
                <div
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-gray-600 to-gray-700"
                        : "bg-gradient-to-br from-red-600 to-red-700"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <span className="text-white font-semibold text-sm">
                        TÚ
                      </span>
                    ) : (
                      <Sparkles className="text-white" size={18} />
                    )}
                  </div>

                  <div
                    className={`rounded-2xl px-5 py-3 shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-red-600 to-red-700 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p
                      className={`whitespace-pre-wrap leading-relaxed ${
                        msg.role === "user" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <Sparkles className="text-white" size={18} />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && !loading && (
          <div className="px-6 pb-4">
            <p className="text-sm text-gray-600 mb-3 font-medium">
              Preguntas sugeridas:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(suggestion)}
                  className="text-left p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-red-300 transition-all text-sm text-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white border-t border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Pregunta sobre tus finanzas, proyecciones o recomendaciones..."
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none shadow-sm"
                  rows="1"
                  disabled={loading}
                  style={{ minHeight: "56px", maxHeight: "120px" }}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
              >
                <Send size={24} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Presiona Enter para enviar • Shift + Enter para nueva línea
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

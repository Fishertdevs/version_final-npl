"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { NLPProcessor } from "@/lib/nlp-processor"
import { loadFile } from "@/lib/file-utils"

// 10 preguntas predefinidas para la tienda deportiva
const predefinedQuestions = [
  "¿Cuánto cuestan los tenis de running?",
  "¿Qué productos de Nike tienen disponibles?",
  "¿Tienen balones de fútbol en stock?",
  "¿Cuál es el precio de la raqueta de tenis?",
  "¿Qué marcas de ropa deportiva manejan?",
  "¿Cuántas bicicletas de montaña tienen disponibles?",
  "¿Los guantes de boxeo son de cuero genuino?",
  "¿Hacen entregas a domicilio?",
  "¿Qué garantía ofrecen en los productos?",
  "¿Dónde están ubicadas las sucursales?",
]

export function SimpleNLPInterface() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<any>(null)
  const [processor, setProcessor] = useState<NLPProcessor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Estados para controlar qué análisis mostrar
  const [showTokenizations, setShowTokenizations] = useState(false)
  const [showParseTree, setShowParseTree] = useState(false)

  // Estados para controlar la secuencia de ejecución
  const [lexicalExecuted, setLexicalExecuted] = useState(false)
  const [syntacticExecuted, setSyntacticExecuted] = useState(false)
  const [responseExecuted, setResponseExecuted] = useState(false)

  // Estados para los textos de análisis
  const [lexicalAnalysisText, setLexicalAnalysisText] = useState("")
  const [syntacticAnalysisText, setSyntacticAnalysisText] = useState("")
  const [responseText, setResponseText] = useState("")

  useEffect(() => {
    async function initializeProcessor() {
      try {
        setIsLoading(true)

        // Load all required files
        const tokensContent = await loadFile("tokens_ext.txt")
        const stopwordsContent = await loadFile("stopwords.txt")
        const grammarContent = await loadFile("tabla_ropa.txt")
        const productsContent = await loadFile("datos_productos.txt")

        // Initialize processor
        const nlpProcessor = new NLPProcessor()
        await nlpProcessor.initialize(tokensContent, stopwordsContent, grammarContent, productsContent)

        setProcessor(nlpProcessor)
        setIsLoading(false)
      } catch (err) {
        console.error("Error initializing NLP processor:", err)
        setError("Error al cargar los archivos necesarios.")
        setIsLoading(false)
      }
    }

    initializeProcessor()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)

    // Procesar automáticamente cuando hay texto
    if (processor && newQuery.trim()) {
      const analysisResult = processor.processQuery(newQuery)
      setResult(analysisResult)

      // Reset all displays and execution states
      setShowTokenizations(false)
      setShowParseTree(false)
      setLexicalExecuted(false)
      setSyntacticExecuted(false)
      setResponseExecuted(false)
      setLexicalAnalysisText("")
      setSyntacticAnalysisText("")
      setResponseText("")
    } else {
      setResult(null)
      setShowTokenizations(false)
      setShowParseTree(false)
      setLexicalExecuted(false)
      setSyntacticExecuted(false)
      setResponseExecuted(false)
      setLexicalAnalysisText("")
      setSyntacticAnalysisText("")
      setResponseText("")
    }
  }

  const handlePredefinedQuestion = (question: string) => {
    setQuery(question)
    if (processor) {
      const analysisResult = processor.processQuery(question)
      setResult(analysisResult)

      // Reset all displays and execution states
      setShowTokenizations(false)
      setShowParseTree(false)
      setLexicalExecuted(false)
      setSyntacticExecuted(false)
      setResponseExecuted(false)
      setLexicalAnalysisText("")
      setSyntacticAnalysisText("")
      setResponseText("")
    }
  }

  const handleLexicalAnalysis = () => {
    if (result) {
      // SOLO ejecutar las tokenizaciones 1, 2, 3
      setShowTokenizations(true)
      setLexicalExecuted(true)

      // Generar análisis léxico simplificado para el cuadro de texto
      const tokens = result.tokens
      const categories = tokens.map((t: any) => t.category)
      const hasUnknown =
        categories.includes("sustantivo") &&
        tokens.some(
          (t: any) => !["verbo", "articulo", "interrogativo", "producto", "marca", "adjetivo"].includes(t.category),
        )

      let lexicalText = ""
      const uniqueCategories = [...new Set(categories.filter((c: string) => c !== "puntuacion"))]

      lexicalText = uniqueCategories.join(" ") + (hasUnknown ? " No reconocido" : "")

      setLexicalAnalysisText(lexicalText)
    }
  }

  const handleSyntacticAnalysis = () => {
    if (result && lexicalExecuted) {
      // Ejecutar el árbol de análisis y el resultado del análisis sintáctico
      setShowParseTree(true)
      setSyntacticExecuted(true)

      // Generar análisis sintáctico simplificado para el cuadro de texto
      const isValid = result.isValid
      let syntacticText = ""

      if (isValid) {
        syntacticText = "✓ Cadena aceptada"
      } else {
        syntacticText = "✗ Cadena rechazada"
      }

      setSyntacticAnalysisText(syntacticText)
    }
  }

  const handleShowResponse = () => {
    if (result && lexicalExecuted && syntacticExecuted) {
      // SOLO ejecutar la respuesta
      setResponseExecuted(true)
      setResponseText(result.response || "")
    }
  }

  return (
    <div className="bg-green-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-900 mb-4">BIENVENIDO TIENDA DEPORTIVA</h1>
        </div>

        {/* Preguntas predefinidas */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-green-800 mb-3">Preguntas frecuentes:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {predefinedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handlePredefinedQuestion(question)}
                className="text-left p-2 bg-green-200 hover:bg-green-300 rounded text-sm border border-green-300 transition-colors"
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="query" className="block text-sm font-medium mb-1 text-green-800">
                Realiza tu pregunta:
              </label>
              <input
                id="query"
                type="text"
                value={query}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Escribe tu pregunta aquí..."
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">Análisis Léxico</label>
              <button
                onClick={handleLexicalAnalysis}
                className={`mb-2 px-4 py-2 text-white rounded transition-colors ${
                  result && !lexicalExecuted ? "bg-red-500 hover:bg-red-600" : "bg-red-300"
                }`}
                disabled={!result || lexicalExecuted}
              >
                Ejecutar Análisis Léxico
              </button>
              <textarea
                value={lexicalAnalysisText}
                readOnly
                className="w-full p-2 border border-gray-300 rounded bg-white min-h-[80px] resize-none"
                placeholder="Resultado del análisis léxico aparecerá aquí..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">Análisis Sintáctico</label>
              <button
                onClick={handleSyntacticAnalysis}
                className={`mb-2 px-4 py-2 text-white rounded transition-colors ${
                  result && lexicalExecuted && !syntacticExecuted
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-orange-300"
                }`}
                disabled={!result || !lexicalExecuted || syntacticExecuted}
              >
                Ejecutar Análisis Sintáctico
              </button>
              <textarea
                value={syntacticAnalysisText}
                readOnly
                className="w-full p-2 border border-gray-300 rounded bg-white min-h-[80px] resize-none"
                placeholder="Resultado del análisis sintáctico aparecerá aquí..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-green-800">Respuesta</label>
              <button
                onClick={handleShowResponse}
                className={`mb-2 px-4 py-2 text-white rounded transition-colors ${
                  result && lexicalExecuted && syntacticExecuted && !responseExecuted
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-yellow-300"
                }`}
                disabled={!result || !lexicalExecuted || !syntacticExecuted || responseExecuted}
              >
                Generar Respuesta
              </button>
              <textarea
                value={responseText}
                readOnly
                className="w-full p-2 border border-gray-300 rounded bg-white min-h-[120px] resize-none"
                placeholder="La respuesta aparecerá aquí..."
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium mb-1 text-green-800">Tokenización 1</h2>
              <textarea
                value={showTokenizations ? result?.tokenization1 || "" : ""}
                readOnly
                className="w-full p-2 border border-gray-300 rounded bg-white min-h-[80px] resize-none"
                placeholder="Tokenización 1 aparecerá aquí..."
              />
            </div>

            <div>
              <h2 className="text-sm font-medium mb-1 text-green-800">Tokenización 2</h2>
              <textarea
                value={showTokenizations ? result?.tokenization2 || "" : ""}
                readOnly
                className="w-full p-2 border border-gray-300 rounded bg-white min-h-[80px] resize-none"
                placeholder="Tokenización 2 aparecerá aquí..."
              />
            </div>

            <div>
              <h2 className="text-sm font-medium mb-1 text-green-800">Tokenización 3</h2>
              <textarea
                value={showTokenizations ? result?.tokenization3 || "" : ""}
                readOnly
                className="w-full p-2 border border-gray-300 rounded bg-white min-h-[80px] resize-none"
                placeholder="Tokenización 3 aparecerá aquí..."
              />
            </div>

            <div>
              <h2 className="text-sm font-medium mb-1 text-green-800">Resultado gramatical</h2>
              <textarea
                value={showParseTree ? result?.parseTree || "" : ""}
                readOnly
                className="w-full p-2 border border-gray-300 rounded bg-white min-h-[120px] resize-none font-mono text-xs"
                placeholder="El resultado gramatical aparecerá aquí..."
              />
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        {/* Loading message */}
        {isLoading && (
          <div className="mt-4 p-3 bg-green-200 border border-green-400 text-green-700 rounded text-center">
            Cargando sistema de procesamiento de lenguaje natural...
          </div>
        )}
      </div>
    </div>
  )
}

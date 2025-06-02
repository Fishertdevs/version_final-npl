// Utility functions for file operations

export async function loadFile(fileName: string): Promise<string> {
  try {
    const response = await fetch(`/${fileName}`)
    if (!response.ok) {
      throw new Error(`Error loading file ${fileName}: ${response.statusText}`)
    }
    return await response.text()
  } catch (error) {
    console.error(`Error loading file ${fileName}:`, error)
    return ""
  }
}

export function parseProductsFile(content: string): Record<string, any> {
  const products: Record<string, any> = {}
  let currentProduct = ""

  const lines = content.split("\n")

  for (const line of lines) {
    if (line.trim() === "" || (line.startsWith("#") && !line.startsWith("##"))) {
      continue
    }

    if (line.startsWith("#")) {
      currentProduct = line.substring(1).trim()
      products[currentProduct] = {}
    } else if (currentProduct && line.includes(":")) {
      const [key, value] = line.split(":").map((part) => part.trim())
      if (key && value) {
        products[currentProduct][key] = value
      }
    }
  }

  return products
}

export function parseTokensFile(content: string): Record<string, { type: string; category: string }> {
  const tokens: Record<string, { type: string; category: string }> = {}

  const lines = content.split("\n")

  for (const line of lines) {
    const parts = line.trim().split(/\s+/)
    if (parts.length >= 3) {
      const [word, type, category] = parts
      tokens[word] = { type, category }
    }
  }

  return tokens
}

export function parseStopwordsFile(content: string): string[] {
  const stopwords: string[] = []

  const lines = content.split("\n")

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (trimmedLine && !trimmedLine.startsWith("#")) {
      stopwords.push(trimmedLine)
    }
  }

  return stopwords
}

export function parseGrammarRules(content: string): Record<string, Record<string, string[]>> {
  const rules: Record<string, Record<string, string[]>> = {}

  const lines = content.split("\n")

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine) continue

    const parts = trimmedLine.split("->")
    if (parts.length !== 2) continue

    const leftSide = parts[0].trim()
    const rightSide = parts[1].trim()

    const [nonTerminal, terminal] = leftSide.split(",").map((part) => part.trim())

    if (!rules[nonTerminal]) {
      rules[nonTerminal] = {}
    }

    rules[nonTerminal][terminal] = rightSide.split(/\s+/)
  }

  return rules
}

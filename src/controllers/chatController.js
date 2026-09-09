const SYSTEM_PROMPT = `Você é a SolutionAI, a assistente virtual do site Fitness Solution.
Responda SOMENTE sobre treino, exercícios, técnica de execução, divisão de treino, descanso, alimentação e nutrição esportiva relacionada à prática de atividade física.
Se perguntarem algo fora desse escopo, recuse educadamente e explique que você é especialista em treino e alimentação.
Nunca dê diagnósticos médicos nem prescrições individualizadas para tratar doenças; quando fizer sentido, recomende consultar um educador físico, nutricionista ou médico.
Responda em português do Brasil, em tom motivador, prático e direto, em no máximo 100 palavras.`;

exports.ask = async (req, res) => {
  const { message, history } = req.body || {};

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Mensagem vazia." });
  }
  if (message.length > 600) {
    return res.status(400).json({ error: "Mensagem muito longa." });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.json({
      reply: "A SolutionAI ainda não foi configurada neste site. Peça ao administrador para definir a chave ANTHROPIC_API_KEY no arquivo .env."
    });
  }

  const safeHistory = Array.isArray(history)
    ? history
        .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
        .slice(-8)
        .map(m => ({ role: m.role, content: m.content.slice(0, 800) }))
    : [];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: [...safeHistory, { role: "user", content: message.slice(0, 600) }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("SolutionAI error:", response.status, errText);
      return res.status(502).json({ reply: "Não consegui responder agora. Tente novamente em instantes." });
    }

    const data = await response.json();
    const reply = (data.content || []).map(block => block.text || "").join("").trim()
      || "Não consegui gerar uma resposta agora. Tente reformular sua pergunta.";
    res.json({ reply });
  } catch (err) {
    console.error("SolutionAI error:", err);
    res.status(500).json({ reply: "Não consegui responder agora. Tente novamente em instantes." });
  }
};

"use client";

import { useEffect, useMemo, useState } from "react";
import "./style.css";

const biblioteca = {
  "🎨 Criar Imagem": [
    "Crie uma imagem profissional sobre [TEMA], estilo cinematográfico, iluminação dramática, composição elegante, alta definição, formato [FORMATO].",
    "Crie uma arte para redes sociais sobre [TEMA], com destaque para [TEXTO], visual moderno, profissional e impactante.",
    "Crie uma imagem realista de [PESSOA/CENA], preservando características naturais, com cenário [CENÁRIO] e iluminação profissional.",
    "Crie uma capa profissional para [PROJETO/APLICATIVO], usando o conceito [IDEIA], visual moderno e fácil de reconhecer."
  ],

  "🎬 Criar Vídeo": [
    "Crie um vídeo de 8 segundos sobre [TEMA]. Cena cinematográfica, movimento natural de câmera, iluminação profissional e final impactante.",
    "Crie um vídeo vertical 9:16 para redes sociais sobre [TEMA], dividido em cenas curtas, com ritmo envolvente e aparência profissional.",
    "Transforme esta ideia em um roteiro de vídeo: [IDEIA]. Divida em cenas de 8 segundos, mantendo continuidade entre todas as cenas."
  ],

  "📸 Editar Foto": [
    "Edite esta foto preservando totalmente a fisionomia da pessoa. Altere somente [ALTERAÇÃO], mantendo aparência natural e realista.",
    "Melhore iluminação, nitidez e qualidade desta fotografia sem modificar rosto, corpo ou características pessoais.",
    "Remova [OBJETO] desta fotografia e reconstrua naturalmente o fundo, sem alterar as pessoas presentes."
  ],

  "⛪ Igreja & Bíblia": [
    "Crie uma mensagem para reunião sobre [TEMA], baseada em [PASSAGEM BÍBLICA], com introdução, explicação, aplicação prática e conclusão.",
    "Crie uma arte cristã sobre [TEMA], usando [VERSÍCULO], visual impactante, letras grandes e excelente legibilidade.",
    "Prepare um estudo bíblico sobre [TEMA], explicando contexto, significado espiritual, exemplos e aplicação para os dias atuais."
  ],

  "📱 Redes Sociais": [
    "Crie uma legenda para [REDE SOCIAL] sobre [TEMA], com linguagem envolvente, chamada para ação e hashtags relevantes.",
    "Crie 5 ideias de publicações sobre [TEMA], cada uma com título, legenda e sugestão visual."
  ],

  "✍️ Textos": [
    "Reescreva o texto abaixo deixando-o claro, profissional e natural, preservando o significado: [TEXTO].",
    "Corrija ortografia, pontuação e clareza deste texto sem alterar sua mensagem principal: [TEXTO]."
  ],

  "📊 Planilhas": [
    "Crie uma planilha para [OBJETIVO], com colunas [DADOS], fórmulas automáticas, totais, organização mensal e visual profissional.",
    "Planeje uma planilha de controle de [TEMA], incluindo cálculos automáticos, filtros, resumo e indicadores."
  ],

  "📲 Criar Aplicativos": [
    "Crie um aplicativo chamado [NOME], destinado a [OBJETIVO]. Inclua cadastro, pesquisa, edição, organização dos dados e interface responsiva.",
    "Planeje um aplicativo para [IDEIA], descrevendo telas, funções, banco de dados, usuários e fluxo completo."
  ],

  "🌐 Sites": [
    "Crie um site responsivo para [NEGÓCIO/PROJETO], com página inicial, informações, contato, design moderno e funcionamento perfeito no celular."
  ],

  "🧠 Prompt Mestre": [
    "Transforme minha ideia em um prompt profissional e completo. Minha ideia é: [IDEIA]. Acrescente contexto, objetivo, estilo, detalhes técnicos e resultado esperado."
  ]
};

export default function Home() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [tela, setTela] = useState("inicio");
  const [ideia, setIdeia] = useState("");
  const [resultado, setResultado] = useState("");
  const [meus, setMeus] = useState([]);

  useEffect(() => {
    try {
      setFavoritos(JSON.parse(localStorage.getItem("favoritos")) || []);
      setMeus(JSON.parse(localStorage.getItem("meusPrompts")) || []);
    } catch {}
  }, []);

  function favoritar(prompt) {
    const novos = favoritos.includes(prompt)
      ? favoritos.filter((p) => p !== prompt)
      : [...favoritos, prompt];

    setFavoritos(novos);
    localStorage.setItem("favoritos", JSON.stringify(novos));
  }

  function copiar(texto) {
    navigator.clipboard.writeText(texto);
    alert("Prompt copiado!");
  }

  function gerar() {
    if (!ideia.trim()) return;

    const texto =
      `Crie um resultado profissional a partir da seguinte ideia: "${ideia}". ` +
      `Entenda o objetivo principal, acrescente detalhes relevantes, defina estilo, ` +
      `estrutura, contexto e resultado esperado. Entregue uma resposta completa, ` +
      `clara e pronta para ser utilizada em uma inteligência artificial.`;

    setResultado(texto);
  }

  function salvarMeu() {
    if (!resultado) return;
    const novos = [...meus, resultado];
    setMeus(novos);
    localStorage.setItem("meusPrompts", JSON.stringify(novos));
    alert("Salvo em Meus!");
  }

  const prompts = useMemo(() => {
    let lista = [];

    Object.entries(biblioteca).forEach(([cat, itens]) => {
      itens.forEach((texto) => lista.push({ cat, texto }));
    });

    if (categoria) lista = lista.filter((p) => p.cat === categoria);

    if (busca.trim()) {
      const q = busca.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.texto.toLowerCase().includes(q) ||
          p.cat.toLowerCase().includes(q)
      );
    }

    return lista;
  }, [busca, categoria]);

  return (
    <main className="container">
      <header>
        <div className="logo">🤖</div>
        <div>
          <h1>Prompt Pro</h1>
          <p>Biblioteca de Prompts</p>
        </div>
      </header>

      <nav>
        <button onClick={() => { setTela("inicio"); setCategoria(null); }}>
          🏠 Início
        </button>
        <button onClick={() => setTela("favoritos")}>⭐ Favoritos</button>
        <button onClick={() => setTela("gerador")}>💡 Gerador</button>
        <button onClick={() => setTela("meus")}>➕ Meus</button>
      </nav>

      {tela === "inicio" && (
        <>
          <section className="hero">
            <h2>O que vamos criar hoje?</h2>
            <p>Prompts prontos para copiar, adaptar e usar.</p>

            <input
              className="busca"
              placeholder="🔎 Pesquisar na biblioteca..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </section>

          <div className="categorias">
            {Object.keys(biblioteca).map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setCategoria(categoria === cat ? null : cat)
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <section className="lista">
            <h2>{categoria || "Biblioteca"}</h2>

            {prompts.map((item, i) => (
              <article className="promptCard" key={i}>
                <small>{item.cat}</small>
                <p>{item.texto}</p>

                <div className="acoes">
                  <button onClick={() => copiar(item.texto)}>📋 Copiar</button>
                  <button onClick={() => favoritar(item.texto)}>
                    {favoritos.includes(item.texto) ? "⭐" : "☆"} Favorito
                  </button>
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      {tela === "favoritos" && (
        <section className="lista">
          <h2>⭐ Favoritos</h2>

          {favoritos.length === 0 && <p>Nenhum favorito ainda.</p>}

          {favoritos.map((texto, i) => (
            <article className="promptCard" key={i}>
              <p>{texto}</p>
              <button onClick={() => copiar(texto)}>📋 Copiar</button>
            </article>
          ))}
        </section>
      )}

      {tela === "gerador" && (
        <section className="hero">
          <h2>💡 Gerador Inteligente</h2>
          <p>Escreva uma ideia simples.</p>

          <textarea
            placeholder="Ex.: Quero uma arte para uma reunião sobre fé..."
            value={ideia}
            onChange={(e) => setIdeia(e.target.value)}
          />

          <button className="principal" onClick={gerar}>
            ✨ Criar Prompt
          </button>

          {resultado && (
            <article className="promptCard">
              <p>{resultado}</p>
              <div className="acoes">
                <button onClick={() => copiar(resultado)}>📋 Copiar</button>
                <button onClick={salvarMeu}>💾 Salvar</button>
              </div>
            </article>
          )}
        </section>
      )}

      {tela === "meus" && (
        <section className="lista">
          <h2>➕ Meus Prompts</h2>

          {meus.length === 0 && <p>Nenhum prompt salvo ainda.</p>}

          {meus.map((texto, i) => (
            <article className="promptCard" key={i}>
              <p>{texto}</p>
              <button onClick={() => copiar(texto)}>📋 Copiar</button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
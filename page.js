"use client";

import { useState } from "react";
import "./style.css";

export default function Home() {
  const [busca, setBusca] = useState("");

  return (
    <main className="container">
      <header>
        <img src="/../icon.png" alt="Prompt Pro" className="logo" />
        <div>
          <h1>Prompt Pro</h1>
          <p>Biblioteca de Prompts</p>
        </div>
      </header>

      <input
        className="busca"
        type="text"
        placeholder="Buscar prompts..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <section className="card">
        <h2>Minha Biblioteca</h2>
        <p>Organize, encontre e copie seus melhores prompts em um só lugar.</p>
      </section>
    </main>
  );
}

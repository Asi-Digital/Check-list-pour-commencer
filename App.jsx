import { useState, useEffect } from "react";

const WEEKS = [
  {
    id: 0,
    label: "Semaine 1",
    theme: "Pose les bases",
    color: "#E8825A",
    emoji: "🌱",
    missions: [
      {
        id: "D1",
        title: "Clarifie qui tu es",
        duration: "20 min",
        tasks: [
          "Liste 10 expériences de vie que tu as vécues",
          "Liste 10 compétences que tu possèdes",
          "Liste 10 sujets dont tu pourrais parler 30 min",
          "Note les problèmes que tu as déjà résolus pour toi-même",
        ],
      },
      {
        id: "D2",
        title: "Définis ton client idéal",
        duration: "15 min",
        tasks: [
          "Qui veux-tu aider ? (sois précise)",
          "Quel est son problème principal ?",
          "Que souhaite-t-elle obtenir ?",
          "Qu'est-ce qui l'empêche d'avancer ?",
        ],
      },
      {
        id: "D3",
        title: "Valide ta niche en 30 min",
        duration: "30 min",
        tasks: [
          "Recherche ton sujet sur Instagram",
          "Recherche ton sujet sur TikTok",
          "Note 5 questions qui reviennent dans les commentaires",
          "Vérifie que des gens cherchent déjà des solutions",
        ],
      },
      {
        id: "D4",
        title: "Rédige ton positionnement",
        duration: "10 min",
        tasks: [
          "Complète : J'aide ________ à obtenir ________ grâce à ________",
          "Teste cette phrase à voix haute — est-ce clair en 5 secondes ?",
          "Partage-la à une amie et note sa réaction",
        ],
      },
    ],
  },
  {
    id: 1,
    label: "Semaine 2",
    theme: "Crée ton offre",
    color: "#C4657A",
    emoji: "✨",
    missions: [
      {
        id: "E1",
        title: "Choisis ta transformation",
        duration: "15 min",
        tasks: [
          "Quel résultat rapide peux-tu aider à obtenir ?",
          "Ce résultat peut-il être atteint en moins de 30 jours ?",
          "Est-ce facile à comprendre pour ta cliente ?",
        ],
      },
      {
        id: "E2",
        title: "Conçois ton offre",
        duration: "30 min",
        tasks: [
          "Choisis un format : checklist, mini-formation, PDF, workbook",
          "Définis les 5 étapes de ta méthode",
          "Donne un nom mémorable à ta méthode",
          "Rédige ta promesse en 1 phrase",
        ],
      },
      {
        id: "E3",
        title: "Crée le contenu",
        duration: "2h (répartissable)",
        tasks: [
          "Page d'introduction (contexte + promesse)",
          "Plan d'action pas à pas",
          "2 ou 3 exercices concrets",
          "Checklist récapitulative",
        ],
      },
      {
        id: "E4",
        title: "Fixe ton prix de lancement",
        duration: "10 min",
        tasks: [
          "Offre gratuite : pour constituer une liste email",
          "17 € : pour valider l'intérêt sans friction",
          "27 € : positionnement premium accessible",
          "Choisis UN prix et note ta justification",
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Semaine 3",
    theme: "Lance ton système",
    color: "#7A6BAE",
    emoji: "⚙️",
    missions: [
      {
        id: "C1",
        title: "Optimise ton profil Instagram",
        duration: "20 min",
        tasks: [
          "Photo de profil nette et reconnaissable",
          "Nom optimisé avec mots-clés",
          "Bio orientée résultat (pas ta biographie)",
          "Appel à l'action + lien en bio",
        ],
      },
      {
        id: "C2",
        title: "Prépare ton tunnel de vente",
        duration: "2h",
        tasks: [
          "Crée ta page de capture (Systeme.io ou Beacons)",
          "Rédige ta page de vente",
          "Configure le paiement Stripe",
          "Prépare ta page de remerciement",
        ],
      },
      {
        id: "C3",
        title: "Teste tout de A à Z",
        duration: "30 min",
        tasks: [
          "Teste le lien en bio",
          "Teste le paiement complet",
          "Teste le téléchargement du produit",
          "Vérifie que l'email de confirmation arrive",
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Semaine 4",
    theme: "Publie & Convertis",
    color: "#4A9B8F",
    emoji: "🚀",
    missions: [
      {
        id: "L1",
        title: "Publie ton premier contenu",
        duration: "1h",
        tasks: [
          "1 Reel : une erreur fréquente dans ta niche",
          "1 Carrousel : conseil actionnable en 5 étapes",
          "3 Stories : coulisses de ta création",
          "Chaque contenu : hook + valeur + CTA",
        ],
      },
      {
        id: "L2",
        title: "Prépare 15 idées de contenu",
        duration: "30 min",
        tasks: [
          "5 contenus d'attraction (erreurs, mythes, astuces)",
          "5 contenus de conversion (résultats, objections, FAQ)",
          "5 contenus de connexion (histoire perso, coulisses)",
          "Planifie dans un calendrier simple",
        ],
      },
      {
        id: "IC1",
        title: "Crée des conversations",
        duration: "20 min/jour",
        tasks: [
          "Réponds à tous les commentaires sous 2h",
          "Réponds aux DM avec une question ouverte",
          "Pose une question en Story quotidiennement",
          "Engage 5 nouveaux comptes dans ta niche",
        ],
      },
      {
        id: "IC2",
        title: "Qualifie et vends",
        duration: "Variable",
        tasks: [
          "Pose 4 questions de qualification en DM",
          "Présente le problème → solution → résultat",
          "Réponds aux objections avec calme",
          "Planifie relance J+1, J+3, J+7",
        ],
      },
    ],
  },
];

const totalTasks = WEEKS.reduce(
  (acc, w) => acc + w.missions.reduce((a, m) => a + m.tasks.length, 0),
  0
);

export default function DeclikWorkbook() {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("declik_checked") || "{}");
    } catch {
      return {};
    }
  });
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeMission, setActiveMission] = useState(null);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("declik_checked", JSON.stringify(checked));
    } catch {}
  }, [checked]);

  const toggle = (key) => {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    const total = Object.values(next).filter(Boolean).length;
    if (total > 0 && total % 5 === 0) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2000);
    }
  };

  const doneCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((doneCount / totalTasks) * 100);

  const weekProgress = (week) => {
    const keys = week.missions.flatMap((m) =>
      m.tasks.map((_, i) => `${m.id}_${i}`)
    );
    const done = keys.filter((k) => checked[k]).length;
    return { done, total: keys.length };
  };

  const currentWeek = WEEKS[activeWeek];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAF7F2", minHeight: "100vh", color: "#2C1810" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAF7F2; }
        .workbook { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
        .week-tab { cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
        .week-tab:hover { transform: translateY(-2px); }
        .task-row { cursor: pointer; transition: background 0.15s; border-radius: 8px; padding: 10px 12px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 6px; }
        .task-row:hover { background: rgba(0,0,0,0.04); }
        .checkbox { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #ccc; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.2s; margin-top: 1px; }
        .checkbox.done { border-color: #4A9B8F; background: #4A9B8F; }
        .mission-card { background: white; border-radius: 16px; padding: 20px; margin-bottom: 14px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .mission-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); transform: translateY(-1px); }
        .mission-card.active { border-color: currentColor; }
        .celebrate { position: fixed; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; display: flex; align-items: center; justify-content: center; z-index: 100; }
        .celebrate-inner { font-size: 80px; animation: pop 2s ease-out forwards; }
        @keyframes pop { 0% { transform: scale(0) rotate(-20deg); opacity: 0; } 20% { transform: scale(1.3) rotate(5deg); opacity: 1; } 50% { transform: scale(1) rotate(0deg); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        .progress-bar { height: 8px; background: #EDE8E0; border-radius: 99px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #E8825A, #C4657A, #7A6BAE); transition: width 0.5s ease; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; }
      `}</style>

      {celebrate && (
        <div className="celebrate">
          <div className="celebrate-inner">🎉</div>
        </div>
      )}

      <div className="workbook" style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 60px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32, paddingTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#9B8878", textTransform: "uppercase", marginBottom: 12 }}>Méthode</div>
          <h1 style={{ fontSize: 42, color: "#2C1810", lineHeight: 1.1, marginBottom: 8 }}>DÉCLIC™</h1>
          <p style={{ color: "#7A6050", fontSize: 15, fontStyle: "italic" }}>Ta première vente en ligne — 4 semaines, étape par étape</p>
        </div>

        {/* Progress global */}
        <div style={{ background: "white", borderRadius: 16, padding: "18px 20px", marginBottom: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "#7A6050" }}>Progression globale</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#2C1810" }}>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div style={{ fontSize: 12, color: "#9B8878", marginTop: 8 }}>{doneCount} / {totalTasks} actions complétées</div>
        </div>

        {/* Semaines tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
          {WEEKS.map((w) => {
            const { done, total } = weekProgress(w);
            const pct = Math.round((done / total) * 100);
            const isActive = activeWeek === w.id;
            return (
              <div
                key={w.id}
                className="week-tab"
                onClick={() => { setActiveWeek(w.id); setActiveMission(null); }}
                style={{
                  background: isActive ? w.color : "white",
                  color: isActive ? "white" : "#2C1810",
                  borderRadius: 14,
                  padding: "14px 10px",
                  textAlign: "center",
                  boxShadow: isActive ? `0 4px 16px ${w.color}55` : "0 2px 8px rgba(0,0,0,0.06)",
                  border: `2px solid ${isActive ? w.color : "transparent"}`,
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{w.emoji}</div>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 0.5, opacity: isActive ? 0.85 : 0.6, textTransform: "uppercase" }}>{w.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>{pct}%</div>
              </div>
            );
          })}
        </div>

        {/* Contenu semaine active */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>{currentWeek.emoji}</span>
            <div>
              <h2 style={{ fontSize: 22, color: "#2C1810" }}>{currentWeek.label} — {currentWeek.theme}</h2>
            </div>
          </div>
          <div style={{ width: 40, height: 3, background: currentWeek.color, borderRadius: 99, marginBottom: 20, marginLeft: 40 }} />

          {currentWeek.missions.map((mission) => {
            const mDone = mission.tasks.filter((_, i) => checked[`${mission.id}_${i}`]).length;
            const mTotal = mission.tasks.length;
            const isOpen = activeMission === mission.id;

            return (
              <div
                key={mission.id}
                className="mission-card"
                style={{ color: currentWeek.color, borderColor: isOpen ? currentWeek.color : "transparent" }}
                onClick={() => setActiveMission(isOpen ? null : mission.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#2C1810", fontWeight: 700 }}>{mission.title}</span>
                      {mDone === mTotal && (
                        <span style={{ fontSize: 14 }}>✅</span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 5 }}>
                      <span className="badge" style={{ background: `${currentWeek.color}18`, color: currentWeek.color }}>⏱ {mission.duration}</span>
                      <span className="badge" style={{ background: "#F0EDE8", color: "#7A6050" }}>{mDone}/{mTotal} faites</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 20, color: currentWeek.color, marginLeft: 12, transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>⌄</span>
                </div>

                {isOpen && (
                  <div style={{ marginTop: 18, borderTop: "1px solid #F0EDE8", paddingTop: 16 }} onClick={(e) => e.stopPropagation()}>
                    {mission.tasks.map((task, i) => {
                      const key = `${mission.id}_${i}`;
                      const done = !!checked[key];
                      return (
                        <div key={i} className="task-row" onClick={() => toggle(key)}>
                          <div className={`checkbox ${done ? "done" : ""}`}>
                            {done && (
                              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span style={{ fontSize: 14, color: done ? "#9B8878" : "#2C1810", textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>
                            {task}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Phrase d'encouragement */}
        <div style={{ marginTop: 36, background: `${currentWeek.color}12`, border: `1px solid ${currentWeek.color}30`, borderRadius: 16, padding: "18px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 15, color: "#5A3828", lineHeight: 1.6 }}>
            {progress === 0 && "\"Chaque grande aventure commence par un seul geste. Lance-toi.\""}
            {progress > 0 && progress < 30 && "\"Tu as démarré. C'est 90% du chemin. Continue.\""}
            {progress >= 30 && progress < 60 && "\"Tu construis quelque chose de réel. Ne t'arrête pas maintenant.\""}
            {progress >= 60 && progress < 90 && "\"La ligne d'arrivée est en vue. Tes premières clientes t'attendent.\""}
            {progress >= 90 && "\"Tu as tout ce qu'il faut. La prochaine étape, c'est la vente. 🎯\""}
          </p>
        </div>

        {/* Reset discret */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button
            onClick={() => { if (window.confirm("Remettre toute la progression à zéro ?")) setChecked({}); }}
            style={{ background: "none", border: "none", color: "#C0B0A0", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}
          >
            Réinitialiser ma progression
          </button>
        </div>
      </div>
    </div>
  );
}

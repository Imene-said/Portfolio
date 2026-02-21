// Remplace les images par tes fichiers locaux si tu veux :
// img: "./assets/img/projet1.jpg"

window.PRO_PROJECTS = [
    {
      title: "Dashboard KPI interne",
      desc: "Suivi de performance + actions rapides, API sécurisée et logs exploitables.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      tags: ["React", "API", "Auth", "PostgreSQL"],
      bullets: [
        "Conception UI + composants réutilisables",
        "Endpoints paginés + filtres, audit logs",
        "Amélioration du temps de chargement (ex: -35%)"
      ],
      downloads: [
        { label: "Rapport (PDF)", href: "./assets/files/rapport-dashboard.pdf" },
        { label: "Présentation (PPTX)", href: "./assets/files/pres-dashboard.pptx" }
      ]
    },
    {
      title: "Automatisation reporting",
      desc: "Scripts + pipeline CI/CD pour générer des exports fiables et réduire les erreurs.",
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=80",
      tags: ["Python", "CI/CD", "Docker"],
      bullets: [
        "Génération automatique des reports",
        "Validation données + logs",
        "Déploiement simplifié via Docker"
      ],
      downloads: [{ label: "Doc technique", href: "./assets/files/doc-automation.pdf" }]
    }
  ];
  
  window.WIP_PROJECTS = [
    {
      title: "App web — Gestion de tâches",
      desc: "Application moderne : auth, dashboard, export, notifications.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
      tags: ["TypeScript", "React", "UX"],
      bullets: ["Architecture components + hooks", "Recherche / filtres / tri", "Export CSV + mode offline (option)"],
      downloads: [
        { label: "Cahier des charges", href: "./assets/files/spec-tasks.pdf" }
      ]
    }
  ];
  
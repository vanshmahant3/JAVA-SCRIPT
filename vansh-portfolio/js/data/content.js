/* ==========================================================
   CONTENT DATA — education, skills, projects, experience.
   Only facts from your documents, your Wix portfolio or your
   own messages are included. Dates and numbers are copied
   from the source document named in each entry.
   ========================================================== */

window.PORTFOLIO = window.PORTFOLIO || {};

/* ---------- EDUCATION ---------- */
window.PORTFOLIO.education = [
  {
    period: "2024 – 2028 (expected)",
    title: "B.Tech, Computer Science & Engineering",
    place: "Symbiosis Institute of Technology, Nagpur",
    note: "Currently in 5th semester · CGPA 7.49",
    current: true,
  },
  { period: "2024", title: "Class XII", place: "Nirala Vidyalaya" },
  { period: "2022", title: "Class X", place: "Eastern Point School" },
];

/* ---------- SKILLS ----------
   `evidence` is shown as a tooltip and keeps every skill traceable.   */
window.PORTFOLIO.skills = [
  {
    group: "Programming languages",
    items: [
      { name: "Python", evidence: "Red Hat AD141 · Infosys DSA · Maincrafts internship" },
      { name: "Java", evidence: "Listed skill on my profile" },
      { name: "C", evidence: "Listed skill on my profile" },
      { name: "C++", evidence: "Course listed on my earlier portfolio" },
    ],
  },
  {
    group: "Databases & data analytics",
    items: [
      { name: "SQL", evidence: "Listed skill on my profile" },
      { name: "Data analysis with Python", evidence: "Maincrafts Technology internship" },
      { name: "Generative AI for databases", evidence: "MindLuster course" },
    ],
  },
  {
    group: "AI & machine learning",
    items: [
      { name: "Machine learning", evidence: "Soft Nexis internship · spam-detection patent application" },
      { name: "Natural language processing", evidence: "TF-IDF text classification · TalentLens study" },
      { name: "Generative AI & LLMs", evidence: "Oracle Generative AI Professional" },
      { name: "Retrieval-Augmented Generation", evidence: "Covered in the Oracle certification" },
      { name: "AI agents", evidence: "Udemy: Mastering Agentic AI · ServiceNow" },
    ],
  },
  {
    group: "Development tools & platforms",
    items: [
      { name: "HTML5", evidence: "This portfolio · earlier HTML course" },
      { name: "CSS3", evidence: "This portfolio" },
      { name: "JavaScript", evidence: "This portfolio (JavaScript Lab CA3)" },
      { name: "Ansible automation", evidence: "Red Hat DO457" },
      { name: "ServiceNow", evidence: "ServiceNow Virtual Internship Program" },
    ],
  },
];

/* ---------- PROJECTS ----------
   Links (`links`) are only rendered when they exist.
   type "doc" opens a preview; type "file" opens the file.            */
window.PORTFOLIO.projects = [
  {
    name: "Intelligent Spam Email Detection",
    status: "Patent application published",
    featured: true,
    problem: "Filter spam accurately while keeping false positives low and adapting to changing spam patterns.",
    solution:
      "A pipeline of text pre-processing (tokenisation, stop-word removal, stemming, lemmatisation), TF-IDF feature extraction " +
      "and supervised classifiers — Naive Bayes, SVM, Logistic Regression and Random Forest — trained with cross-validation.",
    tech: ["Machine learning", "NLP", "TF-IDF", "Naive Bayes", "SVM", "Random Forest"],
    contribution: "Named co-inventor with Madhur Wanjari, Ojas Jibhkate and Dr. Priya Dasarwar.",
    outcome:
      "Application No. 202621011703 A, filed 3 Feb 2026 and published 20 Mar 2026 (applicant: Symbiosis International). " +
      "The published abstract reports 96.2% classification accuracy with Naive Bayes.",
    links: [
      { label: "View patent record", type: "doc", id: "patent" },
    ],
  },
  {
    name: "TalentLens — AI Resume Ranking",
    status: "Research & design stage",
    featured: true,
    problem: "Keyword-based screening misses synonyms and gives rankings that recruiters cannot explain.",
    solution:
      "Literature review of five IEEE papers and a proposed hybrid architecture: Sentence-BERT semantic matching, " +
      "Knowledge–Skills–Abilities weighting, rule-based validation and an LLM layer that explains each ranking.",
    tech: ["NLP", "Sentence-BERT", "Cosine similarity", "spaCy NER", "LLM explanations"],
    contribution: "Literature study and system-architecture specification.",
    outcome: "Documented as a research study; the architecture is a design proposal.",
    links: [
      { label: "Read the study", type: "doc", id: "talentlens" },
    ],
  },
  {
    name: "Personal Portfolio Website",
    status: "Completed",
    featured: false,
    problem: "Present my education, work and certificates clearly to faculty and recruiters.",
    solution:
      "A responsive single-page site driven by data files, with a filterable certificate gallery, light/dark themes " +
      "and a validated contact form.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    contribution: "Designed and built the complete site.",
    outcome: "Built for the JavaScript Lab CA3 mini project.",
    links: [],
  },
];

/* ---------- PREVIEW DOCUMENTS (opened in the lightbox) ---------- */
window.PORTFOLIO.documents = {
  patent: {
    src: "assets/documents/patent-publication-page.jpg",
    alt: "Official Journal of the Patent Office, issue 12/2026, listing application 202621011703 A with Vansh Mahant as inventor",
    title: "Patent application publication — No. 202621011703 A",
    meta: "Official Journal of the Patent Office, Issue 12/2026 · 20 Mar 2026",
    detail:
      "Intelligent Spam Email Detection System using Machine Learning with TF-IDF based Feature Extraction. Inventors: Madhur Wanjari, Vansh Mahant, Ojas Jibhkate, Dr. Priya Dasarwar.",
    original: "assets/documents/patent-publication-202621011703.pdf",
    originalLabel: "Open journal excerpt (PDF)",
  },
  talentlens: {
    src: "assets/documents/talentlens-research-study-page.jpg",
    alt: "First page of the TalentLens research study on AI-based resume ranking",
    title: "TalentLens — AI-Based Resume Ranking & Candidate Matching",
    meta: "Academic literature review and architecture specification · 7 pages",
    detail: "Synthesises five IEEE publications and proposes a hybrid, explainable resume-ranking architecture.",
    original: "assets/documents/talentlens-research-study.pdf",
    originalLabel: "Open full study (PDF)",
  },
};

/* ---------- EXPERIENCE & ACHIEVEMENTS (one timeline, newest first) ----------
   refs: certificate ids, photo ids (from `gallery`) or document ids.         */
window.PORTFOLIO.timeline = [
  {
    when: "May – Jun 2026",
    type: "Internship",
    title: "Artificial Intelligence & Machine Learning Intern",
    org: "Soft Nexis Technology",
    text: "Completed the 24 May – 24 Jun 2026 internship; the certificate cites strong team coordination, communication and attention to detail.",
    refs: [{ kind: "cert", id: "softnexis-internship", label: "Certificate" }],
  },
  {
    when: "May – Jun 2026",
    type: "Internship",
    title: "Data Analysis with Python Intern",
    org: "Maincrafts Technology",
    text: "Completed the 20 May – 20 Jun 2026 internship; the certificate recognises dedication, professionalism and commitment to learning.",
    refs: [{ kind: "cert", id: "maincrafts-internship", label: "Certificate" }],
  },
  {
    when: "Apr 2026",
    type: "Training",
    title: "ServiceNow Virtual Internship Program",
    org: "ServiceNow University · AICTE · SmartBridge",
    text: "Eight modules: ServiceNow fundamentals, Agentic AI, administration, Flows, Automated Test Framework, Reports and CSA exam preparation.",
    refs: [{ kind: "cert", id: "servicenow-virtual-internship", label: "Certificate" }],
  },
  {
    when: "Mar 2026",
    type: "Patent",
    title: "Patent application published — spam email detection",
    org: "Symbiosis International (Deemed University)",
    text: "Co-inventor on Application No. 202621011703 A, filed 3 Feb 2026 and published 20 Mar 2026.",
    refs: [{ kind: "doc", id: "patent", label: "Patent record" }],
  },
  {
    when: "26–28 Feb 2026",
    type: "Events",
    title: "Enthusia 5.0 — SITNovate 2.0 and CodeSprint 2.0",
    org: "Symbiosis Institute of Technology, Nagpur",
    text: "Contributed as a participant (and volunteer on SITNovate) in two events of the institute's Enthusia 5.0 festival.",
    refs: [
      { kind: "cert", id: "sitnovate-2-0", label: "SITNovate certificate" },
      { kind: "cert", id: "codesprint-2-0", label: "CodeSprint certificate" },
    ],
  },
  {
    when: "Feb 2026",
    type: "Events",
    title: "Advantage Vidarbha 2026",
    org: "Industrial festival, Nagpur",
    text: "Attended the Advantage Vidarbha industrial festival (Khasdar Audyogik Mahotsav).",
    refs: [
      { kind: "photo", id: "advantage-vidarbha-banner", label: "Photo 1" },
      { kind: "photo", id: "advantage-vidarbha-plaque", label: "Photo 2" },
    ],
  },
  {
    when: "Session 2024–25",
    type: "Hackathon",
    title: "3rd position — Hack-O-Week 3.13 (TechWhiz)",
    org: "IEEE club, Students Representative Council, SIT Nagpur",
    text: "Secured third position in the TechWhiz event conducted by the IEEE club.",
    refs: [{ kind: "cert", id: "ieee-hack-o-week-techwhiz", label: "Certificate" }],
  },
  {
    when: "Programme",
    type: "Entrepreneurship",
    title: "TiE U Program — Startup Showcase",
    org: "TiE Nagpur",
    text: "Presented a startup idea / business model as part of the programme.",
    refs: [{ kind: "cert", id: "tie-nagpur-startup-showcase", label: "Certificate" }],
  },
  {
    when: "Earlier",
    type: "Achievement",
    title: "2nd position — State-level Abacus competition",
    org: "From my earlier portfolio",
    text: "Completed level 3 of abacus training and secured second position at the state-level abacus competition.",
    refs: [],
  },
];

/* ---------- PHOTOS (shown from the Experience timeline) ---------- */
window.PORTFOLIO.gallery = [
  {
    id: "advantage-vidarbha-banner",
    src: "assets/gallery/advantage-vidarbha-banner.jpg",
    thumb: "assets/gallery/advantage-vidarbha-banner-thumb.jpg",
    alt: "Vansh Mahant standing in front of the Advantage Vidarbha 2026 banner",
    caption: "Advantage Vidarbha 2026, Nagpur",
  },
  {
    id: "advantage-vidarbha-plaque",
    src: "assets/gallery/advantage-vidarbha-plaque.jpg",
    thumb: "assets/gallery/advantage-vidarbha-plaque-thumb.jpg",
    alt: "Vansh Mahant holding the Excellence in Higher Education plaque at an exhibitor stall",
    caption: "With the “Excellence in Higher Education” plaque, Advantage Vidarbha 2026",
  },
];

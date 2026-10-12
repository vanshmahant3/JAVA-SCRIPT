/* ==========================================================
   CERTIFICATES — one object per certificate you supplied.
   `file`    = your ORIGINAL file (never modified, opens in a new tab)
   `preview` = a readable JPG copy used inside the website lightbox
   `thumb`   = small JPG used on the card
   To add a new certificate: copy your file to assets/certificates/originals,
   make a preview/thumb JPG, then add one object below.
   ========================================================== */

window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.certCategories = [
  { id: "all", label: "All" },
  { id: "internship", label: "Internships" },
  { id: "ai", label: "AI & Data" },
  { id: "programming", label: "Programming" },
  { id: "platforms", label: "Platforms & Automation" },
  { id: "events", label: "Competitions & Events" },
];

(function () {
  const base = "assets/certificates/";
  const c = (slug, ext) => ({
    file: `${base}originals/${slug}.${ext}`,
    preview: `${base}previews/${slug}.jpg`,
    thumb: `${base}thumbs/${slug}.jpg`,
    fileType: ext.toUpperCase() === "JPEG" ? "JPG" : ext.toUpperCase(),
  });

  window.PORTFOLIO.certificates = [
    {
      id: "maincrafts-internship",
      title: "Internship — Data Analysis with Python",
      issuer: "Maincrafts Technology",
      date: "2026-06-20",
      dateLabel: "20 May – 20 Jun 2026",
      category: "internship",
      kind: "Internship",
      detail: "Certificate of Internship (Intern ID MT4113).",
      ...c("maincrafts-internship", "pdf"),
    },
    {
      id: "softnexis-internship",
      title: "Internship — Artificial Intelligence & Machine Learning",
      issuer: "Soft Nexis Technology",
      date: "2026-06-24",
      dateLabel: "24 May – 24 Jun 2026",
      category: "internship",
      kind: "Internship",
      detail: "Internship Completed Certificate (Certificate No. SN1001232).",
      ...c("softnexis-internship", "pdf"),
    },
    {
      id: "servicenow-virtual-internship",
      title: "Virtual Internship Program",
      issuer: "ServiceNow University · AICTE · SmartBridge",
      date: "2026-04-14",
      dateLabel: "14 Apr 2026",
      category: "internship",
      kind: "Virtual internship",
      detail:
        "Modules: Welcome to ServiceNow, Micro Certification, Introduction to Agentic AI, " +
        "ServiceNow Administration Fundamentals, Introduction to Flows, Automated Test Framework (ATF) Essentials, " +
        "Get Started with Reports, CSA Exam Preparation. Certificate ID SNU2014671.",
      ...c("servicenow-virtual-internship", "png"),
    },
    {
      id: "servicenow-micro-cert",
      title: "Micro-Certification — Welcome to ServiceNow",
      issuer: "ServiceNow",
      date: "2026-02-23",
      dateLabel: "23 Feb 2026",
      category: "platforms",
      kind: "Micro-certification",
      detail: "Successfully completed the certification requirements.",
      ...c("servicenow-micro-cert", "pdf"),
    },
    {
      id: "udemy-agentic-ai",
      title: "Mastering Agentic AI: From Prompt to Protocols to Production",
      issuer: "Udemy",
      date: "2026-08-10",
      dateLabel: "10 Aug 2026",
      category: "ai",
      kind: "Course",
      detail: "38 total hours · Instructor: Vinit Singh.",
      verifyUrl: "https://ude.my/UC-94ea1318-fc11-4b22-aaae-8993178b2c3f",
      ...c("udemy-agentic-ai", "pdf"),
    },
    {
      id: "oracle-genai-professional",
      title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      issuer: "Oracle",
      date: "2025-10-06",
      dateLabel: "6 Oct 2025 · valid to 6 Oct 2027",
      category: "ai",
      kind: "Professional certification",
      detail:
        "Covers Large Language Models, the OCI Generative AI Service, Retrieval-Augmented Generation, " +
        "semantic search, vector databases and LangChain. Preview is a screenshot of Oracle's public badge page.",
      verifyUrl:
        "https://catalog-education.oracle.com/ords/certview/sharebadge?id=30648A2A344C534DA12AEFAEE4DBBD7175F84E50E9337CDC2659579E845B887B",
      ...c("oracle-genai-professional", "png"),
    },
    {
      id: "mindluster-genai-databases",
      title: "Generative AI for Database Engineers",
      issuer: "MindLuster",
      date: "2025-11-10",
      dateLabel: "10 Nov 2025",
      category: "ai",
      kind: "Course",
      detail: "Certificate of Achievement (Certified No. b8640b20).",
      ...c("mindluster-genai-databases", "png"),
    },
    {
      id: "redhat-ad141-python",
      title: "Python Programming with Red Hat (AD141 – RHA), Ver. 9.0",
      issuer: "Red Hat",
      date: "2025-04-01",
      dateLabel: "1 Apr 2025",
      category: "programming",
      kind: "Course",
      detail: "Certificate of attendance · 32 credit hours.",
      verifyUrl: "https://www.credly.com/badges/84bddc34-628b-40c2-bc91-77a85241ba2f",
      ...c("redhat-ad141-python", "png"),
    },
    {
      id: "infosys-dsa-python-part1",
      title: "Data Structures and Algorithms using Python — Part 1",
      issuer: "Infosys Springboard",
      date: "2025-11-05",
      dateLabel: "5 Nov 2025",
      category: "programming",
      kind: "Course",
      detail: "Course completion certificate (issued 6 Nov 2025).",
      ...c("infosys-dsa-python-part1", "pdf"),
    },
    {
      id: "infosys-dsa-python-part2",
      title: "Data Structures and Algorithms using Python — Part 2",
      issuer: "Infosys Springboard",
      date: "2025-11-15",
      dateLabel: "15 Nov 2025",
      category: "programming",
      kind: "Course",
      detail: "Course completion certificate.",
      ...c("infosys-dsa-python-part2", "png"),
    },
    {
      id: "redhat-do457-ansible",
      title: "Network Automation with Red Hat Ansible Automation Platform (DO457 – RHA), Ver. 2.3",
      issuer: "Red Hat",
      date: "2026-08-11",
      dateLabel: "11 Aug 2026",
      category: "platforms",
      kind: "Course",
      detail: "Certificate of attendance · 32 credit hours.",
      verifyUrl: "https://www.credly.com/badges/672abb96-adf1-4d12-b8de-12aa0bc62073",
      ...c("redhat-do457-ansible", "pdf"),
    },
    {
      id: "ieee-hack-o-week-techwhiz",
      title: "3rd Position — Hack-O-Week 3.13 (TechWhiz)",
      issuer: "IEEE Club, Students Representative Council · SIT Nagpur",
      date: null,
      dateLabel: "SRC session 2024–25",
      category: "events",
      kind: "Competition",
      detail: "Certificate of Appreciation for securing 3rd position in the TechWhiz event of Hack-O-Week 3.13, conducted by the IEEE club of the Students Representative Council (session 2024–2025).",
      ...c("ieee-hack-o-week-techwhiz", "jpg"),
    },
    {
      id: "sitnovate-2-0",
      title: "SITNovate 2.0 — Enthusia 5.0",
      issuer: "Symbiosis Institute of Technology, Nagpur",
      date: "2026-02-28",
      dateLabel: "26–28 Feb 2026",
      category: "events",
      kind: "Participation",
      detail: "Certificate of Appreciation for contribution as a Participant / Volunteer in SITNovate 2.0 during Enthusia 5.0.",
      ...c("sitnovate-2-0", "jpg"),
    },
    {
      id: "codesprint-2-0",
      title: "CodeSprint 2.0 — Enthusia 5.0",
      issuer: "Symbiosis Institute of Technology, Nagpur",
      date: "2026-02-27",
      dateLabel: "26–28 Feb 2026",
      category: "events",
      kind: "Participation",
      detail: "Certificate of Appreciation for contribution as a Participant in CodeSprint 2.0 during Enthusia 5.0.",
      ...c("codesprint-2-0", "jpg"),
    },
    {
      id: "tie-nagpur-startup-showcase",
      title: "Certificate of Participation — TiE U Program, Startup Showcase",
      issuer: "TiE Nagpur",
      date: null,
      dateLabel: "Programme certificate (undated)",
      category: "events",
      kind: "Participation",
      detail: "Presented a startup idea / business model as part of the programme. Signed by the TiE Nagpur President.",
      ...c("tie-nagpur-startup-showcase", "jpeg"),
    },
  ];
})();

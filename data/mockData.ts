import { ClubEvent, ClubProject, GalleryAlbum, TeamMember, ClubAchievement } from "../types";

export const initialEvents: ClubEvent[] = [
  {
    id: "sih-hackathon-2026",
    title: "GEC Daman Smart India Hackathon: Internal Sprints",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A 24-hour internal hackathon to select and mentor top teams representing GEC Daman in the Smart India Hackathon 2026.",
    description: "The Internal Hackathon at Government Engineering College, Daman is the official screening round for SIH 2026. Teams across all departments (Computer, Electrical, Mechanical, Civil, and Biomedical) will pitch digital and hardware prototypes targeting Ministry-defined problem statements. Evaluated by academic advisors and industry professionals.",
    date: "September 18-19, 2026",
    time: "10:00 AM onwards",
    venue: "Main Tech Lab & Seminar Hall, GEC Daman Campus",
    agenda: [
      "Day 1, 10:00 AM - Opening Ceremony & Registration",
      "Day 1, 11:30 AM - Pitching Rounds & Problem Matching",
      "Day 1, 01:00 PM - Coding & Prototyping Commences",
      "Day 1, 08:00 PM - Progress Checkpoint 1",
      "Day 2, 09:00 AM - Progress Checkpoint 2",
      "Day 2, 01:00 PM - Final Code Commit & PPT Submission",
      "Day 2, 03:00 PM - Evaluation & Jury Presentation",
      "Day 2, 05:00 PM - Selected Teams Announcement"
    ],
    speakers: [
      { name: "Dr. Avinash R. Chaudhari", role: "Principal", company: "GEC Daman", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" },
      { name: "Mrs. Hemali J. Damania", role: "Assistant Professor (Computer Dept)", company: "GEC Daman", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80" }
    ],
    regLink: "https://gecdaman.org.in/sih-2026",
    feedbackLink: "https://gecdaman.org.in/feedback/sih",
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
    ],
    type: "upcoming"
  },
  {
    id: "web-dev-bootcamp",
    title: "Hands-on Web Development & Next.js Bootcamp",
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Build and deploy high-performance web applications using modern React frameworks, hosted by Coderithum.",
    description: "Join Coderithum's intensive 2-day bootcamp to learn Next.js, Tailwind CSS, and TypeScript. This hands-on workshop walks through responsive layout systems, component composition, state management, and deploying applications directly onto Vercel and GitHub Pages. Perfect for beginners and intermediate coders.",
    date: "August 28-29, 2026",
    time: "10:00 AM - 04:30 PM",
    venue: "Computational Lab, Computer Engineering Block, GEC Daman",
    agenda: [
      "Day 1, 10:00 AM - Intro to React & TypeScript",
      "Day 1, 01:00 PM - Styling with Tailwind CSS",
      "Day 1, 03:00 PM - Next.js File-system Routing",
      "Day 2, 10:00 AM - Client/Server Components",
      "Day 2, 01:00 PM - API Routes & Database Connection",
      "Day 2, 03:30 PM - Deployment Pipeline & Live Demos"
    ],
    speakers: [
      { name: "Mrs. Hemali J. Damania", role: "Assistant Professor (Computer Dept)", company: "GEC Daman", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80" }
    ],
    regLink: "https://gecdaman.org.in/coderithum-bootcamp",
    feedbackLink: "https://gecdaman.org.in/feedback/bootcamp",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
    ],
    type: "upcoming"
  },
  {
    id: "docker-kubernetes-basics",
    title: "Introduction to Docker Containers & Clouds",
    banner: "https://images.unsplash.com/photo-1484662020986-75935d2ebc66?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Mastering cloud deployment, containerization, and hosting architecture for modern application frameworks.",
    description: "A past workshop where students set up containerized environments, wrote Dockerfiles, configured environment grids, and deployed static server templates to cloud repositories. Guided step-by-step by Coderithum technical leads.",
    date: "March 15, 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Server & Network Lab, Computer Engineering Dept",
    agenda: [
      "02:00 PM - Containerization vs Virtualization basics",
      "03:00 PM - Writing your first Dockerfile",
      "04:00 PM - Docker Hub and cloud deploy grids"
    ],
    speakers: [
      { name: "Mrs. Hemali J. Damania", role: "Assistant Professor (Computer Dept)", company: "GEC Daman", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80" }
    ],
    regLink: "https://gecdaman.org.in/coderithum/docker-archive",
    feedbackLink: "https://gecdaman.org.in/feedback/docker",
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
    ],
    type: "past"
  }
];

export const initialProjects: ClubProject[] = [
  {
    id: "gecdaman-redesign",
    title: "GEC Daman Portal Upgrade Initiative",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A modern, lightning-fast static portal redesign concept for GEC Daman utilizing Next.js.",
    description: "Built by Coderithum members to conceptualize a faster, highly responsive official college portal. Features sub-second page loads, clean neobrutalist design parameters, integrated notice structures, and a mobile-friendly menu system for students to access syllabus, circulars, and departmental metrics.",
    techStack: ["Next.js 16", "Tailwind CSS v4", "TypeScript", "Framer Motion", "Lucide Icons"],
    github: "https://github.com/Coderithum/gec-daman-concept",
    demo: "https://coderithum.github.io/gec-daman-concept/",
    mentor: "Mrs. Hemali J. Damania",
    team: ["Rajesh Patel (Lead)", "Aditi Shah (Frontend)", "Kunal Damania (UI/UX)"],
    gallery: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "solar-telemetry",
    title: "Smart Solar Grid Telemetry System",
    banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "An IoT dashboard tracking campus solar panel generation efficiency in real-time.",
    description: "An interdisciplinary project combining Electrical and Computer engineering domains. Captures real-time telemetry from GEC Daman campus solar cells using sensor arrays, parses data parameters locally, and projects generation efficiency onto a dashboard, sending anomaly warnings to administrative portals.",
    techStack: ["React", "Python", "Raspberry Pi", "MQTT", "Chart.js", "Tailwind CSS"],
    github: "https://github.com/Coderithum/solar-grid-telemetry",
    demo: "https://coderithum.github.io/solar-grid-telemetry/",
    mentor: "Ms. Dipika Ganpat Damania (Electrical Dept)",
    team: ["Hardik Solanki (IoT Lead)", "Nisha Patel (Frontend Dev)", "Amit Halpati (Firmware)"],
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
    ]
  }
];

export const initialAlbums: GalleryAlbum[] = [
  {
    id: "hackathons-album",
    name: "SIH internal selection rounds",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    media: [
      { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80", caption: "GEC Daman teams pitching smart solution parameters." },
      { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80", caption: "Jury evaluating computer engineering web prototypes." },
      { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80", caption: "Internal award ceremony at the GEC Seminar Hall." }
    ]
  },
  {
    id: "workshops-album",
    name: "Web Sprints & Bootcamps",
    cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    media: [
      { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80", caption: "Mentors explaining Next.js layout configurations." },
      { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80", caption: "Hands-on UI development using Tailwind grid utilities." }
    ]
  }
];

export const initialTeam: TeamMember[] = [
  { name: "Dr. Avinash R. Chaudhari", role: "Principal & Chief Patron", category: "Faculty", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", linkedin: "https://linkedin.com" },
  { name: "Mrs. Hemali J. Damania", role: "Faculty Coordinator & Asst. Professor", category: "Faculty", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80", linkedin: "https://linkedin.com" },
  { name: "Ms. Dipika Ganpat Damania", role: "Faculty Advisor & Asst. Professor", category: "Faculty", avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80", linkedin: "https://linkedin.com" },
  { name: "Rajesh Patel", role: "Club President & Technical Lead", category: "Leadership", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", github: "https://github.com", linkedin: "https://linkedin.com" },
  { name: "Aditi Shah", role: "Vice President & UI/UX Head", category: "Leadership", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80", github: "https://github.com", linkedin: "https://linkedin.com" },
  { name: "Hardik Solanki", role: "IoT Development Lead", category: "Technical", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", github: "https://github.com" },
  { name: "Nisha Patel", role: "Fullstack Web Lead", category: "Technical", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", github: "https://github.com", linkedin: "https://linkedin.com" }
];

export const initialAchievements: ClubAchievement[] = [
  {
    id: "ach-1",
    title: "Winners of SIH 2025 Regional Round",
    description: "GEC Daman core coding cohort representing Coderithum secured 1st prize at the Smart India Hackathon 2025 Regional selection for the solar grid efficiency problem statement.",
    date: "December 2025",
    recipient: "Team Coderithum GEC (Rajesh, Aditi, Hardik)",
    award: "Smart India Hackathon Gold Trophy",
    iconType: "trophy"
  },
  {
    id: "ach-2",
    title: "GTU TechFest Coding Challenge Winner",
    description: "Coderithum technical leads secured top positions at Gujarat Technological University (GTU) Techfest's competitive coding challenge.",
    date: "March 2026",
    recipient: "Rajesh Patel & Nisha Patel",
    award: "GTU Coding Challenge Certificate of Excellence",
    iconType: "star"
  },
  {
    id: "ach-3",
    title: "First Runner-up at Robotics Design Sprint",
    description: "Designed a lightweight pathfinder sensor grid bot navigating the GTU tech grid maze in record efficiency.",
    date: "April 2026",
    recipient: "Robotics Sub-division, GEC Daman",
    award: "Robotics Arena Silver Medal",
    iconType: "star"
  }
];

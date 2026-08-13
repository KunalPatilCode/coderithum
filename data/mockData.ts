import {
  ClubEvent,
  ClubProject,
  GalleryAlbum,
  TeamMember,
  ClubAchievement,
} from "../types";

const withBasePath = (path: string) => {
  if (!path || path.startsWith("http") || path.startsWith("data:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

  return `${basePath}${normalizedPath}`;
};

export const initialEvents: ClubEvent[] = [
  {
    id: "registration-orientation-2026",
    title: "Club Member Registration & Orientation",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Welcome to CodeRhythm! Onboarding, team introduction, and core tech domain selections.",
    description: "Kick off the academic year 2026-2027 with our official onboarding session. Introduce yourself to the leadership team, understand the calendar roadmap, and select your primary learning track: AI, Web Development, App Development, or Cybersecurity.",
    date: "August 15, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Main Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Keynote speech by Dr. Avinash R. Chaudhari (Principal)",
      "10:45 AM - Introduction of the Core Committee & Mentors",
      "11:30 AM - Domain Tracks overview & syllabus reveal",
      "12:15 PM - Interactive Q&A and track registration"
    ],
    speakers: [
      {
        name: "Dr. Avinash R. Chaudhari",
        role: "Principal",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/register-2026",
    feedbackLink: "https://gecdaman.org.in/feedback/orientation",
    gallery: [],
    type: "upcoming",
    category: "orientation"
  },
  {
    id: "git-github-basics-2026",
    title: "Git & GitHub Basics + Team Formation",
    banner: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Master version control, repository sharing, and team collaboration fundamentals.",
    description: "Learn version control via Git command-line tools. Set up repositories, push local commits to GitHub, manage branches, and resolve basic merge conflicts. Finish the session by forming development groups for the semester.",
    date: "August 29, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, Computer Dept, GEC Daman",
    agenda: [
      "10:00 AM - Git Architecture & Local Commands",
      "11:00 AM - Connecting to GitHub & Remote Syncing",
      "11:45 AM - Working with Pull Requests & Branches",
      "12:30 PM - Team Matchmaking & Setup"
    ],
    speakers: [
      {
        name: "Md Ismile",
        role: "Chief Technical Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/git-basics",
    feedbackLink: "https://gecdaman.org.in/feedback/git",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "problem-solving-workshop-2026",
    title: "Problem Solving & Brainstorming Workshop",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Deconstruct complex problem statements and design engineering solutions.",
    description: "Develop algorithmic approaches to engineering obstacles. This interactive brainstorming session helps teams break down abstract briefs, formulate architecture flows, and draft pitch drafts for institute challenges.",
    date: "September 5, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Problem Identification Frameworks",
      "11:00 AM - Brainstorming Exercises & Idea Boards",
      "12:00 PM - Defining Tech Stacks for Solutions",
      "12:30 PM - Mentorship Reviews"
    ],
    speakers: [
      {
        name: "Aarav Sharma",
        role: "AI & GenAI Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/brainstorming",
    feedbackLink: "https://gecdaman.org.in/feedback/brainstorming",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "internal-sih-pitching-2026",
    title: "Internal SIH Hackathon & Idea Pitching",
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "The official screening round for representing GEC Daman at the Smart India Hackathon.",
    description: "Teams pitch digital and hardware prototypes targeting Ministry-defined problem statements. Evaluated by internal academic advisors and industry professionals to select top team nominations.",
    date: "September 19, 2026",
    time: "10:00 AM onwards",
    venue: "Main Tech Lab & Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Setup & Pitch Order Draw",
      "10:30 AM - Evaluation Round 1: Idea Pitch & Architecture",
      "01:30 PM - Lunch Break & Feedback Adjustment",
      "03:00 PM - Round 2: Demo & Working Concept Pitch",
      "05:00 PM - Winner Announcement & Nominations"
    ],
    speakers: [
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/sih-2026",
    feedbackLink: "https://gecdaman.org.in/feedback/sih",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "engineering-day-tech-2026",
    title: "Engineering Day Tech Session / PPT & Pitch Guidance",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Engineering celebrations featuring tech expert guidance and presentation workshops.",
    description: "Celebrate Engineering Day at GEC Daman! Learn how to construct powerful project slides, outline core engineering architectures, and deliver pitches that capture audience and investor attention.",
    date: "September 30, 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "02:00 PM - Engineering Day Celebration Ceremonies",
      "02:45 PM - Tech Keynote: Industry Pitch Standards",
      "03:45 PM - Interactive slide design workshop",
      "04:30 PM - Mock student pitches & advice"
    ],
    speakers: [
      {
        name: "Dr. Avinash R. Chaudhari",
        role: "Principal",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Ms. Dipika Ganpat Damania",
        role: "Faculty Advisor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/eng-day",
    feedbackLink: "https://gecdaman.org.in/feedback/eng-day",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "web-dev-bootcamp-2026",
    title: "Web Development Bootcamp (HTML, CSS, JavaScript)",
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Intensive training camp covering core frontend technologies and DOM manipulation.",
    description: "Dive deep into the fundamentals of building visual experiences for the browser. Learn standard HTML layouts, responsive modern styling rules with CSS Grid/Flexbox, and add logic with core Javascript.",
    date: "October 3, 2026",
    time: "10:00 AM - 04:30 PM",
    venue: "Computational Lab, Computer Engineering Block, GEC Daman",
    agenda: [
      "10:00 AM - Semantic HTML5 layouts & Web standards",
      "11:30 AM - CSS Grid, Flexbox, & Responsive design",
      "01:00 PM - Lunch Break",
      "02:00 PM - JavaScript fundamentals & DOM queries",
      "03:30 PM - Interactive Project: Personal Portfolio"
    ],
    speakers: [
      {
        name: "Nisha Patel",
        role: "Fullstack Web Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Maitri Patel",
        role: "Vice President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/web-bootcamp",
    feedbackLink: "https://gecdaman.org.in/feedback/web-bootcamp",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "mini-project-sprint-2026",
    title: "Mini Project Build Sprint",
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A day-long design sprint to build functional landing pages and browser modules.",
    description: "Accelerate your programming skills in this 7-hour hands-on coding sprint. Teams will select layout concepts, mock-up elements, and implement clean web interfaces with guidance from club developers.",
    date: "October 17, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - Design Briefing & Resource kits",
      "10:30 AM - Designing UI & wireframes",
      "12:00 PM - Core Development commencement",
      "03:30 PM - Deployment pipeline & configurations",
      "04:30 PM - Project showcases & reviews"
    ],
    speakers: [
      {
        name: "Md Ismile",
        role: "Chief Technical Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Rohan Verma",
        role: "Mobile App Development Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/mini-sprint",
    feedbackLink: "https://gecdaman.org.in/feedback/mini-sprint",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "group-discussion-review-2026",
    title: "Group Discussion & Code Review Session",
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Refactor codes, perform peer reviews, and review architectural patterns.",
    description: "Bring your laptop and code repos! This session introduces code reviews, architectural standards, clean coding standards, and collaborative debugging structures.",
    date: "October 31, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Computer Seminar Room, GEC Daman",
    agenda: [
      "10:00 AM - Presentation: What makes code clean?",
      "10:45 AM - Live peer-to-peer refactoring tests",
      "11:45 AM - Group review panels & security check",
      "12:30 PM - Mentor summary feedback"
    ],
    speakers: [
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/review-day",
    feedbackLink: "https://gecdaman.org.in/feedback/review-day",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "ai-prompt-eng-workshop-2026",
    title: "AI & Prompt Engineering Workshop",
    banner: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Explore LLMs, prompt formatting styles, and building basic GenAI tools.",
    description: "Learn to build products leveraging modern Artificial Intelligence. Understand context windows, zero-shot and few-shot prompt patterns, and how to query API models for text summaries and automation.",
    date: "November 7, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - AI & Large Language Models core mechanisms",
      "11:00 AM - Professional Prompt Engineering guidelines",
      "11:45 AM - Hands-on workshop: Calling model APIs",
      "12:30 PM - AI Project concepts review"
    ],
    speakers: [
      {
        name: "Aarav Sharma",
        role: "AI & GenAI Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Siddharth Mehta",
        role: "Data Science Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/ai-prompt",
    feedbackLink: "https://gecdaman.org.in/feedback/ai-prompt",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "cybersec-hacking-challenge-2026",
    title: "Cybersecurity Basics & Hacking Challenge",
    banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Introduction to penetration testing, threat detection, and mini CTF setups.",
    description: "Unlock the basic strategies of network security and web vulnerabilities. Learn to look for injection issues and security loops, followed by a mini Capture The Flag (CTF) security event.",
    date: "November 21, 2026",
    time: "10:00 AM - 02:00 PM",
    venue: "Server Lab, GEC Daman",
    agenda: [
      "10:00 AM - Foundations of Cybersecurity & Web vectors",
      "11:00 AM - Understanding OWASP Top 10 vulnerabilities",
      "12:00 PM - Mini-CTF hacking simulation setup",
      "01:30 PM - Threat analysis discussion & prizes"
    ],
    speakers: [
      {
        name: "Yash Trivedi",
        role: "Cybersecurity Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Ananya Gupta",
        role: "Cloud & DevOps Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/security-ctf",
    feedbackLink: "https://gecdaman.org.in/feedback/ctf",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "resume-portfolio-session-2026",
    title: "Resume, LinkedIn & Portfolio Building",
    banner: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Build profiles that stand out and establish an engineering brand.",
    description: "Learn how to format resumes for automated filters (ATS), craft impressive LinkedIn headers, write engaging bios, and build clean digital portfolios hosted directly on web portals.",
    date: "November 29, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - ATS-optimized resumes structures",
      "11:00 AM - Formatting LinkedIn profiles & networking rules",
      "11:45 AM - Hosting web portfolios on GitHub Pages",
      "12:30 PM - Live critiques & guidelines"
    ],
    speakers: [
      {
        name: "Purnima Upadhyay",
        role: "Incubator & Ops Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Abhishek Kumar",
        role: "Brand Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/portfolio-build",
    feedbackLink: "https://gecdaman.org.in/feedback/portfolio",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "gsoc-open-source-guide-2026",
    title: "GSoC & Open Source Contribution Guidance",
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A complete walkthrough on entering Google Summer of Code and public code bases.",
    description: "Understand the roadmap to contributing in open-source projects. Learn to find beginner-friendly issues, navigate codebase structures, write GSoC proposals, and establish communication with project leads.",
    date: "December 5, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - Open Source principles & repository searches",
      "10:45 AM - Writing project proposals & GSoC timelines",
      "11:30 AM - Panel discussion: Past GSoC candidates advice",
      "12:15 PM - Interactive Q&A"
    ],
    speakers: [
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Md Ismile",
        role: "Chief Technical Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/gsoc-guide",
    feedbackLink: "https://gecdaman.org.in/feedback/gsoc",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "open-source-sprint-2026",
    title: "Open Source Sprint: GitHub PRs",
    banner: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A hands-on coding sprint dedicated to raising and merging public pull requests.",
    description: "Collaborative event where student groups review active issues on GitHub repositories and submit pull requests (PRs). Focuses on clean commits, documentation changes, and code testing.",
    date: "December 19, 2026",
    time: "10:00 AM - 04:00 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - Brief: Validating repositories & issue triage",
      "10:45 AM - Working session: Live coding & patch writing",
      "01:00 PM - Lunch Break",
      "02:00 PM - Submitting PRs, reviewing commits, & resolving feedbacks",
      "03:30 PM - Success metrics check & certificate setup"
    ],
    speakers: [
      {
        name: "Nisha Patel",
        role: "Fullstack Web Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Ananya Gupta",
        role: "Cloud & DevOps Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/oss-sprint",
    feedbackLink: "https://gecdaman.org.in/feedback/oss-sprint",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "semester-showcase-review-2026",
    title: "Semester Project Showcase & Club Review",
    banner: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "End of semester showcase highlighting student concepts and club progress reviews.",
    description: "Present your semester prototypes in front of academic supervisors and peers. The session reviews the club's achievements, logs student feedback, and plans targets for the upcoming semester.",
    date: "December 31, 2026",
    time: "10:00 AM - 02:00 PM",
    venue: "Main Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Presentation of Student Projects (5 mins per team)",
      "12:00 PM - Review of CodeRhythm's semester objectives",
      "12:30 PM - Awarding Outstanding Student Contributor awards",
      "01:15 PM - High Tea & Networking"
    ],
    speakers: [
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Dr. Avinash R. Chaudhari",
        role: "Principal",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/semester-showcase",
    feedbackLink: "https://gecdaman.org.in/feedback/semester-showcase",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "ideathon-announcement-2027",
    title: "Ideathon 2027: Theme & Rules Release",
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Official release of problem categories, rules, and timelines for the annual ideathon.",
    description: "Launch of GEC Daman's Innovation Ideathon 2027! Find out about the major tracks, rules of eligibility, presentation parameters, and mentorship resources.",
    date: "January 2, 2027",
    time: "10:00 AM - 12:30 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Reveal of the Ideathon 2027 themes",
      "10:45 AM - Submission rules & presentation guidelines",
      "11:30 AM - Mentoring sessions layout & matchmaking",
      "12:00 PM - Open Q&A"
    ],
    speakers: [
      {
        name: "Purnima Upadhyay",
        role: "Incubator & Ops Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/ideathon-info",
    feedbackLink: "https://gecdaman.org.in/feedback/ideathon-info",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "ideathon-conduct-2027",
    title: "Ideathon Conduct: Pitching Round",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Annual ideathon pitching session focusing on startup and institutional solutions.",
    description: "The major ideathon presentation round. Teams present their pitch decks, target audiences, and initial structural wireframes in front of academic and startup guides.",
    date: "January 16, 2027",
    time: "09:30 AM onwards",
    venue: "Main Seminar Hall, GEC Daman",
    agenda: [
      "09:30 AM - Setup & Pitch Card Drawings",
      "10:00 AM - Presentation Phase 1: Startup & Business pitches",
      "01:00 PM - Lunch Break",
      "02:00 PM - Presentation Phase 2: Technical & Civic solutions",
      "05:00 PM - Summary from the Jury panel"
    ],
    speakers: [
      {
        name: "Dr. Avinash R. Chaudhari",
        role: "Principal",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/ideathon-pitch",
    feedbackLink: "https://gecdaman.org.in/feedback/ideathon-pitch",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "jury-feedback-presentation-2027",
    title: "Jury Feedback & Ideathon Winners",
    banner: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Announcement of winning teams and detailed feedback reviews from the jury.",
    description: "Wrapping up Ideathon 2027. Review constructive feedback from professional judges, understand next steps for incubation funding, and celebrate the winning proposals.",
    date: "January 30, 2027",
    time: "10:00 AM - 01:30 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Panel Review: Insights from the Judges",
      "11:00 AM - Award Announcement: Winners in Tech & Social tracks",
      "12:00 PM - Incubation roadmap and funding presentation",
      "12:45 PM - Congratulations & Photos"
    ],
    speakers: [
      {
        name: "Ms. Dipika Ganpat Damania",
        role: "Faculty Advisor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/ideathon-results",
    feedbackLink: "https://gecdaman.org.in/feedback/ideathon-results",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "dsa-cp-workshop-2027",
    title: "DSA & Competitive Programming Workshop",
    banner: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Master algorithms, time complexity, and data structure operations.",
    description: "Learn to analyze and resolve complex programming problems. Focuses on arrays, maps, recursion, binary tree traversals, and optimizing runtime performance in coding environments.",
    date: "February 6, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - Asymptotic notations & Array operations",
      "11:00 AM - Stack, Queue, and Map configurations",
      "11:45 AM - Recursion & DFS/BFS search rules",
      "12:30 PM - Sample Competitive Coding scenarios"
    ],
    speakers: [
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Md Ismile",
        role: "Chief Technical Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/dsa-camp",
    feedbackLink: "https://gecdaman.org.in/feedback/dsa-camp",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "coding-contest-2027",
    title: "CodeRhythm Coding Contest 2027",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Club-wide programming contest featuring beginner and intermediate challenge tiers.",
    description: "Compete against your peers in a 3-hour algorithmic challenge. Features test-suite evaluations on data modeling, logic, search optimization, and arithmetic puzzles.",
    date: "February 20, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Computer Labs, GEC Daman",
    agenda: [
      "10:00 AM - Contest lobby open & rule definitions",
      "10:15 AM - Logic problems & Array challenges launch",
      "11:30 AM - Intermediate Graph & Optimization problems",
      "01:00 PM - Submissions lock & preliminary rankings"
    ],
    speakers: [
      {
        name: "Nisha Patel",
        role: "Fullstack Web Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Siddharth Mehta",
        role: "Data Science Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/contest-2027",
    feedbackLink: "https://gecdaman.org.in/feedback/contest-2027",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "solution-discussion-optimization-2027",
    title: "Solution Discussion & CP Optimization",
    banner: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Review contest solutions, evaluate runtime failures, and learn advanced algorithms.",
    description: "Post-contest review session. We break down the optimal ways to solve each contest problem, map out time complexity improvements, and write cleaner algorithmic code.",
    date: "February 27, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Contest Leaderboard breakdown & reviews",
      "10:30 AM - Code walk-throughs for Beginner-level problems",
      "11:30 AM - Mathematical optimization for Intermediate problems",
      "12:30 PM - Q&A on time/space compromises"
    ],
    speakers: [
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Nisha Patel",
        role: "Fullstack Web Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/solution-review",
    feedbackLink: "https://gecdaman.org.in/feedback/solution-review",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "app-dev-workshop-2027",
    title: "App Development Workshop: Flutter",
    banner: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Introduction to cross-platform mobile app development with Dart & Flutter.",
    description: "Kickstart your mobile development journey! Learn Flutter widget architecture, UI compositions, reactive state updates, and compiling builds for Android devices.",
    date: "March 6, 2027",
    time: "10:00 AM - 04:30 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - Intro to Dart & Flutter frameworks",
      "11:30 AM - Styling with Widgets (Stateless vs Stateful)",
      "01:00 PM - Lunch Break",
      "02:00 PM - Managing State & Input components",
      "03:30 PM - Connecting to local storage & Emulator setup"
    ],
    speakers: [
      {
        name: "Rohan Verma",
        role: "Mobile App Development Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Priya Joshi",
        role: "UI/UX & Product Design Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/flutter-basics",
    feedbackLink: "https://gecdaman.org.in/feedback/flutter-basics",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "build-mini-app-challenge-2027",
    title: "Build-a-Mini-App Hackathon Challenge",
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A sprint to build and run functional app templates on mobile emulators.",
    description: "Put your Flutter concepts to test. Teams have 7 hours to build a functional tool (calculator, task manager, note taker) featuring custom layouts, data inputs, and screen transactions.",
    date: "March 20, 2027",
    time: "10:00 AM - 05:00 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - Briefing & Interface specifications",
      "10:30 AM - Structuring widget hierarchies",
      "12:00 PM - Core Flutter code implementation",
      "03:30 PM - Testing interfaces on emulators",
      "04:30 PM - Demo & judging round"
    ],
    speakers: [
      {
        name: "Rohan Verma",
        role: "Mobile App Development Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Md Ismile",
        role: "Chief Technical Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/app-challenge",
    feedbackLink: "https://gecdaman.org.in/feedback/app-challenge",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "uiux-review-deployment-2027",
    title: "UI/UX Review & App Deployment Guidance",
    banner: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Improve user interfaces, analyze navigation logic, and export APK modules.",
    description: "Polishing mobile apps for release. Learn user testing principles, clean up color systems, review animations, and export signed APK files for device distribution.",
    date: "March 27, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - Heuristics for mobile user experience",
      "10:45 AM - Peer testing & visual layouts feedback",
      "11:30 AM - App signing & APK production roadmap",
      "12:30 PM - Deployment best practices summary"
    ],
    speakers: [
      {
        name: "Priya Joshi",
        role: "UI/UX & Product Design Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Ananya Gupta",
        role: "Cloud & DevOps Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/app-deployment",
    feedbackLink: "https://gecdaman.org.in/feedback/app-deployment",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "backend-database-integration-2027",
    title: "Backend & Database Integration",
    banner: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Understand server architectures, API routing, and query configurations.",
    description: "Connect your frontends to databases. Learn about setting up Express.js server routes, designing database structures, writing SQL/NoSQL queries, and parsing requests.",
    date: "April 3, 2027",
    time: "10:00 AM - 04:30 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - REST API structure & Express setups",
      "11:30 AM - Designing relational tables & constraints",
      "01:00 PM - Lunch Break",
      "02:00 PM - Database connections & Query syntax",
      "03:30 PM - Integrating backend endpoints to React"
    ],
    speakers: [
      {
        name: "Nisha Patel",
        role: "Fullstack Web Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Ananya Gupta",
        role: "Cloud & DevOps Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/backend-basics",
    feedbackLink: "https://gecdaman.org.in/feedback/backend-basics",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "fullstack-mini-hackathon-2027",
    title: "Full-Stack Mini Hackathon",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "A 24-hour sprint to build connected web tools featuring database persistence.",
    description: "Develop connected fullstack modules! Teams will construct server paths, style dashboards, write schema entries, and deploy working concepts on cloud hosting.",
    date: "April 17, 2027",
    time: "09:30 AM onwards",
    venue: "Main Tech Lab, GEC Daman",
    agenda: [
      "09:30 AM - Briefing & database environments setup",
      "10:00 AM - Developing API architectures",
      "01:00 PM - Lunch Break",
      "02:00 PM - UI templates configuration & server linking",
      "04:30 PM - Live hosting & Jury pitching"
    ],
    speakers: [
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/fullstack-hack",
    feedbackLink: "https://gecdaman.org.in/feedback/fullstack-hack",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "industry-expert-alumni-interaction-2027",
    title: "Industry Expert & Alumni Interaction",
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Fireside chat with experienced engineering alumni working at top tech firms.",
    description: "Interact with GEC Daman alumni working in high-growth industries. Learn about recruitment trends, DevOps environments, and what skills are highly valued in modern software engineering.",
    date: "April 29, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Main Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Welcome speech & introductions",
      "10:30 AM - Panel discussion: Transitions from GEC to Tech Roles",
      "11:30 AM - Focus tracks: Cloud, AI, and Product lifecycles",
      "12:15 PM - Interactive Q&A and networking"
    ],
    speakers: [
      {
        name: "Dr. Avinash R. Chaudhari",
        role: "Principal",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/alumni-chat",
    feedbackLink: "https://gecdaman.org.in/feedback/alumni-chat",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "placement-web-react-session-2027",
    title: "Placement Prep: Web & React Session",
    banner: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Understand front-end interview patterns, React state loops, and system designs.",
    description: "Prepare for frontend engineering roles. Covers critical React interview concepts like rendering cycles, hooks, virtual DOM mechanics, and solving algorithmic UI tasks under pressure.",
    date: "May 1, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Key JavaScript and React concepts for interviews",
      "11:00 AM - Mock code reviews & state puzzles",
      "11:45 AM - System Design: Structuring scalable frontends",
      "12:30 PM - Q&A & Interview templates"
    ],
    speakers: [
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Nisha Patel",
        role: "Fullstack Web Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/placement-react",
    feedbackLink: "https://gecdaman.org.in/feedback/placement-react",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "mock-interviews-quiz-challenge-2027",
    title: "Mock Interviews & Tech Quiz Sprint",
    banner: "https://images.unsplash.com/photo-1521791136364-7098ec389f35?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Simulated peer-to-peer technical interviews, aptitude tests, and fast coding quiz rounds.",
    description: "Test your skills in simulated interviews. Participate in data structures challenges, resume evaluations, and quick-fire logic questionnaires evaluated by mock panels.",
    date: "May 15, 2027",
    time: "10:00 AM - 04:00 PM",
    venue: "Seminar Rooms, GEC Daman",
    agenda: [
      "10:00 AM - Aptitude & Logic MCQ screening test",
      "11:00 AM - Technical interview round 1 (Data Structures)",
      "01:00 PM - Lunch Break",
      "02:00 PM - Technical interview round 2 (System & Frontend)",
      "03:15 PM - Feedback sheets distribution & Top scorers reveal"
    ],
    speakers: [
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/interview-sprint",
    feedbackLink: "https://gecdaman.org.in/feedback/interview-sprint",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "career-guidance-internship-prep-2027",
    title: "Career Guidance & Internship Prep",
    banner: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Roadmap to landing software engineering internships, writing cold emails, and networking.",
    description: "A guidance session focused on off-campus job opportunities. Learn how to search for summer internships, write professional cold emails, build GitHub profiles that prove capability, and manage recruiter calls.",
    date: "May 29, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Finding off-campus summer opportunities",
      "10:45 AM - Cold emailing templates & follow-ups structures",
      "11:30 AM - Presentation: Tech portfolio checklist",
      "12:15 PM - Open Q&A & resources distribution"
    ],
    speakers: [
      {
        name: "Purnima Upadhyay",
        role: "Incubator & Ops Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Abhishek Kumar",
        role: "Brand Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/internship-prep",
    feedbackLink: "https://gecdaman.org.in/feedback/internship",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "advanced-github-apis-deployment-2027",
    title: "Advanced GitHub, APIs & Cloud Deployment",
    banner: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Understand webhook integrations, public api keys, and deployment pipelines.",
    description: "Learn how to manage cloud integrations. Understand how to write GitHub actions to test code automatically, fetch data from third-party services securely, and host applications on cloud platforms.",
    date: "June 5, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - Webhooks and API Security protocols",
      "11:00 AM - CI/CD fundamentals & GitHub workflows",
      "11:45 AM - Containerized hostings & server metrics",
      "12:30 PM - Deployment demos"
    ],
    speakers: [
      {
        name: "Ananya Gupta",
        role: "Cloud & DevOps Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Md Ismile",
        role: "Chief Technical Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/advanced-deploy",
    feedbackLink: "https://gecdaman.org.in/feedback/advanced-deploy",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "community-contribution-sprint-2027",
    title: "Community Contribution Sprint",
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Build local open-source tools solving real problems faced by civic or college departments.",
    description: "Use your skills for good! In this sprint, teams work on applications that solve problems in local college or municipal departments (e.g. inventory tracking, feedback modules, or roster charts).",
    date: "June 19, 2027",
    time: "10:00 AM - 05:00 PM",
    venue: "Computational Lab, GEC Daman",
    agenda: [
      "10:00 AM - Briefing: Local department challenges",
      "10:30 AM - Group assignments & architecture design",
      "12:00 PM - Development & coding sprints",
      "03:30 PM - UI integration & testing",
      "04:30 PM - Deployment of concepts"
    ],
    speakers: [
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Maitri Patel",
        role: "Vice President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/community-sprint",
    feedbackLink: "https://gecdaman.org.in/feedback/community-sprint",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "annual-documentation-report-prep-2027",
    title: "Annual Tech Documentation & Reporting",
    banner: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Compile technical reports, design system documentations, and project writeups.",
    description: "Learn to write documentation like a professional engineer. We compile repository READMEs, configure project wikis, detail system architectures, and draft CodeRhythm's official yearly report.",
    date: "June 30, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Computer Seminar Room, GEC Daman",
    agenda: [
      "10:00 AM - Rules of clear engineering documentations",
      "10:45 AM - Peer review of READMEs & Wikis",
      "11:30 AM - Drafting the CodeRhythm Annual Tech Report",
      "12:30 PM - Exporting documents & archiving"
    ],
    speakers: [
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Purnima Upadhyay",
        role: "Incubator & Ops Lead",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/docs-day",
    feedbackLink: "https://gecdaman.org.in/feedback/docs-day",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "sih-2027-awareness-team-formation",
    title: "SIH 2027 Awareness & Team Formation",
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Understand problem statement categories, timeline roadmaps, and build teams for SIH 2027.",
    description: "Kickstart preparation for the Smart India Hackathon 2027! Find out about Ministry statements, understand standard submission timelines, and form balanced teams (hardware & software components).",
    date: "July 3, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Overview of SIH 2027 guidelines",
      "10:45 AM - Deconstructing major problem statements",
      "11:30 AM - Networking and team matchmakings",
      "12:15 PM - Registration & submission guidelines"
    ],
    speakers: [
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/sih2027-info",
    feedbackLink: "https://gecdaman.org.in/feedback/sih2027-info",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "internal-sih-hackathon-prototype-2027",
    title: "Internal SIH Hackathon & Prototypes",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "GEC Daman's internal selection round pitching prototypes for SIH 2027.",
    description: "The primary internal screening hackathon. Teams demonstrate working prototypes, slide decks, and data flows to secure official nominations for GEC Daman at the national level.",
    date: "July 17, 2027",
    time: "09:30 AM onwards",
    venue: "Main Tech Lab & Seminar Hall, GEC Daman",
    agenda: [
      "09:30 AM - Setup & Pitching schedule reveal",
      "10:00 AM - Evaluation Round 1: Design & Architecture logic",
      "01:00 PM - Lunch Break",
      "02:00 PM - Evaluation Round 2: Demo & Working prototype showcase",
      "05:00 PM - Selected teams announcement & feedback panels"
    ],
    speakers: [
      {
        name: "Dr. Avinash R. Chaudhari",
        role: "Principal",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/sih-2027",
    feedbackLink: "https://gecdaman.org.in/feedback/sih2027",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "mentor-review-presentation-improvement-2027",
    title: "Mentor Review & Pitch Presentation Session",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Refining pitches and slide layouts based on mentor comments.",
    description: "Improve nominated SIH project submissions. Mentors guide student groups on clarifying their slide flows, adding metrics graphs, and delivering clear pitch statements.",
    date: "July 31, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Presentation rules from experienced mentors",
      "10:30 AM - Live team presentations & feedback loops",
      "11:45 AM - Slide layout refactoring workshops",
      "12:30 PM - Wrap up & registration checklists"
    ],
    speakers: [
      {
        name: "Ms. Dipika Ganpat Damania",
        role: "Faculty Advisor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/sih-refine",
    feedbackLink: "https://gecdaman.org.in/feedback/sih-refine",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "annual-project-expo-techfest-2027",
    title: "Annual Project Expo & TechFest 2027",
    banner: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "The major annual showcase demonstrating CodeRhythm projects to visitors and VIPs.",
    description: "CodeRhythm's flagship exhibition! Teams display interactive software solutions, IoT grids, mobile apps, and cybersecurity challenges to students, professors, and external industry representatives.",
    date: "August 7, 2027",
    time: "09:00 AM - 05:00 PM",
    venue: "GEC Daman Campus Exhibition Hall",
    agenda: [
      "09:00 AM - Exhibition Setup & VIP Welcome",
      "09:30 AM - Keynote Address: Technology & Local Impact",
      "10:15 AM - Public demo sessions and stall reviews",
      "01:00 PM - Lunch Break",
      "02:00 PM - Stall evaluations & open showcases",
      "04:00 PM - Best Project award ceremony"
    ],
    speakers: [
      {
        name: "Dr. Avinash R. Chaudhari",
        role: "Principal",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/expo-techfest",
    feedbackLink: "https://gecdaman.org.in/feedback/expo",
    gallery: [],
    type: "upcoming",
    category: "workshop"
  },
  {
    id: "core-team-evaluation-leadership-handover-2027",
    title: "Core Team Evaluation & Leadership Handover",
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Annual review of committee members and selection handover to the incoming lead group.",
    description: "Closing the academic year. Evaluates performance contributions, announces next year's core committee nominees, and hosts leadership handovers from outgoing officers.",
    date: "August 21, 2027",
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall, GEC Daman",
    agenda: [
      "10:00 AM - Outgoing Leads report & statistics presentation",
      "11:00 AM - Performance evaluations & recognition ceremony",
      "11:45 AM - Announcing the 2027-2028 Core Committee",
      "12:30 PM - Handover ceremonies & advice panels"
    ],
    speakers: [
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Kunal Patil",
        role: "Club President",
        company: "CodeRhythm Club",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/handover-2027",
    feedbackLink: "https://gecdaman.org.in/feedback/handover",
    gallery: [],
    type: "upcoming",
    category: "competition"
  },
  {
    id: "certificate-distribution-celebration-2027",
    title: "Certificate Distribution & Celebration Meet",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Wrap-up ceremony presenting member certifications and celebration lunch.",
    description: "Celebrate a year of builds, code, and collaborations! Distribution of participation and leadership certificates, followed by club photo shoots and a celebratory lunch.",
    date: "August 28, 2027",
    time: "11:00 AM - 03:00 PM",
    venue: "GEC Daman Campus Seminar Hall",
    agenda: [
      "11:00 AM - Annual achievements highlight reel",
      "11:30 AM - Certificate presentation for active members & leads",
      "01:00 PM - Celebratory Club Roster Group Photo",
      "01:30 PM - Lunch & celebratory conversations"
    ],
    speakers: [
      {
        name: "Dr. Avinash R. Chaudhari",
        role: "Principal",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
      },
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/celebration-2027",
    feedbackLink: "https://gecdaman.org.in/feedback/celebration",
    gallery: [],
    type: "upcoming",
    category: "special"
  },
  {
    id: "docker-kubernetes-basics",
    title: "Introduction to Docker Containers & Clouds",
    banner: "https://images.unsplash.com/photo-1484662020986-75935d2ebc66?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Mastering cloud deployment, containerization, and hosting architecture.",
    description: "A past workshop where students set up containerized environments, wrote Dockerfiles, configured environment grids, and deployed static server templates to cloud repositories. Guided step-by-step by CodeRhythm technical leads.",
    date: "March 15, 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Server & Network Lab, Computer Engineering Dept",
    agenda: [
      "02:00 PM - Containerization vs Virtualization basics",
      "03:00 PM - Writing your first Dockerfile",
      "04:00 PM - Docker Hub and cloud deploy grids"
    ],
    speakers: [
      {
        name: "Mrs. Hemali J. Damania",
        role: "Assistant Professor",
        company: "GEC Daman",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80"
      }
    ],
    regLink: "https://gecdaman.org.in/coderithum/docker-archive",
    feedbackLink: "https://gecdaman.org.in/feedback/docker",
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
    ],
    type: "past",
    category: "workshop"
  }
];

export const initialProjects: ClubProject[] = [
  {
    id: "gecdaman-redesign",
    title: "GEC Daman Portal Upgrade Initiative",
    banner:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    shortDesc:
      "A modern, lightning-fast static portal redesign concept for GEC Daman utilizing Next.js.",
    description:
      "Built by Coderithum members to conceptualize a faster, highly responsive official college portal. Features sub-second page loads, clean neobrutalist design parameters, integrated notice structures, and a mobile-friendly menu system for students to access syllabus, circulars, and departmental metrics.",
    techStack: [
      "Next.js 16",
      "Tailwind CSS v4",
      "TypeScript",
      "Framer Motion",
      "Lucide Icons",
    ],
    github: "https://github.com/Coderithum/gec-daman-concept",
    demo: "https://coderithum.github.io/gec-daman-concept/",
    mentor: "Mrs. Hemali J. Damania",
    team: [
      "Kunal Patil (Lead)",
      "Maitri Patel (Frontend)",
      "Kunal Damania (UI/UX)",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: "solar-telemetry",
    title: "Smart Solar Grid Telemetry System",
    banner:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    shortDesc:
      "An IoT dashboard tracking campus solar panel generation efficiency in real-time.",
    description:
      "An interdisciplinary project combining Electrical and Computer engineering domains. Captures real-time telemetry from GEC Daman campus solar cells using sensor arrays, parses data parameters locally, and projects generation efficiency onto a dashboard, sending anomaly warnings to administrative portals.",
    techStack: [
      "React",
      "Python",
      "Raspberry Pi",
      "MQTT",
      "Chart.js",
      "Tailwind CSS",
    ],
    github: "https://github.com/Coderithum/solar-grid-telemetry",
    demo: "https://coderithum.github.io/solar-grid-telemetry/",
    mentor: "Ms. Dipika Ganpat Damania (Electrical Dept)",
    team: [
      "Hardik Solanki (IoT Lead)",
      "Nisha Patel (Frontend Dev)",
      "Amit Halpati (Firmware)",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    ],
  },
];

export const initialAlbums: GalleryAlbum[] = [
  {
    id: "hackathons-album",
    name: "sih Grand finalist team 2025 Multimedia",
    cover: withBasePath("/sih_2025_cover.jpg"),
    coverStyle: {
      objectPosition: "center 15%",
    },
    media: [
      {
        url: withBasePath("/sih_2025_1.jpg"),
        caption: "Team CodeRhythm traveling to the Smart India Hackathon 2025 Grand Finale.",
      },
      {
        url: withBasePath("/sih_2025_2.jpg"),
        caption: "Team members displaying their official SIH 2025 Student Participant badges.",
      },
      {
        url: withBasePath("/sih_2025_3.jpg"),
        caption: "Celebrating on stage with the SIH 2025 Software Edition Finalist certificates.",
      },
      {
        url: withBasePath("/sih_2025_4.jpg"),
        caption: "CodeRhythm presenting their software prototype to the evaluation panel.",
      },
      {
        url: withBasePath("/sih_2025_5.jpg"),
        caption: "Smart India Hackathon 2025 group photo at Aryabhata Auditorium.",
      },
      {
        url: withBasePath("/sih_2025_6.jpg"),
        caption: "Team members collaborating and writing code during the 36-hour hackathon sprint.",
      },
      {
        url: withBasePath("/sih_2025_7.jpg"),
        caption: "Developing the frontend application and backend endpoints in the coding arena.",
      },
      {
        url: withBasePath("/sih_2025_8.jpg"),
        caption: "Team Multimedia posing together with their laptops in the SIH work lab.",
      },
      {
        url: withBasePath("/sih_2025_9.jpg"),
        caption: "Walkthrough of screens and features for the judges during the evaluation rounds.",
      },
      {
        url: withBasePath("/sih_2025_10.jpg"),
        caption: "Final integrations and testing of the system next to the team banner.",
      },
    ],
  },
  {
    id: "workshops-album",
    name: "Web Sprints & Bootcamps",
    cover:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    media: [
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        caption: "Mentors explaining Next.js layout configurations.",
      },
      {
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
        caption: "Hands-on UI development using Tailwind grid utilities.",
      },
    ],
  },
];

export const initialTeam: TeamMember[] = [
  {
    name: "Dr. Avinash R. Chaudhari",
    role: "Principal & Chief Patron",
    category: "Faculty",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Mrs. Hemali J. Damania",
    role: "Faculty Coordinator & Asst. Professor",
    category: "Faculty",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Ms. Dipika Ganpat Damania",
    role: "Faculty Advisor & Asst. Professor",
    category: "Faculty",
    avatar:
      "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?auto=format&fit=crop&w=150&h=150&q=80",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Kunal Patil",
    role: "Club President",
    category: "Leadership",
    avatar: withBasePath("/kunalp.png?v=13"),
    avatarStyle: { transform: "translate(6px, -46px) scale(2.0)" },
    github: "https://github.com/KunalPatilCode",
    linkedin:
      "https://www.linkedin.com/in/kunal-patil29?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Maitri Patel",
    role: "Vice President & UI/UX Head",
    category: "Leadership",
    avatar: withBasePath("/maitri.png?v=11"),
    avatarStyle: {
      objectPosition: "center 18%",
      transform: "translateY(18px) scale(1.3)",
    },
    github: "https://github.com/Maitrify",
    linkedin:
      "https://www.linkedin.com/in/maitri-patel-573927287?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Md Ismile",
    role: "Chief Technical Lead",
    category: "Technical",
    avatar: withBasePath("/ismile.png?v=12"),
    avatarStyle: {
      objectPosition: "center 16%",
      transform: "translate(-6px, 16px) scale(1.25)",
    },
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Aarav Sharma",
    role: "AI & GenAI Lead",
    category: "Technical",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Nisha Patel",
    role: "Fullstack Web Lead",
    category: "Technical",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Rohan Verma",
    role: "Mobile App Development Lead",
    category: "Technical",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Ananya Gupta",
    role: "Cloud & DevOps Lead",
    category: "Technical",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Yash Trivedi",
    role: "Cybersecurity Lead",
    category: "Technical",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Priya Joshi",
    role: "UI/UX & Product Design Lead",
    category: "Design",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Siddharth Mehta",
    role: "Data Science Lead",
    category: "Technical",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Purnima Upadhyay",
    role: "Incubator & Ops Lead",
    category: "Leadership",
    avatar: withBasePath("/purnima.png?v=1"),
    avatarStyle: {
      objectPosition: "center 24%",
      transform: "translateY(4px) scale(1.0)",
    },
    github: "https://github.com",
    linkedin:
      "https://www.linkedin.com/in/purnima-upadhyay-0902b12b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Abhishek Kumar",
    role: "Marketing & Outreach (Brand Lead)",
    category: "Marketing",
    avatar: "/abhishek-kumar.png",
    avatarStyle: {
      objectPosition: "center 20%",
      transform: "translateY(-2px) scale(1.24)",
    },
    linkedin: "https://linkedin.com",
  },
  {
    name: "Aaryan Patel",
    role: "Marketing & Outreach (Outreach Lead)",
    category: "Marketing",
    avatar: withBasePath("/aaryan-patel.png"),
    avatarStyle: {
      objectPosition: "center 10%",
      transform: "translateY(18px) scale(1.25)",
    },
    linkedin: "https://linkedin.com",
  },
  {
    name: "Karan Shah",
    role: "Product Management Lead",
    category: "Leadership",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Neha Sharma",
    role: "IPR & Patent Support Lead",
    category: "Technical",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Rohan Das",
    role: "Treasury & Resource Lead",
    category: "Leadership",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Sneha Iyer",
    role: "Creative & Design Lead",
    category: "Design",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Kabir Mehta",
    role: "Public Relations Lead",
    category: "Marketing",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Riya Patel",
    role: "Sponsorship & Corporate Relations Lead",
    category: "Marketing",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&h=150&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  }
];

export const initialAchievements: ClubAchievement[] = [
  {
    id: "ach-1",
    title: "Winners of SIH 2025 Regional Round",
    description:
      "GEC Daman core coding cohort representing Coderithum secured 1st prize at the Smart India Hackathon 2025 Regional selection for the solar grid efficiency problem statement.",
    date: "December 2025",
    recipient: "Team Coderithum GEC (Rajesh, Maitri, Hardik)",
    award: "Smart India Hackathon Gold Trophy",
    iconType: "trophy",
  },
  {
    id: "ach-2",
    title: "GTU TechFest Coding Challenge Winner",
    description:
      "Coderithum technical leads secured top positions at Gujarat Technological University (GTU) Techfest's competitive coding challenge.",
    date: "March 2026",
    recipient: "Kunal Patil & Nisha Patel",
    award: "GTU Coding Challenge Certificate of Excellence",
    iconType: "star",
  },
  {
    id: "ach-3",
    title: "First Runner-up at Robotics Design Sprint",
    description:
      "Designed a lightweight pathfinder sensor grid bot navigating the GTU tech grid maze in record efficiency.",
    date: "April 2026",
    recipient: "Robotics Sub-division, GEC Daman",
    award: "Robotics Arena Silver Medal",
    iconType: "star",
  },
];

export interface ClubEvent {
  id: string;
  title: string;
  banner: string;
  description: string;
  shortDesc: string;
  date: string;
  time: string;
  venue: string;
  agenda: string[];
  speakers: { name: string; role: string; company: string; avatar: string }[];
  regLink: string;
  feedbackLink: string;
  gallery: string[];
  type: "upcoming" | "past";
  category?: "workshop" | "competition" | "special" | "orientation";
}

export interface ClubProject {
  id: string;
  title: string;
  banner: string;
  description: string;
  shortDesc: string;
  techStack: string[];
  github: string;
  demo: string;
  mentor: string;
  team: string[];
  gallery: string[];
}

export interface GalleryAlbum {
  id: string;
  name: string;
  cover: string;
  media: { url: string; caption: string; isVideo?: boolean }[];
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  category: "Faculty" | "Leadership" | "Technical" | "Design" | "Marketing";
  avatar: string;
  avatarClassName?: string;
  avatarStyle?: React.CSSProperties;
  github?: string;
  linkedin?: string;
  academicYear?: string; // e.g. "2026-2027", "2025-2026"
  tierLevel?: 1 | 2 | 3 | 4; // 1: Faculty/Mentor, 2: President/Exec, 3: Track Lead, 4: Core Member
  reportsTo?: string; // Parent lead name
  photoPosition?: {
    scale?: number;
    offsetX?: number;
    offsetY?: number;
    objectPosition?: string;
  };
}

export interface ClubAchievement {
  id: string;
  title: string;
  description: string;
  date: string;
  recipient: string;
  award: string;
  iconType: "trophy" | "paper" | "star";
}

export interface HeroThemeConfig {
  presetId: string;
  badgeText: string;
  title: string;
  highlightTitle: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundStyle: "pixel-art" | "cyber-grid" | "cosmic-particles" | "gradient-wave";
  accentColor: string; // e.g. "#2563eb", "#059669", "#7c3aed", "#e11d48", "#d97706"
  layoutStyle: "full-bleed" | "split" | "centered" | "minimal";
  bannerImage: string;
  showUpcomingList: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  badge: string;
  date: string;
  linkedEventId: string | null;
  status: "active" | "draft" | "archived";
  isPinned: boolean;
  priority: "high" | "normal";
}


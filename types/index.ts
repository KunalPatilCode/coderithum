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
  name: string;
  role: string;
  category: "Faculty" | "Leadership" | "Technical" | "Design" | "Marketing";
  avatar: string;
  github?: string;
  linkedin?: string;
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

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
  coverStyle?: React.CSSProperties;
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
    objectFit?: "cover" | "contain" | "fill";
  };
}

export function getMemberAvatarStyle(member?: Partial<TeamMember> | null): React.CSSProperties {
  if (!member) return { objectPosition: "center center", objectFit: "cover" };

  if (member.photoPosition) {
    const { scale = 1, offsetX = 0, offsetY = 0, objectPosition = "center center", objectFit = "cover" } = member.photoPosition;
    const xStr = typeof offsetX === "number" ? `${offsetX}%` : offsetX;
    const yStr = typeof offsetY === "number" ? `${offsetY}%` : offsetY;
    return {
      objectFit: objectFit || "cover",
      objectPosition: objectPosition || "center center",
      transform: `scale(${scale}) translate(${xStr}, ${yStr})`,
      transformOrigin: "center center",
    };
  }

  if (member.avatarStyle) {
    const styleObj = { ...member.avatarStyle };
    if (!styleObj.objectFit) {
      styleObj.objectFit = "cover";
    }
    if (typeof styleObj.transform === "string" && styleObj.transform.includes("px")) {
      styleObj.transform = styleObj.transform.replace(/translate\([^)]+\)/g, (match) => {
        return match.replace(/(-?\d+)px/g, (_, num) => {
          const val = parseInt(num, 10);
          const pct = Math.sign(val) * Math.min(Math.abs(val) / 4, 15);
          return `${pct.toFixed(0)}%`;
        });
      });
    }
    return styleObj;
  }

  return {
    objectFit: "cover",
    objectPosition: "center center",
  };
}

export function broadcastDataChange(key: string, data: any) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error(`Storage error saving ${key}:`, err);
    }
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("coderithum_data_sync", { detail: { key, data } }));
    window.dispatchEvent(new CustomEvent(`${key.replace("coderithum_", "")}_updated`, { detail: data }));
  }
}

export function getMemberTierLevel(member?: Partial<TeamMember> | null): 1 | 2 | 3 | 4 {
  if (!member) return 4;
  if (member.tierLevel && [1, 2, 3, 4].includes(member.tierLevel)) {
    return member.tierLevel;
  }
  const roleLower = (member.role || "").toLowerCase();
  if (roleLower.includes("principal")) return 1;
  if (member.category === "Faculty") return 2;
  if (member.category === "Leadership" || roleLower.includes("president") || roleLower.includes("chair")) {
    return 2;
  }
  if (roleLower.includes("lead") || roleLower.includes("director") || roleLower.includes("head")) {
    return 3;
  }
  return 4;
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


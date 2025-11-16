import axios from "axios";

/**
 * Base URL for your backend.
 * In production (Netlify), set REACT_APP_BACKEND_URL in env, e.g.:
 * https://your-backend-domain.com
 */
const BASE = process.env.REACT_APP_BACKEND_URL;
export const API_BASE = BASE ? `${BASE}/api` : null;

// Axios instance – will use baseURL only when backend is configured
export const api = axios.create({
  baseURL: API_BASE || undefined,
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

/**
 * --- Fallback demo data ---
 * Used when:
 * - No backend URL is configured, or
 * - Requests fail (e.g. CORS blocked from Netlify to Emergent preview)
 */

const fallbackServices = [
  {
    id: 1,
    name: "Websites & Landing Pages",
    description:
      "High-converting marketing sites, product pages, and brand experiences built with modern stacks.",
  },
  {
    id: 2,
    name: "Web Apps & Dashboards",
    description:
      "Custom portals, admin panels, and dashboards tailored to your internal workflows.",
  },
  {
    id: 3,
    name: "Automation & AI",
    description:
      "Chatbots, workflow automation, and AI-powered tools that remove repetitive manual work.",
  },
];

const fallbackProjects = [
  {
    id: 1,
    slug: "athleland-platform",
    title: "Athleland – Fitness Platform",
    short_description:
      "Class bookings, programs, and sponsorship management for a modern fitness brand.",
    tag: "Web App",
  },
  {
    id: 2,
    slug: "prcs-ngo-site",
    title: "PRCS – NGO Website",
    short_description:
      "A clean, trust-focused website for a humanitarian organization.",
    tag: "Corporate Site",
  },
  {
    id: 3,
    slug: "spanish-pizza",
    title: "The Spanish Pizza",
    short_description:
      "Brand site and ordering experience for a desi–Spanish pizza concept.",
    tag: "F&B",
  },
];

const fallbackSettings = {
  hero_title: "We design, build, and automate your digital presence.",
  hero_subtitle:
    "Elegant websites, robust apps, and smart automations for modern brands.",
};

// Helper: is backend actually configured?
const backendConfigured = typeof API_BASE === "string" && API_BASE.startsWith("http");

/* ------------------ AUTH API (same as before) ------------------ */

export const AuthAPI = {
  async login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },
  async me() {
    const { data } = await api.get("/auth/me");
    return data;
  },
};

/* ------------------ PUBLIC API (with fallbacks) ------------------ */

export const PublicAPI = {
  settings: async () => {
    if (!backendConfigured) return fallbackSettings;
    try {
      const { data } = await api.get("/settings");
      return data;
    } catch (e) {
      console.warn("Falling back to local settings", e);
      return fallbackSettings;
    }
  },

  services: async () => {
    if (!backendConfigured) return fallbackServices;
    try {
      const { data } = await api.get("/services");
      return data;
    } catch (e) {
      console.warn("Falling back to local services", e);
      return fallbackServices;
    }
  },

  projects: async () => {
    if (!backendConfigured) return fallbackProjects;
    try {
      const { data } = await api.get("/projects");
      return data;
    } catch (e) {
      console.warn("Falling back to local projects", e);
      return fallbackProjects;
    }
  },

  projectBySlug: async (slug) => {
    if (!backendConfigured) {
      return (
        fallbackProjects.find((p) => p.slug === slug) || fallbackProjects[0]
      );
    }
    const { data } = await api.get(`/projects/${slug}`);
    return data;
  },

  posts: async () => {
    if (!backendConfigured) return [];
    const { data } = await api.get("/blog");
    return data;
  },

  contact: async (payload) => {
    if (!backendConfigured) {
      console.warn(
        "Contact form submitted in demo mode (no backend configured). Payload:",
        payload
      );
      return { ok: true };
    }
    const { data } = await api.post("/contact", payload);
    return data;
  },
};

/* ------------------ ADMIN API (unchanged – requires real backend) ------------------ */

export const AdminAPI = {
  // stats
  stats: async () => (await api.get("/admin/stats")).data,

  // services
  listServices: async () => (await api.get("/admin/services")).data,
  upsertService: async (svc) =>
    svc.id
      ? (await api.put(`/admin/services/${svc.id}`, svc)).data
      : (await api.post("/admin/services", svc)).data,
  deleteService: async (id) =>
    (await api.delete(`/admin/services/${id}`)).data,

  // projects
  listProjects: async () => (await api.get("/admin/projects")).data,
  upsertProject: async (p) =>
    p.id
      ? (await api.put(`/admin/projects/${p.id}`, p)).data
      : (await api.post("/admin/projects", p)).data,
  deleteProject: async (id) =>
    (await api.delete(`/admin/projects/${id}`)).data,

  // skills
  listSkills: async () => (await api.get("/admin/skills")).data,
  upsertSkill: async (s) =>
    s.id
      ? (await api.put(`/admin/skills/${s.id}`, s)).data
      : (await api.post("/admin/skills", s)).data,
  deleteSkill: async (id) =>
    (await api.delete(`/admin/skills/${id}`)).data,

  // posts
  listPosts: async () => (await api.get("/admin/posts")).data,
  upsertPost: async (p) =>
    p.id
      ? (await api.put(`/admin/posts/${p.id}`, p)).data
      : (await api.post("/admin/posts", p)).data,
  deletePost: async (id) =>
    (await api.delete(`/admin/posts/${id}`)).data,

  // settings
  getSettings: async () => (await api.get("/settings")).data,
  updateSettings: async (s) => (await api.put("/admin/settings", s)).data,

  // inquiries
  listInquiries: async () => (await api.get("/admin/inquiries")).data,
  setInquiryStatus: async (id, status) =>
    (await api.put(`/admin/inquiries/${id}/status`, { status })).data,
};

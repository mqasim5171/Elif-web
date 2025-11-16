import axios from 'axios';

const BASE = process.env.REACT_APP_BACKEND_URL;
export const API_BASE = `${BASE}/api`;

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token');
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export const AuthAPI = {
  async login(email, password){
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  async me(){
    const { data } = await api.get('/auth/me');
    return data;
  },
};

export const PublicAPI = {
  settings: async () => (await api.get('/settings')).data,
  services: async () => (await api.get('/services')).data,
  projects: async () => (await api.get('/projects')).data,
  projectBySlug: async (slug) => (await api.get(`/projects/${slug}`)).data,
  posts: async () => (await api.get('/blog')).data,
  contact: async (payload) => (await api.post('/contact', payload)).data,
};

export const AdminAPI = {
  stats: async () => (await api.get('/admin/stats')).data,
  // services
  listServices: async () => (await api.get('/admin/services')).data,
  upsertService: async (svc) =>
    svc.id ? (await api.put(`/admin/services/${svc.id}`, svc)).data : (await api.post('/admin/services', svc)).data,
  deleteService: async (id) => (await api.delete(`/admin/services/${id}`)).data,
  // projects
  listProjects: async () => (await api.get('/admin/projects')).data,
  upsertProject: async (p) =>
    p.id ? (await api.put(`/admin/projects/${p.id}`, p)).data : (await api.post('/admin/projects', p)).data,
  deleteProject: async (id) => (await api.delete(`/admin/projects/${id}`)).data,
  // skills
  listSkills: async () => (await api.get('/admin/skills')).data,
  upsertSkill: async (s) => s.id ? (await api.put(`/admin/skills/${s.id}`, s)).data : (await api.post('/admin/skills', s)).data,
  deleteSkill: async (id) => (await api.delete(`/admin/skills/${id}`)).data,
  // posts
  listPosts: async () => (await api.get('/admin/posts')).data,
  upsertPost: async (p) => p.id ? (await api.put(`/admin/posts/${p.id}`, p)).data : (await api.post('/admin/posts', p)).data,
  deletePost: async (id) => (await api.delete(`/admin/posts/${id}`)).data,
  // settings
  getSettings: async () => (await api.get('/settings')).data,
  updateSettings: async (s) => (await api.put('/admin/settings', s)).data,
  // inquiries
  listInquiries: async () => (await api.get('/admin/inquiries')).data,
  setInquiryStatus: async (id, status) => (await api.put(`/admin/inquiries/${id}/status`, { status })).data,
};

import type { Idea, Request, User } from '../types';

type Reward = {
  id: string;
  points: number;
};

const rewards: Reward[] = [
  { id: '1', points: 100 },
  { id: '2', points: 300 },
  { id: '3', points: 50 },
  { id: '4', points: 200 },
  { id: '5', points: 150 },
  { id: '6', points: 400 },
  { id: '7', points: 120 },
];

let requests: Request[] = [];
let ideas: Idea[] = [];

export const mockDb = {
  rewards,
  getRequests: () => requests,
  setRequests: (next: Request[]) => {
    requests = next;
  },
  addRequest: (req: Request) => {
    requests = [req, ...requests];
  },
  getRequestById: (id: string) => requests.find((r) => r.id === id) ?? null,
  addIdea: (idea: Idea) => {
    ideas = [idea, ...ideas];
  },
  getIdeas: () => ideas,
};

export const createRequestId = () => {
  const rnd = Math.floor(100 + Math.random() * 900);
  const year = new Date().getFullYear();
  return `REQ-${year}-${rnd}`;
};

export const createIdeaReference = () => {
  const rnd = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `IDEA-${year}-${rnd}`;
};

export const createVoucherCode = () => {
  return `ATH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
};

export const toDisplayName = (user: User | null) => {
  if (!user?.name) return 'Guest';
  return user.name;
};

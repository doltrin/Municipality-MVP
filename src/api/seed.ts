import { env } from '../env';
import type { Request } from '../types';
import { mockDb } from './mockDb';

export function seedMockData() {
  if (!env.demoMode) return;
  if (mockDb.getRequests().length > 0) return;

  const now = new Date();
  const iso = (d: Date) => d.toISOString();

  const seeded: Request[] = [
    {
      id: 'REQ-2025-892',
      title: 'Pothole / Road Damage',
      description: 'Large pothole in the middle of the road causing traffic issues.',
      status: 'in_progress',
      category: 'pothole',
      location: 'Ag. Meletiou 132',
      createdAt: iso(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)),
      updatedAt: iso(new Date(now.getTime() - 2 * 60 * 60 * 1000)),
      images: [],
    },
    {
      id: 'REQ-2025-741',
      title: 'Garbage / Cleaning',
      description: 'Bulky waste pickup requested.',
      status: 'pending',
      category: 'garbage',
      location: 'Home Address',
      createdAt: iso(new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)),
      updatedAt: iso(new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)),
      images: [],
    },
  ];

  mockDb.setRequests(seeded);
}

import type { ApiResponse, Idea, Request, User } from '../types';
import { env } from '../env';
import type {
  CreateRequestInput,
  CreateRequestResult,
  GetMeResult,
  ListRequestsResult,
  RedeemRewardInput,
  RedeemRewardResult,
  SubmitIdeaInput,
  SubmitIdeaResult,
} from './dto';
import { createIdeaReference, createRequestId, createVoucherCode, mockDb } from './mockDb';

type HttpMethod = 'GET' | 'POST';

async function http<T>(path: string, method: HttpMethod, body?: unknown): Promise<ApiResponse<T>> {
  const url = `${env.apiBaseUrl}${path}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    return {
      success: false,
      data: null,
      error: `HTTP ${res.status}`,
      message: res.statusText,
    };
  }

  return (await res.json()) as ApiResponse<T>;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nowIso() {
  return new Date().toISOString();
}

export const api = {
  async getMe(): Promise<ApiResponse<GetMeResult>> {
    if (!env.apiBaseUrl) {
      return { success: true, data: { user: null } };
    }
    return http<GetMeResult>('/me', 'GET');
  },

  async createRequest(input: CreateRequestInput): Promise<ApiResponse<CreateRequestResult>> {
    if (env.apiBaseUrl) {
      return http<CreateRequestResult>('/requests', 'POST', input);
    }

    await delay(600);

    const request: Request = {
      id: createRequestId(),
      title: input.category,
      description: input.description,
      status: 'pending',
      category: input.category,
      location: input.location,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      images: input.images ?? [],
    };

    mockDb.addRequest(request);
    return { success: true, data: { request } };
  },

  async listRequests(): Promise<ApiResponse<ListRequestsResult>> {
    if (env.apiBaseUrl) {
      return http<ListRequestsResult>('/requests', 'GET');
    }

    await delay(250);
    return { success: true, data: { requests: mockDb.getRequests() } };
  },

  async getRequestById(id: string): Promise<ApiResponse<{ request: Request | null }>> {
    if (env.apiBaseUrl) {
      return http<{ request: Request | null }>(`/requests/${encodeURIComponent(id)}`, 'GET');
    }

    await delay(150);
    return { success: true, data: { request: mockDb.getRequestById(id) } };
  },

  async submitIdea(input: SubmitIdeaInput): Promise<ApiResponse<SubmitIdeaResult>> {
    if (env.apiBaseUrl) {
      return http<SubmitIdeaResult>('/ideas', 'POST', input);
    }

    await delay(700);

    const reference = createIdeaReference();
    const idea: Idea = {
      id: reference,
      title: input.title,
      description: input.description,
      category: input.category,
      location: input.location,
      author: 'Anonymous',
      date: nowIso(),
      likes: 0,
      comments: 0,
      status: 'pending',
    };

    mockDb.addIdea(idea);
    return { success: true, data: { reference, idea } };
  },

  async redeemReward(input: RedeemRewardInput, user: User | null): Promise<ApiResponse<RedeemRewardResult>> {
    if (env.apiBaseUrl) {
      return http<RedeemRewardResult>('/rewards/redeem', 'POST', input);
    }

    await delay(600);

    const reward = mockDb.rewards.find((r) => r.id === input.rewardId);
    if (!reward) {
      return { success: false, data: null, error: 'Unknown reward' };
    }

    const current = user?.points ?? 0;
    if (current < reward.points) {
      return { success: false, data: null, error: 'Insufficient points' };
    }

    return {
      success: true,
      data: {
        newPointsBalance: current - reward.points,
        voucherCode: createVoucherCode(),
      },
    };
  },
};

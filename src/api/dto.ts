import type { ApiResponse, Idea, Request, User } from '../types';

export type ApiOk<T> = ApiResponse<T>;

export type CreateRequestInput = {
  category: string;
  description: string;
  location: string;
  images?: string[];
};

export type CreateRequestResult = {
  request: Request;
};

export type ListRequestsResult = {
  requests: Request[];
};

export type SubmitIdeaInput = {
  title: string;
  description: string;
  category: string;
  location: string;
  images?: string[];
};

export type SubmitIdeaResult = {
  reference: string;
  idea?: Idea;
};

export type RedeemRewardInput = {
  rewardId: string;
};

export type RedeemRewardResult = {
  newPointsBalance: number;
  voucherCode: string;
};

export type GetMeResult = {
  user: User | null;
};

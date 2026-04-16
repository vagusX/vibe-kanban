import { useContext } from 'react';
import { createHmrContext } from '@/shared/lib/hmrContext';

export interface PlanReviewComment {
  id: string;
  selectedText: string;
  comment: string;
}

interface PlanReviewContextType {
  comments: PlanReviewComment[];
  addComment: (comment: Omit<PlanReviewComment, 'id'>) => void;
  clearComments: () => void;
  generatePlanReviewMarkdown: () => string;
}

export const PlanReviewContext = createHmrContext<PlanReviewContextType | null>(
  'PlanReviewContext',
  null
);

export function usePlanReview() {
  const context = useContext(PlanReviewContext);
  if (!context) {
    throw new Error('usePlanReview must be used within a PlanReviewProvider');
  }
  return context;
}

export function usePlanReviewOptional() {
  return useContext(PlanReviewContext);
}

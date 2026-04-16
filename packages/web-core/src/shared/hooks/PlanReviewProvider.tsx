import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { genId } from '@/shared/lib/id';
import {
  PlanReviewContext,
  type PlanReviewComment,
} from '@/shared/hooks/usePlanReview';

export function PlanReviewProvider({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId?: string;
}) {
  const [comments, setComments] = useState<PlanReviewComment[]>([]);

  const addComment = useCallback(
    (comment: Omit<PlanReviewComment, 'id'>) => {
      const next: PlanReviewComment = { ...comment, id: genId() };
      setComments((prev) => [...prev, next]);
    },
    []
  );

  const clearComments = useCallback(() => {
    setComments([]);
  }, []);

  useEffect(() => {
    return () => clearComments();
  }, [workspaceId, clearComments]);

  const generatePlanReviewMarkdown = useCallback(() => {
    if (comments.length === 0) return '';

    const body = comments
      .map((comment, index) => {
        const escapedSelection = comment.selectedText
          .split('\n')
          .map((line) => `> ${line}`)
          .join('\n');
        return `### Plan Comment ${index + 1}\n${escapedSelection}\n\n- Feedback: ${comment.comment.trim()}`;
      })
      .join('\n\n');

    return `## Plan Review Comments (${comments.length})\n\n${body}`;
  }, [comments]);

  const contextValue = useMemo(
    () => ({
      comments,
      addComment,
      clearComments,
      generatePlanReviewMarkdown,
    }),
    [comments, addComment, clearComments, generatePlanReviewMarkdown]
  );

  return (
    <PlanReviewContext.Provider value={contextValue}>
      {children}
    </PlanReviewContext.Provider>
  );
}

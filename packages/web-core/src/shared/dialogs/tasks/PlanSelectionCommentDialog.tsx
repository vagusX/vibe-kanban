import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@vibe/ui/components/KeyboardDialog';
import { Button } from '@vibe/ui/components/Button';
import { Input } from '@vibe/ui/components/Input';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { defineModal } from '@/shared/lib/modals';

export interface PlanSelectionCommentDialogProps {
  selectedText: string;
}

export type PlanSelectionCommentDialogResult =
  | { action: 'confirmed'; comment: string }
  | { action: 'canceled' };

const PlanSelectionCommentDialogImpl =
  NiceModal.create<PlanSelectionCommentDialogProps>(({ selectedText }) => {
    const modal = useModal();
    const { t } = useTranslation(['tasks', 'common']);
    const [comment, setComment] = useState('');

    useEffect(() => {
      if (modal.visible) {
        setComment('');
      }
    }, [modal.visible]);

    const handleCancel = () => {
      modal.resolve({ action: 'canceled' } as PlanSelectionCommentDialogResult);
      modal.hide();
    };

    const handleConfirm = () => {
      const trimmed = comment.trim();
      if (!trimmed) return;
      modal.resolve({
        action: 'confirmed',
        comment: trimmed,
      } as PlanSelectionCommentDialogResult);
      modal.hide();
    };

    return (
      <Dialog open={modal.visible} onOpenChange={handleCancel}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {t('conversation.planComments.dialogTitle')}
            </DialogTitle>
            <DialogDescription>
              {t('conversation.planComments.dialogDescription')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="rounded-sm border bg-muted/40 p-2 text-sm text-low whitespace-pre-wrap max-h-28 overflow-auto">
              {selectedText}
            </div>
            <Input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder={t('common:comments.addPlaceholder')}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleConfirm();
                }
              }}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              {t('common:buttons.cancel')}
            </Button>
            <Button onClick={handleConfirm} disabled={!comment.trim()}>
              {t('common:buttons.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  });

export const PlanSelectionCommentDialog = defineModal<
  PlanSelectionCommentDialogProps,
  PlanSelectionCommentDialogResult
>(PlanSelectionCommentDialogImpl);

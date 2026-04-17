import { SpinnerIcon, type Icon } from '@phosphor-icons/react';
import { cn } from '../lib/cn';
import { Button } from './Button';

interface PrimaryButtonProps {
  variant?: 'default' | 'secondary' | 'tertiary';
  actionIcon?: Icon | 'spinner';
  value?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function PrimaryButton({
  variant = 'default',
  actionIcon: ActionIcon,
  value,
  onClick,
  disabled,
  children,
  className,
}: PrimaryButtonProps) {
  let resolvedVariant: 'default' | 'secondary' | 'ghost' | 'outline' = 'default';
  if (disabled) {
    resolvedVariant = 'outline';
  } else if (variant === 'tertiary') {
    resolvedVariant = 'ghost';
  } else if (variant === 'secondary') {
    resolvedVariant = 'secondary';
  }

  return (
    <Button
      variant={resolvedVariant}
      className={cn('gap-2 font-normal', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
      {children}
      {ActionIcon ? (
        ActionIcon === 'spinner' ? (
          <SpinnerIcon className={'size-icon-sm animate-spin'} weight="bold" />
        ) : (
          <ActionIcon className={'size-icon-xs'} weight="bold" />
        )
      ) : null}
    </Button>
  );
}

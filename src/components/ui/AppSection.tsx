import { cn } from '@/lib/utils/cn.utils';
import { Spinner } from './shadcn/spinner';

type AppSectionProps = {
  title: string;
  rightHeader?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export default function AppSection({
  title,
  rightHeader,
  children,
  className,
  isLoading,
  isError,
  errorMessage = 'Terjadi kesalahan.',
}: AppSectionProps) {
  const renderContent = () => {
    if (isLoading)
      return (
        <div className="flex h-full w-full items-center justify-center gap-2">
          <Spinner className="size-4" />
          <p>Sedang memuat...</p>
        </div>
      );

    if (isError)
      return (
        <div className="text-destructive flex h-full w-full items-center justify-center">
          <p>{errorMessage}</p>
        </div>
      );

    return children;
  };

  return (
    <div className="flex w-full flex-col gap-5">
      {/* Header */}
      <div className="flex w-full items-center gap-2">
        <h4 className="whitespace-nowrap">{title}</h4>
        <div className="bg-border h-px flex-1" />
        {rightHeader}
      </div>

      {/* Content */}
      <div className={cn('h-full w-full', className)}>{renderContent()}</div>
    </div>
  );
}

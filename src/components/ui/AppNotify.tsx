import { Loader2, X } from 'lucide-react';
import { BsInfoLg } from 'react-icons/bs';
import { IoAlert, IoCheckmark, IoClose } from 'react-icons/io5';
import { toast, ToastContentProps, ToastOptions } from 'react-toastify';

type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';

// interface ToastPayload {
//   title: string;
//   description?: string;
//   variant: ToastVariant;
// }

const variantConfig: Record<
  ToastVariant,
  {
    icon: React.FC<{ className?: string }>;
    styles: {
      wrapper: string;
      iconWrapper: string;
      icon: string;
      progress: string;
    };
  }
> = {
  success: {
    icon: ({ className }) => <IoCheckmark className={className} />,
    styles: {
      wrapper: 'border-[#1D9E75]/35 bg-[#1D9E75]/10',
      iconWrapper: 'bg-[#1D9E75]/20',
      icon: 'text-[#1D9E75]',
      progress: 'bg-[#1D9E75]',
    },
  },
  error: {
    icon: ({ className }) => <IoClose className={className} />,
    styles: {
      wrapper: 'border-[#D85A30]/35 bg-[#D85A30]/10',
      iconWrapper: 'bg-[#D85A30]/20',
      icon: 'text-[#D85A30]',
      progress: 'bg-[#D85A30]',
    },
  },
  warning: {
    icon: ({ className }) => <IoAlert className={className} />,
    styles: {
      wrapper: 'border-[#BA7517]/35 bg-[#BA7517]/10',
      iconWrapper: 'bg-[#BA7517]/20',
      icon: 'text-[#BA7517]',
      progress: 'bg-[#BA7517]',
    },
  },
  info: {
    icon: ({ className }) => <BsInfoLg className={className} />,
    styles: {
      wrapper: 'border-[#378ADD]/35 bg-[#378ADD]/10',
      iconWrapper: 'bg-[#378ADD]/20',
      icon: 'text-[#378ADD]',
      progress: 'bg-[#378ADD]',
    },
  },
  loading: {
    icon: ({ className }) => <Loader2 className={`${className} animate-spin`} />,
    styles: {
      wrapper: 'border-[#7F77DD]/35 bg-[#7F77DD]/10',
      iconWrapper: 'bg-[#7F77DD]/20',
      icon: 'text-[#7F77DD]',
      progress: 'bg-[#7F77DD] opacity-30',
    },
  },
};

interface CustomToastContentProps extends Partial<ToastContentProps> {
  title: string;
  description?: string;
  variant: ToastVariant;
}

export const CustomToastContent: React.FC<CustomToastContentProps> = ({
  title,
  description,
  variant,
  closeToast,
}) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3">
      {/* Icon */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.styles.iconWrapper}`}
      >
        <Icon className={`h-5 w-5 ${config.styles.icon}`} />
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        {description && <p className="mt-0.5 text-sm leading-snug text-white/60">{description}</p>}
      </div>

      {/* Close */}
      <button
        onClick={closeToast}
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-40 transition-opacity hover:opacity-100"
      >
        <X className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

const baseOptions: ToastOptions = {
  position: 'top-right',
  className: (context) => {
    const variant = (context?.type as ToastVariant) ?? 'info';
    const config = variantConfig[variant] ?? variantConfig.info;
    return [
      'relative overflow-hidden rounded-[14px] border backdrop-blur-xl',
      'px-4 py-3.5 font-sans shadow-none',
      config.styles.wrapper,
    ].join(' ');
  },
  // progressClassName: (context) => {
  //   const variant = (context?.type as ToastVariant) ?? 'info';
  //   const config = variantConfig[variant] ?? variantConfig.info;
  //   return `absolute bottom-0 left-0 h-[2px] rounded-b-[14px] ${config.styles.progress}`;
  // },
  icon: false,
  closeButton: false,
};

type ToastArgs = {
  title: string;
  description?: string;
  options?: ToastOptions;
};

export const AppNotify = {
  success: ({ title, description, options }: ToastArgs) =>
    toast.success(
      (props) => (
        <CustomToastContent {...props} title={title} description={description} variant="success" />
      ),
      { ...baseOptions, autoClose: 4000, type: 'success', ...options }
    ),

  error: ({ title, description, options }: ToastArgs) =>
    toast.error(
      (props) => (
        <CustomToastContent {...props} title={title} description={description} variant="error" />
      ),
      { ...baseOptions, autoClose: 5000, type: 'error', ...options }
    ),

  warning: ({ title, description, options }: ToastArgs) =>
    toast.warning(
      (props) => (
        <CustomToastContent {...props} title={title} description={description} variant="warning" />
      ),
      { ...baseOptions, autoClose: 5000, type: 'warning', ...options }
    ),

  info: ({ title, description, options }: ToastArgs) =>
    toast.info(
      (props) => (
        <CustomToastContent {...props} title={title} description={description} variant="info" />
      ),
      { ...baseOptions, autoClose: 4000, type: 'info', ...options }
    ),

  loading: ({ title, description, options }: ToastArgs) =>
    toast.loading(
      (props) => (
        <CustomToastContent {...props} title={title} description={description} variant="loading" />
      ),
      { ...baseOptions, autoClose: false, type: 'default', ...options }
    ),

  promise: <T,>(
    promise: Promise<T>,
    msgs: {
      pending: Omit<ToastArgs, 'options'>;
      success: Omit<ToastArgs, 'options'>;
      error: Omit<ToastArgs, 'options'>;
    }
  ) =>
    toast.promise(promise, {
      pending: {
        render: (props) => (
          <CustomToastContent
            {...props}
            title={msgs.pending.title}
            description={msgs.pending.description}
            variant="loading"
          />
        ),
        ...baseOptions,
      },
      success: {
        render: (props) => (
          <CustomToastContent
            {...(props as Partial<ToastContentProps>)}
            title={msgs.success.title}
            description={msgs.success.description}
            variant="success"
          />
        ),
        ...baseOptions,
        autoClose: 3000,
      },
      error: {
        render: (props) => (
          <CustomToastContent
            {...(props as Partial<ToastContentProps>)}
            title={msgs.error.title}
            description={msgs.error.description}
            variant="error"
          />
        ),
        ...baseOptions,
        autoClose: 5000,
      },
    }),
};

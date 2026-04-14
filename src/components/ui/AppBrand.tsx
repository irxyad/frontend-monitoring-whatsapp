import { AssetsVectors } from '@/assets/vectors';
import { flavorConfig } from '../config/flavor';

export default function AppBrand({
  isClickable = true,
  fontSize = 'text-xl',
}: {
  isClickable?: boolean;
  fontSize?: string;
  logoSize?: number;
}) {
  const content = (
    <div className="flex w-full items-center justify-center gap-2 font-semibold">
      <AssetsVectors.MainLogo className="size-6 text-white" />
      <h1 className={`${fontSize} leading-tight font-semibold`}>{flavorConfig.appName}</h1>
    </div>
  );

  if (!isClickable) return content;

  return (
    <a href="/" className="inline-block">
      {content}
    </a>
  );
}

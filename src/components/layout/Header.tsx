import { AssetsVectors } from '@/assets/vectors';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { HiUser } from 'react-icons/hi2';
import AppBrand from '../ui/AppBrand';
import { Button } from '../ui/shadcn/button';

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between gap-10">
      <AppBrand fontSize="text-sm" logoSize={20} />
      <SignOutButton />
    </header>
  );
}

function SignOutButton() {
  const authStore = useAuthStore((s) => s);

  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-1">
        <HiUser className="size-4" />
        <p className="font-semibold">{authStore.user?.username}</p>
      </div>
      <Button className="rounded-full bg-red-500 pr-4 pl-1.5" onClick={authStore.logout}>
        <AssetsVectors.IcSignOut className="size-5 text-white" />
        <p className="text-sm font-medium">Keluar</p>
      </Button>
    </div>
  );
}

import { MainCard } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/shadcn/button';
import AppSection from '../../components/ui/AppSection';

export default function UserDashboardPage() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div>
        <h3>Status Server</h3>
        <div className=""></div>
      </div>
      {/* Section 1 */}
      <MainCard className="w-full">
        <AppSection
          title="Session Aktif"
          rightHeader={<Button>Buat Session Baru</Button>}
        ></AppSection>
      </MainCard>
      {/* Section 2 */}
      <MainCard className="w-full"></MainCard>
    </div>
  );
}

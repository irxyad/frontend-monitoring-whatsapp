import StatusServerCard from '../ping/components/StatusServerCard';
import ActiveSessionCard from '../session/components/ActiveSessionCard';
import CreateSessionCard from '../session/components/CreateSessionCard';
import SessionListCard from '../session/components/SessionListCard';
import StatisticCard from './components/StatisticCard';

export default function UserDashboardPage() {
  return (
    <div className="flex w-full flex-col gap-5">
      <StatusServerCard />
      {/* Section 1 */}
      <CreateSessionCard />
      {/* Section 2 */}
      <div className="grid grid-cols-6 gap-5">
        {/* Daftar Session */}
        <SessionListCard />
        {/* Session Aktif */}
        <section className="col-span-2 flex h-fit w-full flex-col gap-5">
          <ActiveSessionCard />
          <StatisticCard />
        </section>
      </div>
    </div>
  );
}

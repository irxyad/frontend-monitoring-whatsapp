import { Outlet, useLocation } from 'react-router-dom';
import PageTransition from '../shared/PageTransition';

export default function RootLayout() {
  const location = useLocation();

  return (
    <div className="bg-background relative min-h-screen">
      <BackgroundPattern />
      <div className="relative z-10 min-h-screen">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </div>
    </div>
  );
}

function BackgroundPattern() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <svg className="h-full w-full opacity-[0.1]">
        <defs>
          <pattern id="pattern-dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" className="fill-white/50" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern-dots)" />
      </svg>
    </div>
  );
}

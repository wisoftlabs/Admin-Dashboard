import { useLocation } from 'react-router';
import wisoftLogo from '@/assets/wisoft-fav.webp';

const pathTitles: { [key: string]: string } = {
  '/home': 'Home',
  '/news': 'News',
  '/project': 'Projects',
  '/paper': 'Papers',
  '/award': 'Awards',
};

export function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const pageTitle = pathTitles[currentPath];

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2">
        <div className="w-3xs flex items-center justify-center border-r border-r-border">
          <img
            src={wisoftLogo}
            alt="Logo"
            className="h-14 w-auto object-contain"
          />
        </div>
        <h1 className="px-4 text-xl font-bold">{pageTitle}</h1>
      </div>
    </header>
  );
}
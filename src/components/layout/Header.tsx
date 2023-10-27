/* eslint-disable @next/next/no-html-link-for-pages */

import { GroButton } from '@gro-bak/gro-ui';

// eslint-disable-next-line import/extensions
import useAuthService from '@/services/useAuthService';

export default function Header() {
  const { logout } = useAuthService();
  return (
    <header>
      <nav style={{ paddingTop: '10px', paddingBottom: '10px' }} className="bg-white px-8">
        <div className="flex flex-wrap justify-between items-center my-auto max-w-screen">
          <h1>Adhoc</h1>
          <GroButton onClick={() => logout()} secondary>
            Log Out
          </GroButton>
        </div>
      </nav>
    </header>
  );
}

import AuthGuard from 'src/guards/AuthGuard';
import ConfirmGuard from 'src/guards/ConfirmGuard';

import NeedConfirmationBanner from './components/NeedConfirmationBanner';

const NeedConfirmationPage = () => {
  return (
    <AuthGuard requireAuth>
      <ConfirmGuard redirectIfConfirmed>
        <NeedConfirmationBanner />
      </ConfirmGuard>
    </AuthGuard>
  );
};

export default NeedConfirmationPage;

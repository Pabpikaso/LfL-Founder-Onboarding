import { useEffect } from 'react';
import { Chrome } from './components/Chrome';
import { Landing } from './components/Landing';
import { BusinessStep } from './components/steps/BusinessStep';
import { CategoryDetailStep } from './components/steps/CategoryDetailStep';
import { FounderStep } from './components/steps/FounderStep';
import { PaymentStep } from './components/steps/PaymentStep';
import { ReviewStep } from './components/steps/ReviewStep';
import { WelcomeStep } from './components/steps/WelcomeStep';
import { Toast } from './components/Toast';
import { useOnboarding } from './state/useOnboarding';

function App() {
  const api = useOnboarding();
  const { screen, q, toast, justSaved, saveLater, startApply } = api;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [screen, q]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Chrome screen={screen} justSaved={justSaved} onSaveLater={saveLater} />

      {screen === 'landing' && <Landing onApply={startApply} />}
      {screen === 'founder' && <FounderStep api={api} />}
      {screen === 's2' && <BusinessStep api={api} />}
      {screen === 'catdetail' && <CategoryDetailStep api={api} />}
      {screen === 'review' && <ReviewStep api={api} />}
      {screen === 'pay' && <PaymentStep api={api} />}
      {screen === 'welcome' && <WelcomeStep api={api} />}

      <Toast message={toast} />
    </div>
  );
}

export default App;

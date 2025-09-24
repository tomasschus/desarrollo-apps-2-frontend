import Confetti from 'react-confetti';
import { useConfetti } from '../core/contexts/confetti-context';

export const ConfettiRenderer: React.FC = () => {
  const { showConfetti } = useConfetti();

  if (!showConfetti) return null;

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      recycle={false}
      numberOfPieces={1000}
      gravity={0.3}
    />
  );
};

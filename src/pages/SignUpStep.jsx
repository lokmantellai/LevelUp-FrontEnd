import { useState } from 'react';
import SignStep1 from './SignStep1';
import SingUpStep2 from './SingUpStep2';

function SignUpStep() {
  // Handle Click Choice Btn
  const [step, setStep] = useState(1);
  if (step === 1)
    return (<> <SignStep1 setStep={setStep} /> </>)
  else (step === 2)
    return (<> <SingUpStep2 setStep={setStep} /> </>)
}

export default SignUpStep
import { useState } from 'react';
import axios from 'axios';
import Settings from './settings';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const App = () => {
  const [step, setStep] = useState(1); // Controla o passo atual
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [, setStatusMessage] = useState('');

  const handleSendVerification = async () => {
    try {
      const response = await axios.post('http://localhost:3000/send-verification', { email });
      if (response.status === 200) {
        setStatusMessage('Código enviado com sucesso!');
        setStep(2); // Avança para o próximo passo
      }
    } catch (error) {
      console.error('Erro ao enviar código de verificação:', error);
      setStatusMessage('Erro ao enviar código.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify-code', { email, code: verificationCode });
      if (response.status === 200) {
        setStatusMessage('Código verificado com sucesso!sadsad');
        setStep(3);
      }
    } catch (error) {
      console.error('Erro ao verificar código:', error);
      setStatusMessage('Código incorreto.');
    }
  };

  return (
    <div className='flex justify-center'>
      {step === 1 && (
        <div className='mt-20 justify-center space-y-4 sm:w-80 flex flex-col items-center'>
          <Label className='text-xl font-medium'>Enviar Código de Verificação</Label>
          <Input
            type="email"
            className='w-full'
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSendVerification} className='w-full'>Enviar Código</Button>
        </div>
      )}

      {step === 2 && (
        <div className='mt-20 justify-center space-y-4 sm:w-80 flex flex-col items-center'>
          <Label className='text-xl font-medium'>Inserir Código de Verificação</Label>
          <Input
            type="text"
            placeholder="Digite o código de verificação"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button onClick={handleVerifyCode} className='w-full'>Verificar Código</Button>
        </div>
      )}

      {step === 3 && (
        <div className='w-full'>
          <Settings />
        </div>
      )}
    </div>
  );
};

export default App;
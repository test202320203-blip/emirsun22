import React, { useState } from 'react';
import { 
  Shield, Mail, Phone, Wallet, Moon, Sun, Globe, 
  ChevronRight, AlertCircle, CheckCircle, Lock, 
  Eye, EyeOff, ArrowLeft, X
} from 'lucide-react';

// Types
interface SecuritySettings {
  email: string;
  phone: string;
  wallet: string;
}

interface AppSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'ru';
}

// UI Components
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}> = ({ children, onClick, variant = 'primary', disabled, className = '', fullWidth }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Input: React.FC<{
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string;
  disabled?: boolean;
}> = ({ label, type = 'text', value, onChange, placeholder, icon, error, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} ${type === 'password' ? 'pr-10' : 'pr-4'} py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

const SettingCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  rightContent?: React.ReactNode;
}> = ({ icon, title, description, onClick, rightContent }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all text-left"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      {rightContent || <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />}
    </button>
  );
};

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const Alert: React.FC<{
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}> = ({ type, message, onClose }) => {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />
  };

  return (
    <div className={`flex items-start gap-3 p-4 border rounded-lg ${styles[type]}`}>
      {icons[type]}
      <p className="flex-1 text-sm">{message}</p>
      <button onClick={onClose} className="flex-shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Security Modals
const ChangeEmailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
  onSubmit: (oldEmail: string, newEmail: string, code: string) => void;
}> = ({ isOpen, onClose, currentEmail, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [oldEmailCode, setOldEmailCode] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newEmailCode, setNewEmailCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const sendVerificationCode = (email: string) => {
    console.log('Sending code to:', email);
    setCodeSent(true);
  };

  const handleSubmit = () => {
    onSubmit(currentEmail, newEmail, newEmailCode);
    onClose();
    setStep(1);
    setOldEmailCode('');
    setNewEmail('');
    setNewEmailCode('');
    setCodeSent(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Изменить Email">
      <div className="space-y-4">
        {step === 1 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Для изменения email необходимо подтвердить текущий адрес
              </p>
            </div>
            
            <Input
              label="Текущий Email"
              type="email"
              value={currentEmail}
              onChange={() => {}}
              disabled
              icon={<Mail className="w-5 h-5" />}
            />

            {!codeSent ? (
              <Button 
                onClick={() => sendVerificationCode(currentEmail)} 
                variant="outline" 
                fullWidth
              >
                Отправить код подтверждения
              </Button>
            ) : (
              <>
                <Input
                  label="Код подтверждения"
                  value={oldEmailCode}
                  onChange={setOldEmailCode}
                  placeholder="Введите код из письма"
                  icon={<Lock className="w-5 h-5" />}
                />
                <Button 
                  onClick={() => setStep(2)} 
                  variant="primary" 
                  fullWidth
                  disabled={oldEmailCode.length < 4}
                >
                  Далее
                </Button>
              </>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Введите новый email и подтвердите его
              </p>
            </div>

            <Input
              label="Новый Email"
              type="email"
              value={newEmail}
              onChange={setNewEmail}
              placeholder="new@email.com"
              icon={<Mail className="w-5 h-5" />}
            />

            <Button 
              onClick={() => sendVerificationCode(newEmail)} 
              variant="outline" 
              fullWidth
              disabled={!newEmail || !/\S+@\S+\.\S+/.test(newEmail)}
            >
              Отправить код на новый email
            </Button>

            <Input
              label="Код подтверждения"
              value={newEmailCode}
              onChange={setNewEmailCode}
              placeholder="Введите код из письма"
              icon={<Lock className="w-5 h-5" />}
            />

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" fullWidth>
                Назад
              </Button>
              <Button 
                onClick={handleSubmit} 
                variant="primary" 
                fullWidth
                disabled={newEmailCode.length < 4}
              >
                Подтвердить
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const ChangePhoneModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentPhone: string;
  onSubmit: (oldPhone: string, newPhone: string, code: string) => void;
}> = ({ isOpen, onClose, currentPhone, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [hasAccessToOld, setHasAccessToOld] = useState<boolean | null>(null);
  const [oldPhoneCode, setOldPhoneCode] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPhoneCode, setNewPhoneCode] = useState('');
  const [emailCode, setEmailCode] = useState('');

  const sendSMSCode = (phone: string) => {
    console.log('Sending SMS to:', phone);
  };

  const sendEmailCode = () => {
    console.log('Sending code to email');
  };

  const handleSubmit = () => {
    onSubmit(currentPhone, newPhone, newPhoneCode);
    onClose();
    setStep(1);
    setHasAccessToOld(null);
    setOldPhoneCode('');
    setNewPhone('');
    setNewPhoneCode('');
    setEmailCode('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Изменить номер телефона">
      <div className="space-y-4">
        {step === 1 && hasAccessToOld === null && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                У вас есть доступ к текущему номеру телефона?
              </p>
            </div>

            <Input
              label="Текущий номер"
              type="tel"
              value={currentPhone}
              onChange={() => {}}
              disabled
              icon={<Phone className="w-5 h-5" />}
            />

            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => setHasAccessToOld(true)} variant="primary" fullWidth>
                Да, есть доступ
              </Button>
              <Button onClick={() => setHasAccessToOld(false)} variant="outline" fullWidth>
                Нет доступа
              </Button>
            </div>
          </>
        )}

        {step === 1 && hasAccessToOld === true && (
          <>
            <Input
              label="Текущий номер"
              type="tel"
              value={currentPhone}
              onChange={() => {}}
              disabled
              icon={<Phone className="w-5 h-5" />}
            />

            <Button onClick={() => sendSMSCode(currentPhone)} variant="outline" fullWidth>
              Отправить SMS код
            </Button>

            <Input
              label="Код из SMS"
              value={oldPhoneCode}
              onChange={setOldPhoneCode}
              placeholder="Введите код"
              icon={<Lock className="w-5 h-5" />}
            />

            <Button 
              onClick={() => setStep(2)} 
              variant="primary" 
              fullWidth
              disabled={oldPhoneCode.length < 4}
            >
              Далее
            </Button>
          </>
        )}

        {step === 1 && hasAccessToOld === false && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Мы отправим код подтверждения на ваш email
              </p>
            </div>

            <Button onClick={sendEmailCode} variant="outline" fullWidth>
              Отправить код на email
            </Button>

            <Input
              label="Код из email"
              value={emailCode}
              onChange={setEmailCode}
              placeholder="Введите код"
              icon={<Lock className="w-5 h-5" />}
            />

            <Button 
              onClick={() => setStep(2)} 
              variant="primary" 
              fullWidth
              disabled={emailCode.length < 4}
            >
              Далее
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Input
              label="Новый номер телефона"
              type="tel"
              value={newPhone}
              onChange={setNewPhone}
              placeholder="+7 (999) 999-99-99"
              icon={<Phone className="w-5 h-5" />}
            />

            <Button 
              onClick={() => sendSMSCode(newPhone)} 
              variant="outline" 
              fullWidth
              disabled={!newPhone || newPhone.length < 10}
            >
              Отправить SMS на новый номер
            </Button>

            <Input
              label="Код подтверждения"
              value={newPhoneCode}
              onChange={setNewPhoneCode}
              placeholder="Введите код из SMS"
              icon={<Lock className="w-5 h-5" />}
            />

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" fullWidth>
                Назад
              </Button>
              <Button 
                onClick={handleSubmit} 
                variant="primary" 
                fullWidth
                disabled={newPhoneCode.length < 4}
              >
                Подтвердить
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const ChangeWalletModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentWallet: string;
  onSubmit: (newWallet: string) => void;
}> = ({ isOpen, onClose, currentWallet, onSubmit }) => {
  const [newWallet, setNewWallet] = useState('');
  const [confirmWallet, setConfirmWallet] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (newWallet !== confirmWallet) {
      setError('Адреса кошельков не совпадают');
      return;
    }
    if (newWallet.length < 20) {
      setError('Неверный формат адреса кошелька');
      return;
    }
    onSubmit(newWallet);
    onClose();
    setNewWallet('');
    setConfirmWallet('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Изменить кошелек">
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800 font-medium mb-2">⚠️ Внимание!</p>
          <p className="text-sm text-red-800">
            При смене кошелька ваш депозит будет заморожен на 24 часа в целях безопасности.
          </p>
        </div>

        <Input
          label="Текущий кошелек"
          value={currentWallet}
          onChange={() => {}}
          disabled
          icon={<Wallet className="w-5 h-5" />}
        />

        <Input
          label="Новый адрес кошелька"
          value={newWallet}
          onChange={(value) => {
            setNewWallet(value);
            setError('');
          }}
          placeholder="Введите адрес USDT кошелька"
          icon={<Wallet className="w-5 h-5" />}
          error={error}
        />

        <Input
          label="Подтвердите адрес"
          value={confirmWallet}
          onChange={(value) => {
            setConfirmWallet(value);
            setError('');
          }}
          placeholder="Повторите адрес кошелька"
          icon={<Wallet className="w-5 h-5" />}
        />

        <Button 
          onClick={handleSubmit} 
          variant="primary" 
          fullWidth
          disabled={!newWallet || !confirmWallet}
        >
          Подтвердить изменение
        </Button>
      </div>
    </Modal>
  );
};

// Main Settings Page
const SettingsPage: React.FC = () => {
  const [security, setSecurity] = useState<SecuritySettings>({
    email: 'user@example.com',
    phone: '+7 (999) 123-45-67',
    wallet: 'TXs...7n3K (подтвержден)'
  });

  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: 'light',
    language: 'ru'
  });

  const [activeModal, setActiveModal] = useState<'email' | 'phone' | 'wallet' | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning', message: string } | null>(null);

  const handleEmailChange = (oldEmail: string, newEmail: string, code: string) => {
    setSecurity(prev => ({ ...prev, email: newEmail }));
    setAlert({ type: 'success', message: 'Email успешно изменен. Проверьте почту для подтверждения.' });
  };

  const handlePhoneChange = (oldPhone: string, newPhone: string, code: string) => {
    setSecurity(prev => ({ ...prev, phone: newPhone }));
    setAlert({ type: 'success', message: 'Номер телефона успешно изменен.' });
  };

  const handleWalletChange = (newWallet: string) => {
    setSecurity(prev => ({ ...prev, wallet: `${newWallet.slice(0, 6)}...${newWallet.slice(-4)} (подтверждается)` }));
    setAlert({ 
      type: 'warning', 
      message: 'Кошелек добавлен. Депозит заморожен на 24 часа. Вы получите уведомления на email, телефон и Telegram.' 
    });
  };

  const toggleTheme = () => {
    setAppSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const changeLanguage = (lang: 'en' | 'ru') => {
    setAppSettings(prev => ({ ...prev, language: lang }));
  };

  return (
    <div className={`min-h-screen ${appSettings.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span>Назад</span>
          </button>
          <h1 className={`text-3xl font-bold ${appSettings.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Настройки
          </h1>
          <p className={`${appSettings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Управление безопасностью и настройками приложения
          </p>
        </div>

        {/* Alert */}
        {alert && (
          <div className="mb-6">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        {/* Security Section */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${appSettings.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            <Shield className="w-6 h-6 text-blue-600" />
            Безопасность
          </h2>
          <div className="space-y-3">
            <SettingCard
              icon={<Mail className="w-6 h-6" />}
              title="Email"
              description={security.email}
              onClick={() => setActiveModal('email')}
            />
            <SettingCard
              icon={<Phone className="w-6 h-6" />}
              title="Номер телефона"
              description={security.phone}
              onClick={() => setActiveModal('phone')}
            />
            <SettingCard
              icon={<Wallet className="w-6 h-6" />}
              title="Мой кошелек"
              description={security.wallet}
              onClick={() => setActiveModal('wallet')}
            />
          </div>
        </div>

        {/* App Settings Section */}
        <div>
          <h2 className={`text-xl font-bold mb-4 ${appSettings.theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Приложение
          </h2>
          <div className="space-y-3">
            <SettingCard
              icon={appSettings.theme === 'light' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              title="Тема приложения"
              description={appSettings.theme === 'light' ? 'Светлая' : 'Темная'}
              onClick={toggleTheme}
              rightContent={
                <div className="flex items-center gap-2">
                  <div className={`w-12 h-6 rounded-full transition-all ${appSettings.theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'} relative`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${appSettings.theme === 'dark' ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>
              }
            />
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Язык приложения</h3>
                  <p className="text-sm text-gray-500">Выберите язык интерфейса</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => changeLanguage('ru')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    appSettings.language === 'ru'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🇷🇺 Русский
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    appSettings.language === 'en'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`mt-8 p-4 rounded-xl border ${appSettings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'}`}>
          <p className={`text-sm ${appSettings.theme === 'dark' ? 'text-gray-300' : 'text-blue-800'}`}>
            💡 При изменении настроек безопасности вы получите уведомления на email, телефон и в Telegram.
          </p>
        </div>
      </div>

      {/* Modals */}
      <ChangeEmailModal
        isOpen={activeModal === 'email'}
        onClose={() => setActiveModal(null)}
        currentEmail={security.email}
        onSubmit={handleEmailChange}
      />
      <ChangePhoneModal
        isOpen={activeModal === 'phone'}
        onClose={() => setActiveModal(null)}
        currentPhone={security.phone}
        onSubmit={handlePhoneChange}
      />
      <ChangeWalletModal
        isOpen={activeModal === 'wallet'}
        onClose={() => setActiveModal(null)}
        currentWallet={security.wallet}
        onSubmit={handleWalletChange}
      />
    </div>
  );
};

export default SettingsPage;
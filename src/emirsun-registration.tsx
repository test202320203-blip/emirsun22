import React, { useState } from 'react';
import { User, Building2, Mail, Phone, Facebook, Twitter, Upload, CheckCircle, AlertCircle } from 'lucide-react';

// Types
interface IndividualFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  telegram: string;
  nickname: string;
  captcha: boolean;
}

interface LegalEntityFormData {
  organizationName: string;
  activityType: string;
  taxCode: string;
  country: string;
  authorizedPersonName: string;
  registrationCertificate: File | null;
  authorizedPersonDocData: string;
  authorizedPersonDoc: File | null;
  powerOfAttorney: File | null;
}

// UI Components
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, variant = 'primary', type = 'button', disabled, className = '' }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Input: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
}> = ({ label, type = 'text', value, onChange, placeholder, required, icon, error }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
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

const FileUpload: React.FC<{
  label: string;
  accept: string;
  onChange: (file: File | null) => void;
  required?: boolean;
  fileName?: string;
}> = ({ label, accept, onChange, required, fileName }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="hidden"
          id={label.replace(/\s/g, '-')}
        />
        <label
          htmlFor={label.replace(/\s/g, '-')}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <Upload className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            {fileName || 'Загрузить файл (PDF, JPG, JPEG)'}
          </span>
        </label>
      </div>
    </div>
  );
};

const Captcha: React.FC<{
  onChange: (verified: boolean) => void;
}> = ({ onChange }) => {
  const [verified, setVerified] = useState(false);
  
  const handleVerify = () => {
    setVerified(true);
    onChange(true);
  };
  
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <input
        type="checkbox"
        checked={verified}
        onChange={handleVerify}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">Я не робот</span>
      {verified && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
    </div>
  );
};

// Registration Components
const RegistrationTypeSelector: React.FC<{
  selectedType: 'individual' | 'legal';
  onSelect: (type: 'individual' | 'legal') => void;
}> = ({ selectedType, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <button
        onClick={() => onSelect('individual')}
        className={`p-6 rounded-xl border-2 transition-all ${
          selectedType === 'individual'
            ? 'border-blue-600 bg-blue-50 shadow-lg'
            : 'border-gray-200 hover:border-blue-300'
        }`}
      >
        <User className={`w-12 h-12 mx-auto mb-3 ${
          selectedType === 'individual' ? 'text-blue-600' : 'text-gray-400'
        }`} />
        <h3 className="font-semibold text-gray-800">Физическое лицо</h3>
        <p className="text-sm text-gray-500 mt-1">Регистрация для частных лиц</p>
      </button>
      
      <button
        onClick={() => onSelect('legal')}
        className={`p-6 rounded-xl border-2 transition-all ${
          selectedType === 'legal'
            ? 'border-blue-600 bg-blue-50 shadow-lg'
            : 'border-gray-200 hover:border-blue-300'
        }`}
      >
        <Building2 className={`w-12 h-12 mx-auto mb-3 ${
          selectedType === 'legal' ? 'text-blue-600' : 'text-gray-400'
        }`} />
        <h3 className="font-semibold text-gray-800">Юридическое лицо</h3>
        <p className="text-sm text-gray-500 mt-1">Регистрация для компаний</p>
      </button>
    </div>
  );
};

const SocialAuthButtons: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Или войти через</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
          <Facebook className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">Facebook</span>
        </button>
        
        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
          <Twitter className="w-5 h-5 text-sky-500" />
          <span className="text-sm font-medium">Twitter</span>
        </button>
      </div>
    </div>
  );
};

const IndividualRegistrationForm: React.FC<{
  onSubmit: (data: IndividualFormData) => void;
}> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<IndividualFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    telegram: '',
    nickname: '',
    captcha: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof IndividualFormData, string>>>({});

  const updateField = (field: keyof IndividualFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof IndividualFormData, string>> = {};
    
    if (!formData.firstName) newErrors.firstName = 'Обязательное поле';
    if (!formData.email) newErrors.email = 'Обязательное поле';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Неверный формат email';
    if (!formData.phone) newErrors.phone = 'Обязательное поле';
    if (!formData.nickname) newErrors.nickname = 'Обязательное поле';
    if (!formData.captcha) newErrors.captcha = 'Подтвердите, что вы не робот';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <SocialAuthButtons />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Или заполните форму</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Имя"
          value={formData.firstName}
          onChange={(value) => updateField('firstName', value)}
          placeholder="Введите имя"
          required
          icon={<User className="w-5 h-5" />}
          error={errors.firstName}
        />
        
        <Input
          label="Фамилия"
          value={formData.lastName}
          onChange={(value) => updateField('lastName', value)}
          placeholder="Введите фамилию"
          icon={<User className="w-5 h-5" />}
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => updateField('email', value)}
        placeholder="example@email.com"
        required
        icon={<Mail className="w-5 h-5" />}
        error={errors.email}
      />

      <Input
        label="Телефон"
        type="tel"
        value={formData.phone}
        onChange={(value) => updateField('phone', value)}
        placeholder="+7 (999) 999-99-99"
        required
        icon={<Phone className="w-5 h-5" />}
        error={errors.phone}
      />

      <Input
        label="Telegram"
        value={formData.telegram}
        onChange={(value) => updateField('telegram', value)}
        placeholder="@username"
      />

      <Input
        label="Никнейм"
        value={formData.nickname}
        onChange={(value) => updateField('nickname', value)}
        placeholder="Выберите никнейм"
        required
        error={errors.nickname}
      />

      <Captcha onChange={(verified) => updateField('captcha', verified)} />
      {errors.captcha && (
        <p className="text-sm text-red-500 -mt-3">{errors.captcha}</p>
      )}

      <Button type="submit" variant="primary" className="w-full">
        Зарегистрироваться
      </Button>

      <p className="text-center text-sm text-gray-500">
        Уже есть аккаунт?{' '}
        <a href="#" className="text-blue-600 hover:underline font-medium">
          Войти
        </a>
      </p>
    </form>
  );
};

const LegalEntityRegistrationForm: React.FC<{
  onSubmit: (data: LegalEntityFormData) => void;
}> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LegalEntityFormData>({
    organizationName: '',
    activityType: '',
    taxCode: '',
    country: '',
    authorizedPersonName: '',
    registrationCertificate: null,
    authorizedPersonDocData: '',
    authorizedPersonDoc: null,
    powerOfAttorney: null
  });

  const [fileNames, setFileNames] = useState({
    certificate: '',
    document: '',
    attorney: ''
  });

  const updateField = (field: keyof LegalEntityFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: 'registrationCertificate' | 'authorizedPersonDoc' | 'powerOfAttorney', file: File | null) => {
    updateField(field, file);
    const nameField = field === 'registrationCertificate' ? 'certificate' : field === 'authorizedPersonDoc' ? 'document' : 'attorney';
    setFileNames(prev => ({ ...prev, [nameField]: file?.name || '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          После заполнения формы ваша заявка будет отправлена на модерацию. 
          Вы получите уведомление на email о результатах проверки.
        </p>
      </div>

      <Input
        label="Наименование организации"
        value={formData.organizationName}
        onChange={(value) => updateField('organizationName', value)}
        placeholder="ООО 'Название'"
        required
        icon={<Building2 className="w-5 h-5" />}
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Вид деятельности организации <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.activityType}
          onChange={(e) => updateField('activityType', e.target.value)}
          placeholder="Опишите основной вид деятельности"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <Input
        label="Код налогоплательщика"
        value={formData.taxCode}
        onChange={(value) => updateField('taxCode', value)}
        placeholder="ИНН"
      />

      <Input
        label="Страна регистрации организации"
        value={formData.country}
        onChange={(value) => updateField('country', value)}
        placeholder="Российская Федерация"
        required
      />

      <Input
        label="ФИО уполномоченного лица"
        value={formData.authorizedPersonName}
        onChange={(value) => updateField('authorizedPersonName', value)}
        placeholder="Иванов Иван Иванович"
        required
      />

      <FileUpload
        label="Копия выписки о регистрации ЮРЛИЦА"
        accept=".pdf,.jpg,.jpeg"
        onChange={(file) => handleFileChange('registrationCertificate', file)}
        fileName={fileNames.certificate}
      />

      <Input
        label="Данные документа уполномоченного лица"
        value={formData.authorizedPersonDocData}
        onChange={(value) => updateField('authorizedPersonDocData', value)}
        placeholder="Серия и номер паспорта"
      />

      <FileUpload
        label="Документ уполномоченного лица"
        accept=".pdf,.jpg,.jpeg"
        onChange={(file) => handleFileChange('authorizedPersonDoc', file)}
        fileName={fileNames.document}
      />

      <FileUpload
        label="Доверенность на уполномоченное лицо"
        accept=".pdf,.jpg,.jpeg"
        onChange={(file) => handleFileChange('powerOfAttorney', file)}
        fileName={fileNames.attorney}
      />

      <Button type="submit" variant="primary" className="w-full">
        Отправить на модерацию
      </Button>

      <p className="text-center text-sm text-gray-500">
        Уже есть аккаунт?{' '}
        <a href="#" className="text-blue-600 hover:underline font-medium">
          Войти
        </a>
      </p>
    </form>
  );
};

// Main Registration Page
const RegistrationPage: React.FC = () => {
  const [registrationType, setRegistrationType] = useState<'individual' | 'legal'>('individual');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleIndividualSubmit = (data: IndividualFormData) => {
    console.log('Individual registration:', data);
    setIsSubmitted(true);
  };

  const handleLegalSubmit = (data: LegalEntityFormData) => {
    console.log('Legal entity registration:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {registrationType === 'individual' ? 'Регистрация успешна!' : 'Заявка отправлена!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {registrationType === 'individual'
              ? 'Ваш аккаунт создан. Проверьте email для подтверждения.'
              : 'Ваша заявка отправлена на модерацию. Мы уведомим вас о результатах по email.'}
          </p>
          <Button variant="primary" className="w-full" onClick={() => setIsSubmitted(false)}>
            Понятно
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Emirsun Mining
          </h1>
          <p className="text-gray-600">
            Создайте аккаунт для начала облачного майнинга
          </p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <RegistrationTypeSelector
            selectedType={registrationType}
            onSelect={setRegistrationType}
          />

          {registrationType === 'individual' ? (
            <IndividualRegistrationForm onSubmit={handleIndividualSubmit} />
          ) : (
            <LegalEntityRegistrationForm onSubmit={handleLegalSubmit} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Регистрируясь, вы соглашаетесь с{' '}
            <a href="#" className="text-blue-600 hover:underline">
              условиями использования
            </a>{' '}
            и{' '}
            <a href="#" className="text-blue-600 hover:underline">
              политикой конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
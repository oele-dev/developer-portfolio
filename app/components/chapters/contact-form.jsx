'use client';

import { isValidEmail } from '@/utils/check-email';
import emailjs from '@emailjs/browser';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [input, setInput] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState({ email: false, required: false });
  const [sending, setSending] = useState(false);

  const checkRequired = () => {
    if (input.email && input.message && input.name) setError((e) => ({ ...e, required: false }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.email || !input.message || !input.name) {
      setError((e) => ({ ...e, required: true }));
      return;
    }
    if (error.email) return;

    setError((e) => ({ ...e, required: false }));
    setSending(true);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const options = { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY };

    try {
      const res = await emailjs.send(serviceID, templateID, input, options);
      if (res.status === 200) {
        toast.success(t('formSuccess'));
        setInput({ name: '', email: '', message: '' });
      }
    } catch (err) {
      toast.error(err?.text || t('formError'));
    } finally {
      setSending(false);
    }
  };

  const field =
    'w-full bg-transparent border-b border-rule py-3 text-ink text-[15px] placeholder:text-ink-soft focus:outline-none focus:border-accent transition-colors';

  return (
    <form onSubmit={handleSend} className="flex flex-col gap-5 mt-8" noValidate>
      <label className="sr-only" htmlFor="contact-name">{t('formName')}</label>
      <input
        id="contact-name"
        type="text"
        placeholder={t('formName')}
        className={field}
        maxLength={100}
        value={input.name}
        onChange={(e) => setInput((v) => ({ ...v, name: e.target.value }))}
        onBlur={checkRequired}
      />

      <div>
        <label className="sr-only" htmlFor="contact-email">{t('formEmail')}</label>
        <input
          id="contact-email"
          type="email"
          placeholder={t('formEmail')}
          className={field}
          maxLength={100}
          value={input.email}
          onChange={(e) => setInput((v) => ({ ...v, email: e.target.value }))}
          onBlur={() => {
            checkRequired();
            setError((err) => ({ ...err, email: !isValidEmail(input.email) }));
          }}
        />
        {error.email && <p className="text-sm text-accent mt-1">{t('formEmailError')}</p>}
      </div>

      <label className="sr-only" htmlFor="contact-message">{t('formMessage')}</label>
      <textarea
        id="contact-message"
        placeholder={t('formMessage')}
        className={`${field} resize-none`}
        maxLength={500}
        rows={4}
        value={input.message}
        onChange={(e) => setInput((v) => ({ ...v, message: e.target.value }))}
        onBlur={checkRequired}
      />

      {error.required && <p className="text-sm text-accent">{t('formRequired')}</p>}

      <button
        type="submit"
        disabled={sending}
        className="self-start inline-flex items-center min-h-[44px] px-5 rounded-full font-semibold text-[15px] bg-accent text-on-accent transition-[opacity,transform] active:scale-[0.96] disabled:opacity-50"
      >
        {sending ? '…' : t('formSubmit')}
      </button>
    </form>
  );
}

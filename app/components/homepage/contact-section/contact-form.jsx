'use client';

import { isValidEmail } from '@/utils/check-email';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactForm({ locale }) {
  const isEs = locale === 'es';

  const labels = {
    name:    isEs ? 'Tu nombre'              : 'Your name',
    email:   isEs ? 'Tu correo'              : 'Your email',
    message: isEs ? '¿En qué estás pensando?' : "What's on your mind?",
    submit:  isEs ? 'ENVIAR'                 : 'SEND',
    success: isEs ? 'Listo. Te respondo en menos de 24h.' : "Got it. I'll reply within 24h.",
    error:   isEs ? 'Algo falló. Escríbeme directo.' : 'Something broke. Email me directly.',
    emailErr: isEs ? 'Correo inválido.' : 'Please provide a valid email.',
    required: isEs ? 'Todos los campos son requeridos.' : 'All fields are required.',
  };

  const [input, setInput] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState({ email: false, required: false });
  const [sending, setSending] = useState(false);

  const checkRequired = () => {
    if (input.email && input.message && input.name) {
      setError((e) => ({ ...e, required: false }));
    }
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

    const serviceID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const options    = { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY };

    try {
      const res = await emailjs.send(serviceID, templateID, input, options);
      if (res.status === 200) {
        toast.success(labels.success);
        setInput({ name: '', email: '', message: '' });
      }
    } catch (err) {
      toast.error(err?.text || labels.error);
    } finally {
      setSending(false);
    }
  };

  const inputClass = `
    w-full bg-transparent border-b border-rule py-3 text-ink font-body text-sm
    placeholder:text-ink-soft placeholder:font-mono placeholder:text-xs placeholder:tracking-widest
    focus:outline-none focus:border-accent transition-colors duration-150
  `;

  return (
    <form onSubmit={handleSend} className="flex flex-col gap-6">
      <div>
        <input
          type="text"
          placeholder={labels.name.toUpperCase()}
          className={inputClass}
          maxLength={100}
          value={input.name}
          onChange={(e) => setInput((v) => ({ ...v, name: e.target.value }))}
          onBlur={checkRequired}
        />
      </div>

      <div>
        <input
          type="email"
          placeholder={labels.email.toUpperCase()}
          className={inputClass}
          maxLength={100}
          value={input.email}
          onChange={(e) => setInput((v) => ({ ...v, email: e.target.value }))}
          onBlur={() => {
            checkRequired();
            setError((err) => ({ ...err, email: !isValidEmail(input.email) }));
          }}
        />
        {error.email && (
          <p className="font-mono text-xs text-accent mt-1">{labels.emailErr}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder={labels.message.toUpperCase()}
          className={inputClass + ' resize-none'}
          maxLength={500}
          rows={4}
          value={input.message}
          onChange={(e) => setInput((v) => ({ ...v, message: e.target.value }))}
          onBlur={checkRequired}
        />
      </div>

      {error.required && (
        <p className="font-mono text-xs text-accent">{labels.required}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="self-start font-mono text-xs tracking-widest uppercase px-6 py-3 text-ink disabled:opacity-50 transition-opacity duration-150"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        {sending ? '...' : labels.submit}
      </button>
    </form>
  );
}

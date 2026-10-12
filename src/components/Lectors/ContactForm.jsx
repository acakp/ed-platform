import './LectorDetail.css';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const EMPTY_FORM = {
  name: '',
  phone: '',
  telegram: '',
  service: '',
};

function formatPrice(tariff) {
  const amount = `${tariff.currency} ${tariff.price.toLocaleString('ru-RU')}`;
  return tariff.priceFrom ? `от ${amount}` : amount;
}

function ContactForm({ lector, onClose }) {
  const titleId = useId();
  const closeButtonRef = useRef(null);
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Укажите имя';
    if (!values.phone.trim() && !values.telegram.trim()) {
      nextErrors.contacts = 'Укажите телефон или Telegram';
    }
    if (!values.service) nextErrors.service = 'Выберите услугу';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Отправка на сервер появится позже. Пока заявка только собирается в форме.
    setSubmitted(true);
  };

  return createPortal(
    <div className="program-overlay" onClick={onClose}>
      <div
        className="program-dialog card contact-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="program-dialog-header">
          <div>
            <h3 className="section-title" id={titleId}>
              Заявка на связь
            </h3>
            <p className="contact-form-lead">{lector.fullName}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="program-close"
            aria-label="Закрыть форму"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {submitted ? (
          <div className="contact-form-success" role="status">
            <p>
              Заявка для {lector.fullName} отправлена! С вами свяжутся в ближайшее время.
            </p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Закрыть
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label className="contact-field">
              <span>Имя</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={updateField('name')}
                placeholder="Как к вам обращаться"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name ? (
                <span className="contact-field-error" id="contact-name-error">
                  {errors.name}
                </span>
              ) : null}
            </label>

            <div className="contact-fields">
              <label className="contact-field">
                <span>Телефон</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={updateField('phone')}
                  placeholder="+7 900 000-00-00"
                  aria-invalid={Boolean(errors.contacts)}
                  aria-describedby={errors.contacts ? 'contact-contacts-error' : undefined}
                />
              </label>

              <label className="contact-field">
                <span>Telegram</span>
                <input
                  type="text"
                  name="telegram"
                  autoComplete="off"
                  value={values.telegram}
                  onChange={updateField('telegram')}
                  placeholder="@username"
                  aria-invalid={Boolean(errors.contacts)}
                  aria-describedby={errors.contacts ? 'contact-contacts-error' : undefined}
                />
              </label>
            </div>
            {errors.contacts ? (
              <p className="contact-field-error" id="contact-contacts-error">
                {errors.contacts}
              </p>
            ) : (
              <p className="contact-field-hint">Достаточно одного контакта: телефона или Telegram.</p>
            )}

            <label className="contact-field">
              <span>Услуга</span>
              <select
                name="service"
                value={values.service}
                onChange={updateField('service')}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? 'contact-service-error' : undefined}
              >
                <option value="">Выберите услугу</option>
                {lector.tariffs.map((tariff) => (
                  <option key={tariff.name} value={tariff.name}>
                    {tariff.name} — {formatPrice(tariff)}
                  </option>
                ))}
              </select>
              {errors.service ? (
                <span className="contact-field-error" id="contact-service-error">
                  {errors.service}
                </span>
              ) : null}
            </label>

            <div className="contact-form-actions">
              <button type="submit" className="btn btn-primary">
                Оставить заявку
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default ContactForm;

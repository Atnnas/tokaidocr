'use client';

import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  Truck,
  CheckCircle2
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'uniforms',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const interestMap: Record<string, string> = {
      uniforms: 'Uniformes / Karateguis (Kata o Kumite)',
      belts: 'Cinturones con Bordado Oficial',
      protectors: 'Protecciones Homologadas WKF',
      dojo: 'Cotización por Volumen para Escuela / Dojo'
    };

    const text = `🥋 *CONSULTA TOKAIDO COSTA RICA*\n\n` +
      `*Nombre:* ${formData.name || 'Practicante'}\n` +
      `*Teléfono:* ${formData.phone || 'No especificado'}\n` +
      `*Interés:* ${interestMap[formData.interest] || formData.interest}\n` +
      (formData.message ? `*Mensaje:* ${formData.message}\n` : '') +
      `\n_Enviado desde el portal tokaidocr.com_`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/50687378597?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="contact-cr-page">
      {/* 1. Header Banner */}
      <section className="contact-header-banner">
        <div className="banner-container">
          <span className="banner-eyebrow">TOKAIDO COSTA RICA • CANALES OFICIALES</span>
          <h1 className="banner-title">Contáctenos</h1>
          <p className="banner-subline">
            Asesoría personalizada en tallas japonesas, pedidos especiales para dojos y despachos a todo Costa Rica.
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Left Column: Direct Fast Channels */}
            <div className="channels-column">
              {/* WhatsApp Card */}
              <div className="channel-box wa-card">
                <div className="channel-icon-circle green">
                  <MessageCircle size={26} />
                </div>
                <div className="channel-details">
                  <span className="badge-tag green">Respuesta Rápida</span>
                  <h3 className="channel-heading">WhatsApp & Celular</h3>
                  <p className="channel-desc">
                    Atención inmediata para dudas de tallas, cotizaciones y entregas GAM en 24 horas.
                  </p>
                  <div className="channel-tel">(+506) 8737-8597</div>
                  <a 
                    href="https://wa.me/50687378597?text=Hola,%20quisiera%20asesoría%20sobre%20equipamiento%20Tokaido%20en%20Costa%20Rica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn-wa"
                  >
                    <span>Iniciar Chat por WhatsApp</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Email & Special Orders Card */}
              <div className="channel-box">
                <div className="channel-icon-circle red">
                  <Mail size={26} />
                </div>
                <div className="channel-details">
                  <span className="badge-tag red">Institucional</span>
                  <h3 className="channel-heading">Correo Electrónico</h3>
                  <p className="channel-desc">
                    Cotizaciones institucionales para federaciones, academias y órdenes por volumen.
                  </p>
                  <div className="channel-tel">info@tokaidocr.com</div>
                  <a 
                    href="mailto:info@tokaidocr.com" 
                    className="action-btn-email"
                  >
                    <span>Enviar Correo</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Location & Shipping info */}
              <div className="channel-box-mini">
                <div className="mini-item">
                  <MapPin size={20} className="icon-red" />
                  <div>
                    <strong>San José, Costa Rica</strong>
                    <span>Distribución y bodega principal</span>
                  </div>
                </div>

                <div className="mini-item">
                  <Truck size={20} className="icon-red" />
                  <div>
                    <strong>Envíos Nacionales</strong>
                    <span>GAM en 24-48h • Correos de Costa Rica</span>
                  </div>
                </div>

                <div className="mini-item">
                  <Clock size={20} className="icon-red" />
                  <div>
                    <strong>Horario de Atención</strong>
                    <span>Lunes a Sábado: 8:00 AM – 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Direct Inquiry Form */}
            <div className="form-column">
              <div className="form-card">
                <div className="form-header">
                  <h2 className="form-title">Envíanos tu Consulta</h2>
                  <p className="form-subtitle">
                    Completa tus datos y te atenderemos directamente por WhatsApp con disponibilidad y cotización.
                  </p>
                </div>

                {submitted ? (
                  <div className="form-success-alert">
                    <CheckCircle2 size={40} className="success-icon" />
                    <h3>¡Consulta Enviada!</h3>
                    <p>Tu consulta se ha abierto en WhatsApp. Uno de nuestros asesores responderá a la brevedad.</p>
                    <button 
                      type="button" 
                      onClick={() => setSubmitted(false)}
                      className="reset-form-btn"
                    >
                      Realizar otra consulta
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitWhatsApp} className="inquiry-form">
                    <div className="form-group">
                      <label htmlFor="name" className="label-text">Nombre Completo o Sensei</label>
                      <input 
                        id="name"
                        type="text" 
                        required
                        placeholder="Ej. Carlos Morales"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="label-text">Teléfono Celular o WhatsApp</label>
                      <input 
                        id="phone"
                        type="tel" 
                        required
                        placeholder="(+506) 8888-8888"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="interest" className="label-text">Equipamiento de Interés</label>
                      <select 
                        id="interest"
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="form-select"
                      >
                        <option value="uniforms">Karategui (Kata Master / Kumite Master)</option>
                        <option value="protectors">Protectores Oficiales WKF (Espinilleras, Peto, Guantes)</option>
                        <option value="belts">Cinturón Tokaido Bordado</option>
                        <option value="dojo">Cotización por Mayor para Dojo o Academia</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="label-text">Detalles o Medidas (Opcional)</label>
                      <textarea 
                        id="message"
                        rows={3}
                        placeholder="Estatura, peso, talla o modelo que buscas..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="form-textarea"
                      />
                    </div>

                    <button type="submit" className="submit-btn-red">
                      <MessageCircle size={18} />
                      <span>Contactar por WhatsApp</span>
                    </button>

                    <div className="form-guarantee-note">
                      <ShieldCheck size={16} className="note-icon" />
                      <span>Distribuidor Oficial Tokaido Costa Rica • 100% Original</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Trigger */}
      <a 
        href="https://wa.me/50687378597?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20los%20productos%20Tokaido"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} color="#FFFFFF" />
      </a>

      <style jsx>{`
        .contact-cr-page {
          background: #FFFFFF;
          color: #222222;
          font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
          min-height: 85vh;
        }

        /* 1. Header Banner */
        .contact-header-banner {
          background: #101010;
          color: #FFFFFF;
          padding: 3.5rem 1.5rem 3rem;
          text-align: center;
          border-bottom: 3px solid #E50914;
        }

        .banner-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .banner-eyebrow {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #E50914;
          margin-bottom: 0.75rem;
        }

        .banner-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.5px;
          margin: 0 0 0.75rem;
          line-height: 1.15;
        }

        .banner-subline {
          font-size: 0.98rem;
          color: #AAAAAA;
          margin: 0 auto;
          max-width: 650px;
          line-height: 1.5;
        }

        /* 2. Main Grid */
        .contact-main-section {
          padding: 3.5rem 1.5rem 6rem;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 3rem;
          align-items: start;
        }

        /* Channels Column */
        .channels-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .channel-box {
          background: #F9F9F9;
          border: 1px solid #EBEBEB;
          border-radius: 8px;
          padding: 1.75rem;
          display: flex;
          gap: 1.25rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .channel-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }

        .channel-box.wa-card {
          border-left: 4px solid #25D366;
        }

        .channel-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .channel-icon-circle.green {
          background: rgba(37, 211, 102, 0.12);
          color: #25D366;
        }

        .channel-icon-circle.red {
          background: rgba(229, 9, 20, 0.1);
          color: #E50914;
        }

        .channel-details {
          flex: 1;
        }

        .badge-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          margin-bottom: 0.4rem;
        }

        .badge-tag.green {
          background: rgba(37, 211, 102, 0.15);
          color: #128C7E;
        }

        .badge-tag.red {
          background: rgba(229, 9, 20, 0.12);
          color: #E50914;
        }

        .channel-heading {
          font-size: 1.15rem;
          font-weight: 800;
          color: #111111;
          margin: 0 0 0.35rem;
        }

        .channel-desc {
          font-size: 0.85rem;
          color: #666666;
          line-height: 1.45;
          margin: 0 0 0.75rem;
        }

        .channel-tel {
          font-size: 1.1rem;
          font-weight: 800;
          color: #111111;
          margin-bottom: 1rem;
        }

        .action-btn-wa {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #25D366;
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.6rem 1.25rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.18s ease;
        }

        .action-btn-wa:hover {
          background: #1EBE5D;
        }

        .action-btn-email {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #111111;
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.6rem 1.25rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background 0.18s ease;
        }

        .action-btn-email:hover {
          background: #E50914;
        }

        .channel-box-mini {
          background: #F9F9F9;
          border: 1px solid #EBEBEB;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .mini-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .icon-red {
          color: #E50914;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .mini-item strong {
          display: block;
          font-size: 0.92rem;
          color: #111111;
        }

        .mini-item span {
          display: block;
          font-size: 0.82rem;
          color: #777777;
        }

        /* Form Column */
        .form-card {
          background: #FFFFFF;
          border: 1px solid #EBEBEB;
          border-radius: 8px;
          padding: 2.25rem 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .form-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #111111;
          margin: 0 0 0.35rem;
        }

        .form-subtitle {
          font-size: 0.88rem;
          color: #666666;
          margin: 0 0 1.75rem;
          line-height: 1.45;
        }

        .inquiry-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .label-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: #333333;
        }

        .form-input, .form-select, .form-textarea {
          background: #FAFAFA;
          border: 1px solid #D5D5D5;
          border-radius: 6px;
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: #111111;
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #E50914;
          background: #FFFFFF;
        }

        .form-textarea {
          resize: vertical;
        }

        .submit-btn-red {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #E50914;
          color: #FFFFFF;
          border: none;
          border-radius: 4px;
          padding: 0.85rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.18s ease;
          margin-top: 0.5rem;
        }

        .submit-btn-red:hover {
          background: #C80812;
        }

        .form-guarantee-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          color: #777777;
          margin-top: 0.25rem;
        }

        .note-icon {
          color: #E50914;
        }

        .form-success-alert {
          text-align: center;
          padding: 2.5rem 1rem;
        }

        .success-icon {
          color: #25D366;
          margin-bottom: 0.75rem;
        }

        .form-success-alert h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: #111111;
          margin: 0 0 0.5rem;
        }

        .form-success-alert p {
          font-size: 0.9rem;
          color: #666666;
          margin: 0 0 1.5rem;
        }

        .reset-form-btn {
          background: #111111;
          color: #FFFFFF;
          border: none;
          padding: 0.65rem 1.4rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
        }

        .reset-form-btn:hover {
          background: #E50914;
        }

        /* Floating WA */
        .floating-wa-btn {
          position: fixed;
          bottom: 25px;
          right: 25px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.45);
          z-index: 999;
          transition: transform 0.2s ease;
        }

        .floating-wa-btn:hover {
          transform: scale(1.1);
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

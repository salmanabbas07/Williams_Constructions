// src/pages/Home/sections/Appointment/Appointment.jsx
import React, { useState } from "react";
import {
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import Button from "../../../../components/Button/Button";
import { servicesData } from "../../../../data/servicesData";
import { companyContact } from "../../../../data/navigationData";
import { submitAppointmentRequest } from "../../../../services/appointmentService";
import "./Appointment.css";

export const Appointment = ({ initialService = "", isContactPage = false }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    serviceRequired: initialService || "",
    preferredDate: "",
    preferredTime: "",
    projectLocation: "",
    message: "",
    _hp_website: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    submitted: false,
    success: false,
    isDemo: false,
    message: "",
  });

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Ime in priimek sta obvezna.";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Ime podjetja je obvezno.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-poštni naslov je obvezen.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Vnesite veljaven poslovni e-poštni naslov.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefonska številka je obvezna.";
    } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone =
        "Vnesite veljavno telefonsko številko (npr. +386 69 803 622).";
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = "Prosimo, izberite zahtevano storitev.";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Prosimo, izberite želeni datum sestanka.";
    }

    if (!formData.projectLocation.trim()) {
      newErrors.projectLocation =
        "Prosimo, vnesite lokacijo projekta v Sloveniji.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (status.loading) {
      return;
    }

    const formValidationErrors = validate();
    if (Object.keys(formValidationErrors).length > 0) {
      setErrors(formValidationErrors);
      return;
    }

    setStatus({
      loading: true,
      submitted: false,
      success: false,
      isDemo: false,
      message: "",
    });

    try {
      const response = await submitAppointmentRequest(formData);

      setStatus({
        loading: false,
        submitted: true,
        success: response.success,
        isDemo: response.isDemo,
        message: response.message,
      });

      if (response.success) {
        // Reset form fields
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          serviceRequired: "",
          preferredDate: "",
          preferredTime: "",
          projectLocation: "",
          message: "",
          _hp_website: "",
        });
        setErrors({});
      }
    } catch (err) {
      setStatus({
        loading: false,
        submitted: true,
        success: false,
        isDemo: false,
        message:
          err?.message ||
          "Prišlo je do omrežne napake. Prosimo, poskusite znova ali nas pokličite po telefonu.",
      });
    }
  };

  return (
    <section
      className="appointment-section section-py bg-white"
      id="appointment-form"
    >
      <div className="container">
        {!isContactPage && (
          <SectionTitle
            badge="Neposreden posvet in povpraševanje"
            title="Zahtevajte delovno silo"
            subtitle="Opišite vaše potrebe po kadru. Naša ekipa bo stopila v stik z vami za pogovor o vašem projektu in uskladitev terminov napotitve."
            align="center"
          />
        )}

        <div className="appointment-wrapper">
          {/* Side Info Column */}
          <div className="appointment-info-col">
            <span className="info-badge">
              <ShieldCheck size={16} /> Neposredna slovenska napotitev
            </span>
            <h3 className="info-title">
              Potrebujete hitro napotitev delovne sile?
            </h3>
            <p className="info-desc">
              Rezervirajte osebni sestanek ali posvet o projektu z našo
              vodstveno ekipo na vašem gradbišču ali na našem sedežu v
              Ljubljani.
            </p>

            <div className="info-contact-list">
              <div className="info-contact-item">
                <div className="info-icon-wrap">
                  <MapPin size={18} />
                </div>
                <div>
                  <strong>Sedež podjetja</strong>
                  <p>{companyContact.address}</p>
                </div>
              </div>

              <div className="info-contact-item">
                <div className="info-icon-wrap">
                  <Phone size={18} />
                </div>
                <div>
                  <strong>Neposredna koordinacija</strong>
                  <p>{companyContact.phones[0].display}</p>
                  <p>{companyContact.phones[1].display}</p>
                </div>
              </div>

              <div className="info-contact-item">
                <a
                  href={`mailto:${companyContact.email}`}
                  className="info-icon-wrap"
                  aria-label="Uradni e-naslov"
                >
                  <Mail size={18} />
                </a>
                <div>
                  <strong>Uradni e-naslov</strong>
                  <p>
                    <a
                      href={`mailto:${companyContact.email}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {companyContact.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Backend Integration Architecture Note */}
            {/* <div className="info-architecture-note">
              <Info size={16} className="note-icon" />
              <span>
                <strong>Opomba o integraciji:</strong> Obrazec je povezan z <code>src/services/appointmentService.js</code>, popolnoma izoliran in pripravljen za REST API povezavo.
              </span>
            </div> */}
          </div>

          {/* Form Column */}
          <div className="appointment-form-col">
            {/* Status Feedback Banner */}
            {status.submitted && (
              <div
                className={`status-banner ${status.success ? "status-success" : "status-error"}`}
                role="status"
              >
                {status.success ? (
                  <CheckCircle2 size={24} className="status-icon" />
                ) : (
                  <AlertCircle size={24} className="status-icon" />
                )}
                <div>
                  <h4 className="status-heading">
                    {status.success
                      ? "Zahtevek za termin je bil uspešno oddan"
                      : "Napaka pri oddaji"}
                  </h4>
                  <p className="status-msg">{status.message}</p>
                  {status.isDemo && (
                    <span className="demo-notice">
                      (Zaledna podatkovna baza še ni povezana. Vsa preverjanja
                      polj so se uspešno izvedla v sprednjem delu).
                    </span>
                  )}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="appointment-form"
            >
              {/* Invisible Honeypot field for spam prevention */}
              <input
                type="text"
                name="_hp_website"
                id="_hp_website"
                value={formData._hp_website || ""}
                onChange={handleChange}
                style={{
                  display: "none",
                  position: "absolute",
                  left: "-9999px",
                  visibility: "hidden",
                }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="form-grid">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Ime in priimek <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="npr. Janez Novak"
                    className={`form-input ${errors.fullName ? "input-error" : ""}`}
                    disabled={status.loading}
                  />
                  {errors.fullName && (
                    <span className="error-text">{errors.fullName}</span>
                  )}
                </div>

                {/* Company Name */}
                <div className="form-group">
                  <label htmlFor="companyName" className="form-label">
                    Ime podjetja <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="npr. Gradbeno podjetje d.o.o."
                    className={`form-input ${errors.companyName ? "input-error" : ""}`}
                    disabled={status.loading}
                  />
                  {errors.companyName && (
                    <span className="error-text">{errors.companyName}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Poslovni e-poštni naslov <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ime@podjetje.si"
                    className={`form-input ${errors.email ? "input-error" : ""}`}
                    disabled={status.loading}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Telefonska številka <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+386 40 123 456"
                    className={`form-input ${errors.phone ? "input-error" : ""}`}
                    disabled={status.loading}
                  />
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </div>

                {/* Service Required */}
                <div className="form-group">
                  <label htmlFor="serviceRequired" className="form-label">
                    Zahtevana storitev <span className="req">*</span>
                  </label>
                  <select
                    id="serviceRequired"
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className={`form-select ${errors.serviceRequired ? "input-error" : ""}`}
                    disabled={status.loading}
                  >
                    <option value="">-- Izberite storitev / profil --</option>
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Več profilov / Celovito podizvajalstvo">
                      Več profilov / Celovito podizvajalstvo
                    </option>
                  </select>
                  {errors.serviceRequired && (
                    <span className="error-text">{errors.serviceRequired}</span>
                  )}
                </div>

                {/* Project Location */}
                <div className="form-group">
                  <label htmlFor="projectLocation" className="form-label">
                    Lokacija projekta v Sloveniji <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="projectLocation"
                    name="projectLocation"
                    value={formData.projectLocation}
                    onChange={handleChange}
                    placeholder="npr. Ljubljana / Maribor / Celje"
                    className={`form-input ${errors.projectLocation ? "input-error" : ""}`}
                    disabled={status.loading}
                  />
                  {errors.projectLocation && (
                    <span className="error-text">{errors.projectLocation}</span>
                  )}
                </div>

                {/* Preferred Date */}
                <div className="form-group">
                  <label htmlFor="preferredDate" className="form-label">
                    Želeni datum sestanka <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className={`form-input ${errors.preferredDate ? "input-error" : ""}`}
                      disabled={status.loading}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <Calendar size={16} className="field-icon" />
                  </div>
                  {errors.preferredDate && (
                    <span className="error-text">{errors.preferredDate}</span>
                  )}
                </div>

                {/* Preferred Time */}
                <div className="form-group">
                  <label htmlFor="preferredTime" className="form-label">
                    Želeni čas sestanka
                  </label>
                  <div className="input-with-icon">
                    <input
                      type="time"
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="form-input"
                      disabled={status.loading}
                    />
                    <Clock size={16} className="field-icon" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="form-group form-group-full">
                <label htmlFor="message" className="form-label">
                  Podrobnosti o projektu / Količina delavcev
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Navedite število delavcev, začetek del, posebne certifikate (npr. TIG 141) ali predvideno trajanje gradbene faze..."
                  className="form-textarea"
                  disabled={status.loading}
                />
              </div>

              {/* Submit Button */}
              <div className="form-submit-row">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={status.loading}
                  icon={Send}
                >
                  Zahtevajte termin sestanka
                </Button>
                <span className="form-privacy-note">
                  Vaši podatki o projektu so strogo varovani. Odgovorimo v roku
                  24 delovnih ur.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;

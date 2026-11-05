// src/services/appointmentService.js
/**
 * Appointment Service (Frontend Integration Placeholder)
 * 
 * NOTE: As specified in PRD Section 8 & 16:
 * - No external database (MongoDB/MySQL) or backend API is currently connected.
 * - This file isolates future API integration so the backend can be 
 *   plugged in later without modifying frontend components.
 */

export const submitAppointmentRequest = async (formData) => {
  // Simulate network latency for realistic UX testing
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Basic validation check
  if (!formData.fullName || !formData.email || !formData.phone || !formData.serviceRequired) {
    return {
      success: false,
      message: 'Prosimo, izpolnite vsa obvezna polja.'
    };
  }

  // Frontend Demo / Future Integration Response in Slovenian
  return {
    success: true,
    isDemo: true,
    message: 'Povpraševanje za delovno silo je bilo uspešno preverjeno! (Predstavitveni način: Povezava z zalednim sistemom REST API je pripravljena za naslednjo fazo).',
    data: {
      ...formData,
      submittedAt: new Date().toISOString()
    }
  };
};

export const submitContactMessage = async (formData) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!formData.name || !formData.email || !formData.message) {
    return {
      success: false,
      message: 'Prosimo, vnesite vaše ime, e-poštni naslov in sporočilo.'
    };
  }

  return {
    success: true,
    isDemo: true,
    message: 'Vaše sporočilo je bilo sprejeto v predstavitvenem načinu. Povezava z zalednim strežnikom sledi v prihodnji razvojni fazi.',
    data: {
      ...formData,
      submittedAt: new Date().toISOString()
    }
  };
};

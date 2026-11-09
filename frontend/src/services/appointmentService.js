// src/services/appointmentService.js
/**
 * Appointment Service
 *
 * Connects the frontend appointment request form to the Core PHP backend.
 * Production and local dev endpoint: /backend/appointment.php
 */

/**
 * Submit an appointment request to the Core PHP backend.
 *
 * @param {Object} formData Form fields submitted by the visitor
 * @returns {Promise<{success: boolean, message: string, data?: any}>}
 */
export const submitAppointmentRequest = async (formData) => {
  try {
    const response = await fetch('/backend/appointment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || 'Unable to submit your appointment request. Please try again.'
      };
    }

    return {
      success: Boolean(data?.success),
      message: data?.message || 'Your appointment request has been submitted successfully.',
      data: data
    };
  } catch (error) {
    return {
      success: false,
      message: 'Prišlo je do omrežne napake. Prosimo, preverite povezavo ali poskusite znova.'
    };
  }
};

/**
 * Contact Message Submission (kept for compatibility with contact page components)
 */
export const submitContactMessage = async (formData) => {
  try {
    const response = await fetch('/backend/appointment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || 'Unable to submit your message. Please try again.'
      };
    }

    return {
      success: Boolean(data?.success),
      message: data?.message || 'Vaše sporočilo je bilo uspešno oddano.',
      data: data
    };
  } catch (error) {
    return {
      success: false,
      message: 'Prišlo je do omrežne napake. Prosimo, poskusite znova ali nas pokličite po telefonu.'
    };
  }
};

// Helper function to validate contact format
export function validateContact(contact) {
  const phonePattern = /^(09)\d{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (phonePattern.test(contact)) {
    return { isValid: true, type: "phone" };
  }

  if (emailPattern.test(contact)) {
    return { isValid: true, type: "email" };
  }

  return { isValid: false, type: null };
}

// Helper function to validate password
export function validatePassword(password) {
  const errors = [];

  if (!password || password.length < 8) {
    errors.push("رمز عبور باید حداقل ۸ کاراکتر باشد");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push(
      "رمز عبور باید حداقل یک کاراکتر ویژه (@، #، !، و...) داشته باشد"
    );
  }

  return errors;
}

// Helper function to get role number from string
export function getRoleNumber(roleString) {
  const roleMap = {
    employer: 2, // کارفرما
    jobSeeker: 3, // کارجو
  };

  return roleMap[roleString] || 3; // Default to jobSeeker
}

// Helper function to detect contact type
export function detectContactType(value) {
  const phonePattern = /^(09)\d{9}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (phonePattern.test(value)) return "phone";
  if (emailPattern.test(value)) return "email";
  return null;
}

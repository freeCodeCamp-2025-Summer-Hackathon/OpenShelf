export const validation = {
  name: {
    required: 'Display name is required!',
    minLength: {
      value: 3,
      message: 'At least 3 characters, please...',
    },
  },
  password: {
    required: 'Password is required!',
    minLength: {
      value: 8,
      message: 'At least 8 characters, please...',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      message: 'Password must include uppercase, lowercase, numbers and special characters.',
    },
  },
  email: {
    required: 'Email address is required!',
    pattern: {
      value: /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
      message: 'Your email address seems invalid.',
    },
  },
  phoneNum: {
    maxLength: {
      value: 15,
      message: 'At most 15 numbers, please...',
    },
  },
}

export const Regexp = {
  password : new RegExp('(?=(.*[0-9]))(?=.*[\\!@#$%^&*()\\\\[\\]{}\\-_+=~`|:;"\'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}'),
  name     : new RegExp('^[a-z A-Z]+$'),
  email    : new RegExp('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6})*$')
}

export const emailValidation = (email: string) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !email.match(mailFormat);
};
export const telNumberValidator = (tel: string) => {
  const telNumberFormat = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return !tel.match(telNumberFormat);
};

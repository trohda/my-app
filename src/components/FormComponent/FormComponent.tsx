import React, { FC, useState } from "react";
import "../../Styles/FormComponent/FormComponentStyles.css";

interface FormRequest {
  name: string;
  e_mail: string;
  phone_number: string;
  company_name: string;
  message: string;
}

const FormComponent: FC = () => {
  //inputs states
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [telNumberInput, setTelNumberInput] = useState("");
  const [companyNameInput, setCompanyNAmeInput] = useState("");
  const [messageInput, setMessageInput] = useState("");

  //validation states
  const [inputError, setInputError] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [telNumberInputError, setTelNumberInputError] = useState(false);

  let inputRequest: FormRequest;

  const sendFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const telNumberFormat = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (
      nameInput.length === 0 ||
      emailInput.length === 0 ||
      telNumberInput.length === 0 ||
      companyNameInput.length === 0 ||
      messageInput.length === 0
    ) {
      setInputError(true);
    } else if (!emailInput.match(mailFormat)) {
      setEmailInputError(true);
    } else if (!telNumberInput.match(telNumberFormat)) {
      setTelNumberInputError(true);
    } else {
      inputRequest = {
        name: nameInput,
        e_mail: emailInput,
        phone_number: telNumberInput,
        company_name: companyNameInput,
        message: messageInput,
      };
      setEmailInputError(false);
      setTelNumberInputError(false);
      console.log(inputRequest);
    }
  };

  return (
    <div className="formWrapper">
      <h1>Napisz do nas:</h1>
      <form className="myForm" onSubmit={sendFormHandler}>
        <div className="formInput">
          <input
            type="text"
            placeholder="Imię i nazwisko"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          {inputError && nameInput.length <= 0 ? (
            <label>Proszę uzupełnić polę</label>
          ) : (
            ""
          )}
        </div>
        <div className="formInput">
          <input
            type="text"
            placeholder="Adres e-mail *"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          {inputError && emailInput.length <= 0 ? (
            <label>Proszę wpisać adres e-mail</label>
          ) : (
            ""
          )}
          {emailInputError && emailInput.length > 0 ? (
            <label>Proszę wpisać prawidłowy e-mail</label>
          ) : (
            ""
          )}
        </div>
        <div className="formInput">
          <input
            type="text"
            placeholder="+48 Numer telefonu"
            value={telNumberInput}
            onChange={(e) => setTelNumberInput(e.target.value)}
          />

          {inputError && telNumberInput.length <= 0 ? (
            <label>Proszę wpisać numer telefonu</label>
          ) : (
            ""
          )}
          {telNumberInputError && telNumberInput.length > 0 ? (
            <label>
              Numer musi posiadać prefix zaczynający się od + oraz min 7 cyfr
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="formInput">
          <input
            type="text"
            placeholder="Twoja nazwa firmy"
            value={companyNameInput}
            onChange={(e) => setCompanyNAmeInput(e.target.value)}
          />
          {inputError && companyNameInput.length <= 0 ? (
            <label>Proszę uzupełnić polę</label>
          ) : (
            ""
          )}
        </div>
        <textarea
          maxLength={1000}
          placeholder="Twoja wiadomość *"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></textarea>

        <div className="formConsent">
          <input type="checkbox" name="a" />
          Wyrażam zgodę na otrzymywanie informacji, w tym informacji przesyłanej
          na podany przeze mnie adres e-mail, a także na używanie
          telekomunikacyjnych urządzeń końcowych dla celów marketingu
          bezpośredniego Vee Care Sp. z. o. o. Wyrażenie ww. zgód jest
          dobrowolne. Zostałem/am także poinformowany/a, że udzielone przeze
          mnie zgody mogą być odwołane w każdym czasie.
        </div>
        <button type="submit">Wyślij wiadomość</button>
      </form>
    </div>
  );
};

export default FormComponent;

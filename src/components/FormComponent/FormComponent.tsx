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
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [telNumberInput, setTelNumberInput] = useState("");
  const [companyNameInput, setCompanyNAmeInput] = useState("");
  const [messageInput, setMessageInput] = useState("");

  let inputRequest: FormRequest;

  const sendFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    inputRequest = {
      name: nameInput,
      e_mail: emailInput,
      phone_number: telNumberInput,
      company_name: companyNameInput,
      message: messageInput,
    };
    console.log(inputRequest);
  };

  return (
    <div className="formWrapper">
      <form className="myForm" onSubmit={sendFormHandler}>
        <h1>Napisz do nas:</h1>
        <input
          type="text"
          placeholder="Imię i nazwisko"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <input
          type="email"
          placeholder="Adres e-mail *"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />

        <input
          type="text"
          placeholder="+48 Numer telefonu"
          value={telNumberInput}
          onChange={(e) => setTelNumberInput(e.target.value)}
        />

        <input
          type="text"
          placeholder="Twoja nazwa firmy"
          value={companyNameInput}
          onChange={(e) => setCompanyNAmeInput(e.target.value)}
        />

        <textarea
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

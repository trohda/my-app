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

  //validation states (is form fill correct)
  const [inputError, setInputError] = useState(false);

  //request send states (is request sent, what response)
  const [requestSent, setRequestSent] = useState(false);
  const [requestSentSuccess, setRequestSentSuccess] = useState(false);

  // object z danymi formularza
  let inputRequestData: FormRequest;

  const emailValidation = (email: string) => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !email.match(mailFormat);
  };
  const telNumberValidator = (tel: string) => {
    const telNumberFormat = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return !tel.match(telNumberFormat);
  };

  // request do api
  const sendRequest = (formData: FormRequest) => {
    fetch("http://localhost:3000")
      //fetch("http://backend.form.vee.ai"{
      //    method: "POST",
      //    headers: {
      //     "Content-Type": "application/json",
      //      "X-API-KEY": "pwoeirslkdfj4783woiery2lk3j4",
      //    },
      //     body: JSON.stringify(formData),
      //    })
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        } else if (res.status === 200) {
          setRequestSentSuccess(true);
        } else if (res.status === 404) {
          setRequestSentSuccess(false);
        }
      })
      .catch((error: Error) => console.log(error));
  };

  //submit formularza
  const sendFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      nameInput.length === 0 ||
      emailInput.length === 0 ||
      telNumberInput.length === 0 ||
      companyNameInput.length === 0 ||
      emailValidation(emailInput) ||
      telNumberValidator(telNumberInput)
    ) {
      setInputError(true);
    } else {
      inputRequestData = {
        name: nameInput,
        e_mail: emailInput,
        phone_number: telNumberInput,
        company_name: companyNameInput,
        message: messageInput,
      };
      sendRequest(inputRequestData);
      setRequestSent(true);
      console.log(inputRequestData);
    }
  };

  return (
    <div className="formWrapper">
      {!requestSent ? (
        <h1>Napisz do nas</h1>
      ) : requestSentSuccess ? (
        <h1>Dziękujemy</h1>
      ) : (
        <h1>Błąd serwera</h1>
      )}
      {!requestSent && (
        <form className="myForm" onSubmit={sendFormHandler}>
          <div className="formInputDiv">
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
          <div className="formInputDiv">
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
            {emailValidation(emailInput) && emailInput.length > 0 ? (
              <label>Proszę wpisać prawidłowy e-mail</label>
            ) : (
              ""
            )}
          </div>
          <div className="formInputDiv">
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
            {telNumberValidator(telNumberInput) && telNumberInput.length > 0 ? (
              <label>
                Numer musi posiadać tylko cyfry (minimum 7) oraz prefix
                zaczynający się od +
              </label>
            ) : (
              ""
            )}
          </div>
          <div className="formInputDiv">
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
            <input type="checkbox" className="myInput" />
            Wyrażam zgodę na otrzymywanie informacji, w tym informacji
            przesyłanej na podany przeze mnie adres e-mail, a także na używanie
            telekomunikacyjnych urządzeń końcowych dla celów marketingu
            bezpośredniego Vee Care Sp. z. o. o. Wyrażenie ww. zgód jest
            dobrowolne. Zostałem/am także poinformowany/a, że udzielone przeze
            mnie zgody mogą być odwołane w każdym czasie.
          </div>
          <button type="submit">Wyślij wiadomość</button>
        </form>
      )}
    </div>
  );
};

export default FormComponent;

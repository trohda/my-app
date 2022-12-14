import React, { FC, useState } from "react";
import {
  emailValidation,
  telNumberValidator,
} from "./formValidators/validators";
import { FormRequest } from "./models/FormRequest_model";
import "./Styles/FormComponent/FormComponentStyles.css";

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

  // request do api
  const sendRequest = (formData: FormRequest) => {
    fetch("http://backend.form.vee.ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "pwoeirslkdfj4783woiery2lk3j4",
      },
      body: JSON.stringify(formData),
    })
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
        <h1>Dzi??kujemy</h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          Przepraszamy <br />
          <span style={{ color: "red", fontSize: "2rem" }}>
            "B????d serwera"
            <br />
            :(
          </span>
        </h1>
      )}
      {!requestSent && (
        <form className="myForm" onSubmit={sendFormHandler}>
          <div className="formInputDiv">
            <input
              type="text"
              placeholder="Imi?? i nazwisko"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            {inputError && nameInput.length <= 0 ? (
              <label>Prosz?? uzupe??ni?? pol??</label>
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
              <label>Prosz?? wpisa?? adres e-mail</label>
            ) : (
              ""
            )}
            {emailValidation(emailInput) && emailInput.length > 0 ? (
              <label>Prosz?? wpisa?? prawid??owy e-mail</label>
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
              <label>Prosz?? wpisa?? numer telefonu</label>
            ) : (
              ""
            )}
            {telNumberValidator(telNumberInput) && telNumberInput.length > 0 ? (
              <label>
                Numer musi posiada?? tylko cyfry (minimum 7) oraz prefix
                zaczynaj??cy si?? od +
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
              <label>Prosz?? uzupe??ni?? pol??</label>
            ) : (
              ""
            )}
          </div>
          <textarea
            maxLength={1000}
            placeholder="Twoja wiadomo???? *"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          ></textarea>

          <div className="formConsent">
            <input type="checkbox" className="myInput" />
            Wyra??am zgod?? na otrzymywanie informacji, w tym informacji
            przesy??anej na podany przeze mnie adres e-mail, a tak??e na u??ywanie
            telekomunikacyjnych urz??dze?? ko??cowych dla cel??w marketingu
            bezpo??redniego Vee Care Sp. z. o. o. Wyra??enie ww. zg??d jest
            dobrowolne. Zosta??em/am tak??e poinformowany/a, ??e udzielone przeze
            mnie zgody mog?? by?? odwo??ane w ka??dym czasie.
          </div>
          <button type="submit">Wy??lij wiadomo????</button>
        </form>
      )}
    </div>
  );
};

export default FormComponent;

import { FC } from "react";
import "../../Styles/FormComponent/FormComponentStyles.css";
const FormComponent: FC = () => {
  return (
    <div className="formWrapper">
      <form className="myForm">
        <h1>Napisz do nas:</h1>
        <input type="text" placeholder="Imię i nazwisko" />
        <input type="email" placeholder="Adres e-mail *" />
        <input type="text" placeholder="+48 Numer telefonu" />
        <input type="text" placeholder="Twoja nazwa firmy" />
        <button type="submit">Wyślij wiadomość</button>
      </form>
    </div>
  );
};

export default FormComponent;

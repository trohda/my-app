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

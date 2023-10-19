import React from "react";
import Styles from "./ArticleCard.module.css";
import PlaceHolder from "../../assets/placeholder.png";

export default function ArticleCard() {
  return (
    <div className={Styles.Card}>
      <img
        src={PlaceHolder}
        alt="Placeholder for now"
        className={Styles.Image}
      />
      <div className={Styles.Text}>
        <p className={Styles.Title}>
          Antrajai KTU SA prezidento kadencijai išrinktas Danas Černeckas
        </p>
        <p className={Styles.Date}>Prieš 5 mėnesius</p>
        <p className={Styles.Description}>
          Kovo 31 d. KTU Studentų atstovybės (KTU SA) ataskaitinėje-rinkiminėje
          konferencijoje antrajai prezidento kadencijai išrinktas 4 metų patirtį
          organizacijoje skaičiuojantis Danas Černeckas. Konferencijos metu,
          vienerių metų kadencijai taip pat išrinkti kontrolės komiteto nariai
          ir atstovai į KTU senatą.
        </p>
      </div>
    </div>
  );
}

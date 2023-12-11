import React from "react";
import styles from "./FooterBar.module.css";
import KTU_SA_white from "../../assets/KTU_SA_baltas.png";
import { Link } from "react-router-dom";

export default function FooterBar() {
  return (
    <footer className={styles.Container}>
      <div>
        <img alt="KTU SA white logo" src={KTU_SA_white} />
        <p>
          KTU studentų atstovybė
          <br />
          K.Donelaičio g. 73
          <br />
          LT-44029 Kaunas
          <br />
          <a
            href="mailto:info@ktusa.lt"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.Link}
          >
            info@ktusa.lt
          </a>
        </p>
      </div>
      <div className={styles.NavigationSection}>
        <div className={styles.NavSection}>
          <div className={styles.Header}>Apie mus</div>
          <Link to="/AboutUs" className={styles.Link}>
            Kas yra KTU SA?
          </Link>
          <Link to="/Fsa" className={styles.Link}>
            Fakultetinės atstovybės
          </Link>
          <Link to="/Processes" className={styles.Link}>
            Procesai
          </Link>
          <Link to="/Documents" className={styles.Link}>
            Dokumentai
          </Link>
          <Link to="/ActivityReports" className={styles.Link}>
            Veiklos ataskaitos
          </Link>
          <Link to="/LetsBecomePartners" className={styles.Link}>
            Bendradarbiaukime
          </Link>
          <Link to="/FinancialSupport" className={styles.Link}>
            Paremk 1.2 %
          </Link>
          <Link to="/HowTojoin" className={styles.Link}>
            Kaip prisijungti?
          </Link>
        </div>
        <div className={styles.NavSection}>
          <div className={styles.Header}>Studentams</div>
          <Link to="/Dormitories" className={styles.Link}>
            Bendrabučiai
          </Link>
          <Link to="/Projects" className={styles.Link}>
            Tarptautiniai projektai
          </Link>
          <Link to="/Scholarships" className={styles.Link}>
            Stipendijos
          </Link>
          <Link to="/Ratings" className={styles.Link}>
            Renginiai
          </Link>
        </div>
        <div className={styles.NavSection}>
          <div className={styles.Header}>Atstovavimas</div>
          <Link to="/Elders" className={styles.Link}>
            Seniūnai
          </Link>
          <Link to="/KSPK" className={styles.Link}>
            Studijų programų komitetai
          </Link>
          <Link to="/StudentRepresentetives" className={styles.Link}>
            Studentų atstovai KTU organuose
          </Link>
          <Link to="/ShareAnIdea" className={styles.Link}>
            Pasidalink idėją!
          </Link>
        </div>
        <div className={styles.NavSection}>
          <div className={styles.Header}>Reikia pagalbos?</div>
          <Link to="/Duk" className={styles.Link}>
            DUK
          </Link>
          <Link to="/SocialHelp" className={styles.Link}>
            Socialinė pagalba
          </Link>
          <Link to="/AcademicHelp" className={styles.Link}>
            Akademinė pagalba
          </Link>
          <Link to="/Discrimination" className={styles.Link}>
            Diskriminacija
          </Link>
        </div>
        <div className={styles.NavSection2}>
          <a
            href="https://lsp.lt/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.Header} + ${styles.Link}`}
          >
            <b>Lietuvos studento pažymėjimas</b>
          </a>
          <Link to="/Contacts" className={`${styles.Header} + ${styles.Link}`}>
            <b>Kontaktai</b>
          </Link>
        </div>
      </div>
    </footer>
  );
}

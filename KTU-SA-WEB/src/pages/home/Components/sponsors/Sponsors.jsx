import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Sponsors.module.css";
import { useFetchSponsors } from "../../../../hooks/useFetchSponsors";
import { Skeleton, Tooltip } from "@mui/material";

export default function Sponsors() {
  const { data: sponsors, isLoading, error } = useFetchSponsors();

  if (error) return <></>;
  if (sponsors && sponsors.length === 0 ) return <></>; 
  
  return (
    <div className={styles.Container}>
      <SectionName title="Remėjai"/>
      <div className={styles.Logos}>
        {isLoading && 
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              <Skeleton variant="rectangular" animation="wave" width={200} height={80}/>
            </div>
          ))
        }
        {sponsors && sponsors.map((sponsor) => (
          <a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.Logo}
            key={sponsor.id}
          >
            <Tooltip title={sponsor.name}>
              <img 
                src={sponsor.logoId} 
                height={100}
                alt={sponsor.name} />
            </Tooltip>
          </a>
        ))}

      </div>
    </div>
  );
}

"use client";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { EventPreviewDto } from "@api/GetEvents";
import dateService from "@utils/dateService";

export default function EventCard({ event }: { event: EventPreviewDto }) {
  const router = useRouter();
  const [isPassed, setIsPassed] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const passed = Date.now() > new Date(event.startDate).getTime();
    const handle = setTimeout(() => setIsPassed(passed), 0);
    return () => clearTimeout(handle);
  }, [event.startDate]);

  return (
    <Box px={1} display="flex" justifyContent="center" alignItems="center">
      <ButtonBase
        onClick={() => router.push(`/events/${event.id}`)}
        type="button"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          width: "100%",
          maxWidth: "468px",
          textAlign: "left",
          borderRadius: 0,
          overflow: "hidden",
          transition: "0.3s",
          cursor: "pointer",
          "&:hover": { transform: "scale(1.02)", transition: "0.3s" },
          "&:focusVisible": {
            border: "2px solid black",
            borderRadius: "5px",
            transform: "scale(1.02)",
            transition: "0.3s",
          },
          "@media (max-width:500px)": {
            maxWidth: "80vw",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 216,
            bgcolor: "background.paper",
          }}
        >
          {isPassed && (
            <Chip
              label={t("event.passed")}
              size="small"
              sx={{
                position: "absolute",
                top: 2,
                left: 8,
                zIndex: 10,
                bgcolor: "#153C65",
                color: "#fff",
                fontWeight: 600,
                letterSpacing: "1px",
                fontFamily: "PFDinTextPro-Regular",
              }}
            />
          )}
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            sizes="100%"
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              letterSpacing: "1px",
              fontFamily: "PFDinTextPro-Regular",
              mt: "10px",
              fontSize: "25px",
              mr: "auto",
            }}
          >
            {event.title}
          </Typography>
          <Typography
            sx={{
              color: "#8C9BA4",
              mt: 0.5,
              letterSpacing: "1px",
              fontFamily: "PFDinTextPro-Regular",
            }}
          >
            {dateService.formatToDateAndTime(event.startDate)}
          </Typography>
        </Box>
      </ButtonBase>
    </Box>
  );
}

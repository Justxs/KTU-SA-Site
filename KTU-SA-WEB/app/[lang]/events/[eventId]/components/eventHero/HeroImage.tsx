import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { Box, Stack, Typography, Link as MuiLink } from "@mui/material";
import OptimizedImage from "@/components/common/OptimizedImage";
import { getTranslations } from "next-intl/server";
const NOW = Date.now();

type Props = {
  img: string;
  title: string;
  ticketUrl?: string;
  endDate: Date;
};

export default async function HeroImage(props: Props) {
  const { img, title, ticketUrl, endDate } = props;
  const t = await getTranslations();
  const hasEnded = new Date(endDate).getTime() < NOW;

  return (
    <Stack
      sx={{
        backgroundColor: "#F1F7FE",
        gap: { xs: 0, lg: "20px" },
        justifyContent: "center",
        alignItems: "center",
        py: "20px",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Box
        sx={{ width: { xs: "80vw", lg: "40vw" }, ml: { xs: 0, lg: "150px" } }}
      >
        <OptimizedImage
          alt={title}
          src={img}
          sizes="100%"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </Box>
      <Stack
        sx={{
          width: { xs: "65vw", lg: "50vw" },
          justifyContent: { xs: "flex-start", lg: "space-around" },
          alignItems: { xs: "center", lg: "flex-start" },
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: "#0E2643",
            fontSize: { xs: "25px", sm: "30px", md: "36px" },
            textAlign: { xs: "center", lg: "left" },
            fontFamily: "PFDinTextPro-Medium",
          }}
        >
          {title}
        </Typography>
        {ticketUrl !== null && ticketUrl !== undefined && !hasEnded && (
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              gap: "5px",
              fontSize: "22px",
              color: "#0E2643",
              transition: "0.03s",
              "&:hover": { color: "#4A9FE6" },
            }}
          >
            <LocalActivityIcon sx={{ height: "30px", width: "30px" }} />
            <MuiLink href={ticketUrl} underline="none" color="inherit">
              {t("event.buyTickets")}
            </MuiLink>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

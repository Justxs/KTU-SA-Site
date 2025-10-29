import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Stack, Typography } from "@mui/material";
import styles from "./ContactCard.module.css";
import { ContactDto } from "@api/GetContacts";
import placeholder from "@public/assets/placeholders/avatar-placeholder.png";
import OptimizedImage from "@components/common/OptimizedImage";

export default function ContactCard({
  contact,
  small = false,
}: {
  contact: ContactDto;
  small?: boolean;
}) {
  return (
    <Stack
      direction={small ? "column" : { xs: "column", sm: "row" }}
      alignItems="center"
      gap={1.25}
      sx={{ maxWidth: { xs: 300, sm: 480 } }}
    >
      <Box
        position="relative"
        sx={{
          width: { xs: 247, sm: 264 },
          height: { xs: 300, sm: 320 },
          bgcolor: "#FFD324",
          border: "10px solid #FFD324",
          borderRadius: "8px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <OptimizedImage
          src={contact.imageSrc}
          alt={contact.name}
          placeholder="blur"
          blurDataURL={placeholder.src}
          fill
          sizes="(max-width:600px) 247px, 264px"
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Stack
        gap={2}
        alignItems={{ xs: "center", sm: small ? "center" : "flex-start" }}
        sx={{ textAlign: { xs: "center", sm: small ? "center" : "left" } }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: 700, fontFamily: "PFDinTextPro-Regular" }}
          >
            {contact.position}
          </Typography>
          <Typography
            sx={{ fontSize: "25px", fontFamily: "PFDinTextPro-Regular" }}
          >
            {contact.name}
          </Typography>
          <Typography fontFamily="PFDinTextPro-Regular">
            {contact.responsibilities}
          </Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={0.625}
          sx={{ color: "#48535C" }}
        >
          <MailOutlineIcon sx={{ width: 16, height: 16 }} />
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </Stack>
      </Stack>
    </Stack>
  );
}

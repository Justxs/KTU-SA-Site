import OptimizedImage from "@/components/common/OptimizedImage";
import { getTranslations } from "next-intl/server";
import dateService from "@utils/dateService";
import ReadMoreButton from "@components/readMoreButton/ReadMoreButton";
import { EventPreviewDto } from "@api/GetEvents";
import { Box, Typography, Chip, Stack } from "@mui/material";

type Props = {
  event: EventPreviewDto;
  isActive: boolean;
};

export default async function EventCard(props: Props) {
  const { event, isActive } = props;

  const t = await getTranslations();

  const color = isActive ? "#FFD324" : undefined;
  const dateColor = isActive ? "#A46304" : "#8C9BA4";

  const maxWidth = isActive ? 532 : 400;
  const titleSize = isActive ? 28 : 20;
  const isPast = new Date(event.startDate as unknown as string) < new Date();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="#24282D"
      borderRadius={2}
      p={2}
      sx={{ backgroundColor: color, width: "100%", maxWidth }}
    >
      <Box
        sx={{
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
          aspectRatio: "2 / 1",
        }}
      >
        {isPast && (
          <Chip
            label={t("event.passed")}
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 1,
              fontWeight: 600,
              bgcolor: "#ECEFF1",
            }}
          />
        )}
        <OptimizedImage
          src={event.coverImageUrl}
          alt={event.title}
          fill
          sizes={`(max-width:700px) 80vw, ${maxWidth}px`}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Stack width="100%">
        <Typography
          mt={1}
          mb={0.5}
          fontSize={titleSize}
          fontWeight={600}
          letterSpacing={1}
          fontFamily="PFDinTextPro-Regular"
        >
          {event.title}
        </Typography>
        <Typography fontSize={15} mb={1} sx={{ color: dateColor }}>
          {dateService.formatToDateAndTime(event.startDate)}
        </Typography>
        <ReadMoreButton
          title={t("button.readMore")}
          path={`/events/${event.id}`}
        />
      </Stack>
    </Box>
  );
}

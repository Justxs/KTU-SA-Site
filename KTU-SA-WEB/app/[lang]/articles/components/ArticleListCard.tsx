import { getTranslations } from "next-intl/server";
import { ArticleDto } from "@api/GetArticles";
import dateService from "@utils/dateService";
import ReadMoreButton from "@components/readMoreButton/ReadMoreButton";
import OptimizedImage from "@components/common/OptimizedImage";
import { Box, Stack, Typography } from "@mui/material";

type Props = {
  article: ArticleDto;
  isActive: boolean;
};

export default async function ArticleListCard(props: Props) {
  const { article, isActive } = props;

  const t = await getTranslations();

  const maxWidth = isActive ? 532 : 400;

  const size = isActive ? "28px" : "20px";

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      minHeight="100%"
      color="#24282D"
    >
      <Box
        sx={{
          width: "100%",
          maxWidth,
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #E0E0E0",
          position: "relative",
          aspectRatio: "2 / 1",
        }}
      >
        <OptimizedImage
          src={article.thumbnailImageId}
          alt={article.title}
          sizes={`(max-width:700px) 80vw, ${maxWidth}px`}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </Box>
      <Stack pt={1} height="100%" width="100%" spacing={1} sx={{ maxWidth }}>
        <Typography
          fontSize={size}
          fontFamily="PFDinTextPro-Medium"
          lineHeight={size}
        >
          {article.title}
        </Typography>
        <Typography fontSize={15} fontFamily="PFDinTextPro-Regular">
          {dateService.formatTimeAgo(article.createdDate, t)}
        </Typography>
        <Typography
          sx={{
            letterSpacing: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "PFDinTextPro-Regular",
          }}
        >
          {article.preview}
        </Typography>
        <ReadMoreButton
          title={t("button.readMore")}
          path={`/articles/${article.id}`}
        />
      </Stack>
    </Box>
  );
}

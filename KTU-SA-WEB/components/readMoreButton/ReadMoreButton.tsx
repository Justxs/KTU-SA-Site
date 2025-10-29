"use client";

import { Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

type Props = {
  path: string;
  title: string;
  isCenter?: boolean;
  margin?: boolean;
};

export default function ReadMoreButton(props: Readonly<Props>) {
  const { path, title, isCenter = false, margin = false } = props;

  const router = useRouter();
  const containerSx = {
    display: isCenter ? "flex" : "block",
    justifyContent: isCenter ? "center" : undefined,
    pb: margin ? "44px" : undefined,
    mt: margin ? "30px" : undefined,
  } as const;

  return (
    <Box sx={containerSx}>
      <Button
        variant="contained"
        onClick={() => router.push(path)}
        size="small"
        disableFocusRipple
        sx={{
          backgroundColor: "#0E2643",
          color: "#F6F7F8",
          textTransform: "none",
          p: "12px",
          fontSize: "20px",
          fontFamily: "PFDinTextPro-Medium",
          lineHeight: 1,
          gap: "12px",
          ":focus-visible": {
            outline: "2px solid #007fff",
            backgroundColor: "#007fff",
          },
        }}
      >
        {title}
        <ArrowForwardIcon />
      </Button>
    </Box>
  );
}

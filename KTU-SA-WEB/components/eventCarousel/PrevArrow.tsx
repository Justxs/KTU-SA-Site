"use client";

import { ArrowLeft } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function PrevArrow(props: Props) {
  const { className, style, onClick } = props;

  if (className?.includes("slick-disabled")) {
    return null;
  }

  return (
    <div className={className} style={style} onClick={onClick}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton
          aria-label="previous"
          sx={{
            position: "absolute",
            left: "-100px",
            top: "-50px",
            color: "#153C65",
            bgcolor: "transparent",
            "&:hover": { color: "#89C0F0" },
          }}
        >
          <ArrowLeft sx={{ fontSize: 100 }} />
        </IconButton>
      </Box>
    </div>
  );
}

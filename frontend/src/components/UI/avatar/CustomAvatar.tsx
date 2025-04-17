import { Avatar, Badge, styled } from "@mui/material";
import a from "../../../assets/testAvatar.png";

type AvatarProps = {
  size: number;
};

export const CustomAvatar = ({ size = 50 }: AvatarProps) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      width: 11, // ширина точки
      height: 11, // высота точки
      backgroundColor: "#FE6D87",
      color: "#FE6D87",
      borderRadius: "50%",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar alt="Remy Sharp" src={a} sx={{ width: size, height: size }} />
    </StyledBadge>
  );
};

import { Avatar, Badge, styled } from "@mui/material";

type AvatarProps = {
  avatar: string;
  size: number;
  online: boolean;
  isChat?: boolean;
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    width: 11,
    height: 11,
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

export const CustomAvatar = ({
  avatar,
  online,
  size = 50,
  isChat = false,
}: AvatarProps) => {
  const avatarComponent = (
    <Avatar alt="User Avatar" src={avatar} sx={{ width: size, height: size }} />
  );

  if (isChat) {
    return avatarComponent;
  }

  return online ? (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      {avatarComponent}
    </StyledBadge>
  ) : (
    avatarComponent
  );
};

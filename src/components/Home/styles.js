import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse !important",
    },
  },
}));

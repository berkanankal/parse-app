import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";

const purpleColor = deepPurple[500];

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex !important",
    flexDirection: "row !important",
    justifyContent: "space-between !important",
    alignItems: "center !important",
    padding: "10px 50px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column !important",
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 300,
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      width: "230px",
    },
  },
  logout: {
    marginLeft: "20px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: theme.palette.secondary.main + " !important",
  },
}));

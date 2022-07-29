import { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../redux/postsSlice";
import { useSearchParams } from "react-router-dom";
import { fetchPosts } from "../../redux/postsSlice";

import useStyles from "./styles";

const Paginate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { numberOfPages, page } = useSelector((state) => state.posts);

  const handleChange = (e, value) => {
    if (searchParams.get("search")) {
      setSearchParams({ search: searchParams.get("search"), page: value });
    } else {
      setSearchParams({ page: value });
    }
  };

  return (
    <Pagination
      onChange={handleChange}
      classes={{ ul: classes.ul }}
      count={numberOfPages || 1}
      page={Number(searchParams.get("page") || 1)}
      variant="outlined"
      color="primary"
      renderItem={(item) => <PaginationItem {...item} />}
    />
  );
};

export default Paginate;

import React from "react";
import { inject, observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import NewsSinglePage from "../NewsSinglePage";
//import { isObject } from "mobx/lib/internal";

const useStyles = makeStyles((theme) => ({
  rootGrid: {
    display: "flex",
    padding: 20,
    //width: window.width
  },
  newsGrid: {
    display: "flex",
    padding: "5px",
  },
}));

const NewsPage = (props) => {
  console.log("newsPage A", props.Store.latestNews);
  //console.log("newsPage getLatestNews", props.Store.getLatestNews);
  console.log("newsPage A", typeof props.Store.latestNews);
  if (typeof (props.Store.isgetLatestNews === true)) {
    console.log("is object");
  } else {
    console.log("is array");
  }

  const getUpdate = () => props.Store.fetchLatestNews();
  // getUpdate();

  let news = props.Store.latestNews.data.value;
  console.log("newsPage ", news);
  const { latestNews } = props.Store;
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.rootGrid}>
      {news.map((item) => (
        <Grid xs={4} item className={classes.newsGrid}>
          <NewsSinglePage
            title={item.title}
            description={item.description}
            body={item.body}
            datePublished={item.datePublished}
            image={item.image.thumbnail}
            imageUrl={item.image.url}
            keywords={item.keywords}
            provider={item.provider}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default inject("Store")(observer(NewsPage));

import React from "react";
import { inject, observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import NewsSinglePage from "../NewsSinglePage";

const useStyles = makeStyles(theme => ({
  rootGrid: {
    display: "flex",
    padding: 20
    //width: window.width
  },
  newsGrid: {
    padding: 120
  }
}));

const NewsPage = props => {
  console.log("newsPage ", typeof props.Store.latestNews);
  let news = props.Store.latestNews.data.value;
  console.log("newsPage ", news);
  const { latestNews } = props.Store;
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.rootGrid}>
      <Grid item xs={12}>
        News Page
      </Grid>
      <Grid container spacing={2}>
        {news.map(item => (
          <Grid item xs={12} sm={4} md={3} className={classes.newsGrid}>
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
    </Grid>
  );
};

export default inject("Store")(observer(NewsPage));

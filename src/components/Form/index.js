import React from "react";
import { useForm, Controller } from "react-hook-form";
import emailjs from "emailjs-com";
import { Input, InputLabel, Grid, Paper, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex"
    //width: "700px"
  },
  paper: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 60,
    paddingBottom: 60
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    padding: 10,
    fontWeight: 700
  }
});

export default function Form() {
  const { register, handleSubmit, watch, errors } = useForm();
  const { userEmail, setUserEmail } = React.useState("pdavimmilkman@gmail.com");
  const { userName, setUserName } = React.useState("Pedro Davim");
  const { message, setMessage } = React.useState("");

  const onSubmit = data => {
    console.log("data ", data);
    //  setMessage(data);
    const templateId = "template_RiJlXlBu";
    const UserID = "user_0HAZccRtKOiAE4FtFgjFG";

    emailjs
      .send(
        "gmail",
        templateId,
        {
          message_html: data.message,
          from_name: data.firstName + " " + data.lastName,
          reply_to: data.email,
          to_name: "Pedro Davim"
        },
        UserID
      )
      .then(res => {
        console.log("Email successfully sent!");
      })
      .catch(err => {
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        );
      });

    /* sendFeedback(
      templateId,
      {
        message_html: data.message,
        from_name: data.firstName,
        reply_to: data.email
      },
      UserID
    ); */
  };

  /* const sendFeedback = (templateId, variables, UserID) => {
    emailjs.sendForm("gmail", templateId, variables, UserID).then(res => {
      console.log("Email successfully sent!");
    }),
      err => {
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        );
      };
  }; */
  //console.log(watch("example")); // watch input value by passing the name of it
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title}>Send me a message</Typography>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <TextField
          style={{ marginTop: 12 }}
          name="firstName"
          id="firstName"
          label="First Name"
          variant="outlined"
          inputRef={register({ required: true })}
          placeholder="First Name"
          fullWidth
        />
        {errors.firstName && <span>This field is required</span>}

        <TextField
          style={{ marginTop: 12 }}
          name="lastName"
          inputRef={register({ required: true })}
          placeholder="Last Name"
          fullWidth
          id="lastName"
          label="Last Name"
          variant="outlined"
        />
        {errors.lastName && <span>This field is required</span>}

        <TextField
          style={{ marginTop: 12 }}
          fullWidth
          placeholder="Email"
          name="email"
          type="email"
          inputRef={register({ required: true })}
          id="email"
          label="Email"
          variant="outlined"
        />
        {errors.email && <span>This field is required</span>}

        <TextField
          style={{ marginTop: 12 }}
          fullWidth
          multiline
          rows="4"
          name="message"
          inputRef={register({ required: true })}
          placeholder="Your Message"
          id="message"
          label="Message"
          variant="outlined"
        />
        {errors.message && <span>This field is required</span>}
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          style={{ marginTop: 12 }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
}

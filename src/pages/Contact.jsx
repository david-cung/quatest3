import React from "react";
import { Container, TextField, Button, Typography } from "@mui/material";

const Contact = () => {
  return (
    <Container>
      <Typography variant='h2' gutterBottom>
        Liên hệ với chúng tôi
      </Typography>
      <form noValidate autoComplete='off'>
        <TextField label='Họ tên' fullWidth margin='normal' />
        <TextField label='Email' fullWidth margin='normal' />
        <TextField
          label='Nội dung'
          multiline
          rows={4}
          fullWidth
          margin='normal'
        />
        <Button variant='contained' color='primary' type='submit'>
          Gửi
        </Button>
      </form>
    </Container>
  );
};

export default Contact;

import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

const services = [
  {
    title: "Kiểm định chất lượng",
    description: "Kiểm định chất lượng sản phẩm, đảm bảo đáp ứng tiêu chuẩn.",
  },
  {
    title: "Thử nghiệm sản phẩm",
    description: "Kiểm tra sản phẩm với các tiêu chuẩn quốc gia và quốc tế.",
  },
  {
    title: "Hiệu chuẩn thiết bị",
    description: "Hiệu chuẩn thiết bị đo lường, đảm bảo độ chính xác.",
  },
];

const Services = () => {
  return (
    <Container>
      <Typography variant='h2' gutterBottom>
        Dịch vụ của chúng tôi
      </Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant='h5'>{service.title}</Typography>
                <Typography>{service.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary' href='/contact'>
                  Liên hệ ngay
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;

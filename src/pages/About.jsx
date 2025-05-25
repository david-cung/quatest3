import { Container, Typography } from "@mui/material";

const About = () => {
  return (
    <Container sx={{ mt: 100 }}>
      <Typography variant='h2' gutterBottom>
        Về chúng tôi
      </Typography>
      <Typography paragraph>
        Quatest là tổ chức uy tín hàng đầu trong lĩnh vực kiểm định, thử nghiệm
        và hiệu chuẩn. Chúng tôi cam kết mang đến dịch vụ chất lượng cao, đảm
        bảo uy tín và sự hài lòng cho khách hàng.
      </Typography>
      <Typography paragraph>
        Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại,
        Quatest đã và đang là đối tác tin cậy của nhiều doanh nghiệp trong và
        ngoài nước.
      </Typography>
      <Typography paragraph>
        Hãy liên hệ với chúng tôi để được hỗ trợ và tư vấn chi tiết.
      </Typography>
    </Container>
  );
};

export default About;

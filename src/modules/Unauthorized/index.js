import NotFoundPage from '../../assets/illustration_404.svg';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, Not authorized!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, you are not authorized to view this page. Please contact the administrator for
            further assistance.
          </Typography>

          <Box
            component="img"
            src={NotFoundPage}
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button size="large" variant="contained" onClick={handleGoBack}>
            Go Back
          </Button>
        </StyledContent>
      </Container>
    </>
  );
};

export default Unauthorized;

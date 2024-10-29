import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Card } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useResponsive from 'src/hooks/useResponsive';
import RegisterForm from './RegForm';
import signUp from '../../../assets/illustration.png';


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Registration() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Stack alignItems="center" justifyContent="center">
              <Card
                sx={{
                  p: 5,
                  width: 1,
                  maxWidth: 510,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Register as a user{' '}
                </Typography>

                <Typography variant="body2" sx={{ mb: 3 }}>
                  Not here? {''}
                  <Link to="/" variant="subtitle2" component={RouterLink}>
                    Go back
                  </Link>
                </Typography>

                <Divider sx={{ my: 3 }}></Divider>

                <RegisterForm />
              </Card>
            </Stack>
          </StyledContent>
        </Container>
        {mdUp && (
          <StyledSection>
            <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, You're Welcome!
            </Typography>
            <img src={signUp} alt="Sign-up" />
          </StyledSection>
        )}
      </StyledRoot>
    </>
  );
}

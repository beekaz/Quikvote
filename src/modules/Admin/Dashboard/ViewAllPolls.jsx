import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Layout from '../../../Layouts/Admin/DashboardLayout';
import { Button, Card, CardContent, CardMedia, Container, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useNavigate } from 'react-router-dom';
import { positions } from './components/poll-data';
import logo from 'src/assets/votelogo.png';
import Countdown from 'react-countdown';
import CountdownComponent from 'src/components/CountDown';

const CreatePolls = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const HandleView = (position) => {
    navigate(`/app/polls/${position.path}`, { state: { position } });
  };

  const PositionCard = ({ position }) => (
    <Card
      style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <CardMedia component="img" height="140" image={logo} alt={position.position} />
      <CardContent style={{ flex: 1 }}>
        <Typography variant="h5">{position.position}</Typography>
        <Typography variant="body2">{position.brief}</Typography>
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          {position.additionalInfo}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => HandleView(position)} variant="outlined" color="primary">
          Vote
        </Button>
      </Box>
    </Card>
  );

  return (
    <>
      <Layout name="All Candidates" title="Candidates">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h7" gutterBottom>
              Available Polls
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="enter" mb={3}>
            <CountdownComponent />
          </Stack>

          <Grid container spacing={2} alignItems="stretch">
            {positions?.map((position) => (
              <Grid item xs={12} sm={6} md={4} key={position.id}>
                <PositionCard position={position} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default CreatePolls;

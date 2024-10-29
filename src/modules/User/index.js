import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Grid, Grid2, Stack, Typography } from '@mui/material';
import { positions } from '../Admin/Dashboard/components/poll-data';
import { AuthContext } from '../../context';
import { useFetchCandidates } from '../../context/hooks';

const PollCard = ({ pos, aspc }) => {
  const navigate = useNavigate();
  const positionCount = aspc.find((c) => c.position.id === pos.id)?.count || 0;
  const HandleView = (position) => {
    navigate(`/user/polls/${position.path}`, { state: { position } });
  };

  return (
    <Card
      style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <CardContent style={{ flex: 1 }}>
        <Typography variant="h5">{pos.position}</Typography>
        <Typography style={{ marginTop: '5px' }} variant="h6">
          Role:
        </Typography>
        <Typography variant="body1">{pos.additionalInfo}</Typography>

        <Typography style={{ marginTop: '5px' }} variant="h6" color="textSecondary">
          <strong>Total number of Aspirants: {''}</strong> {positionCount || 0}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => HandleView(pos)} variant="outlined" color="primary">
          Vote
        </Button>
      </Box>
    </Card>
  );
};

const Dashboard = ({ polls, asps }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const position = positions;
  const AllAspirants = useFetchCandidates();
  const counts = positions.map((position) => {
    const count = AllAspirants.filter((asp) => asp.position === position.position).length;
    return { position, count };
  });

  const ViewPolls = () => {
    navigate(`user/polls/results`);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, {user?.fullname || ''} 👋
        </Typography>

        <Typography variant="h6" style={{ marginTop: '10px', marginBottom: '10px' }}>
          All Polls
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <div>
            <Typography variant="h7" gutterBottom>
              All Candidates{' '}
            </Typography>
          </div>

          <div>
            <Button
              variant="contained"
              sx={{ marginRight: 0, marginLeft: 2 }}
              onClick={ViewPolls}
              // startIcon={<Iconify icon="eva:eye-fill" />}
            >
              View Poll Results{' '}
            </Button>
          </div>
        </Stack>

        <div style={{}}>
          <Grid2 container spacing={2}>
            {position?.map((pos) => (
              <Grid2 item xs={12} sm={6} md={4} key={pos.id}>
                <PollCard pos={pos} asps={AllAspirants} aspc={counts} />
              </Grid2>
            ))}
          </Grid2>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;

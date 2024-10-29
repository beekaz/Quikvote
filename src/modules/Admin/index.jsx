import React, { useContext } from 'react';
// import Layout from '../../Layouts/Admin/DashboardLayout';
// import { AuthContext } from 'src/context';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import SummaryCard from 'src/components/SummaryCard';
// import { PrivatePaths } from 'src/routes/path';
// import { useFetchCandidates, useFetchPolls, useFetchUsers } from '../../context/hooks';
import { Container, Grid2, Typography, useTheme } from '@mui/material';
import { AuthContext } from '../../context';
import SummaryCard from '../../components/Summary Card';
import { useFetchCandidates, useFetchPolls, useFetchUsers } from '../../context/hooks';
import HeaderLayout from '../../Layouts/Admin';
// import PollChart from 'src/components/views/PollChart';

// ----------------------------------------------------------------------

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const candidates = useFetchCandidates();
  const users = useFetchUsers();
  const AllVotes = useFetchPolls();

  const partyVotes = AllVotes.reduce((acc, vote) => {
    acc[vote.party] = (acc[vote.party] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(partyVotes).map(([party, count]) => ({
    label: party,
    value: count,
  }));

  return (
    <HeaderLayout>
      <Container maxWidth="xl" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, {user?.fullname || ''} 👋
        </Typography>

        <Grid2 container spacing={3}>
          <Grid2 item xs={12} sm={6} md={3}>
            <SummaryCard
              title="Total Votes"
              total={AllVotes?.length || 0}
              color="warning"
              icon={'medical-icon:i-outpatient'}
              // url={`${PrivatePaths.ADMIN}/votes`}
            />
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <SummaryCard
              title="Total Users"
              total={users?.length || 0}
              color="success"
              icon={'medical-icon:i-outpatient'}
              // url={`${PrivatePaths.ADMIN}/users`}
            />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={3}>
            <SummaryCard
              title="Total Candidates"
              total={candidates?.length || 0}
              color="primary"
              icon={'medical-icon:i-outpatient'}
              // url={`${PrivatePaths.ADMIN}/candidates`}
            />
          </Grid2>
        </Grid2>
      </Container>
      <Container maxWidth="xl">
        {/* <Grid item xs={12} sm={24} md={24}>
          <PollChart
            title="Poll Graph by Party"
            chartData={chartData}
            chartColors={[
              theme.palette.error.main,
              theme.palette.warning.main,
              theme.palette.success.main,
            ]}
          />
        </Grid> */}
      </Container>
    </HeaderLayout>
  );
};

export default Dashboard;

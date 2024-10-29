import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import logo from '../../assets/votelogo.png';
import { PrivatePaths } from 'src/routes/path';
import { AuthContext } from 'src/context';
import { useContext } from 'react';

const CandidateCard = ({ candidate, index }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleView = (res) => {
    let path;
    if (user) {
      switch (user.role) {
        case 'Admin':
          path = `${PrivatePaths.ADMIN}/candidates/${candidate.id}`;
          break;
        default:
          path = `${PrivatePaths.USER}/candidates/${candidate.id}`;
      }
    }
    navigate(path, { state: { candidate } });
  };

  const profilepic = candidate ? candidate?.photo : '';

  return (
    <Card sx={{ mt: -3, mb: 4, minWidth: 250, cursor: 'pointer' }} onClick={handleView}>
      <CardMedia
        sx={{
          height: 10,
          paddingTop: '125%',
          minWidth: 200,
        }}
        image={profilepic || logo}
        title={candidate?.fullname}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {candidate?.fullName}{' '}
        </Typography>
        <Typography variant="h7" color="text.secondary">
          Position: {candidate?.position}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {candidate?.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Party: {candidate?.partyAffiliation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {candidate?.age}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ ml: 2, mt: -2 }} size="small">
          VIEW PROFILE
        </Button>
      </CardActions>
    </Card>
  );
};

export default CandidateCard;

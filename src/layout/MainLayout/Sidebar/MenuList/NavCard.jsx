// material-ui
import { Button, Card, CardMedia, CardContent, Link, Stack, Typography } from '@mui/material';

// assets
import avatar from 'assets/images/sidebar.png';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => {
  return (
    <Card sx={{ bgcolor: 'rgb(250, 250, 250)', border: '1px solid rgb(230, 235, 241)', m: 2 }}>
      <CardContent>
        <Stack alignItems="center" spacing={2.5}>
          <CardMedia component="img" image={avatar} sx={{ width: 112 }} />
          <Stack alignItems="center">
            <Typography variant="h5">Info Card</Typography>
            <Typography variant="h6" color="secondary" textAlign="center">
              Additional information or tips can go here
            </Typography>
          </Stack>
          <Button component={Link} target="_blank" href="https://example.com" variant="contained" color="primary" size="small">
            Learn More
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NavCard;

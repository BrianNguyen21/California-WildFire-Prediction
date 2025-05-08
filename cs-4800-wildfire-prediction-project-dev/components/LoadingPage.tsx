import { CircularProgress, Container } from '@mui/material';

export default function Loading() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Loading...
      <CircularProgress sx={{ p: 2 }} />
    </Container>
  );
}

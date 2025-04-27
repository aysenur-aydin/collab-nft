import { useCurrentAccount } from "@mysten/dapp-kit";
import {
  Container,
  Divider,
  Stack,
  Typography,
  Paper,
  Box,
  Avatar,
  Chip,
  useTheme,
  alpha,
  Grid,
} from "@mui/material";

//Components
import IsAdmin from "../component/admin/IsAdmin";

export function AdminPage() {
  const account = useCurrentAccount();
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Wallet Status Section */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              background: `linear-gradient(45deg, ${alpha(theme.palette.secondary.main, 0.8)}, ${alpha(theme.palette.secondary.dark, 0.9)})`,
              color: "white",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.common.white, 0.2),
                  width: 56,
                  height: 56,
                }}
              >
                A
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight="bold">
                  Admin Dashboard
                </Typography>
                {account ? (
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {account.address}
                  </Typography>
                ) : (
                  <Typography variant="body2">
                    Please connect your wallet to access admin features
                  </Typography>
                )}
              </Box>
              <Chip
                label={account ? "Connected" : "Not Connected"}
                color={account ? "success" : "warning"}
                sx={{ fontWeight: "bold" }}
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Admin Content Section */}
        <Grid item xs={12}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              background: alpha(theme.palette.background.paper, 0.9),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
            }}
          >
            {account ? (
              <IsAdmin key={account.address} />
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  p: 4,
                  border: `1px dashed ${alpha(theme.palette.warning.main, 0.5)}`,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h5" color="warning.main" gutterBottom>
                  Not Connected
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Please connect your wallet to manage the NFT collection
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

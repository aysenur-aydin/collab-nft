import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
// import { toast } from "react-toastify";

//Components
import AvailableNfts from "../component/user/AvailableNfts";
import MintNft from "../component/user/MintNft";
import UserNfts from "../component/user/UserNfts";
import { PACKAGE_ID, COLLECTION_ID } from "../../constants";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";
import { useMintCap } from "../hooks/useMintCap";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export function UserPage() {
  const account = useCurrentAccount();
  const { data: mintCapData } = useMintCap();
  const [mintPrice, setMintPrice] = useState("");
  const client = useSuiClient();
  const theme = useTheme();

  const { mutate: executeSetMintPrice } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
        },
      }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mintCapData?.mintCapId) {
      console.error("You don't have MintCap permission");
      return;
    }

    const price = Number(mintPrice);
    if (isNaN(price) || price <= 0) {
      console.error("Please enter a valid price");
      return;
    }

    // Convert to MIST (1 SUI = 10^9 MIST)
    const priceInMist = BigInt(price * 1_000_000);

    // Create transaction
    const txb = new Transaction();
    txb.moveCall({
      target: `${PACKAGE_ID}::mint::set_mint_price`,
      arguments: [
        txb.object(mintCapData.mintCapId),
        txb.object(COLLECTION_ID),
        txb.pure.u64(priceInMist),
      ],
    });

    executeSetMintPrice(
      {
        transaction: txb,
        chain: "sui:testnet",
      },
      {
        onError: (err) => {
          console.error(err.message);
        },
        onSuccess: (result) => {
          console.log(
            `Mint price updated successfully. Digest: ${result.digest}`,
          );
          setMintPrice("");
        },
      },
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {account ? (
        <Grid container spacing={3}>
          {/* Wallet Info Section */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.dark, 0.9)})`,
                color: "white",
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      width: 56,
                      height: 56,
                    }}
                  >
                    <AccountBalanceWalletIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      Wallet Connected
                    </Typography>
                    <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                      {account.address}
                    </Typography>
                  </Box>
                </Stack>
                <Chip
                  label={mintCapData?.isAdmin ? "Admin Access" : "User"}
                  color={mintCapData?.isAdmin ? "success" : "default"}
                  sx={{ fontWeight: "bold" }}
                />
              </Stack>
            </Paper>
          </Grid>

          {/* NFT Stats Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                background: alpha(theme.palette.background.paper, 0.9),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <AvailableNfts />
            </Paper>
          </Grid>

          {/* Mint NFT Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: alpha(theme.palette.background.paper, 0.9),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                fontWeight="medium"
                textAlign="center"
              >
                Mint a New NFT
              </Typography>
              <Box sx={{ mt: 2, width: "100%" }}>
                <MintNft />
              </Box>
            </Paper>
          </Grid>

          {/* User NFTs Section */}
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                background: alpha(theme.palette.background.paper, 0.9),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <UserNfts />
            </Paper>
          </Grid>

          {/* Admin Price Setting Section */}
          {mintCapData?.isAdmin && (
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: alpha(theme.palette.background.paper, 0.9),
                  border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <MonetizationOnIcon color="success" fontSize="large" />
                  <Typography variant="h5" fontWeight="medium">
                    Mint Price Settings
                  </Typography>
                </Stack>

                <form onSubmit={handleSubmit}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="center"
                  >
                    <TextField
                      type="number"
                      id="price"
                      label="New Mint Price (SUI)"
                      value={mintPrice}
                      onChange={(e) => setMintPrice(e.target.value)}
                      variant="outlined"
                      size="medium"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: theme.palette.success.main,
                          },
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      size="large"
                      sx={{
                        minWidth: 150,
                        fontWeight: "bold",
                      }}
                    >
                      Update Price
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </Grid>
          )}
        </Grid>
      ) : (
        <Paper
          elevation={3}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 2,
            background: `linear-gradient(45deg, ${alpha(theme.palette.warning.light, 0.15)}, ${alpha(theme.palette.warning.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <AccountBalanceWalletIcon color="warning" sx={{ fontSize: 60 }} />
          </Box>
          <Typography
            variant="h4"
            gutterBottom
            color="warning.dark"
            fontWeight="medium"
          >
            Wallet Not Connected
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Please connect your wallet to mint NFTs and view your collection.
          </Typography>
          <Box mt={3}>
            <AvailableNfts />
          </Box>
        </Paper>
      )}
    </Container>
  );
}

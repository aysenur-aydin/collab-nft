import { useState } from "react";
//Hooks
import { useCollectionData } from "../../hooks/useCollectionData";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useQueryClient } from "@tanstack/react-query";

//Contract
import { mintAnNft } from "../../utils/contract";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Stack,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";
import { useNftData } from "../../hooks/useNftData";

function MintNft() {
  const queryClient = useQueryClient();
  const { mintCurrentPrice, refetchCollectionData } = useCollectionData();
  const { refetchNftData } = useNftData();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();

  const client = useSuiClient();
  const { mutate: mintAnNftTransaction } = useSignAndExecuteTransaction({
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

  const mintAnNftHandler = async () => {
    if (!mintCurrentPrice) return;

    setIsLoading(true);
    setSuccess(false);

    const tx = mintAnNft(mintCurrentPrice);
    mintAnNftTransaction(
      {
        transaction: tx,
        chain: "sui:testnet",
      },
      {
        onSuccess: async (result) => {
          console.log("result", result.objectChanges);
          await queryClient.invalidateQueries({ queryKey: ["collectionData"] });
          await queryClient.invalidateQueries({ queryKey: ["nftData"] });
          await refetchCollectionData();
          await refetchNftData();
          setSuccess(true);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Mint error:", error);
          setIsLoading(false);
        },
      },
    );
  };

  // Price in SUI
  const displayPrice = mintCurrentPrice
    ? (Number(mintCurrentPrice) / 1_000_000).toFixed(6)
    : "0";

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={3} alignItems="center">
        {mintCurrentPrice && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="baseline"
            justifyContent="center"
          >
            <Typography variant="h6" color="text.secondary">
              Price:
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {displayPrice}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              SUI
            </Typography>
          </Stack>
        )}

        <Tooltip title={!mintCurrentPrice ? "Price not set" : ""}>
          <span
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading || !mintCurrentPrice || success}
              onClick={mintAnNftHandler}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                fontSize: "1.1rem",
                boxShadow: theme.shadows[4],
                position: "relative",
                overflow: "hidden",
                "&::after": success
                  ? {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(45deg, ${alpha(theme.palette.success.light, 0.2)}, ${alpha(theme.palette.success.main, 0.3)})`,
                      zIndex: 0,
                    }
                  : {},
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              ) : success ? (
                "Minted Successfully!"
              ) : (
                "Mint NFT"
              )}
            </Button>
          </span>
        </Tooltip>

        {success && (
          <Typography
            variant="body2"
            color="success.main"
            sx={{
              fontWeight: "medium",
              animation: "fadeIn 0.5s ease-in",
              "@keyframes fadeIn": {
                "0%": {
                  opacity: 0,
                },
                "100%": {
                  opacity: 1,
                },
              },
            }}
          >
            Your NFT has been successfully minted! Check your collection.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default MintNft;

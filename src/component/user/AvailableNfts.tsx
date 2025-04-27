import {
  Box,
  Typography,
  Stack,
  Paper,
  CircularProgress,
  useTheme,
  alpha,
  Skeleton,
  Divider,
  Chip,
} from "@mui/material";
import { useCollectionData } from "../../hooks/useCollectionData";
import CollectionsIcon from "@mui/icons-material/Collections";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function AvailableNfts() {
  const { nftsCount, mintCurrentPrice, refetchCollectionData } =
    useCollectionData();
  const isLoading = !nftsCount && nftsCount !== 0; // Veri yüklenene kadar loading göster
  const theme = useTheme();

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <CollectionsIcon
          fontSize="large"
          sx={{
            color: theme.palette.primary.main,
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))",
          }}
        />
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          Collection Statistics
        </Typography>
      </Stack>

      {isLoading ? (
        <Stack spacing={2}>
          <Skeleton
            variant="rectangular"
            height={100}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={100}
            sx={{ borderRadius: 2 }}
          />
        </Stack>
      ) : (
        <Stack spacing={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              background:
                theme.palette.mode === "dark"
                  ? `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.6)}, ${alpha(theme.palette.primary.main, 0.3)})`
                  : `linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.3)}, ${alpha(theme.palette.primary.main, 0.1)})`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                right: -20,
                top: -20,
                opacity: 0.15,
                transform: "rotate(15deg)",
                fontSize: "8rem",
              }}
            >
              <CollectionsIcon sx={{ fontSize: "inherit" }} />
            </Box>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "medium",
                mb: 1,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
              }}
            >
              Available NFTs
            </Typography>

            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.primary.main,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                {nftsCount}
              </Typography>
              <Chip
                label="Total Items"
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              />
            </Stack>
          </Paper>

          {mintCurrentPrice && (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                background:
                  theme.palette.mode === "dark"
                    ? `linear-gradient(45deg, ${alpha(theme.palette.secondary.dark, 0.6)}, ${alpha(theme.palette.secondary.main, 0.3)})`
                    : `linear-gradient(45deg, ${alpha(theme.palette.secondary.light, 0.3)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: -20,
                  top: -20,
                  opacity: 0.15,
                  transform: "rotate(15deg)",
                  fontSize: "8rem",
                }}
              >
                <LocalOfferIcon sx={{ fontSize: "inherit" }} />
              </Box>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "medium",
                  mb: 1,
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.secondary.light
                      : theme.palette.secondary.dark,
                }}
              >
                Current Mint Price
              </Typography>

              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.secondary.light
                        : theme.palette.secondary.main,
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {Number(mintCurrentPrice) / 1_000_000}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? alpha(theme.palette.secondary.light, 0.7)
                        : alpha(theme.palette.secondary.main, 0.7),
                  }}
                >
                  SUI
                </Typography>
              </Stack>
            </Paper>
          )}
        </Stack>
      )}
    </Box>
  );
}

export default AvailableNfts;

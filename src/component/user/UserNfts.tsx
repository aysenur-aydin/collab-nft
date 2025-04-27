import { useState, useEffect } from "react";
//Hooks
import { useNftData } from "../../hooks/useNftData";
//Components
import NftCard from "./NftCard";
//Css
import {
  Box,
  Stack,
  Typography,
  Grid,
  useTheme,
  alpha,
  Alert,
  Skeleton,
  Fab,
  Zoom,
  Button,
} from "@mui/material";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilterListIcon from "@mui/icons-material/FilterList";

function UserNfts() {
  const { nftData, refetchNftData } = useNftData();
  const theme = useTheme();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  console.log(refetchNftData);
  // Scroll pozisyonunu izleme
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Yükleme durumu simülasyonu (aslında backend'den alınacak, ama şimdilik)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Sayfanın başına dön
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box>
      {/* Başlık Bölümü */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        mb={4}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <CollectionsBookmarkIcon
            fontSize="large"
            sx={{
              color: theme.palette.primary.main,
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25))",
            }}
          />
          <Box>
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
              Your NFT Collection
            </Typography>
            {nftData?.nftData && !isLoading && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {nftData.nftData.length} items in your collection
              </Typography>
            )}
          </Box>
        </Stack>

        {/* Filtre Butonları (opsiyonel) */}
        {nftData?.nftData && nftData.nftData.length > 0 && !isLoading && (
          <Button
            startIcon={<FilterListIcon />}
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 6,
              px: 2,
            }}
          >
            Filter
          </Button>
        )}
      </Stack>

      {/* NFT'leri Görüntüleme */}
      {isLoading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
              <Skeleton
                variant="rectangular"
                height={300}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
              <Skeleton variant="text" height={20} width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : nftData?.nftData && nftData.nftData.length > 0 ? (
        <Grid container spacing={3}>
          {nftData.nftData.map((nft) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={nft.id}>
              <NftCard nft={nft} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert
          severity="info"
          icon={<CollectionsBookmarkIcon fontSize="inherit" />}
          sx={{
            borderRadius: 2,
            backgroundColor:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.info.dark, 0.2)
                : alpha(theme.palette.info.light, 0.3),
            border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
            padding: 3,
            "& .MuiAlert-icon": {
              color: theme.palette.info.main,
              opacity: 0.8,
            },
            color:
              theme.palette.mode === "dark"
                ? theme.palette.info.light
                : theme.palette.info.dark,
          }}
        >
          <Typography variant="h6" fontWeight="medium" gutterBottom>
            No NFTs Found
          </Typography>
          <Typography variant="body1">
            You don't have any NFTs yet. Mint some to start your collection!
          </Typography>
        </Alert>
      )}

      {/* Yukarı Çıkma Butonu */}
      <Zoom in={scrollPosition > 300}>
        <Fab
          color="primary"
          size="small"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            opacity: 0.8,
            transition: "0.3s",
            "&:hover": {
              opacity: 1,
              transform: "translateY(-5px)",
            },
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Zoom>
    </Box>
  );
}

export default UserNfts;

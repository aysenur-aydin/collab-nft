import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  Tooltip,
  IconButton,
  useTheme,
  alpha,
  CardActionArea,
  Zoom,
  Fade,
  Divider,
  Skeleton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

function NftCard({ nft }: { nft: any }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const theme = useTheme();

  const copyId = () => {
    navigator.clipboard.writeText(nft.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInExplorer = () => {
    window.open(
      `https://explorer.sui.io/objects/${nft.id}?network=testnet`,
      "_blank",
    );
  };

  return (
    <Card
      elevation={3}
      sx={{
        width: "100%",
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 12px 20px ${alpha(theme.palette.primary.main, 0.2)}`
          : theme.shadows[3],
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.primary.main, isHovered ? 0.3 : 0.1)}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* NFT Görüntüsü */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: 240,
          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
        }}
      >
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        )}

        <CardMedia
          component="img"
          image={nft.url}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            opacity: imageLoaded ? 1 : 0,
          }}
          alt={nft.name}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Hover durumunda görünen butonlar */}
        <Fade in={isHovered && imageLoaded}>
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              alignItems: "center",
              gap: 1,
              zIndex: 2,
            }}
          >
            <Tooltip title={copied ? "ID Kopyalandı!" : "NFT ID'sini Kopyala"}>
              <IconButton
                size="small"
                onClick={copyId}
                sx={{
                  bgcolor: alpha(theme.palette.common.white, 0.9),
                  backdropFilter: "blur(4px)",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.common.white, 1),
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ContentCopyIcon
                  fontSize="small"
                  color={copied ? "success" : "primary"}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Sui Explorer'da Görüntüle">
              <IconButton
                size="small"
                onClick={openInExplorer}
                sx={{
                  bgcolor: alpha(theme.palette.common.white, 0.9),
                  backdropFilter: "blur(4px)",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.common.white, 1),
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <OpenInNewIcon fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>
      </Box>

      {/* NFT Bilgileri */}
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
            transition: "color 0.3s ease",
            ...(isHovered && {
              color: theme.palette.primary.main,
            }),
          }}
        >
          {nft.name}
        </Typography>

        {/* Öznitelikler Bölümü */}
        {Object.keys(nft.attributes).length > 0 && (
          <Box mt={1.5}>
            <Divider sx={{ mb: 1.5, opacity: 0.6 }} />
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 1,
                fontWeight: 500,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Attributes
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {Object.entries(nft.attributes).map(([key, value], index) => (
                <Chip
                  key={index}
                  label={`${key}: ${value}`}
                  size="small"
                  sx={{
                    my: 0.5,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: theme.palette.primary.main,
                    fontWeight: "medium",
                    borderRadius: 1.5,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* NFT ID Bölümü */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1.5,
            fontSize: "0.7rem",
            opacity: isHovered ? 0.9 : 0.6,
            transition: "opacity 0.3s ease",
            color: theme.palette.text.secondary,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          ID: {nft.id.substring(0, 8)}...{nft.id.substring(nft.id.length - 6)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NftCard;

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useState, useRef } from "react";
import { createNft } from "../../utils/contract";
import ImageUploader from "../imageupload";
import CanvasComponent from "../canvasComponent";

function CreateNft({ mintCapId }: { mintCapId: string }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [attributesKeys, setAttributesKeys] = useState<string[]>([]);
  const [attributesValues, setAttributesValues] = useState<string[]>([]);
  const canvasRef = useRef<{ exportAsPng: () => string | null }>(null);
  const [isPngCreated, setIsPngCreated] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // ImgBB API anahtarı (imageupload.tsx'ten alındı)
  const API_KEY = "ab4b7e6bb022881202ee2b0dd3fbfc2c";

  const client = useSuiClient();
  const { mutate: createNftTransaction } = useSignAndExecuteTransaction({
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

  // Canvas'tan alınan veriyi ImgBB'ye yükleyen fonksiyon
  const uploadCanvasToImgBB = async (
    dataUrl: string,
  ): Promise<string | null> => {
    try {
      setIsUploading(true);
      setUploadError("");

      // Data URL'den base64 veriyi çıkar
      const base64Data = dataUrl.split(",")[1];

      const formData = new FormData();
      formData.append("image", base64Data);
      formData.append("key", API_KEY);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return data.data.url;
      } else {
        setUploadError(
          "Resim yükleme başarısız: " +
            (data.error?.message || "Bilinmeyen hata"),
        );
        return null;
      }
    } catch (err: any) {
      setUploadError("Resim yüklenirken bir hata oluştu: " + err.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateNft = async () => {
    // Geçerli bir URL yoksa işlem yapma
    if (!url) {
      setUploadError("Lütfen önce bir görsel yükleyin veya canvas'ı kaydedin");
      return;
    }

    const tx = createNft(
      mintCapId,
      name,
      url,
      attributesKeys,
      attributesValues,
    );
    createNftTransaction(
      {
        transaction: tx,
        chain: "sui:testnet",
      },
      {
        onSuccess: (result) => {
          console.log("NFT created successfully");
          console.log("Transaction result:", result);
          console.log("Object changes:", result.objectChanges);
          console.log("Effects:", result.effects);
          setName("");
          setUrl("");
          setAttributesKeys([]);
          setAttributesValues([]);
          setIsPngCreated(false);
          setUploadError("");
        },
        onError: (error) => {
          console.error("Error creating NFT:", error);
        },
      },
    );
  };

  const handleExportCanvas = async () => {
    if (canvasRef.current) {
      const pngDataUrl = canvasRef.current.exportAsPng();
      if (pngDataUrl) {
        // PNG'yi ImgBB'ye yükle
        const uploadedUrl = await uploadCanvasToImgBB(pngDataUrl);
        if (uploadedUrl) {
          setUrl(uploadedUrl);
          setIsPngCreated(true);
        }
      }
    }
  };

  const handleCreateFromCanvas = async () => {
    // Önce canvas'tan PNG oluştur ve ImgBB'ye yükle
    if (canvasRef.current) {
      const pngDataUrl = canvasRef.current.exportAsPng();
      if (pngDataUrl) {
        // PNG'yi ImgBB'ye yükle
        const uploadedUrl = await uploadCanvasToImgBB(pngDataUrl);

        if (uploadedUrl) {
          setUrl(uploadedUrl);

          // PNG URL oluştuktan sonra direkt NFT mint işlemini başlat
          const tx = createNft(
            mintCapId,
            name || "Pixel Art NFT", // İsim belirtilmemişse varsayılan isim ver
            uploadedUrl, // ImgBB'den gelen URL'i kullan
            attributesKeys,
            attributesValues,
          );

          createNftTransaction(
            {
              transaction: tx,
              chain: "sui:testnet",
            },
            {
              onSuccess: (result) => {
                console.log("NFT created successfully");
                console.log("Transaction result:", result);
                console.log("Object changes:", result.objectChanges);
                console.log("Effects:", result.effects);
                setName("");
                setUrl("");
                setAttributesKeys([]);
                setAttributesValues([]);
                setIsPngCreated(false);
                setUploadError("");
              },
              onError: (error) => {
                console.error("Error creating NFT:", error);
              },
            },
          );
        }
      }
    }
  };

  return (
    <Box sx={{ pt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create NFT
      </Typography>
      <Stack spacing={2} alignItems="center">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            label: { color: "white" },
            input: { color: "white" },
            width: "100%",
          }}
        />
        {/* <ImageUploader setUrlFunction={setUrl} /> */}
        <CanvasComponent ref={canvasRef} />

        {uploadError && (
          <Typography color="error" variant="body2">
            {uploadError}
          </Typography>
        )}

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleExportCanvas}
            disabled={isUploading}
            sx={{ width: "100%" }}
          >
            {isUploading ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                Loading...
              </>
            ) : (
              "Canvas Save"
            )}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCreateFromCanvas}
            disabled={isUploading}
            sx={{ width: "100%" }}
          >
            {isUploading ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                Loading...
              </>
            ) : (
              "Canvas Create NFT"
            )}
          </Button>
        </Stack>

        {url && (
          <Box sx={{ width: "100%", height: 150, overflow: "hidden" }}>
            <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
              NFT Önizleme:
            </Typography>
            <img
              src={url}
              alt="NFT Preview"
              style={{
                width: "auto",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        )}
        <TextField
          label="Attributes Keys"
          value={attributesKeys.join(",")}
          onChange={(e) => setAttributesKeys(e.target.value.split(","))}
          sx={{
            label: { color: "white" },
            input: { color: "white" },
            width: "100%",
          }}
        />
        <TextField
          label="Attributes Values"
          value={attributesValues.join(",")}
          onChange={(e) => setAttributesValues(e.target.value.split(","))}
          sx={{
            label: { color: "white" },
            input: { color: "white" },
            width: "100%",
          }}
        />
        <Button
          variant="contained"
          onClick={handleCreateNft}
          disabled={!url || isUploading}
          sx={{ width: "20%" }}
        >
          Create NFT
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateNft;

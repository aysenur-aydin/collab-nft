import React, { useState } from "react";

const ImageUploader = ({
  setUrlFunction,
}: {
  setUrlFunction: (url: string) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // API Anahtarı - Gerçek projede çevre değişkeni olarak saklanmalıdır
  // ImgBB'den ücretsiz API anahtarı alabilirsiniz: https://api.imgbb.com/
  const API_KEY = "ab4b7e6bb022881202ee2b0dd3fbfc2c";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setError("");
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      setError("Lütfen bir resim seçin");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("key", API_KEY);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedImageURL(data.data.url);
        setUrlFunction(data.data.url);
      } else {
        setError(
          "Resim yükleme başarısız: " +
            (data.error?.message || "Bilinmeyen hata"),
        );
      }
    } catch (err: any) {
      setError("Resim yüklenirken bir hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewURL("");
    setUploadedImageURL("");
    setError("");
  };

  return (
    <div className="image-uploader">
      <h2>ImgBB Resim Yükleyici</h2>

      {!uploadedImageURL ? (
        <>
          <div className="upload-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
            />

            {previewURL && (
              <div className="preview">
                <h3>Önizleme:</h3>
                <img
                  src={previewURL}
                  alt="Önizleme"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              </div>
            )}

            {error && <p className="error">{error}</p>}

            <div className="actions">
              <button
                onClick={uploadImage}
                disabled={!selectedFile || loading}
                className="upload-button"
              >
                {loading ? "Yükleniyor..." : "Resmi Yükle"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="upload-success">
          <h3>Resim Başarıyla Yüklendi!</h3>
          <div className="uploaded-image">
            <img
              src={uploadedImageURL}
              alt="Yüklenen resim"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </div>
          <p>
            Resim URL:{" "}
            <a href={uploadedImageURL} target="_blank" rel="noreferrer">
              {uploadedImageURL}
            </a>
          </p>
          <button onClick={resetUpload} className="reset-button">
            Yeni Resim Yükle
          </button>
        </div>
      )}

      <style>{`
        .image-uploader {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .upload-area {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .preview {
          margin-top: 10px;
          border: 1px dashed #ccc;
          padding: 10px;
          border-radius: 4px;
        }

        .preview img {
          display: block;
          margin: 0 auto;
        }

        .actions {
          margin-top: 15px;
          display: flex;
          justify-content: center;
        }

        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
        }

        .upload-button {
          background-color: #4a90e2;
          color: white;
        }

        .reset-button {
          background-color: #6c757d;
          color: white;
        }

        button:hover {
          opacity: 0.9;
        }

        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .error {
          color: #d9534f;
          text-align: center;
          font-weight: bold;
        }

        .upload-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        input[type="file"] {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;

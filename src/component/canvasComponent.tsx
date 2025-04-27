import "../canvasComponent.css";
import { useState, useRef, useImperativeHandle, forwardRef } from "react";

const CanvasComponent = forwardRef((props, ref) => {
  // Genişletilmiş renk paleti
  const colors = [
    // Ana renkler
    "#FF0000", // Kırmızı
    "#FF7F00", // Turuncu
    "#FFFF00", // Sarı
    "#00FF00", // Yeşil
    "#0000FF", // Mavi
    "#4B0082", // Indigo
    "#9400D3", // Mor

    // Temel renkler
    "#000000", // Siyah
    "#FFFFFF", // Beyaz
    "#808080", // Gri

    // Pastel tonlar
    "#FFB6C1", // Açık pembe
    "#FFD700", // Altın
    "#98FB98", // Açık yeşil
    "#ADD8E6", // Açık mavi
    "#FFA07A", // Açık somon
    "#E6E6FA", // Lavanta

    // Canlı renkler
    "#FF1493", // Koyu pembe
    "#00FFFF", // Camgöbeği
    "#FF00FF", // Fuşya
    "#7FFF00", // Chartreuse
    "#00FA9A", // Orta bahar yeşili

    // Koyu tonlar
    "#800000", // Bordo
    "#008000", // Koyu yeşil
    "#000080", // Lacivert
    "#800080", // Mor
    "#8B4513", // Kahverengi
    "#556B2F", // Koyu zeytin yeşili

    // Ekstra tonlar
    "#2E8B57", // Deniz yeşili
    "#DAA520", // Goldenrod
    "#4682B4", // Çelik mavisi
  ];

  // Aktif renk için durum
  const [activeColor, setActiveColor] = useState(colors[0]);

  // Grid boyutunu artırdım: 25x25
  const [pixelGrid, setPixelGrid] = useState(
    Array(25)
      .fill(null)
      .map(() => Array(25).fill("#FFFFFF")),
  );

  // Renk paleti görünürlüğü için durum
  const [isPaletteVisible, setIsPaletteVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Piksele tıklandığında renk değiştirme fonksiyonu
  const changePixelColor = (rowIndex: number, colIndex: number) => {
    const newGrid = [...pixelGrid];
    newGrid[rowIndex][colIndex] = activeColor;
    setPixelGrid(newGrid);
  };

  // Tüm pikselleri temizleme fonksiyonu
  const clearGrid = () => {
    setPixelGrid(
      Array(25)
        .fill(null)
        .map(() => Array(25).fill("#FFFFFF")),
    );
  };

  // Renk paleti görünürlüğünü değiştirme
  const togglePalette = () => {
    setIsPaletteVisible(!isPaletteVisible);
  };

  // Renk seçme fonksiyonu
  const selectColor = (color: string) => {
    setActiveColor(color);
    // Renk seçildiğinde paleti kapatmıyoruz - ekran kaymasını önlemek için
  };

  // PNG olarak dışa aktarma fonksiyonu
  const exportAsPng = () => {
    if (!gridRef.current) return null;

    // Canvas oluştur
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Canvas boyutlarını ayarla - grid boyutuna göre
    const CELL_SIZE = 20; // Her hücrenin piksel boyutu
    const width = pixelGrid[0].length * CELL_SIZE;
    const height = pixelGrid.length * CELL_SIZE;

    canvas.width = width;
    canvas.height = height;

    // Grid'i canvas'a çiz
    pixelGrid.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        ctx.fillStyle = color;
        ctx.fillRect(
          colIndex * CELL_SIZE,
          rowIndex * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE,
        );

        // Hücre kenarlarını çiz
        ctx.strokeStyle = "#EEEEEE";
        ctx.strokeRect(
          colIndex * CELL_SIZE,
          rowIndex * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE,
        );
      });
    });

    // Canvas'ı PNG'ye dönüştür
    return canvas.toDataURL("image/png");
  };

  // ref ile dışarıya export fonksiyonunu aç
  useImperativeHandle(ref, () => ({
    exportAsPng,
  }));

  return (
    <div className="container">
      <h1 className="text-white" style={{ color: "white" }}>
        Pixel Art Draw
      </h1>

      <div className="main-content">
        {/* Renk Paleti - artık grid kutusundan ayrı */}
        <div
          className={`color-palette-container ${isPaletteVisible ? "visible" : ""}`}
        >
          <div className="color-palette">
            <h3 className="text-white">Color Palette</h3>
            <div className="colors">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-option ${activeColor === color ? "active" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => selectColor(color)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Piksel Grid Kutusu */}
        <div className="pixel-grid-container">
          <div className="grid-controls">
            <div className="active-color-display " onClick={togglePalette}>
              <span className="text-black" style={{ color: "black" }}>
                Select Color
              </span>
              <div
                className="active-color"
                style={{ backgroundColor: activeColor }}
              ></div>
              <span className="toggle-icon">
                {isPaletteVisible ? "▲" : "▼"}
              </span>
            </div>

            <button className="clear-button" onClick={clearGrid}>
              Clear
            </button>
          </div>

          <div className="pixel-grid" ref={gridRef}>
            {pixelGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="pixel-row">
                {row.map((color, colIndex) => (
                  <div
                    key={colIndex}
                    className="pixel"
                    style={{ backgroundColor: color }}
                    onClick={() => changePixelColor(rowIndex, colIndex)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CanvasComponent;

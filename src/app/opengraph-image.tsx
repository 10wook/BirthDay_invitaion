import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { trainerConfig } from "@/config/trainer";

export const alt = `${trainerConfig.nameKo} — Birthday Adventure`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), "public/fonts/Pretendard-Bold.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(160deg, #FFCB05 0%, #FFF7C4 45%, #7ecbff 100%)",
          fontFamily: "Pretendard",
        }}
      >
        {/* Poké Ball */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: 140,
            height: 140,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              borderRadius: "50%",
              border: "6px solid #383838",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                background: "#E3350D",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 6,
                background: "#383838",
                transform: "translateY(-50%)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              border: "6px solid #383838",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#383838",
              }}
            />
          </div>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 28,
            color: "#3B4CCA",
            letterSpacing: 2,
          }}
        >
          ■ POKÉDEX ENTRY
        </p>
        <p
          style={{
            margin: "12px 0 0",
            fontSize: 56,
            fontWeight: 700,
            color: "#383838",
          }}
        >
          {trainerConfig.nameKo}
        </p>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 28,
            color: "#E3350D",
          }}
        >
          Trainer No.{trainerConfig.trainerNo} · Lv.{trainerConfig.level}
        </p>
        <p
          style={{
            margin: "20px 0 0",
            fontSize: 24,
            color: "#5B4B63",
          }}
        >
          {trainerConfig.birthdayDisplay} Birthday Adventure — Press Start!
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Pretendard", data: fontData, style: "normal", weight: 700 }],
    },
  );
}

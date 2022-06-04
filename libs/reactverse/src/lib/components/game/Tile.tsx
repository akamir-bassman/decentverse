import React, { Suspense, useRef, MutableRefObject, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { types, useWorld, RenderCharacter, scalar, useGame } from "../../stores";
import { Group, Scene, Sprite, SpriteMaterial, Vector, Vector3, TextureLoader } from "three";
import { useTexture } from "@react-three/drei";

export interface TileProp {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}
const loader = new TextureLoader();
loader.setRequestHeader({
  "Access-Control-Allow-Origin": "*",
});
loader.setCrossOrigin("*");

export const Tile = React.memo(({ x, y, offsetX, offsetY }: TileProp) => {
  const renderTiles = useWorld((state) => state.render.tiles);
  const bottom = loader.load(renderTiles[y][x].bottom.url.replace("https://asset.ayias.io", "ayias"));
  const top =
    renderTiles[y][x].top && loader.load(renderTiles[y][x].top.url.replace("https://asset.ayias.io", "ayias"));
  const lighting =
    renderTiles[y][x].lighting &&
    loader.load(renderTiles[y][x].lighting.url.replace("https://asset.ayias.io", "ayias"));
  const position = new Vector3(offsetX, offsetY, -0.0000001);
  console.log(renderTiles[y][x].top.url);
  return (
    <Suspense fallback={null}>
      <sprite position={position}>
        <planeGeometry args={[2000, 2000]} />
        <spriteMaterial map={bottom} />
      </sprite>
      {top && (
        <sprite position={position}>
          <planeGeometry args={[2000, 2000]} />
          <spriteMaterial map={top} />
        </sprite>
      )}
      {lighting && (
        <sprite position={position}>
          <planeGeometry args={[2000, 2000]} />
          <spriteMaterial map={lighting} />
        </sprite>
      )}
    </Suspense>
  );
});
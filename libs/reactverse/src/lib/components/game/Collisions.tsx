import React, { Suspense, useRef, MutableRefObject, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { types, scalar, useWorld, RenderCharacter, useGame } from "../../stores";
import { Group, Scene, Sprite, SpriteMaterial, Vector, Vector3, TextureLoader, MeshBasicMaterial } from "three";
import { useTexture } from "@react-three/drei";
import { useInterval } from "../../hooks";
import { makeScope } from "../../utils";
import { Tile } from "./Tile";
import { Bodies, Engine, World } from "matter-js";
export interface InteractionsProp {
  engine: MutableRefObject<Engine>;
}
export const Interactions = ({ engine }: InteractionsProp) => {
  const interactions = useWorld((state) => state.map?.interactions);
  return (
    <Suspense fallback={null}>
      {interactions?.map((interaction, idx) => (
        <Collision key={idx} collision={interaction} engine={engine} />
      ))}
    </Suspense>
  );
};

export interface CollisionProp {
  collision: scalar.Interaction;
  engine: MutableRefObject<Engine>;
}
export const Collision = React.memo(({ collision, engine }: CollisionProp) => {
  const position = new Vector3(
    (collision.bottomRight[0] + collision.topLeft[0]) / 2,
    (collision.bottomRight[1] + collision.topLeft[1]) / 2,
    -0.00000005
  );
  const [width, height] = [
    collision.topLeft[0] - collision.bottomRight[0],
    collision.bottomRight[1] - collision.topLeft[1],
  ];
  useEffect(() => {
    const box = Bodies.rectangle(position.x, position.y, width, height, { isStatic: true });
    World.add(engine.current.world, box);
    return () => {
      World.remove(engine.current.world, box);
    };
  }, []);

  return (
    <Suspense fallback={null}>
      {/* <mesh position={position}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={0xff0000} transparent />
      </mesh> */}
    </Suspense>
  );
});

/*////////////////// TEXTURES ///////////////////*/
// Door
import DoorColorTexture from "./static/textures/door/color.jpg";
import DoorAlphaTexture from "./static/textures/door/alpha.jpg";
import DoorAmbientOcclusionTexture from "./static/textures/door/ambientOcclusion.jpg";
import DoorHeightTexture from "./static/textures/door/height.jpg";
import DoorNormalTexture from "./static/textures/door/normal.jpg";
import DoorMetalnessTexture from "./static/textures/door/metalness.jpg";
import DoorRoughnessTexture from "./static/textures/door/roughness.jpg";
// Walls
import BricksColorTexture from "./static/textures/bricks/color.jpg";
import BricksAmbientOcclusionTexture from "./static/textures/bricks/ambientOcclusion.jpg";
import BricksNormalTexture from "./static/textures/bricks/normal.jpg";
import BricksRoughnessTexture from "./static/textures/bricks/roughness.jpg";
// Grass
import GrassColorTexture from "./static/textures/grass/color.jpg";
import GrassAmbientOcclusionTexture from "./static/textures/grass/ambientOcclusion.jpg";
import GrassNormalTexture from "./static/textures/grass/normal.jpg";
import GrassRoughnessTexture from "./static/textures/grass/roughness.jpg";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";

export default function Scene() {
  const THREE = useThree();

  const ghost1 = useRef();
  const ghost2 = useRef();
  const ghost3 = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    const ghost1Angle = elapsedTime * 0.5;
    ghost1.current.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.current.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.current.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.current.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.current.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.current.position.y =
      Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = elapsedTime * 0.18;
    ghost3.current.position.x =
      Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.current.position.z =
      Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.current.position.y =
      Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2);
  });

  const [
    //
    grassColorTexture,
    grassAmbientOcclusionTexture,
    grassNormalTexture,
    grassRoughnessTexture,
    //
    bricksColorTexture,
    bricksAmbientOcclusionTexture,
    bricksNormalTexture,
    bricksRoughnessTexture,
    //
    doorColorTexture,
    doorAlphaTexture,
    doorAmbientOcclusionTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
  ] = useLoader(TextureLoader, [
    GrassColorTexture,
    GrassAmbientOcclusionTexture,
    GrassNormalTexture,
    GrassRoughnessTexture,
    //
    BricksColorTexture,
    BricksAmbientOcclusionTexture,
    BricksNormalTexture,
    BricksRoughnessTexture,
    //
    DoorColorTexture,
    DoorAlphaTexture,
    DoorAmbientOcclusionTexture,
    DoorHeightTexture,
    DoorNormalTexture,
    DoorMetalnessTexture,
    DoorRoughnessTexture,
  ]);
  grassColorTexture.repeat.set(8, 8);
  grassAmbientOcclusionTexture.repeat.set(8, 8);
  grassNormalTexture.repeat.set(8, 8);
  grassRoughnessTexture.repeat.set(8, 8);

  grassColorTexture.wrapS = THREE.RepeatWrapping;
  grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
  grassNormalTexture.wrapS = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

  grassColorTexture.wrapT = THREE.RepeatWrapping;
  grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
  grassNormalTexture.wrapT = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      {/*////////////////// LIGHTS ///////////////////*/}
      <ambientLight intensity={0.12} args={["#b9d5ff", 0.12]} />
      <directionalLight position={[4, 5, -2]} args={["#b9d5ff", 0.12]} />
      <pointLight position={[0, 2.2, 2.7]} args={["#ff7d46", 1, 7]} />
      {/*////////////////// SCENE ///////////////////*/}
      <group name="scene">
        <group name="house">
          <mesh
            name="roof"
            rotation={[0, Math.PI / 4, 0]}
            position={[0, 2.5 + 0.5, 0]}
          >
            <coneBufferGeometry args={[3.5, 1, 4]} />
            <meshStandardMaterial color="#b35f45" />
          </mesh>
          <mesh position={[0, 2.5 / 2, 0]} name="walls">
            <boxBufferGeometry args={[4, 2.5, 4]} />
            <meshStandardMaterial
              map={bricksColorTexture}
              aoMap={bricksAmbientOcclusionTexture}
              normalMap={bricksNormalTexture}
              roughness={bricksRoughnessTexture}
            />
          </mesh>
          <mesh name="door" position={[0, 1, 4 / 2 + 0.01]}>
            <planeBufferGeometry args={[2.2, 2.2, 100, 100]} />
            <meshStandardMaterial
              transparent={true}
              map={doorColorTexture}
              alphaMap={doorAlphaTexture}
              aoMap={doorAmbientOcclusionTexture}
              normalMap={doorNormalTexture}
              roughnessMap={doorRoughnessTexture}
              metalnessMap={doorMetalnessTexture}
              displacementMap={doorHeightTexture}
              displacementScale={0.1}
            />
          </mesh>
          <mesh position={[0.8, 0.2, 2.2]} scale={[0.5, 0.5, 0.5]} name="bush1">
            <sphereBufferGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#89c854" />
          </mesh>
          <mesh
            position={[1.4, 0.1, 2.1]}
            scale={[0.25, 0.25, 0.25]}
            name="bush2"
          >
            <sphereBufferGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#89c854" />
          </mesh>
          <mesh
            position={[-0.8, 0.1, 2.2]}
            scale={[0.4, 0.4, 0.4]}
            name="bush3"
          >
            <sphereBufferGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#89c854" />
          </mesh>
          <mesh
            position={[-1, 0.05, 2.6]}
            scale={[0.15, 0.15, 0.15]}
            name="bush4"
          >
            <sphereBufferGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#89c854" />
          </mesh>
        </group>

        <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[20, 20, 20]} />
          <meshStandardMaterial
            map={grassColorTexture}
            aoMap={grassAmbientOcclusionTexture}
            normalMap={grassNormalTexture}
            roughnessMap={grassRoughnessTexture}
          />
        </mesh>
        {/*////////////////// GHOST ///////////////////*/}
        <pointLight args={["#ff00ff", 2, 3]} ref={ghost1} />
        <pointLight args={["#00ffff", 2, 3]} ref={ghost2} />
        <pointLight args={["#ffff00", 2, 3]} ref={ghost3} />
      </group>
    </>
  );
}

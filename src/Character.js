import React, { useRef } from "react";
import { PointerLockControls } from "@react-three/drei";
import { Vector3, Raycaster } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import Scene from "./Scene";

export default function Deplacement() {
  let raycaster;
  let moveForward = false;
  let moveBackward = false;
  let moveLeft = false;
  let moveRight = false;
  let canJump = false;
  let controlsRef = useRef(null);
  const velocity = new Vector3();
  const direction = new Vector3();
  const THREE = useThree();

  const keyDown = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      default:
        break;
    }
  };
  const keyUp = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;

      default:
        break;
    }
  };

  document.addEventListener("keyup", keyUp);
  document.addEventListener("keydown", keyDown);

  // CLICK
  window.addEventListener("click", (event) => {
    if (currentIntersect) {
      console.log(currentIntersect);
    }
  });

  var vector = new Vector3();
  let currentIntersect = null;
  raycaster = new Raycaster(new Vector3(), vector, 0, 5);

  useFrame((state, delta) => {
    controlsRef.current.camera.fov = 75;
    controlsRef.current.getObject().position.y = 1;

    /*////////////////// RAYCASTER ///////////////////*/

    raycaster.ray.origin.copy(controlsRef.current.getObject().position);
    vector.applyQuaternion(controlsRef.current.camera.quaternion);
    controlsRef.current.camera.getWorldDirection(vector);

    const objectsToTest = THREE.scene.children;
    const intersect = raycaster.intersectObjects(objectsToTest);

    // for (const object of objectsToTest) {
    //   object.material.color.set("#444"); // grey
    // }
    // if (intersect.length > 0) {
    //   intersect[0].object.material.color.set("#0000ff"); // blue
    // }

    /*////////////////// MOUSE EVENT ///////////////////*/

    // MOUSE ENTER / MOUSE LEAVE
    if (intersect.length) {
      if (currentIntersect === null) {
        // console.log("mouse enter");
      }
      currentIntersect = intersect[0];
    } else {
      if (currentIntersect) {
        // console.log("mouse leave");
      }
      currentIntersect = null;
    }

    /*////////////////// VELOCITY ///////////////////*/
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize();
    velocity.x -= velocity.x * delta * 8.5;
    velocity.z -= velocity.z * delta * 8.5;
    velocity.y -= 9.8 * 100 * delta;

    if (moveForward || moveBackward) velocity.z -= direction.z * 50 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 50 * delta;
    if (canJump) velocity.y -= direction.y * 50 * delta;

    controlsRef.current.moveRight(-velocity.x * delta);
    controlsRef.current.moveForward(-velocity.z * delta);
  });

  return (
    <>
      <PointerLockControls makeDefault ref={controlsRef} />
      <color attach="background" args={["black"]} />
      <Scene />
    </>
  );
}

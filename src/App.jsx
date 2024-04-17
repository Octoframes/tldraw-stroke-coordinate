import { useState, useEffect } from "react";
import { Tldraw, createShapeId } from "tldraw";
import "tldraw/tldraw.css";

const overrides = {
  //[a]
  actions(_editor, actions) {
    actions["delete"].kbd = "x";
    return actions;
  },
  //[b]
  tools(_editor, tools) {
    tools["hand"].kbd = "g";
    tools["select"].kbd = "tab";
    tools["draw"].kbd = "tab";
    return tools;
  },
};

export default function App() {
  // State for the x-coordinate of the rectangle
  const [xCoordinate, setXCoordinate] = useState(350);
  const [editorInstance, setEditorInstance] = useState(null);

  const handleMount = (editor) => {
    setEditorInstance(editor); // Store the editor instance for later use

    // Initially create two rectangles and an arrow between them
    const rectangleId1 = createShapeId("rectangle1");
    const rectangleId2 = createShapeId("rectangle2");
    const arrowId = createShapeId("arrow");

    // Create the blue rectangle, yellow rectangle, and the arrow
    editor.createShapes([
      {
        id: rectangleId1,
        type: "geo",
        x: xCoordinate,
        y: 300,
        props: {
          geo: "rectangle",
          w: 150,
          h: 75,
          dash: "draw",
          color: "blue",
          size: "m",
        },
      },
      {
        id: rectangleId2,
        type: "geo",
        x: 500,
        y: 500,
        props: {
          geo: "rectangle",
          w: 100,
          h: 100,
          dash: "draw",
          color: "yellow",
          size: "m",
        },
      },
      {
        id: arrowId,
        type: "arrow",
        props: {
          start: {
            type: "binding",
            boundShapeId: rectangleId1,
            normalizedAnchor: { x: 0.5, y: 0.5 },
            isExact: false,
            isPrecise: true,
          },
          end: {
            type: "binding",
            boundShapeId: rectangleId2,
            normalizedAnchor: { x: 0.5, y: 0.5 },
            isExact: false,
            isPrecise: true,
          },
        },
      },
    ]);
  };

  // Update the first rectangle's position when the xCoordinate state changes
  useEffect(() => {
    if (editorInstance) {
      editorInstance.updateShapes([
        {
          id: createShapeId("rectangle1"),
          x: xCoordinate,
        },
      ]);
    }
  }, [xCoordinate, editorInstance]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        <label htmlFor="xCoordinateSlider">X Coordinate: </label>
        <input
          id="xCoordinateSlider"
          type="range"
          min="0"
          max="1000"
          value={xCoordinate}
          onChange={(e) => setXCoordinate(Number(e.target.value))}
          style={{
            width: "300px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: "1000px",
          height: "1000px",
          top: "50px",
        }}
      >
        <Tldraw onMount={handleMount} overrides={overrides}></Tldraw>
      </div>
    </>
  );
}

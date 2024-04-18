import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useState } from "react";

export default function ShapeMetaExample() {
  const [length, setLength] = useState(0);

  return (
    <>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "500px",
          height: "500px",
          top: "50px",
        }}
      >
        <Tldraw
          onMount={(editor) => {
            editor.store.listen(() => {
              let ob = editor.getCurrentPageShapesSorted();
              if (ob.length === 0) return;
              let lastElement = ob[ob.length - 1];
              if (
                lastElement.props.segments &&
                lastElement.props.segments[0].points
              ) {
                // Set the length state to the length of the points array
                setLength(lastElement.props.segments[0].points.length);
              }
            });
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "0px",
        }}
      >
        Length of currently drawn stroke: {length}
      </div>
    </>
  );
}

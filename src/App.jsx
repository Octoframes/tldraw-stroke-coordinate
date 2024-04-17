import { useCallback, useState } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export default function CanvasEventsExample() {
  const [events, setEvents] = useState([]);

  const handleEvent = useCallback((data) => {
    setEvents((events) => {
      let newEvents = "hello world"
      return newEvents;
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        width: "2000px",
        height: "1000px",
        top: "50px",
      }}
    >
      <div style={{ width: "50%", height: "100vh" }}>
        <Tldraw
          onMount={(editor) => {
            editor.on("event", (event) => handleEvent(event));
          }}
        />
      </div>
      <div
        style={{
          width: "50%",
          backgroundColor: "grey",
        }}
      >
        <div>{JSON.stringify(events, undefined, 2)}</div>
      </div>
    </div>
  );
}
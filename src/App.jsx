import { Tldraw, track, useEditor } from "tldraw"
import "tldraw/tldraw.css"

// There's a guide at the bottom of this file!

// [1]
export default function ShapeMetaExample() {
  return (
    <div className="tldraw__editor"
    style={{
      display: "flex",
      position: "absolute",
      width: "2000px",
      height: "1000px",
      top: "50px",
    }}>
      <Tldraw
        persistenceKey="shape_meta_example"
        onMount={editor => {
          editor.getInitialMetaForShape = shape => {
            return { label: `My ${shape.type} shape` }
          }
        }}
      >
        <ShapeLabelUiWithHelper />
      </Tldraw>
    </div>
  )
}

// [3]
export const ShapeLabelUiWithHelper = track(function ShapeLabelUiWithHelper() {
  const editor = useEditor()
  const onlySelectedShape = editor.getOnlySelectedShape()

  function onChange(e) {
    if (onlySelectedShape) {
      const { id, type, meta } = onlySelectedShape

      editor.updateShapes([
        { id, type, meta: { ...meta, label: e.currentTarget.value } }
      ])
    }
  }

  return (
    <div style={{ position: "absolute", zIndex: 300, top: 64, left: 12 }}>
      <pre style={{ margin: "0 0 16px 0" }}>
        {onlySelectedShape
          ? JSON.stringify(onlySelectedShape.meta, null, "\t")
          : "Select one shape to see / edit its meta data."}
      </pre>
      {onlySelectedShape && (
        <input value={onlySelectedShape.meta.label} onChange={onChange} />
      )}
    </div>
  )
})

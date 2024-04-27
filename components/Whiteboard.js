import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
// Firebase v9+ compatible imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onChildAdded, push } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByih6YDhfAvMEry7fhwCb7Y6WgtxLalU4",
  authDomain: "educonference-744b1.firebaseapp.com",
  projectId: "educonference-744b1",
  storageBucket: "educonference-744b1.appspot.com",
  messagingSenderId: "767808620644",
  appId: "1:767808620644:web:f196a171158fa0b4b8b771",
  measurementId: "G-MKJH9Q0HCD"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Whiteboard = () => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef();

  useEffect(() => {
    console.log('Canvas ref:', canvasRef.current);
    if (!canvasRef.current) return; // Exit if the ref is not set

    const initCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        selection: false
    });
    initCanvas.freeDrawingBrush.width = 2;
    initCanvas.freeDrawingBrush.color = '#000000';
    setCanvas(initCanvas);

    const handlePathCreated = (e) => {
        const path = e.path.toJSON(['selectable']);
        push(ref(database, 'whiteboard/paths'), path);
    };

    initCanvas.on('path:created', handlePathCreated);

    const pathsRef = ref(database, 'whiteboard/paths');
    onChildAdded(pathsRef, (snapshot) => {
        const path = new fabric.Path(snapshot.val());
        path.selectable = false;
        initCanvas.add(path);
        initCanvas.renderAll();
    });

    return () => {
        initCanvas.off('path:created', handlePathCreated);
        initCanvas.dispose();
    };
}, []);


  // Handlers for brush settings
  const setColor = (color) => {
    if (canvas) {
      canvas.freeDrawingBrush.color = color;
    }
  };

  const setWidth = (width) => {
    if (canvas) {
      canvas.freeDrawingBrush.width = width;
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setColor('#ff0000')}>Red</button>
        <button onClick={() => setColor('#00ff00')}>Green</button>
        <button onClick={() => setColor('#0000ff')}>Blue</button>
        <button onClick={() => setWidth(1)}>Thin</button>
        <button onClick={() => setWidth(5)}>Thick</button>
      </div>
    </div>
  );
};

export default Whiteboard;

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EncryptIcon from '@mui/icons-material/Lock';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { useNavigate } from 'react-router-dom';
import './Framework.css';

function Framework() {
  const [code, setCode] = useState('// Start coding...');
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

  const handleNewFile = () => {
    setCode('// New File');
  };

  const handleOpenFile = () => {
    alert('Open File dialog goes here');
  };

  const handleSaveFile = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'code.js'; // Default filename for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  const handleCompile = () => {
    setOutput('Compiled successfully!');
  };

  const handleRun = () => {
    setOutput('Running...');
  };

  const handleEncryptClick = () => {
    navigate('/encrypt-decrypt');
  };

  return (
    <div className="framework-container">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            IoT Security Framework IDE
          </Typography>
          <Button color="inherit" onClick={handleNewFile}>New</Button>
          <Button color="inherit" onClick={handleOpenFile}>Open</Button>
          <Button color="inherit" onClick={handleSaveFile}>Save</Button>
          <Button color="inherit" onClick={handleCompile}>Compile</Button>
          <Button color="inherit" onClick={handleRun}>Run</Button>
          <IconButton edge="end" color="inherit" aria-label="encrypt" onClick={handleEncryptClick}>
            <EncryptIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={{ padding: '20px' }}>
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          }}
        />

        <div className="output-area">
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default Framework;

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EncryptIcon from '@mui/icons-material/Lock';
import './EncryptDecrypt.css'; // Import CSS for styling

const algorithm = 'AES-GCM';
const keyLength = 256;
const ivLength = 12; // Length of the initialization vector

const EncryptDecrypt = () => {
    const [inputText, setInputText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [key, setKey] = useState(null);
    const [iv, setIv] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    // Generate a new AES key
    const generateKey = async () => {
        return crypto.subtle.generateKey(
            {
                name: algorithm,
                length: keyLength,
            },
            true,
            ['encrypt', 'decrypt']
        );
    };

    // Encrypt the given text
    const encryptData = async () => {
        if (!inputText || !key) return;

        const encoder = new TextEncoder();
        const data = encoder.encode(inputText);
        const iv = crypto.getRandomValues(new Uint8Array(ivLength));
        setIv(iv);

        try {
            const encryptedData = await crypto.subtle.encrypt(
                {
                    name: algorithm,
                    iv: iv,
                },
                key,
                data
            );
            setEncryptedText(btoa(String.fromCharCode(...new Uint8Array(encryptedData))));
        } catch (e) {
            console.error(e);
        }
    };

    // Decrypt the given text
    const decryptData = async () => {
        if (!encryptedText || !key || !iv) return;

        const encryptedData = new Uint8Array(
            atob(encryptedText).split("").map(char => char.charCodeAt(0))
        );

        try {
            const decryptedData = await crypto.subtle.decrypt(
                {
                    name: algorithm,
                    iv: iv,
                },
                key,
                encryptedData
            );
            const decoder = new TextDecoder();
            setDecryptedText(decoder.decode(decryptedData));
        } catch (e) {
            console.error(e);
        }
    };

    // Handle key generation
    const handleGenerateKey = async () => {
        const newKey = await generateKey();
        setKey(newKey);
    };

    return (
        <div className="encrypt-decrypt-container">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate('/framework')}>
                        <EncryptIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        AES Encryption/Decryption
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className="content">
                <div className="section">
                    <TextField
                        label="Text to Encrypt"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={encryptData}>
                        Encrypt
                    </Button>
                    <Paper className="output-paper" elevation={3}>
                        <Typography variant="h6">Encrypted Text:</Typography>
                        <pre>{encryptedText}</pre>
                    </Paper>
                </div>
                <div className="section">
                    <TextField
                        label="Encrypted Text"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={encryptedText}
                        onChange={(e) => setEncryptedText(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={decryptData}>
                        Decrypt
                    </Button>
                    <Paper className="output-paper" elevation={3}>
                        <Typography variant="h6">Decrypted Text:</Typography>
                        <pre>{decryptedText}</pre>
                    </Paper>
                </div>
                <Button variant="contained" color="default" onClick={handleGenerateKey}>
                    Generate Key
                </Button>
            </div>
        </div>
    );
};

export default EncryptDecrypt;

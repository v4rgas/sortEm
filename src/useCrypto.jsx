import { useCallback, useState } from 'react';

import { Buffer } from 'buffer';
import file from './assets/win.mp3';

const useCrypto = () => {
    const fetchMp3Buffer = useCallback(async () => {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Failed to fetch MP3 file: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }, []);

    const encryptWithMp3Key = useCallback(async (data) => {
        const mp3Buffer = await fetchMp3Buffer();
        const dataBuffer = Buffer.isBuffer(data) ? data : Buffer.from(JSON.stringify(data));
        const encryptedBuffer = dataBuffer.map((byte, index) => byte ^ mp3Buffer[index % mp3Buffer.length]);
        return encryptedBuffer.toString('base64');
    }, [fetchMp3Buffer]);

    const decryptWithMp3Key = useCallback(async (encryptedData) => {
        const mp3Buffer = await fetchMp3Buffer();
        const encryptedBuffer = Buffer.from(encryptedData, 'base64');
        const decryptedBuffer = encryptedBuffer.map((byte, index) => byte ^ mp3Buffer[index % mp3Buffer.length]);
        return JSON.parse(decryptedBuffer.toString('utf8'));
    }, [fetchMp3Buffer]);

    return { encrypt: encryptWithMp3Key, decrypt: decryptWithMp3Key };
};

export default useCrypto;

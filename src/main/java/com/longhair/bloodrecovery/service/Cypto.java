package com.longhair.bloodrecovery.service;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

public class Cypto {
    static final int keySize = 256;
    static final int ivSize = 128;

    public static String decrypt(String cipherText, String passPhase){
        String result = "";
        try{

            byte[] ctBytes = Base64.decodeBase64(cipherText.getBytes("UTF-8"));

            byte[] saltBytes = Arrays.copyOfRange(ctBytes, 8, 16);

            byte[] ciphertextBytes = Arrays.copyOfRange(ctBytes, 16, ctBytes.length);

            byte[] key = new byte[keySize / 8];
            byte[] iv = new byte[ivSize / 8];
            EvpKDF(passPhase.getBytes("UTF-8"), saltBytes, 1, "MD5", key, iv);

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key, "AES"), new IvParameterSpec(iv));
            byte[] recoveredPlainTextBytes = cipher.doFinal(ciphertextBytes);

            result = new String(recoveredPlainTextBytes);
        } catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }

    private static byte[] EvpKDF(byte[] password, byte[] salt, int iterations, String hashAlgorithm, byte[] resultKey, byte[] resultIv) throws NoSuchAlgorithmException {
        int keySize1 = keySize / 32;
        int ivSize1 = ivSize / 32;
        int targetKeySize = keySize1 + ivSize1;
        byte[] derivedBytes = new byte[targetKeySize * 4];
        int numberOfDerivedWords = 0;
        byte[] block = null;
        MessageDigest hasher = MessageDigest.getInstance(hashAlgorithm);
        while(numberOfDerivedWords < targetKeySize){
            if(block != null){
                hasher.update(block);
            }
            hasher.update(password);

            block = hasher.digest(salt);
            hasher.reset();

            for(int i=1; i < iterations; i++){
                block = hasher.digest(block);
                hasher.reset();
            }

            System.arraycopy(block, 0, derivedBytes, numberOfDerivedWords * 4, Math.min(block.length, (targetKeySize - numberOfDerivedWords) * 4));
            numberOfDerivedWords += block.length / 4;
        }
        System.arraycopy(derivedBytes, 0, resultKey, 0, keySize1 * 4);
        System.arraycopy(derivedBytes, keySize1 * 4, resultIv, 0, ivSize1 * 4);
        return derivedBytes;
    }
}

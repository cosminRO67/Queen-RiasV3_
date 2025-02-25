const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "cosmin",
    ownerNumber: process.env.OWNER_NUMBER || "40770811929",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0g0ZmV3bHhMMW0rNGM2UkJmMm5sOHh6UjZSaVhyczZ2dmdtWlQvMVMzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVhGOFRRYzVrdjZYRW9QcXM3VDRrRC9pOVdCSVZyQWdTdnVPVzJjZ0FWdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSk52R1ZVL3ZqdWFrQ3hWMjBrWkpCUVRtS0lxNHVTbHF0RGRsNUdyU1ZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4ZjhRM0oxWUZzZmYzS3daN1NwMWpBeXFoU0hsRDdpdVk5MVBtZ1VDelFZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1CU2lrcFZqMFdiT1JPM0lMcERQYUdmaUorSStXK2k0VE9BNHN2RjlOR0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZNVXhXd245ZHdOS3VnNFlxQnlSeVFDYU1qYVhSVFczWVFjbzVRWWZOV289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEZ0a3ZvUFVldVR5Ny9ZZUlpSmtWMXRkZ1ArK0ZxZ2RPci9yRlZTTVhsWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1B2dElFam1oVjZHb1lPS3J2NStOQWJlVXFCQmIwL1hiOTFvK3lDblVuUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJNZVEwZXFuTjJBQUdKdUtLS2RuN3lkclpxWHFIUlE5bG1obDVZSHYrTWZSYVpqdjJVV2ovVlZlbFl2dEtZWmthM1dtb2lOZkdQYzIrRHRNa0ppR0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYwLCJhZHZTZWNyZXRLZXkiOiJHY0MwTmIyUkdlTWR2cWtOWGFEdlVHZitlZDUvNFJZSklER0diam5YdEVVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcwODExOTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkE1QjE4NzAzMDcwNjFDNTVCOEY5QkU4QzNFNTU4MzM1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA1MTgxOTJ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcwODExOTI5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijc3QTdBODMzRTg3M0MxNEQyODY1MURCOUIyMjdDNkEzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA1MTgxOTJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkM2VEdaUktCIiwibWUiOnsiaWQiOiI0MDc3MDgxMTkyOTo0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjA3NDMwMjYwNjMzNzI5OjRAbGlkIiwibmFtZSI6ImNvc21pbiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFdoNVBRRUVLTG0rTDBHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSVdSem5vNGJyY21pV0VGc1VGYk5qbnlLcDh6NUl2elFUWWdsSVRuTzBoWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVXN5V2pBMDNSTnZyZnFWQ3RjYkQzR0kxcis5QlRUUW4rdWwzRzY5RTJ0Q3hJTi9EbUhKYWx1MDN2NU4xM1Q5bFBLV0dna2RBcHVCS0tYTU9FSkpoRHc9PSIsImRldmljZVNpZ25hdHVyZSI6ImFEUHh3NnlvVDZZQUQvVGNMREVucEwxZGZjZGZBY2hJQnJkTVlmS1ZaVjdCZmY2UTI3a3FGWWVoSlNrRnI2cDlIcGF0WDVoaU5wUWRQRzlLdkdVdERnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3NzA4MTE5Mjk6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJTRmtjNTZPRzYzSm9saEJiRkJXelk1OGlxZk0rU0w4MEUySUpTRTV6dElXIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDA1MTgxOTAsImxhc3RQcm9wSGFzaCI6IlBXazVCIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNSTUifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;

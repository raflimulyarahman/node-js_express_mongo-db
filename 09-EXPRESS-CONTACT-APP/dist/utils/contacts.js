import fs from 'node:fs/promises';
const DIR_PATH = './data';
const DATA_PATH = `${DIR_PATH}/contacts.json`;
// Pastikan folder data dan file contacts.json tersedia
await fs.mkdir(DIR_PATH, { recursive: true });
try {
    await fs.readFile(DATA_PATH);
}
catch {
    await fs.writeFile(DATA_PATH, '[]', 'utf-8');
}
// Membaca file contacts.json
const loadContact = async () => {
    const file = await fs.readFile(DATA_PATH, 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
};
//# sourceMappingURL=contacts.js.map
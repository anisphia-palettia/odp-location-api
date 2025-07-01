import * as fs from "node:fs";
import axios from "axios";
import * as path from "node:path";

export async function saveFile(fileUrl: string, relativeFilePath: string): Promise<string> {
    const fullPath = path.join("public", relativeFilePath);
    const folder = path.dirname(fullPath);

    fs.mkdirSync(folder, { recursive: true });

    const writer = fs.createWriteStream(fullPath);

    const response = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(fullPath));
        writer.on('error', reject);
    });
}
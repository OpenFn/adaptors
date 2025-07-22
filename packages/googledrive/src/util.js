export const getFileById = async (fileId, client) => {
  if (!fileId.match(/^[a-zA-Z0-9_-]+$/)) {
    throw new Error('Invalid file ID format');
  }

  console.log(`Fetching file with ID: ${fileId}`);

  const [metadataResponse, contentResponse] = await Promise.all([
    client.files.get({
      fileId: fileId,
      fields: 'id, name, mimeType, modifiedTime, size',
    }),
    client.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'arraybuffer' }
    ),
  ]);

  const content = Buffer.from(contentResponse.data).toString('base64');
  const metadata = metadataResponse.data;

  return {
    fileId,
    content,
    name: metadata.name,
    mimeType: metadata.mimeType,
    modifiedTime: metadata.modifiedTime,
    size: metadata.size,
  };
};

export const getFileByName = async (fileName, client) => {
  console.log(`Searching for file with name: ${fileName}`);
  const files = await searchFile(fileName, client);
  if (files.length > 1) {
    console.warn(`Multiple files found matching: ${fileName}`);
    console.warn('Returning the first match.');
  }
  const fileContent = await getFileById(files[0].fileId, client);
  return fileContent;
};

export const searchFile = async (searchQuery, client) => {
  const response = await client.files.list({
    q: `name contains '${searchQuery}' and trashed = false`,
    fields: 'files(id, name, mimeType, modifiedTime, size)',
    spaces: 'drive',
    pageSize: 10, // Limit results, adjust as needed
  });

  const files = response.data.files;
  if (!files || files.length === 0) {
    throw new Error(`No files found matching: ${searchQuery}`);
  }

  return files.map(file => ({
    fileId: file.id,
    name: file.name,
    mimeType: file.mimeType,
    modifiedTime: file.modifiedTime,
    size: file.size,
  }));
};

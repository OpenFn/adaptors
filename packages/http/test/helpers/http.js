import http from 'http';
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(`{"message": "This is a JSON response"}`);
};

const httpServer = http.createServer(requestListener);

httpServer.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

export default httpServer;

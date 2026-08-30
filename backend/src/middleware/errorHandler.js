export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err);

  if (err instanceof SyntaxError && err.message.includes("JSON")) {
    return res.status(502).json({
      error: "The AI response could not be parsed. Please try again.",
    });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.publicMessage || "Something went wrong on the server.",
  });
}

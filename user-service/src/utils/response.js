/**
 * Utility that provides a wrapper for responding
 * with common HTTP status codes and follows a
 * defined response convention.
 */
module.exports = {
  respondBadRequest: (req, res, errors) => {
    const errorCollection = [];
    const errorMessage = {
      status: 400,
      source: req.originalUrl,
    };

    if (Array.isArray(errors)) {
      errors.forEach((err) => {
        errorCollection.push(Object.assign(errorMessage, {
          detail: err.message,
        }));
      });
    } else {
      errorCollection.push(Object.assign(errorMessage, {
        detail: errors,
      }));
    }

    return res.status(400).send({ errors: errorCollection });
  },

  respondOK: (req, res, response) => res.send({
    status: 200,
    source: req.originalUrl,
    results: Array.isArray(response) ? response : [response],
  }),
};

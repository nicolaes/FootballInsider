
require("../lib/server").listen(
    process.env.PORT || 8080,
    process.env.HOST || "localhost"
);

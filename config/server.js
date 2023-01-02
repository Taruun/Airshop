module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS", [
      ("Sirx2LmBPe/e/dKVJOgKaA==",
      "JrykZfKctUCpmujPZKOA+A==",
      "KQbRf8Hp39xlr74xXQjhBg==",
      "f4mkHNelJl9dxNWhKdWRSQ=="),
    ]),
  },
});

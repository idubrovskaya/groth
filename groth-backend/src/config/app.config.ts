export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  jwt_secret: `${process.env.JWT_SECRET}`,
  jwt_expire: `${process.env.JWT_EXPIRE}`,
});

//круглые скобки, чтобы не обрабатывать функцию, а сразу возвращать то, что находится в скобках

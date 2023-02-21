interface IEnvHelper {
  jwtKey: string | undefined;
}

const jwtKey = process.env.JWT_KEY;

const EnvHelper: IEnvHelper = {
  jwtKey,
};

export { EnvHelper };

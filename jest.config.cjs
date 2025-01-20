module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Используем ts-jest для .ts и .tsx файлов
    '^.+\\.(js|jsx)$': 'babel-jest',  // Для обработки .js и .jsx файлов с помощью babel
  },
  testEnvironment: 'jest-environment-jsdom',  // Устанавливаем тестовую среду для React
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],  // Поддержка расширений файлов
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/cssstub.js'
  },
};

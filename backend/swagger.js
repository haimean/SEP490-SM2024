import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Shop',
    description: 'API description',
  },
  host: 'localhost:4200',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/modules/index.router.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);

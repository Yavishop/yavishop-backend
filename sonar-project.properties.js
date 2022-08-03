const scanner = require('sonarqube-scanner');

scanner(
    {
      serverUrl : 'https://sonarqube.sistemaagil.net',
      token : "3fc45b7e3ef8ad0e0a6521488420c6b2c0640703",
      options: {
        'sonar.projectKey':'Backend-tendencias',
        'sonar.projectName': 'Backend-tendencias',
        'sonar.projectDescription': 'Description for "My App" project...',
        'sonar.sourceEncoding':'UTF-8',
        'sonar.sources': 'src',
        'sonar.javascript.lcov.reportPaths': 'coverage/jest/lcov.info'
      }
    },
    () => process.exit()
  )
pipeline {
    agent any
    environment {
        PROJEC_NAME = "backend-tendencias"
        TAGS = 'sistemaagil'
        HOME = '.'
    }    
    stages {
        stage("Despliegue"){
            agent {
                label 'integracion'
            }
            steps{
                sh 'docker build -f devops/Dockerfile -t yavishop-backend:latest .'
                sh 'docker stack rm yavishop-na'
                sh 'docker stack deploy -c devops/stack.yml yavishop-na'
            }    
        }
       
    }
}
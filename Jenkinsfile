pipeline {
    agent any

    environment {
        IMAGE_NAME = "cicd-app"          // DockerHub repo name
        IMAGE_TAG  = "latest"
    }

    stages {

        stage('Checkout SCM') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/admin105-sudo/CICD.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                  docker build -t $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('DockerHub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                      echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                sh '''
                  docker push $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }
    }

    post {
        success {
            echo 'Docker image pushed successfully to DockerHub ✅'
        }
        failure {
            echo 'Build or Push failed ❌'
        }
    }
}

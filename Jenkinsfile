pipeline {
    agent any

    environment {
        IMAGE_NAME = "cicd-app"   // DockerHub repo name
        IMAGE_TAG  = "latest"
    }

    stages {

        stage('Checkout SCM') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/admin105-sudo/CICD.git'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                      echo "Docker user is $DOCKER_USER"
                      docker build -t $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG .
                      echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                      docker push $DOCKER_USER/$IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Docker image built & pushed successfully ✅'
        }
        failure {
            echo 'Docker build or push failed ❌'
        }
    }
}

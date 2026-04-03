pipeline {
    agent any

    environment {
        APP_DIR = "/var/www/jenkins_test"
    }

    stages {

        stage('Build (Docker)') {
            agent {
                docker {
                    image 'node:18'
                }
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                rm -rf $APP_DIR/*
                cp -r * $APP_DIR/
                '''
            }
        }

        stage('Run App (Docker Container)') {
        steps {
            sh '''
            docker stop nodeapp || true
            docker rm nodeapp || true

            docker run -d \
              --name nodeapp \
              -p 3000:3000 \
              -v /var/www/jenkins_test:/app \
              -w /app \
              node:18 \
              sh -c "npm install && node app.js"
            '''
            }
        }
    }
}
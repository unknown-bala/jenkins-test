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
                sh 'node -v'
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

        stage('Run App') {
            steps {
                sh '''
                cd $APP_DIR

                pm2 stop nodeapp || true
                npm install -g pm2
                pm2 start app.js --name nodeapp
                '''
            }
        }
    }
}

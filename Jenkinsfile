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

        stage('Run App (Docker)') {
            agent {
                docker {
                    image 'node:18'
                }
            }
            steps {
                sh '''
                cd $APP_DIR

                npm install -g pm2

                pm2 stop nodeapp || true
                pm2 start app.js --name nodeapp
                '''
            }
        }
    }
}
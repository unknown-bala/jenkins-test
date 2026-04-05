pipeline {
    agent any

    environment {
        APP_DIR = "/var/www/jenkins_test"
    }

    stages {

        stage('Build') {
            agent {
                docker {
                    image 'node:18'
                    reuseNode true
                }
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    mkdir -p $APP_DIR

                    rsync -av --delete \
                        --exclude='.git' \
                        --exclude='.env' \
                        --exclude='*.log' \
                        ./ $APP_DIR/
                '''
            }
        }

        stage('Run App') {
            steps {
                sh '''
                    docker stop nodeapp || true
                    docker rm nodeapp || true

                    docker run -d \
                        --name nodeapp \
                        --restart unless-stopped \
                        -p 3000:3000 \
                        -v /var/www/jenkins_test:/app \
                        -w /app \
                        node:18 \
                        sh -c "node app.js"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}

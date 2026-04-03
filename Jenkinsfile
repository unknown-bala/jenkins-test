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

            # Copy everything except .git and .env
            cp -rf . $APP_DIR/
            rm -rf $APP_DIR/.git
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
        success { echo '✅ Deployed successfully!' }
        failure { echo '❌ Build failed!' }
    }
}
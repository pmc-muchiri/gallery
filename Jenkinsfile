pipeline {
    agent any
        tools {
          nodejs 'nodeJs-24'
        }

    triggers {
        githubPush() // Trigger build on GitHub push
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/pmc-muchiri/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Running Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'DEPLOY_HOOK')]) {
                    sh 'curl -X POST $DEPLOY_HOOK'
                }
            }
        }
    }

    post {
        always {
            echo 'Deployment Finished'
        }
        success {
            // echo 'Deployment Successful!'
            emailext(
                to: 'paul.muchiri@student.moringaschool.com',
                subject: "Successful Deployment: ${currentBuild.fullDisplayName}",
                body: "The deployment was successful. Check the details at ${env.BUILD_URL}"
            )
        }
        failure {
            // echo 'Deployment Failed!'
            emailext(
                to: 'paul.muchiri@student.moringaschool.com',
                subject: "Failed Deployment: ${currentBuild.fullDisplayName}",
                body: "The deployment failed. Check the details at ${env.BUILD_URL}"
            )
        }
    }
}

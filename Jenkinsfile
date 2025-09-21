pipeline {
    agent any
        tools {
          nodejs 'nodeJs-24'
        }

    triggers {
        githubPush() // Trigger build on GitHub push
    }
// Build Stages
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
            echo 'Notification stage executed.'
        }
        // Success deployment notification
        success {
            emailext(
                to: 'pmc.ac.ke@gmail.com',
                subject: "Successful Deployment: ${currentBuild.fullDisplayName}",
                body: "The deployment was successful. Check the details at ${env.BUILD_URL}"
            )

            slackSend(
                channel: '#paul_ip1',
                tokenCredentialId: 'slack-webhook',
                message: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} deployed successfully.\n${env.BUILD_URL}"
            )

        }
        // Failure deployment notification
        failure {
            // email notification
            emailext(
                to: 'pmc.ac.ke@gmail.com',
                subject: "Failed Deployment: ${currentBuild.fullDisplayName}",
                body: "The deployment failed. Check the details at ${env.BUILD_URL}"
            )
            // slack notification
            slackSend(
                channel: '#paul_ip1',
                tokenCredentialId: 'slack-webhook',
                message: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER} failed.\n${env.BUILD_URL}"
            )

        }
    }

}

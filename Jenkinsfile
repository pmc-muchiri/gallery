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
// Email Notifications
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
    // Slack Notifications
    post {
    success {
        slackSend(
            webhookUrl: credentials('slack-webhook'),
            channel: '#devops-builds',
            message: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} deployed successfully.\n${env.BUILD_URL}"
        )
    }
    failure {
        slackSend(
            webhookUrl: credentials('slack-webhook'),
            channel: '#devops-builds',
            message: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER} failed.\n${env.BUILD_URL}"
        )
    }
}

}

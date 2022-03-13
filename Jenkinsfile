pipeline {
  agent {
        label 'master'
  }
  environment {
    PROJECT_NAME = 'bnpl/b2b-ui'
    PROJECT_SHORT_NAME = 'b2b-ui'
    TARGET_TEST = 'fe-test'
    TARGET_PRE = 'fe-pre'
	DOCKER_BUILDKIT = '1'
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '10'))
    disableConcurrentBuilds()
  }
  stages {
    stage('Build image') {
      steps {
        script {
          def app
          if (env.BRANCH_NAME == 'master') {
            docker.withRegistry("https://${env.DOCKER_REGISTRY_TEST}", 'jenkins-system') {
              app = docker.build("${env.PROJECT_NAME}", "--build-arg DOCKER_REGISTRY=${env.DOCKER_REGISTRY_TEST} .")
            }
            docker.withRegistry("https://${env.DOCKER_REGISTRY_TEST}", 'jenkins-system') {
              app.push("b${env.BUILD_NUMBER}")
              app.push("latest")
            }
          } else if (env.BRANCH_NAME == 'releases') {
            docker.withRegistry("https://${env.DOCKER_REGISTRY_TEST}", 'jenkins-system') {
              app = docker.build("${env.PROJECT_NAME}", "--build-arg DOCKER_REGISTRY=${env.DOCKER_REGISTRY_TEST} .")
            }
            docker.withRegistry("https://${env.DOCKER_REGISTRY_PROD}", 'docker-registry-production') {
              app.push("r${env.BUILD_NUMBER}")
              app.push("latest")
            }
          } else {
            echo 'No branch to publish'
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        script{
          if (env.BRANCH_NAME == 'master') {
            sshagent (credentials: ['jenkins-ssh-key']) {
              sh "ansible-playbook -i ${env.JENKINS_HOME}/ansible_hosts -e \"target=${env.TARGET_TEST} project_name=${env.PROJECT_NAME} project_short_name=${env.PROJECT_SHORT_NAME} registry=${env.DOCKER_REGISTRY_TEST} tag=b${env.BUILD_NUMBER} \" ${env.JENKINS_HOME}/deploy.yml"
            }
          } else if (env.BRANCH_NAME == 'releases') {
            sshagent (credentials: ['jenkins-ssh-key']) {
              sh "ansible-playbook -i ${env.JENKINS_HOME}/ansible_hosts -e \"target=${env.TARGET_PRE}  project_name=${env.PROJECT_NAME} project_short_name=${env.PROJECT_SHORT_NAME} registry=${env.DOCKER_REGISTRY_PROD} tag=r${env.BUILD_NUMBER} \" ${env.JENKINS_HOME}/deploy.yml"
            }

          } else {
            echo 'No branch to publish'
          }
        }
      }
    }
  }
}

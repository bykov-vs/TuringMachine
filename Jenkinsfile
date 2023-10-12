pipeline {
    agent {
          docker { 
                 image 'maven:3.5.0'
                 args '-v /root/.m2:/root/.m2'
           }
    }
    stages {
        stage('build') {
            steps {
		sh 'mvn --version'
                sh 'mvn clean test'
            }
        }
    }
}

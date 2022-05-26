def BranchName = env.BrachName

def dev_docker_repo='439876011496.dkr.ecr.ap-south-1.amazonaws.com'
def dev_docker_registry_url='https://439876011496.dkr.ecr.ap-south-1.amazonaws.com'
def dev_docker_registry='439876011496.dkr.ecr.ap-south-1.amazonaws.com'
def docker_credential='ecr:ap-south-1:aws-credentials-ecr'

def prod_docker_repo='439876011496.dkr.ecr.ap-south-1.amazonaws.com'
def prod_docker_registry_url='https://439876011496.dkr.ecr.ap-south-1.amazonaws.com'
def prod_docker_registry='439876011496.dkr.ecr.ap-south-1.amazonaws.com'
def ProjectPath='girnarsoft-b2b-ui-framework'
def ServiceName='girnarsoft-b2b-ui-framework'


pipeline {
    agent any
    //parameters {
       //choice(choices: ['Policy_CDP', 'policy_cdpv1'], description: 'BitBucket Repository', name: 'Repo')
       //choice(choices: ['gt-nct-offer-api','gt-nct-inventory','gt-nct-integration','gt-nct-lead'], description: 'Service Name', name: 'ServiceName')
       //string(defaultValue: 'gt-nct-offer-api', description: 'Service Name', name: 'ServiceName')
       //string(defaultValue: 'gt-nct-offer-api', description: 'Relative Path of Project', name: 'ProjectPath')
       //choice(choices: ['leaddetails','optimus_finance_report','optimus_sales_report','optimus_booking_report','optimus_test','optimus_risk_report','google_analytics','health','car', 'healthrenewal','twowheeler', 'ingestion', 'customerdetails', 'familymemberdetails', 'addressdetails', 'vehicledetails'], description: 'Job Name', name: 'JobName')
    //}
   
     stages {
         /*stage('Pull') {
            steps {
                echo "Branch name ${env.Branch}"
                git branch: '${Branch}', credentialsId: '6a4460ce-286c-4761-bcc0-81a7a07f5c49', url: 'https://bitbucket.org/ETECHACES/zap.git'                
                //  git branch: 'phase1', url: 'https://shaktikum@bitbucket.org/ETECHACES/zap.git'
            }
            
         }*/
    //    stage('Pull1') { 
    //       steps {
    //            echo "Docker Build App : ${dockerBuildApp}"
    //            echo "Application Name : ${env.Application}"
//                echo "'/var/lib/jenkins/workspace/ZAP_CORE_Service/${env.Application}'"
    //            echo "------${path}"

    //        }
     //   }
        stage('Build') { 
            steps {
                  dir("${env.WORKSPACE}") {
                      script {
                          sh """
                            echo "$USER"
                            ls -ltr
                            docker --version
                            docker build --no-cache -f ./Dockerfile -t ${dev_docker_repo}/${ProjectPath} .
                            """
                           //docker.withRegistry(dev_docker_registry_url,docker_credential) {
                           // docker.build(dev_docker_repo,"--build-arg buildPath=${ProjectPath} .")
                           //}
                           
                           echo "Build common Artifact Tag for the all env"
                           docker_tag="${BUILD_NUMBER}"
                           docker_taglatest="latest"
                           echo "Common Tag: $docker_tag"
                           
                           echo "Build Successfullly"
                          //sh 'sh build.sh '
                      }
                  }
            }
        }
        stage('Artifact push to ECR') {
            steps {
                echo "Pushing Artifact to Dev ECR "
                script {
                    docker.withRegistry(dev_docker_registry_url+"/"+ProjectPath,docker_credential) {
                    docker.image(dev_docker_repo+"/"+ProjectPath).push(docker_tag)
                    docker.image(dev_docker_repo+"/"+ProjectPath).push(docker_taglatest)
                    }   
                }
            }   
        }
        stage('Deploy') { 
            steps {
               dir("${env.WORKSPACE}") {
                     script { 
                         sh """
                         
                          /usr/local/bin/aws ecs update-service --cluster NCT-prod  --service girnarsoft-b2b-ui-framework --force-new-deployment
                          echo "girnarsoft-b2b-ui-framework Deploy successful"
            
                         """
                     }
                  }
            }
        }
    }

}

def copy_to_dir(workspace, list, dir){
    for (int i = 0; i < list.size(); i++) {
        try {
            stage(list[i]){
               sh "cp  ${workspace}/${list[i]} ${workspace}/${dir} -r"
            }
        } catch (Exception e) {
            echo "Stage failed, but we continue"
        }
    }
}

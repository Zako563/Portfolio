export interface skillResponseModel {
    skillId: number;
    skillName: string;
    skillLogo: string;
  }
  

export interface skillRequestModel {
    skillName: string;
    skillLogo: string;
  }
  


export interface projectResponseModel {
    projectId: number;
     projectName : string;
     description : string;
     imageUrl: string;
     skills : skillResponseModel[];
     projectLink: string;
  }
  
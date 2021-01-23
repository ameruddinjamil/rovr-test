
export class GithubResponse {
    
    repoName: string;
    repoDescription: string;
    repoOwner: string
    repoUrl: string;
    language: string;

    constructor(response: any) {
        this.repoName = response.name;
        this.repoDescription = response.description;
        this.repoOwner = response.owner.login;
        this.repoUrl = response.html_url;
        this.language = response.language;
    }

}
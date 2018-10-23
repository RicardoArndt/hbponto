import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
    private localStorage = window.localStorage;
    
    setItem(key: string, value: string): void {
        this.localStorage.setItem(key, value);
    }

    getItem(key: string): string {
        return this.localStorage.getItem(key);
    }

    setAuthenticationTokens(token: string, jiraToken: string) {
        this.localStorage.setItem("Token", token);
        this.localStorage.setItem("AuthJiraToken", jiraToken);
    }

    get TokenAuthentication() {
        return this.localStorage.getItem("Token");
    }

    get TokenJiraAuthentication() {
        return this.localStorage.getItem("AuthJiraToken");
    }
}